var express = require('express');
var router = express.Router();
const mysqlConnection = require('../globals/database/database')
const { getTimeStamp } = require('../globals/utils')
let  sendMail  = require('../globals/nodeMailer/nodeMailer')

// Add headers before the routes are defined
router.use(function (req, res, next) {

  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

/* GET tasks page. */
router.route(`/:status?/:page?`)
  .get( async function (req, res) {
    let { status, page } = req.query;
    page = Number(page);
    let rowsCount = 0;
    let pagesTotal = 1;
    await mysqlConnection.query(`SELECT COUNT(*) FROM tasks ${status>0?`WHERE status=${status}`:''}`, function (err, rows) {
      
      rowsCount = rows[0]['COUNT(*)'];
      pagesTotal = parseInt(rowsCount / 10);
     
      if ((pagesTotal % 1) !== 0) {
        console.log(pagesTotal % 1)
        console.log((pagesTotal % 1) !== 0)

        pagesTotal = (pagesTotal+1);
      } 
    })
    await mysqlConnection.query(`SELECT * FROM tasks ${status>0?`WHERE status=${status}`:''} ORDER BY updated_at DESC LIMIT ${page} , 10`, [status,page], (err, rows, fields) => {
      if (!err) {
        res.status(200).json({
          'rowsTotal':rowsCount,
          'pagesTotal': pagesTotal,
          'page':page,
          'rows':rows,
        });
        sendMail()
      } else {
        console.error(err)
      }
    })
    
  })
  .post( async function (req, res) {
    let { id, title, description, status, updated_at } = req.body;
    console.log(req.body)
    const date = getTimeStamp()
    if (!id) {
      await mysqlConnection.query(`INSERT INTO tasks (title, description, status, created_at, updated_at) VALUES ('${title}', '${description}', '${status}',${date}, ${date})`), function (err, rows, fields) {       
        if (!err) {
        res.send('Registro Creado')
          sendMail();
      } else {
          res.send('Error al crear el registro')
          sendMail();
      }
    };
    } else {
      await mysqlConnection.query(`UPDATE zarego.tasks SET title = '${title}', description = '${description}', status = '${status}', updated_at = ${date} WHERE id = ${id} ORDER BY updated_at`, function (err, rows, fields) {
        if (err) console.error(err);
        sendMail();
        res.send('Success');
      });
    }

})

module.exports = router;
