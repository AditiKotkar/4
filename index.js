const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');

const app = express();
app.set('view engine', 'ejs');  
app.use(bodyParser.urlencoded({ extended: false }));

const port = 4000;

const Connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "college"
  });
  Connection.connect(function (error) {
    if (error) {
      throw error;
    } else {
      console.log("College Database is connected Successfully");
    }
  });

  app.get('/college', (req, res) => {
    res.render('college');
  });

  app.post("/verify", (req, res) => {
    const collegeId = req.body.collegeId;
    const sql = "SELECT * FROM colleges WHERE college_id = ?";
    collegeConnection.query(sql, [collegeId], (err, result) => {
      if (err) {
        console.error("Error executing college query:", err);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (result.length === 0) {
        res.status(404).json({ error: "College ID not found" });
      } else {
        res.redirect('/')
      }
    });
  });

app.get('/Student_login', (req, res) => {
  res.render('Student-login');
});

app.post('/login', (req, res) => {
    const studentId = req.body.studentId;
    const password = req.body.password;

    const Connection = mysql.createConnection({
      host:"localhost",
      user: "root",
      password : "",
      database : "students"
    });
    studentConnection.connect(function (error) {
      if (error) {
        throw error;
      } else {
        console.log("Student MySQL Database is connected Successfully");
      }
    });

      const sql = "SELECT * FROM students WHERE id = ? AND password = ?";
      studentConnection.query(sql, [studentId, password], (err, result) => {
        if (err) {
            throw err;
        }
        if (result.length > 0) {
            res.send('student login successful');
        } else {
            res.send('invalid student id and password ');
        }
        Connection.end();
    });
});
  
  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
});