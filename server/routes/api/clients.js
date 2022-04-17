const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const db = require('../../db/db');
//const app = require('../../app');

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

router.get('/all', authenticateJWT, (req, res) => {
    const query = `SELECT *
                   FROM customers
                   order by id
                `;

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            res.json('error');
        } else {
            res.json(data.rows)
        }
    })
});

router.get('/my', authenticateJWT, (req, res) => {

    const accessTokenSecret = 'supersecret';
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decodedToken = jwt.verify(token, accessTokenSecret);

    const query = `
        SELECT c.*
        FROM customers c
        LEFT JOIN employee e ON e.id = c.user_id
        WHERE e.login = '${decodedToken.login}'
        order by c.id
    `

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
        res.json('error');
        } else {
            res.json(data.rows)
        }
    })
});


router.get('/getClient/:id', authenticateJWT, (req,res) => {

    const id = req.params.id;

    const query = `
                    SELECT * 
                    FROM Customers
                    WHERE id = ${id}
                  `;

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            return res.status(401).json('error');
        } else {
            return res.status(200).json(data.rows[0])
        }
    })

});


router.post('/createClient', authenticateJWT, (req,res) => {

    const accessTokenSecret = 'supersecret';
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const decoded = jwt.verify(token, accessTokenSecret);
    
    //const data = req.body.data;
    const data = req.body;
    console.log(data)

    const query = `INSERT INTO Customers (                         user_id, departament_id,    name,            phone,           inn,          type_action,            alias,         time_zone,          email,             website,         address,            note,         legal_address  ,      created) 
    VALUES ( ( SELECT e.id FROM Employee e WHERE e.login = '${decoded.login}' ),  1,      '${data.name}', '${data.phone}', '${data.inn}', '${data.type_action}', '${data.alias}', ${data.time_zone}, '${data.email}', '${data.website}', '${data.address}', '${data.note}', '${data.address}'  , CURRENT_TIMESTAMP  )`;

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            return res.status(400).json('error');
        } else {
            return res.status(200).json({ msg: 'Client Created' })
        }
    })
    


});


router.put('/updateClient/:id', authenticateJWT, (req, res) => {
    const accessTokenSecret = 'supersecret';
    const authHeader = req.headers.authorization;
    const token = authHeader.split(' ')[1];

    const id = req.params.id;
    const data = req.body;



    let query = 'UPDATE Customers SET last_upd = CURRENT_TIMESTAMP, ';
    if ( data.name          != '' ) query += `name = '${data.name}',`
    if ( data.phone         != '' ) query += `phone = '${data.phone}',`
    if ( data.inn           != '' ) query += `inn = '${data.inn}',`
    if ( data.type_action   != '' ) query += `type_action = '${data.type_action}',`
    if ( data.alias         != '' ) query += `alias = '${data.alias}',`
    if ( data.time_zone     != '' ) query += `time_zone = '${data.time_zone}',`
    if ( data.website       != '' ) query += `website = '${data.website}',`
    if ( data.address       != '' ) query += `address = '${data.address}',`
    if ( data.note          != '' ) query += `note = '${data.note}',`
    //if ( data.legal_address != '' ) query += `legal_address = '${data.legal_address}',`
    if ( data.email         != '' ) query += `email = '${data.email}',`
    query = query.slice(0, -1)
    query += ` WHERE id = '${id}';`

    console.log(query)

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            return res.status(401).json('error');
        } else {
            return res.status(200).json(data)
        }
    })

});


router.delete('/deleteClient/:id', authenticateJWT, (req,res) => {

    const id = req.params.id;

    console.log(id)

    const query = `DELETE FROM Customers WHERE id = '${id}';`

    db.query(query, (err, data) => {
        if ( err ) {
            console.log(err)
            return res.json('error');
        } else {
            res.json({ msg: 'Client Deleted' })
        }
    })

});


module.exports = router