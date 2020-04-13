var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var morgan = require('morgan');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var router = express.Router();
var appRoutes = require('./app/routes/api')(router);
var path = require('path');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use('/api',appRoutes);

mongoose.set('useCreateIndex', true);
mongoose.connect('mongodb://localhost:27017/tutorial', {useNewUrlParser: true, useUnifiedTopology: true}, function(err){
    if(err){
        console.log('Not Connected to the DB' + err);
    }else{
        console.log('DB Connection Succeed');        
    }
});

app.get('*', function(req, res){
    res.sendFile(path.join(__dirname + '/public/app/views/index.html'));
});

app.listen(port, function(){
    console.log('Running the Server on port ' + port );
});