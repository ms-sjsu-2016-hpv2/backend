var express = require('express');
var router = express.Router();
var request = require('request');
var contants=require('./app_constants');

router.get('/start', function(req, res, next) {

  console.log("Directory name is"+__dirname);




request(
    {
        url : 'https://api.resin.io/v1/device',
        headers : {
        	"Content-Type" : 'application/json',
            "Authorization" : 'Bearer '+contants.TOKEN
        },
        json: true,
    },
    function (error, response, body) {
        // Do more stuff with 'body' here


      //console.log(body.d);
        res.render('start', { title: 'IOT Dashboard', device_list:body.d});
    }
);






 
});


router.get('/register_device', function(req, res, next) {

res.render('register_device');

});


router.get('/setup_device/:device_id', function(req, res, next) {


request(
    {
        url : 'https://api.resin.io/resin/device('+req.params.device_id+')',
        headers : {
        	"Content-Type" : 'application/json',
            "Authorization" : 'Bearer '+contants.TOKEN
        },
        json: true,
    },
    function (error, response, body) {
        // Do more stuff with 'body' here


        /*resin.logs.subscribe(body.d[0].uuid, function(error, logs) {  
            if (error) throw error;

            logs.on('line', function(line) {
                console.log(line);
            });
        });*/


      //console.log(body.d);
        res.render('setup_device', { title: 'IOT Dashboard', device_details:body.d[0]});
    }
);







});



router.get('/get_device_logs', function(req, res, next) {



});


router.get('/app_login', function(req, res, next) {

res.render('login');

});


router.get('/start_deployment/:device_uuid', function(req, res, next) {

var device_object=new Object();

//device_object.name=req.params.device_name;
device_object.uuid=req.params.device_uuid;

//res.render('deploy_app');
res.render('deploy_app',{device_object:device_object});

});






router.post('/validate_user', function(req, res, next) {

    

    var user_name=req.body.user_name;
    var user_password=req.body.user_password;

    if(user_name.trim()=="abc" && user_password.trim()=="abc"){


    res.redirect('/start');

    }else{

        res.render('login');
    }



});


router.post('/deploy_mydevice', function(req, res, next) {

    var device_uuid_h=req.body.device_uuid_h;
    var sensor_type=req.body.sensor_type;

    console.log("Device ID "+device_uuid_h+" Sensor Type "+sensor_type);


});




module.exports = router;
