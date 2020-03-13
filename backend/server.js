var mysql = require('mysql');
var express = require('express');
var session = require('express-session');
var bodyParser = require('body-parser');
var path = require('path');
const util = require('util');
var cors = require('cors');
var multer= require('multer');
var fs = require('fs')



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
    console.log("job_posting" + posting);
    var applicationdeadline = request.body.applicationdeadline;
    var location = request.body.location;
    var salary = request.body.salary;
    var jobdescription = request.body.jobdescription;
    var category = request.body.jobcategory;


console.log("datase from frontend"+request.body);
    var sql = "INSERT INTO `job_postings`(`fk_company_id`, `category`,`postion`,`job_desc`,`job_location`,`job_posting`,`application_deadline`,`salary`) VALUES ('" + request.session.company_id + "','" + category + "','" +jobtitle +"','"+ jobdescription + "','" + location  +  "','" + posting + "','" + applicationdeadline + "','" + salary + "')";

    connection.query(sql , async function(error, results) 
    {
        var results = await getResults(sql);
        console.log("results from job_postings",results);
    if(results)
    {
    response.send("success");
    }
    });

    
});


app.post('/submitnewevent', async function(request, response) {[]
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
    
   if(results)
   {
        console.log("event successfully created");
        response.send("success");
   }
    

});


