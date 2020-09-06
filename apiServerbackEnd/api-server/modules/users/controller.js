//code copié
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
//const User = require('./model');
import User from './model';

//fonction Login
/* export const login = (req, res) => {
    return res.status(200).json({ msg : "Vous etes connecté"})
} */

// fonction signup pour enregistrer un utilisateur dans la base de données

export const signup = (req, res, next) => {
    // const userObject = JSON.parse(req.body.user);
    bcrypt.hash(req.body.password, 10).then(
        (hash) => {
                const user = new User({
                email: req.body.email,
                password: hash,
                name: req.body.name,
                firstName: req.body.firstName,
                image: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`,
                phoneNumber: req.body.phoneNumber,
                profil: req.body.profil,
                //token: req.body.token,
                connectionStart: 0,
                connectionEnd: 0
            });
            user.save().then(
                () => {
                      res.status(201).json({
                        message: 'User added successfully!',
                        user: user
                    });
                }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    );
};

//fonction login pour se logger après s'être enregistré

export const login = (req, res, next) => {
    User.findOne({ email: req.body.email }).then(
        (user) => {
            if (!user) {
                return res.status(401).json({
                    error: new Error('User not found!'), msg: "utilisateur non trouvé !"
                });
            }
            bcrypt.compare(req.body.password, user.password).then(
                (valid) => {
                                if (!valid) {
                                    return res.status(401).json({
                                        error: new Error('Incorrect password!'), msg:"mauvais mot de passe !"
                                    });                                
                                }
                                else{//pième connection
                                    if( user.connectionEnd!=0 ){
                                        var currentTime = Number (new Date());
                                        var timeLeft = currentTime - user.connectionEnd;
                                        if(timeLeft<=0){//Token encore valide
                                                res.status(200).json({
                                                tempsRestant: timeLeft,
                                                userId: user._id,
                                                userName: user.name,
                                                userFirstName: user.firstName,
                                                userPhoneNumber: user.phoneNumber,
                                                image: user.image,
                                                token: user.token,
                                                message: "token encore valide; pième connection !"
                                            });
                                        }else{//pième connection mais le token n'est plus valide
                                                user.token = jwt.sign({ userId: user._id, userProfil: user.profil }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });
                                                user.connectionStart = Number(new Date()); // Date en milliseconde depuis le 1er Janvier 1970 à Minuit(00:00:00)  midnight January 1, 1970 UTC
                                                user.connectionEnd = user.connectionStart + 24*3600000;
                                                User.updateOne({_id: user._id}, user).then(
                                                    () => {                                                       
                                                      res.status(200).json({
                                                           // user,
                                                            userId: user._id,
                                                            userName: user.name,
                                                            userFirstName: user.firstName,
                                                            userPhoneNumber: user.phoneNumber,
                                                            image: user.image,
                                                            token: user.token,
                                                            message: 'pième connection avec nouveau token!'
                                                      });
                                                    }
                                                  ).catch(
                                                    (error) => {
                                                      res.status(400).json({
                                                        error: error, message:"Erreur lors de la génération du nouveau token pour la pième connection !"
                                                      });
                                                    }
                                                  );
                                            }
                                            ////////////////////////                                    
                                    }else{//Première connection
                                    user.connectionStart = Number(new Date()); // Date en milliseconde depuis le 1er Janvier 1970 à Minuit(00:00:00)  midnight January 1, 1970 UTC
                                    user.connectionEnd = user.connectionStart + 24*3600000;
                                    //var currentTime = Number (new Date());
                                    //var timeLeft = currentTime - user.connectionEnd;
                                    user.token = jwt.sign({ userId: user._id, userProfil: user.profil }, 'RANDOM_TOKEN_SECRET', { expiresIn: '24h' });                                    
                                    User.updateOne({_id: user._id}, user).then(
                                        () => {                                           
                                          res.status(200).json({
                                         // user,
                                          userId: user._id,
                                          userName: user.name,
                                          userFirstName: user.firstName,
                                          userPhoneNumber: user.phoneNumber,
                                          image: user.image,
                                          token: user.token,
                                          message: 'Première connection!'
                                          });
                                        }
                                      ).catch(
                                        (error) => {
                                          res.status(400).json({
                                            error: error, message:"Erreur lors de la génération du nouveau token pour la première connection !"
                                          });
                                        }
                                      );                                    
                                    }
                                }                                                                    
                            }
            ).catch(
                (error) => {
                    res.status(500).json({
                        error: error
                    });
                }
            );
        }
    ).catch(
        (error) => {
            res.status(500).json({
                error: error
            });
        }
    );

};

export const modifyUser1 =( req, res, next) => { 
        const user = new User({
          _id: req.params.id,
          email: req.body.email,
          password: req.body.password,
          name: req.body.name,
          firstName: req.body.firstName,
          phoneNumber: req.body.phoneNumber,
          image: user.image,
          profil: req.body.profil
        });
        User.updateOne({_id: req.params.id}, user).then(
          () => {
            res.status(201).json({
              message: 'user updated successfully!'
            });
          }
        ).catch(
          (error) => {
            res.status(400).json({
              error: error
            });
          }
        );
      }; 


export const modifyUser2 =( req, res, next) => { 
  // const user = new User({
  //   _id: req.params.id,
  // //   email: req.body.email,
  // //   password: req.body.password,
  // //   name: req.body.name,
  // //   firstName: req.body.firstName,
  // //   phoneNumber: req.body.phoneNumber,
  // //   profil: req.body.profil
  // $push:{patientIds:req.body.patientId}
  // });
  // User.updateOne({_id: req.params.id}, {push:{patientIds: req.body.patientId}}).then(
  User.updateOne({_id: req.params.id}, {$push:{patientIds: req.body.patientId}}).then(
    () => {
      res.status(201).json({
        message: 'user updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({
        error: error
      });
    }
  );
}; 

//fonction 1
/* export const func_1 = (req , res) => {
    try {
        console.log(req.query)
        return res.status(201).json({ name : 'tito'})
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with user'})
    }   
} */
//fonction 2
/* export const func_post_1 = (req, res) => {
    try {
        console.log(req.body)
        const { name, lastname } = req.body
        return res.status(200).json({ msg : `your name is : ${name} ${lastname}` })

} */

/* export const func_1 = (req , res) =>
{
    try
    {
        return res.status(201).json(req.params);
    }
    catch (e)
    {
        return res.status(e.status).json({ error: true, message: 'Error with user !!'});
    }   
} */
//Fonction 3
/* export const func_2 = (req, res) => {
    try {
        console.log(req.body)
        console.log(req.query)
        console.log(req.params)
        return res.status(200).json(req.body)
    } catch (e) {
        return res.status(e.status).json({ error: true, message: 'Error with user'})
    }
    
} */



