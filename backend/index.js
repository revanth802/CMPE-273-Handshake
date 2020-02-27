//import the require dependencies
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var session = require('express-session');
var cookieParser = require('cookie-parser');
var cors = require('cors');
app.set('view engine', 'ejs');
// const con=require('./connection');

const mysql = require('mysql');

// Get the Host from Environment or use default
const host = process.env.DB_HOST || 'localhost';

// Get the User for DB from Environment or use default
const user = process.env.DB_USER || 'root';

// Get the Password for DB from Environment or use default
const password = process.env.DB_PASS || 'rootpasswordgiven';

// Get the Database from Environment or use default
const database = process.env.DB_DATABASE || 'handshake';

// Create the connection with required details
const con = mysql.createConnection({
  host, user, password, database,
});

//use cors to allow cross origin resource sharing
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));

//use express session to maintain session data
app.use(session({
    secret              : 'cmpe273_kafka_passport_mongo',
    resave              : false, // Forces the session to be saved back to the session store, even if the session was never modified during the request
    saveUninitialized   : false, // Force to save uninitialized session to db. A session is uninitialized when it is new but not modified.
    duration            : 60 * 60 * 1000,    // Overall duration of Session : 30 minutes : 1800 seconds
    activeDuration      :  5 * 60 * 1000
}));

// app.use(bodyParser.urlencoded({
//     extended: true
//   }));
app.use(bodyParser.json());

//Allow Access Control
app.use(function(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers');
    res.setHeader('Cache-Control', 'no-cache');
    next();
  });

  var Users = [{
      username : "admin",
      password : "admin"
  }]

  
//Route to handle Post Request Call
app.post('/login',function(req,res){
  
    console.log("Inside Login Post Request");
    //console.log("Req Body : ", username + "password : ",password);
    console.log("Req Body : ",req.body);
    

        let email= req.body.username;
        let password1 = req.body.password;
        con.query('SELECT * FROM student WHERE emailId = ?',[email], function (error, results, fields) {
        if (error) {
          console.log("error ocurred",error);
          res.send("err");
        }else{
          // console.log('The solution is: ', results);
          if(results.length >0){
            if(results[0].password == password1){
              res.send("success");
              console.log('success');
            }
            else{
              res.send("fail2");
              console.log('wrong password');
            }
          }
          else{
            res.send("fail1");
            console.log('username doesnt exist');
          }
        }
        });    
});

//Route to handle Post Request Call
app.post('/clogin',function(req,res){
  
  console.log("Inside Company Login Post Request");
  //console.log("Req Body : ", username + "password : ",password);
  console.log("Req Body : ",req.body);
  

      let email= req.body.username;
      let password1 = req.body.password;
      con.query('SELECT * FROM company WHERE emailid = ?',[email], function (error, results, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send("err");
      }else{
        if(results.length >0){
          if(results[0].pwd == password1){
            res.send("success");
            console.log('success');
          }
          else{
            res.send("fail2");
            console.log('wrong password');
        
          }
        }
        else{
          res.send("fail1");
          console.log('username doesnt exist');
        }
      }
      });    
});

//Route to get All Books when user visits the Home Page
app.get('/home', function(req,res){
    console.log("Inside Home Login");    
    res.writeHead(200,{
        'Content-Type' : 'application/json'
    });
    console.log("Books : ",JSON.stringify(books));
    res.end(JSON.stringify(books));
    
})


app.post('/creg', function (req, res) {
    
  console.log('creg');
  console.log("Req Body : ",req.body);
    var flag2=0;

    if(!req.session.user)
    {
        res.cookie(null);
    }
    else{
        res.cookie('cookie',"admin",{maxAge: 900000, httpOnly: false, path : '/'});
    }

    let data=[req.body.cname,req.body.email,req.body.password,req.body.location] 

    con.query('INSERT into company(companyname,emailid,pwd,location) VALUES(?,?,?,?)',[req.body.cname,req.body.email,req.body.password,req.body.location], 
    function (error, results, fields) {
      if (error) {
        console.log("error ocurred",error);
        res.send("err");
      }
      else{
       console.log(data);
       res.json(results);
      }
      });

    });

    app.get('/displayjobdetails', async (req, res) => {
 
      console.log('in backend');
      con.query( 'SELECT * FROM jobopenings', function(error,results)
      {
          console.log(results);
          res.json({ results });
          
      });
    });

    app.post('/cjob', function(req,res){
      console.log("Inside Company job insertion");    
      con.query( 'INSERT into jobopenings (company_id,jobtitle,posting,applicationdeadline,location,salary,jobdescription,jobcategory) VALUES(?,?,?,?,?,?,?,?)', 
      [2,req.body.jobtitle,new Date(req.body.posting),new Date(req.body.applicationdeadline),req.body.location,req.body.salary,req.body.jobdescription,req.body.jobcategory],
      function(error,results)
      {
          res.send('success')
          console.log(req.body);
          console.log(results);
      });
      
  })
  

//start your server on port 3001
app.listen(3001);
console.log("Server Listening on port 3001");
