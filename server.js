// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


// your first API endpoint... 
app.get("/api/hello", function (req, res) {
  res.json({greeting: 'hello API'});
});


// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on portttt http://localhost:' + listener.address().port);
});

///////////////////////////////////////////////////////

// How it's done:
// var paramAsobject = {};
// app.get('/api/:newparam', function(req, res) 
// {
//   paramAsobject = {"echo": req.params.newparam};
//   res.json(paramAsobject);
// });


var returobj = {};



app.get('/api/:newparamstring', function(req, res) 
{

  function returnIt(dateObj)
  {
    //var datestring = dateObj.toString(); // gives date as nice date formatted String
    //var subdatestring = datestring.substring(0, datestring.length - 27); // chop 27 chars to get desired format
    datestringformatted = dateObj.toUTCString();

    var unixtime = (dateObj.getTime()); // gettime() returns js timestamp  (should actually divide this by 1000 to make it real unix time, but the project description wants milliseconds included... which is actually JS
    returobj = { "unix": unixtime, "utc": datestringformatted };
    res.json(returobj);
  }

  //returobj = {"echo": typeof req.params.newparamstring};
  //console.log(typeof req.params.newparamstring);

  if (!req.params.newparamstring)
  {
    console.log(555, "empty");
    returnIt(new Date());
  }

  var dateObj;
  dateObj = new Date(req.params.newparamstring); // returns a Date object if valid, or a string literal "Invalid Date" if invalid
  if (dateObj.toString() === "Invalid Date") 
  {
    // Check if it's a unix timstamp (ie AN INTEGER) - so convert to int then check again. 
    // If still invalid - it's either an invalid unix timestamp or just an invalid date in general
    
    var paramstringasint = parseInt(req.params.newparamstring);
    dateObj = new Date(paramstringasint);
    if (dateObj.toString() === "Invalid Date")
    {
      returobj = { "error" : "Invalid Date" }
      res.json(returobj);
      console.log(444, "invalid date");
    }
    else
    {
      console.log(888, "unix integer date");
      returnIt(dateObj);
    }
  }
  else
  {
    console.log(999, "normal string date");
    returnIt(dateObj);
  }

  console.log(dateObj);
 // res.send("sdfsfd");
});



// JS time is the same as UNIX epoch time, it just has miliseconds.
// so you simply multiply or divide by 1000 to convert between them (the milisecods will obviouly be 0's if going from Unix to JS)
// you can use new Date() to create a Date object from a UNIX or JS timestamps integers and literal date strings

// "2015-12-25"
// OR
// 1451001600000 (as an integer)

// you can then use .toString() to see if the Date object has created a valid date/time (it will be a literal string "Invalid Date" if not valid)
// you can use .getTime() on a Date object to get it as a JS timestamp (which can be converted to UNIX by dividing by 1000)

// *** Pitfall: if you have a date before January 1, 1970 your timestamp will be a negative number but also a valid timestamp.
// To cover this implement function: isNumeric(n) {return !isNaN(parseFloat(n)) && isFinite(n);}
// from: https://stackoverflow.com/questions/12422918/how-to-validate-timestamp-in-javascript/12423012


// var input = 1451001600000;

// // if input === NULL return current date

// var dateobj = new Date(input); // returns a Date object if valid or a string literal "Invalid Date"
// if (dateobj === "Invalid Date"){console.log("nope");} 
// // res.send { error : "Invalid Date" }


// var datestring = dateobj.toString(); // gives date as nice date formatted String
// var subdatestring = datestring.substring(0, datestring.length - 27); // chop 27 chars to get desired format
// var unixtime = (dateobj.getTime() / 1000); // gettime returns js timestamp, divide by 1000 to make unix time
// // res.send { unix: unixtime, utc: subdatestring }

// console.log(subdatestring);
// console.log(111, unixtime); 
















// do i really need to check twice...
// if (valid.toString() === "Invalid Date")
// {
//   console.log("invalid");
// }


// var unixTimestamp = 62678980
// var date = new Date(unixTimestamp*1000);
// console.log("Unix Timestamp:",unixTimestamp)
// console.log("Date Timestamp:",date.getTime())



// var valid = (new Date('2012-08-09')).getTime() > 0; // true
// var valid = (new Date('abc')).getTime() > 0; // false

//{ error : "Invalid Date" }
//console.log(blah);

// var unixTimestamp = 62678980
// var date = new Date(unixTimestamp*1000);
// console.log("Unix Timestamp:",unixTimestamp)
// console.log("Date Timestamp:",date.getTime())
// console.log(date)
// console.log("Date: "+date.getDate()+
//           "/"+(date.getMonth()+1)+
//           "/"+date.getFullYear()+
//           " "+date.getHours()+
//           ":"+date.getMinutes()+
//           ":"+date.getSeconds());
