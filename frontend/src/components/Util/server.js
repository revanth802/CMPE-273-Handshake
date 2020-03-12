var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const util = require('util');
var cors = require('cors');


var connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'root',
	password : 'rootpasswordgiven',
    database : 'redux_u',
    dateStrings:true
});
const getResults = util.promisify(connection.query).bind(connection);

var app = express();
app.use(cors({ origin: 'http://localhost:3000', credentials: true }));
app.set('view engine', 'ejs');
app.use(session({
	secret: 'secret',
	resave: true,
	saveUninitialized: true
}));
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());


// app.get('/', function(request, response) {
// 	response.redirect('/home');
// });
var sessvar;

app.get('/displayjobdetails', async function(request, response) {
    console.log("session company id",request.session.company_id);
    connection.query('SELECT * FROM `job_postings` WHERE `fk_company_id` = ?' , [request.session.company_id] ,async function(error, results) 
    {
        console.log("in display job details",results);
        if(results.length)
        {
response.json({results}); 
       }
        else
        {
            console.log("No user id found");
        }
    });
});



app.post('/submitnewjob', async function(request, response) {
    console.log("session company id",request.session.company_id);

    var jobtitle = request.body.jobtitle;
    var posting = request.body.posting;
    var applicationdeadline = request.body.applicationdeadline;
    var location = request.body.location;
    var salary = request.body.salary;
    var jobdescription = request.body.jobdescription

console.log(request.body);
    var sql = "INSERT INTO `job_postings`(`fk_company_id`, `category`,`postion`,`job_desc`,`job_location`,`job_long_desc`) VALUES ('" + request.session.company_id + "','" + jobtitle + "','" +jobtitle +"','"+ jobdescription + "','"+ jobdescription + "','" + location+"')";

    connection.query(sql , async function(error, results) 
    {
        var results = await getResults(sql);
    });
});



