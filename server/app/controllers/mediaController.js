var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path'), 
	util = require('util'),
  fs   = require('fs-extra'),
 formidable = require('formidable');
  
	
	
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/medias', function (req, res, next) {
    db.Media.findAll().then(function (medias) {
        res.json(medias);
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get('/medias/:media',function(req,res,next){
    db.Media.find({id:req.params.media}).then(function(media){
        if(media){
            res.json(media);
        } else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/medias/:media',function(req,res,next){
    db.Media.update(
        {
            url:req.body.url,
            caption:req.body.caption
        },
        {
            where:
            {
                id:req.params.media,
                deleted_at:null
            }
        }
    ).then(function(data){
        if(data[0] == 1){
            res.json({message:"successfully updated"});
        }
        else{
            res.json({error:"No such records"});
        }
    }).error(function(err){
        res.json({error:err.name});
    });
});


router.post('/medias/upload', function (req, res){
  console.log("hola");
  var form = new formidable.IncomingForm();
  form.parse(req, function(err, fields, files) {
   // res.writeHead(200, {'content-type': 'text/plain'});
    //res.write('received upload:\n\n');
    //res.end(util.inspect({fields: fields, files: files}));
  });

  form.on('end', function(fields, files) {
    /!* Temporary location of our uploaded file *!/
    var temp_path = this.openedFiles[0].path;
    /!* The file name of the uploaded file *!/
    var file_name = this.openedFiles[0].name;
    /!* Location where we want to copy the uploaded file *!/
    var new_location = path.normalize(__dirname +"../../../../../uploads/");
    console.log(new_location);

    fs.copy(temp_path, new_location + file_name, function(err) {
      if (err) {
        console.error(err);
      } else {
        console.log("success!");
          db.Media.create(
              {
                  url:file_name+"",
				  caption:"dummy"
              }
          ).then(function(data){
                  if(data){
                      res.json(data);
                  } else{
                      res.json({error:"No such records"});
                  }
              }).error(function(err){
                  res.json({error:err.name});
              });
      }
    });
  });
});


router.post('/medias',function(req,res,next){
    db.Media.create(
        {
            url:req.body.url,
            caption:req.body.caption
        }
    ).then(function(data){
        if(data){
            res.json(data);
        } else{
            res.json({error:"No such records"});
        }
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.delete('/medias/:media',function(req,res,next){
    db.Media.find({id:req.params.media}).then(function(data){
        if(data) {
            data.destroy().then(function(){
                res.json({message:"Deleted successfully"});
            });
        }
        else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get("/uploads/:image",function(req,res,next){
	res.sendFile(path.join(__dirname,'../../../../uploads/'+req.params.image));
});






