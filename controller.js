"use strict";

var response = require("./res");
var connection = require("./conn");

const multer = require("multer");

exports.users = function (req, res) {
  connection.query("SELECT * FROM user", function (error, rows, fields) {
    if (error) {
      console.log(error);
    } else {
      response.ok(rows, res);
    }
  });
};

exports.index = function (req, res) {
  response.ok("conn success", res);
};

exports.findUsers = function (req, res) {
  var user_id = req.params.user_id;

  connection.query(
    "SELECT*FROM user WHERE id=?",
    [user_id],
    function (error, rows, fields) {
      error ? console.log(error) : response.ok(rows, res);
    }
  );
};

exports.createUsers = function (req, res) {
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;

  connection.query(
    "INSERT INTO user (first_name,last_name) VALUES (?,?)",
    [first_name, last_name],
    function (error, rows, fields) {
      error ? console.log(error) : response.ok("user insert success!!", res);
    }
  );
};

exports.updateUsers = function (req, res) {
  var user_id = req.body.user_id;
  var first_name = req.body.first_name;
  var last_name = req.body.last_name;

  connection.query(
    "UPDATE user SET first_name=?,last_name=? WHERE id = ?",
    [first_name, last_name, user_id],
    function (error, rows, fields) {
      error ? console.log(error) : response.ok("user update success!!", res);
    }
  );
};

exports.deleteUsers = function (req, res) {
  var user_id = req.body.user_id;
  connection.query(
    "DELETE FROM user WHERE id=?",
    [user_id],
    function (error, rows, fields) {
      error ? console.log(error) : response.ok("delete user success!!", res);
    }
  );
};

exports.ImgDesc = function (req, res) {
  if (!req.file) {
    return res.send("No File Uploaded");
  } else {
    var name = req.body.name;
    var filepath = req.file.path;

    connection.query(
      "INSERT INTO file (name , filepath) VALUES (? , ?)",
      [name, filepath],
      function (error, rows, fields) {
        error ? console.log(error) : response.ok("Upload Success!!", res);
      }
    );
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});

exports.uploadimage = multer({ storage: storage }).single("image");
