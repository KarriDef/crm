const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../db/db');

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const accessTokenSecret = 'supersecret';
    if (authHeader) {
        const token = authHeader.split(' ')[1];
  
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }
  
            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);
    }
  };


  // все задачи пользователя ( НАШЕГО )
  router.get('/', authenticateJWT, (req, res) => {

    const authHeader = req.headers.authorization;
    const accessTokenSecret = 'supersecret';
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, accessTokenSecret);
    console.log(decoded.login)

      const query = `
                   select a.*
                   from Action a
                   RIGHT join Customers c ON c.id = a.user_id
                   RIGHT join Employee e ON e.id = c.user_id
                   where 1=1
                   and e.login = '${decoded.login}'
                   ;
                `;

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            res.status(500).json('error');
        } else {
            res.json(data.rows)
        }
    })
});

module.exports = router;