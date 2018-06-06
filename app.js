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

});

// Получить инфо - гет
// /view?fileName=
// /view/fileName
// Изменить ифно - пост

app.get('/view/:fileAbsolutePath', function (req, res) {
    var filePath =  req.params.fileAbsolutePath;

    var options = {

        /*headers: {
            'x-timestamp': Date.now(),
            'x-sent': true,
            'Content-Type': 'image/gif'
        }*/
    };

    res.sendFile(path.join(filePath), options);
});

app.get('/makeNewFile/:fileAbsolutePath/:nameFile', function (req, res) {
    var filePath =  req.params.fileAbsolutePath + req.params.nameFile;
    fs.writeFile(filePath, function(err) {

        if(err) throw err;

        console.log("The file was created!");

    });


    res.end('The file was created!');
});


app.post('/makeNewFolder', function (req, res) {
    fs.mkdir('c:/boot/writeme', function() { //req.body.newPath + '//ru'
        console.log('папка успешно созданна');
        res.end();
    });

    /*var mkdirp = require('mkdirp');
    mkdirp(req.body.newPath + '//ru', function(err) {
        console.log('папка успешно созданна');
        res.end();

    });*/

});


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


