// this routing conf is used to serve the front end HTML files

var express = require('express'),
    router = express.Router(),
    path = require('path');

module.exports = function (app) {
    app.use('/', router);
    app.use(function(req, res) {
        // Use res.sendfile, as it streams instead of reading the file into memory.
        res.sendFile(path.join(__dirname,'/index.html'));
    });
}



// serve index and view partials
/*
router.get("*",function(req,res){
    res.sendFile(path.join(__dirname,'/index.html'));
});
*/


/*
// serve index and view partials
router.get("/:filename",function(req,res){
    res.sendFile(path.join(__dirname,'/app/views/'+req.params.filename));
});*/
