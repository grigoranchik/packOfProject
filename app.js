var fs = require('fs');
var rimraf = require('rimraf');
var bodyParser = require("body-parser");
var express = require('express');
var path = require('path');
var app = express();

var urlencodedParser = bodyParser.urlencoded({extended: false});
app.use(bodyParser.json());


app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

});

app.get('/controllers/:id', function (req, res) {
    res.sendFile(path.join(__dirname + '/controllers/' + req.params.id));
    //res.sendFile(path.join(__dirname + '/index.html'));
});

app.post('/del', function (req, res) {
    //req.body.newPathDel
    if(req.body.typeOfFile == 'file'){
        fs.stat(req.body.newPathDel, function (err, stats) {
            if (err) {
                res.send('file no deleted');
                return console.error(err);
            }

            fs.unlink(req.body.newPathDel,function(err){
                if(err) return console.log(err);
                console.log('file deleted successfully');
                res.end('file deleted successfully');
            });
        });
    } else {
        if (req.body.typeOfFile == 'folder'){
            rimraf(req.body.newPathDel, function () {
                res.end('file deleted successfully');
                console.log('file deleted successfully');
            });
        } else {
            console.log('no access to delete file');
            res.end('file deleted successfully');
        }
    }


})

app.post('/send_path', function (req, res) {
    function objectSend(nameOfFile, characteristic) {
        this.nameOfFile = nameOfFile;
        this.characteristic = characteristic;
    };
    // var objectSend = new objectSEnd((massOfFiles, which_of_tables);
    var massOfTypeFiles=[];

    fs.readdir(req.body.newPath, function(err, items) {
        var strPath = '';
        if(req.body.newPath == 'C://'){
            strPath = req.body.newPath;
        } else{
            strPath = req.body.newPath +'//';
        }
        //console.log('strPath=', strPath,'items[0]=', items[0]);
        if (items != undefined){

            var i =0;
            var recFunc = function () {
                if(i<items.length){
                    fs.stat(strPath + items[i], function(err, stats) {
                        if(stats == undefined){
                            massOfTypeFiles[i] = new objectSend(items[i], 'undefined');
                        } else{
                            if(stats.isFile() == true){
                                massOfTypeFiles[i] = new objectSend(items[i], 'file');
                            } else{
                                massOfTypeFiles[i] = new objectSend(items[i], 'folder');
                            }

                        }
                        i++;
                        recFunc();
                    });
                } else{
                    res.send({newPath: items, massOfTypeFiles: massOfTypeFiles});
                    return 0;
                }

            }
            recFunc();
            //massSend.join('/n');

        } else {
            var it = [];    //если папка пустая оправляем пустой массив
            res.send(it);
        }
    });

});

app.listen(3000);


