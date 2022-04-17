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

router.get('/', authenticateJWT, (req, res) => {

    const authHeader = req.headers.authorization;
    const accessTokenSecret = 'supersecret';
    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, accessTokenSecret);
    const query = `SELECT *
                   FROM employee e
                   WHERE 1=1
                   AND e.login = '${decoded.login}'
                `;

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            return res.json('error');
        } else {
            return res.status(200).json(data.rows)
        }
    })
});


module.exports = router