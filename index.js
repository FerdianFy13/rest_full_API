// initialization on module
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const mysql = require('mysql')

// parse JSON
app.use(bodyParser.json())

// create database connection
const conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'db_api',
})

//connect to database MySQL
conn.connect((err) => {
  if (err) throw err
  console.log('MySQL database connection is connected !!!')
})

// display all table data using GET method
app.get('/api/products', (req, res) => {
  let sql = 'SELECT * FROM product'
  let query = conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(JSON.stringify({ status: 200, error: null, response: results }))
  })
})

// display all table data by id using GET method
app.get('/api/products/:id', (req, res) => {
  let sql = 'SELECT * FROM product WHERE product_id=' + req.params.id
  let query = conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(JSON.stringify({ status: 200, error: null, response: results }))
  })
})

// add new data to table using POST method
app.post('/api/products', (req, res) => {
  let data = {
    product_name: req.body.product_name,
    product_price: req.body.product_price,
  }
  let sql = 'INSERT INTO product SET ?'
  let query = conn.query(sql, data, (err, results) => {
    if (err) throw err
    res.send(JSON.stringify({ status: 200, error: null, response: results }))
  })
})

// change the data in the table by id using the PUT method
app.put('/api/products/:id', (req, res) => {
  let sql =
    "UPDATE product SET product_name='" +
    req.body.product_name +
    "', product_price='" +
    req.body.product_price +
    "' WHERE product_id=" +
    req.params.id
  let query = conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(JSON.stringify({ status: 200, error: null, response: results }))
  })
})

// delete data in table using DELETE method
app.delete('/api/products/:id', (req, res) => {
  let sql = 'DELETE FROM product WHERE product_id=' + req.params.id + ''
  let query = conn.query(sql, (err, results) => {
    if (err) throw err
    res.send(JSON.stringify({ status: 200, error: null, response: results }))
  })
})

// create API server port
app.listen(3000, () => {
  console.log('Server running on Port 3000 !!!')
})