app.post('/auth', async function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    sessvar = request.session;

	if (username && password) {
	    connection.query('SELECT * FROM `lu_user` WHERE `user_name` = ? AND `password` = ?', [username, password],async function(error, results) {
           //console.log(error);
			if (results.length == 1) {
                var id;
                console.log(results[0]);
                console.log(results[0].role_name);

                if(results[0].role_name ==='student'){
                    
                    var sqlQuery = 'select * from students where fk_user_id = '+results[0].user_id;
                    var results = await getResults(sqlQuery);
                    console.log('student coookie id:', results)
                    id = results[0].student_id;
                    sessvar.company_id = id;
                    request.session.company_id = sessvar.company_id;
                    response.cookie('cookie',id,{maxAge: 900000, httpOnly: false, path : '/'});

                    response.end(""+id);
                }
                // else if(results[0].role_name ==='company'){
                //     var sqlQuery = 'select * from company where fk_user_id = '+results[0].user_id;
                //     var results = await getResults(sqlQuery);
                //     id = results[0].company_id;
                    
                //     sessvar.company_id = id;
                //     request.session.company_id = sessvar.company_id;
                //     response.cookie('cookie',id,{maxAge: 900000, httpOnly: false, path : '/'});

                //     response.end(''+id);
                // }   
			} else {
                console.log('Incorrect Username and/or Password!');
            }			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});

app.post('/auth2', async function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    sessvar = request.session;

	if (username && password) {
	    connection.query('SELECT * FROM `lu_user` WHERE `user_name` = ? AND `password` = ?', [username, password],async function(error, results) {
           //console.log(error);
			if (results.length == 1) {
                var id;
                console.log(results[0]);
                console.log(results[0].role_name);

                if(results[0].role_name ==='company'){
                    var sqlQuery = 'select * from company where fk_user_id = '+results[0].user_id;
                    var results = await getResults(sqlQuery);
                    id = results[0].company_id;
                    
                    sessvar.company_id = id;
                    request.session.company_id = sessvar.company_id;
                    response.cookie('cookie',id,{maxAge: 900000, httpOnly: false, path : '/'});

                    response.end(''+id);
                }
            
			} else {
                console.log('Incorrect Username and/or Password!');
            }			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
});




app.post('/register', async function(request, response) {
	var username = request.body.username;
    var email = request.body.email;
    var password = request.body.password;
    var role = request.body.role;
    var firstName = request.body.firstName;
    var lastName = request.body.lastName
    var bool = false;
    if (username && password) {
        var sql = "INSERT INTO `lu_user`(`user_name`, `email`,`password`,`role_name`) VALUES ('" + username + "','" + email + "','" +password +"','"+ role + "')";
        var values = [username,email,password,role];
        console.log(values);
       var results = await getResults(sql);
	    var userId = results.insertId;
        if(role == "student"){
                    var sql = "INSERT INTO `students`(`first_name`, `last_name`,`fk_user_id`,`email`) VALUES ('"+firstName+"','"+lastName+"'," + userId + ",'" +email + "')";
                    var results = await getResults(sql);
        }
        if(role == "company"){
                    var sql = "INSERT INTO `company`(`company_name`, `company_desc`,`fk_user_id`,`email`) VALUES ('"+firstName+"','"+lastName+"',"+ userId + ",'" +email + "')";
                    var results = await getResults(sql);
        }
        
					
			//response.end();
        }
        response.writeHead(200,{
            'Content-Type' : 'text/plain'
            })  
         response.end("succesfully saved");
    } );



app.post('/saveApplication',async function(request,response){
    var jobId = request.body.jobId;
    var studentId = request.session.company_id;

    console.log("in student id is ",studentId);
    var applicationsQuery = "insert into map_student_job (fk_student_id,fk_job_id ) Values ('" + studentId + "','" + jobId + "')";

    results = await getResults(applicationsQuery);
    console.log(results);
    response.writeHead(200,{
    'Content-Type' : 'text/plain'
    })
    response.end("Successfully Saved application");;

})

app.get('/home', function(request, response) {
	if (true) {
        var jobPostings;
        console.log("request in Home page")
        renderHomePage(request, response,jobPostings)
        
	} else {
        response.redirect('/');
	}
	//response.end();
});


app.get('/events', function(request, response) {
	if (true) {
        var jobPostings;
        renderEventsPage(request, response,jobPostings)
        
	} else {
        response.redirect('/');
	}
	//response.end();
});


app.get('/profile/:id', function(request, response) {
   if (true) {
        var student_id = request.params.id;
        console.log('===', student_id)
       var studentObject;
       var stduentEducation;
       var studentExperience;
       renderProfilePage(request,response, studentObject,stduentEducation,studentExperience,student_id);
       
	} else {
        response.redirect('/');
	}
	//response.end();
});

var studentids = [];
app.post('/showapplication',async function(request,response)
{
    sessvar=request.session;
console.log("inside showapplication",request.body.jobid);
sessvar.jobid= request.body.jobid;
request.session.jobid=sessvar.jobid;
var applicationquery = 'select * from map_student_job where fk_job_id ='+ request.body.jobid
var results = await getResults(applicationquery);
console.log("in showapplication", results);


for(i = 0; i<results.length;i++)
{
    studentids.push(results[i].fk_student_id);
}
console.log("studentids are",studentids);

var studentapplicationquery = 'select * from students where student_id in '+ '(' + studentids + ')';
console.log("query",studentapplicationquery);
results = await getResults(studentapplicationquery);
console.log("show application results",results);
response.json({results});
}

);

app.get('/getAllStudents',async function(request,response){
    var studentsQuery = 'select * from students'
   // values = [1]
    results = await getResults(studentsQuery);
    response.send(results);
})

app.put('/profile/editExperience/:id', function(request, response) {
    if (true) {
       
        const expId = request.params.id;
        console.log('Expereince id: ',expId);
        const experiences = request.body;
        var student_id = experiences[0].fk_student_id;
        console.log(experiences);
         experiences.forEach(async exp => {
            if(exp.student_exp_id){
                console.log('updating experience')
            var values  = [exp.company, exp.postion,exp.work_desc,exp.work_location,exp.student_exp_id]
            var updateQuery = 'update student_experience_details set company = ?, postion = ?, work_desc = ? ,work_location = ?  where student_exp_id = ?';
            results = await getResults(updateQuery,values);
            console.log(results);
            }else{
                console.log('inserting experince')
                var insertQuery = "insert into student_experience_details (fk_student_id,company,postion,work_desc,work_location) values ('" + student_id + "','"+exp.company+"','" + exp.postion + "','" +exp.work_desc +"','" +exp.work_location + "')";
                results = await getResults(insertQuery,values);
            }
        })
        
        response.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        response.end("Successful Login");;
        
     } 
     //response.end();
 });

 app.delete('/profile/deleteExperience/:id', async function(request,response){
    var studentExpId = request.params.id
    var deleteExpQuery = "delete from student_experience_details where student_exp_id = "+studentExpId;
    results = await getResults(deleteExpQuery);  
    response.send(results);

 })

 app.delete('/profile/deleteEducation/:id', async function(request,response){
    var studentEduId = request.params.id
    var deleteExpQuery = "delete from student_educational_details where student_education_id = "+studentEduId;
    results = await getResults(deleteExpQuery);  
    response.send(results);

 })

 //editstudentObject

 app.put('/profile/editstudentObject/:id', function(request, response) {
    if (true) {
       
        const studentObjects = request.body;
        console.log(studentObjects);
        var student_id = studentObjects[0].student_id;
        studentObjects.forEach(async obj => {
            if(obj.student_id){
            var values  = [obj.first_name,obj.last_name,obj.city,obj.email,obj.phone_no, obj.skills,obj.education,obj.objective,student_id]
            var updateQuery = 'update students set first_name =?,last_name = ?,city=?, email = ?, phone_no = ?,skills = ?,education=?,objective =? where student_id = ?';
            results = await getResults(updateQuery,values);
            console.log(results);
            }
        })
        
        response.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        response.end("Successfully Saved");;
        
     } 
     //response.end();
 });

 app.put('/profile/editEducation/:id', function(request, response) {
    if (true) {
       
        const educations = request.body;
        console.log(educations);
        var student_id = educations[0].fk_student_id;
        educations.forEach(async edu => {
            if(edu.student_education_id){
            var values  = [edu.college, edu.course,edu.student_education_id]
            var updateQuery = 'update student_educational_details set college = ?, course = ?  where student_education_id = ?';
            results = await getResults(updateQuery,values);
            console.log(results);
            }else{
                var insertQuery = "insert into student_educational_details (fk_student_id,college,course) values ('" + student_id + "','"+edu.college+"','" + edu.course + "')";
                results = await getResults(insertQuery,values);
            }
        })
        
        response.writeHead(200,{
            'Content-Type' : 'text/plain'
        })
        response.end("Successful Login");;
        
     } 
     //response.end();
 });


app.get('/logout', function(request,response){
    request.session.destroy((err) => {
        if(err) {
            return console.log(err);
        }
    response.redirect('/');
    });
});

app.get('/error',function(rqst,response){
    response.render('pages/error');
});

app.listen(8080);
console.log("Server listening...")


app.get('/tabHeaders',async function(request,response){

    var tabHeadersQuery = "select * from map_role_tab ";
    results = await getResults(tabHeadersQuery);  
    //console.log(results[1].job_desc);
    tabHeaders= await results;
    // var result = [];
    // tabHeaders.forEach(async tab => {
    //     if(tab.role_name === roleName){
    //         result.push(tab)
    //     }

    // })
    // console.log(result);
    response.send(tabHeaders);
});

async function renderProfilePage(request,response, studentObject,stduentEducation,studentExperience,student_id){
    console.log('studentId: ',student_id)     
    var studentsQuery = 'select * from students where student_id ='+student_id
        values = [1]
        console.log('studentId: ',student_id)
        results = await getResults(studentsQuery);        
        studentObject = await results[0];
        console.log(studentObject.dob);
        var studentsEduQuery = "select * from student_educational_details where fk_student_id = " + studentObject.student_id;
        var studentExpQuery = "select * from student_experience_details where fk_student_id = " + studentObject.student_id;
        results = await getResults(studentsEduQuery);
        stduentEducation = await results;
        results = await getResults(studentExpQuery);
        studentExperience = await results;
      //  console.log(studentObject.college_name);
        response.json({
            studentObject: (studentObject) ,
            studentExperience :(studentExperience),
            stduentEducation:(stduentEducation)
        });
}

async function renderHomePage(request,response,jobPostings){
   var responseObject ;
    var jobPostingsQuery = "select * from job_postings ";
    results = await getResults(jobPostingsQuery);  
    //console.log(results[1].job_desc);
    jobPostings= await results;
    response.send(jobPostings);
}

async function renderEventsPage(request,response,events){
    var eventsQuery = "select * from company_events ";
    results = await getResults(eventsQuery);  
    //console.log(results[1].job_desc);
    events = await results;
   // console.log('postings:'+jobPostings.job_desc)
	response.json({events})
}

app.post('/sd',async function(request,response)
{
console.log("inside popup",request.body.jobid);
var applicationquery = 'select * from map_student_job where fk_job_id ='+ request.body.jobid
var results = await getResults(applicationquery);
console.log("in showapplication", results);


for(i = 0; i<results.length;i++)
{
    studentids.push(results[i].fk_student_id);
}
console.log("studentids are",studentids);

var studentapplicationquery = 'select first_name,last_name from students where student_id in '+ '(' + studentids + ')';
console.log("query",studentapplicationquery);
results = await getResults(studentapplicationquery);
console.log("show application results",results);
response.json({results});
}
);

app.get('/cupd',async function(request,response){
    var studentsQuery = 'select * from company where company_id= '+request.session.company_id;
    results = await getResults(studentsQuery);
    response.json({results});
    response.end()
    console.log(results);
})

app.post('/cupd1',async function(request,response){
    var z = request.session.company_id;
    var cname=request.body.cname;
    var cdesc=request.body.jobdesc;
    var cemail=request.body.email;
    var cphone=request.body.phoneno;
    var ccity=request.body.city;
    var cstate=request.body.state;
    var ccountry=request.body.country;

    console.log("cupd1")
    console.log(z);
    console.log(cname);

console.log("cemail",cemail);
    var applicationsQuery = "UPDATE company SET company_name = ?, company_desc = ?, email =?, phone_no = ?, city = ?, state = ?, country = ? WHERE company_id =?" ;

    var ds=[cname,cdesc,cemail,cphone,ccity,cstate,ccountry,z]
    results = await getResults(applicationsQuery,ds);
    console.log(results);
    response.writeHead(200,{
    'Content-Type' : 'text/plain'
    })
    response.end("updated");;

})

app.post('/submitnewevent', async function(request, response) {
    console.log("session company id",request.session.company_id);



    var eventname = request.body.eventname;
    var eventdescription  = request.body.eventdescription;
    var eventtime =  request.body.eventtime;
    var location = request.body.location;
    var eligibility  = request.body.eligibility;
console.log("eligibility",eligibility);
console.log("inside submitevent",request.body);
    var sql = "INSERT INTO `company_events`(`fk_company_id`, `event_name`,`event_desc`,`event_time`,`location`,`eligibility`) VALUES ('" + request.session.company_id + "','" + eventname + "','" +eventdescription +"','"+ eventtime + "','"+ location + "','" + eligibility+"')";

    connection.query(sql , async function(error, results) 
    {
        var results = await getResults(sql);
        console.log("in company events",results);
    });

});

app.post('/applyreg', async function(request, response) {
    var eventid = request.body.eventid;
    var studentId = request.session.company_id;
    console.log("eventid", eventid);
    console.log("studentid",studentId);
    var applicationsQuery = "insert into map_student_events (fk_student_id,fk_event_id,application_status) Values ('" + studentId + "','" + eventid + "', 'applied' )";
    var results = await getResults(applicationsQuery);
    console.log(results);

})

app.post('/updatestatus', async function(request, response) {
    console.log("inside update status");
    var studentId = request.body.studentid;
    var status = request.body.applicationstatus;
    var jobid =sessvar.jobid;
    console.log("status", status);
    console.log("studentid",studentId);
    console.log("jobid",jobid);

    var values  = [status,studentId,jobid];
    var updateQuery = 'update  map_student_job set application_status = ? where `fk_student_id` = ? AND `fk_job_id` = ?';
    results = await getResults(updateQuery,values);
    console.log(results);

});