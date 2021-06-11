"use strict";

const multer = require("multer");

var response = require("./res");
var connection = require("./conn");

exports.ImgDesc = function (req, res) {
    var name = req.body.name;
    var filepath = req.file.path;
  
    connection.query(
      "INSERT INTO file (name , filepath) VALUES (? , ?)",
      [name, filepath],
      function (error, rows, fields) {
        error ? console.log(error) : response.ok("Upload Success!!", res);
      }
    );
  };

const storage = multer.diskStorage({
    destination: function (req , file , cb){
        cb(null , './uploads');
    },
    filename: function(req , file , cb){
        cb(null , file.originalname);
    }
});

exports.uploadimage = multer({storage:storage}).single('image');

