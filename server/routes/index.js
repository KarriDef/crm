const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../db/db')
const accessTokenSecret = 'supersecret';
/* GET home page. */
router.post('/', function(req, res, next) {
  console.log(req.body);
  console.log(req.body.login, req.body.password)
  const query = `SELECT login, password
                 FROM employee e
                 WHERE 1=1
                 AND e.login = '${req.body.login}'
                 `;

  db.query(query, (err, data) => {
    if ( err ) {
      console.log(err)
        return res.json({error: 'error'}).status(400)
    } else {
        try {
          if ( data.rows[0].login == req.body.login && data.rows[0].password == req.body.password) {
            const accessToken = jwt.sign({ login: req.body.login,  password: req.body.password }, accessTokenSecret);
            console.log(accessToken);
              return res.json({
                      msg: 'LOGIN_SUCCESS',
                      accessToken: accessToken
                    })
          } else {
              return res.status(400).json({error: 'WRONG_LOGIN'})
          }
        } catch {
            return res.status(400).json({error: 'WRONG_LOGIN'})
        }
    }
  })
});

module.exports = router;