var sessvarname;
app.post('/auth', async function(request, response) {
	var username = request.body.username;
    var password = request.body.password;
    sessvar = request.session;
    sessvarname = request.session;

	if (username && password) {
	    connection.query('SELECT * FROM `lu_user` WHERE `user_name` = ? AND `password` = ?', [username, password],async function(error, results) {
           //console.log(error);
			if (results.length == 1) {
                var id;
                console.log(results[0]);
                console.log(results[0].role_name);
                
                sessvarname.role_name = results[0].role_name;
                request.session.role_name = sessvarname.role_name;

                console.log("in request session auth", request.session.role_name );
                if(results[0].role_name ==='student'){
                    
                    var sqlQuery = 'select * from students where fk_user_id = '+results[0].user_id;
                    var results = await getResults(sqlQuery);
                    console.log('student coookie id:', results)
                    id = results[0].student_id;
                    sessvar.company_id = id;
                    request.session.company_id = sessvar.company_id;
                    console.log("student id is",request.session.company_id);
                    response.cookie('cookie',id,{maxAge: 900000, httpOnly: false, path : '/'});
                    response.cookie('cookiename',"student",{maxAge: 900000, httpOnly: false, path : '/'});


                    
                    response.json({results});
                }
                else if(results[0].role_name ==='company'){
                    var sqlQuery = 'select * from company where fk_user_id = '+results[0].user_id;
                    var results = await getResults(sqlQuery);
                    id = results[0].company_id;
                    
                    sessvar.company_id = id;
                    request.session.company_id = sessvar.company_id;
                    console.log("company_id from students",request.session.company_id);
                    response.cookie('cookie',id,{maxAge: 900000, httpOnly: false, path : '/'});
                    response.cookie('cookiename',"company",{maxAge: 900000, httpOnly: false, path : '/'});


                    response.json({results});
                }
                
            //    response.writeHead(200,{
            //         'Content-Type' : 'text/plain'
            //     })
            
			} else {
                console.log('Incorrect Username and/or Password!');
                response.end('Incorrect Username and/or Password!');
            }			
			
		});
	} else {
		response.send('Please enter Username and Password!');
		response.end();
	}
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


app.get('/viewregisteredevents', async function(request, response) {
    // var eventid = request.body.eventid;
    var studentId = request.session.company_id;
    console.log("in view registered events");
    // console.log("eventid", eventid);
    console.log("studentid",studentId);

    var jobPostingsQuery = "SELECT * from company join job_postings where company.company_id=job_postings.fk_company_id";
    results = await getResults(jobPostingsQuery); 
    var values  = [studentId];
    var applicationsQuery = "select * from map_student_events join company_events where map_student_events.application_status= 'applied' and map_student_events.fk_student_id = ? and map_student_events.fk_event_id = company_events.event_id";
    var results = await getResults(applicationsQuery,values);
    console.log(results);
    response.send({results});
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


app.post('/updateeventstatus', async function(request, response) {
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
    var applicationsQuery = "insert into map_student_job (fk_student_id,fk_job_id,application_status ) Values ('" + studentId + "','" + jobId + "','" + "Applied" + "')";

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


app.post('/showapplication',async function(request,response)
{
    var studentids = [];
sessvar = request.session;
console.log("inside showapplication",request.body.jobid);
sessvar.jobid = request.body.jobid;
request.session.jobid = sessvar.jobid;
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


var studenteventids = [];
app.post('/showeventapplications',async function(request,response)
{
    sessvar = request.session;

console.log("inside showaeventpplication",request.body.eventid);
sessvar.eventid = request.body.eventid;
request.session.eventid = sessvar.eventid;
console.log(request.body.eventid);
var applicationquery = 'select * from map_student_events where fk_event_id ='+ request.body.eventid
var results = await getResults(applicationquery);
console.log("in showeventapplication", results);


for(i = 0; i<results.length;i++)
{
    studenteventids.push(results[i].fk_student_id);
}
console.log("studentids are",studenteventids);

var studentapplicationquery = 'select * from students where student_id in '+ '(' + studenteventids + ')';
console.log("query",studentapplicationquery);
results = await getResults(studentapplicationquery);
console.log("show application results",results);
response.json({results});
}
);


app.post('/studentjobsOnCategory',async function(request,response)
{
    var student_id = request.session.company_id;
    var jobstatus = request.body.jobStatus;
    console.log("jobsattus",jobstatus);
    data = [student_id ,jobstatus];
    var eventsQuery = "select job_postings.*,map_student_job.application_status from job_postings INNER JOIN map_student_job ON job_postings.job_id= map_student_job.fk_job_id where map_student_job.fk_student_id= ? and map_student_job.application_status = ? ";

    results = await getResults(eventsQuery,data);

    console.log("results",results);
    response.send(results);

}) 



app.post('/searchforskill',async function(request,response)
{
    var searchskill = request.body.searchValue;
    data = [searchskill];
    var eventsQuery = "SELECT * FROM students where skills like '%' ? '%' ";


    results = await getResults(eventsQuery,data);

    console.log("results",results);
    response.send(results);

}) 

app.get('/getAllStudents',async function(request,response){
    var studentsQuery = 'select * from students';
   // values = [1]
    results = await getResults(studentsQuery);
    response.send(results);
})



app.get('/showstudentlist',async function(request,response){
    var studentsQuery = 'select * from students';
   // values = [1]
    results = await getResults(studentsQuery);
    response.send(results);
})

app.post('/applyforevent',async function(request,response){

    var studentId = request.session.company_id;
    var eventid = request.body.eventid;
    
    var eligibility = request.body.eligibility;
    console.log("eligibility", eligibility);
    console.log("studentid",studentId);
    console.log("eventid",eventid);
    var values  = ["applied",studentId,eventid];
    var selectvalues = [studentId];
    var selectquery = "select course from student_educational_details where fk_student_id = ? "
    studentresults = await getResults(selectquery,selectvalues);
    console.log("studentresults",studentresults[0].course);
    
    if(studentresults[0].course === eligibility || eligibility === "All")
    {
    var insertQuery = "insert into map_student_events(application_status,fk_student_id,fk_event_id) values ('" + "applied" + "','"+studentId+"','" + eventid + "')";
    console.log("insertQuery",insertQuery);
    results = await getResults(insertQuery);
    response.send("success");
    }
    else
    {
        response.send("fail");
    }
   // values = [1]
   console.log("affected rows",results.affectedRows);
})


app.post('/studentdatafilter',async function(request,response){

    console.log("in student datafilter");
  console.log(request.body);
  var jobstatus = request.body.jobStatus;
  var searchval = request.body.searchValue;
  values = [searchval,jobstatus];
   
   var insertQuery =  "SELECT * from company join job_postings where company.company_id=job_postings.fk_company_id and job_postings.postion like '%' ? '%' and job_postings.category = ?";

    console.log("insertQuery",insertQuery);
    results = await getResults(insertQuery,values);
   // values = [1]
   console.log("results",results);
//    console.log("affected rows",results.affectedRows);

   
    response.send(results);
})



app.post('/filterevents',async function(request,response){

    var student_id = request.session.company_id;
    var jobstatus = request.body.jobStatus;
    console.log("jobsattus",jobstatus);
    data = [student_id ,jobstatus];
    var eventsQuery = "select job_postings.*,map_student_job.application_status from job_postings INNER JOIN map_student_job ON job_postings.job_id= map_student_job.fk_job_id where map_student_job.fk_student_id= ? and map_student_job.application_status = ? ";

    results = await getResults(eventsQuery,data);

    console.log("results",results);
    response.send(results);

   
    response.send(""+results.affectedRows);
})




app.get('/showapplicationshome', function(request, response) {
	if (true) {
        var jobPostings;
        renderJobsPage(request, response,jobPostings)
        
	} else {
        response.redirect('/');
	}
	//response.end();
});

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
console.log("Server Listening...")


app.get('/tabHeaders',async function(request,response){

    var tabHeadersQuery = "select * from map_role_tab ";
    results = await getResults(tabHeadersQuery); 
    // console.log("session role_name", sessvarname.role_name );
    // var  roleName = sessvar.role_name;
    //console.log(results[1].job_desc);
    var tabHeaders= await results;
    // var result = [];
    // console.log("tabheaders",tabHeaders);
    // tabHeaders.forEach(async tab => {
    //     if(tab.role_name === "Student"){
    //         result.push(tab)
    //     }

    // })
    console.log(results);
    response.send(results);
});

async function renderProfilePage(request,response, studentObject,stduentEducation,studentExperience,student_id){
    console.log('studentId: ',student_id)     
    var studentsQuery = 'select * from students where student_id ='+student_id
        values = [1]
        console.log('studentId: ',student_id)
        results = await getResults(studentsQuery);        
        studentObject = await results[0];
        // console.log(studentObject.dob);
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

async function renderHomePage(request,response,jobPostings){
   var responseObject ;
    // var jobPostingsQuery = "select * from job_postings ";
    // var values  = [obj.first_name,obj.last_name,obj.city,obj.email,obj.phone_no, obj.skills,obj.education,obj.objective,student_id]
    // var updateQuery = 'update students set first_name =?,last_name = ?,city=?, email = ?, phone_no = ?,skills = ?,education=?,objective =? where student_id = ?';
    // results = await getResults(updateQuery,values);
    var jobPostingsQuery = "SELECT * from company join job_postings where company.company_id=job_postings.fk_company_id";
    results = await getResults(jobPostingsQuery);  
    console.log("interested", results)
    //console.log(results[1].job_desc);
    jobPostings= await results;
    response.send(jobPostings);
}

async function renderEventsPage(request,response,events){
    var company_id = request.session.company_id;
    console.log("company_id",company_id);
    values = [company_id];
    var eventsQuery = "select * from company_events where fk_company_id = ? ";
    results = await getResults(eventsQuery,values);  
    //console.log(results[1].job_desc);
    
    events = await results;
    console.log("results",events);
   // console.log('postings:'+jobPostings.job_desc)
	response.send(events)
}


async function renderJobsPage(request,response,events){

    var company_id = request.session.company_id;
    values = [company_id];
    console.log("company_id",company_id);
    // var eventsQuery = "select * from job_postings join map_student_job where job_postings.job_id =  map_student_job.fk_student_id and map_student_job.fk_student_id = ?";
    // var eventsQuery = "SELECT *  FROM job_postings join map_student_job WHERE job_postings.job_id =  map_student_job.fk_student_id IN (SELECT  *  FROM map_student_job  WHERE fk_student_id = ?) ";
    var eventsQuery = "select job_postings.*,map_student_job.application_status from job_postings INNER JOIN map_student_job ON job_postings.job_id= map_student_job.fk_job_id where map_student_job.fk_student_id= ? ";
    results = await getResults(eventsQuery,values);  
    //console.log(results[1].job_desc);
    events = await results;
    console.log("events",events);
   // console.log('postings:'+jobPostings.job_desc)
	response.send(events)
}

app.get('/viewallevents',async function(request,response){
    var eventsQuery = "select * from company_events ";
    results = await getResults(eventsQuery);  
    //console.log(results[1].job_desc);
    events = await results;
   // console.log('postings:'+jobPostings.job_desc)
	response.json({events});
})




app.post('/eventnamefilter',async function(request,response){
    console.log("in eventname filter");
    
    var searchvalue = request.body.searchValue;
    values = [searchvalue];
    var eventsQuery = "select * from company_events where event_name like '%' ? '%' ";
    results = await getResults(eventsQuery,values);  
    //console.log(results[1].job_desc);
    events = await results;
    console.log(events);
   // console.log('postings:'+jobPostings.job_desc)
	response.send(events);
})


var fileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    console.log('req in storage',req.query.id)
    cb(null, './HandshakeFiles/Resumes')
  },
  filename: function (req, file, cb) {
    cb(null, req.query.studentId+'_'+req.query.jobId+'.pdf')
  }
 })


 var studentProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    console.log('req in storage',req.query.studentId)
    cb(null, './HandshakeFiles/students')
  },
  filename: function (req, file, cb) {
    cb(null, req.query.studentId+'.jpg')
  }
 })

 var companyProfileStorage = multer.diskStorage({
    destination: function (req, file, cb) {
    console.log('req in storage',req.query.studentId)
    cb(null, './HandshakeFiles/company')
  },
  filename: function (req, file, cb) {
    cb(null, req.query.companyId+'.jpg')
  }
 })


var upload = multer({storage:fileStorage}).single('file')

var imageUpload = multer({ storage: studentProfileStorage }).single('studentProfileStorage')

var companyImageUpload = multer({storage:companyProfileStorage}).single('companyProfileStorage')


app.post('/uploadFile',async function(req,res){
    var studentId= req.session.company_id;
    console.log("inside upload file");
    if(req.query.type === 'resume'){
        console.log("in query type",req.query.type);
    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
           console.log('error',err)
            return res.status(500).json(err)
        } else if (err) {
           console.log('error',err)
            return res.status(500).json(err)
        }
        values = [req.file.filename,studentId];
        var sql = 'update  students set studentJobResume = ? where `student_id` = ?';
     
        connection.query(sql , async function(error, results) 
        {
            var results = await getResults(sql,values);
            console.log("in company events",results);
        });
   console.log('response',req.file)
   return res.status(200).send(req.file)
    })
    }
    else if(req.query.type === 'studentProfilePic'){
        console.log('Image uplaoding')
        imageUpload(req, res, function (err) {
            if (err instanceof multer.MulterError) {
                console.log('error',err)
                return res.status(500).json(err)
            } else if (err) {
               console.log('error',err)
                return res.status(500).json(err)
            }
       console.log('response',req.file)
       return res.status(200).send(req.file)
    })
 }
 else if(req.query.type === 'companyProfilePic'){
    console.log('Image uplaoding')
    companyImageUpload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            console.log('error',err)
            return res.status(500).json(err)
        } else if (err) {
           console.log('error',err)
            return res.status(500).json(err)
        }
   console.log('response',res.file)
   return res.status(200).send(req.file)
 })
 }
 })

 app.get("/file/:name", (req, res) => {
    const name = req.params.name;
    console.log("/file req.params: " + JSON.stringify(req.params));
    const path = __dirname + "/HandshakeFiles/" + req.query.role + "/" + name;
    console.log("/PATHHH" + path);
    try {
      if (fs.existsSync(path)) {
        res.sendFile(path);
      } else {
        res.status(400);
        res.statusMessage("Not Found");
        res.end();
      }
    } catch (err) {
      res.status(500);
      console.log("/file/:name error: " + err);
      res.end();
    }
  });