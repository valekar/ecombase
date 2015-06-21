var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/categories', function (req, res, next) {
    db.Category.findAll().then(function (categories) {
        res.json(categories);
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get('/categories/:category',function(req,res,next){
   db.Category.find({id:req.params.category}).then(function(category){
       if(category){
           res.json(category);
       } else{
           res.json({error:"No such records"});
       }

   }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/categories/:category',function(req,res,next){
    db.Category.update({name:req.body.name},{where:{id:req.params.category,deleted_at:null}}).then(function(data){
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

router.post('/categories',function(req,res,next){
    db.Category.create({name:req.body.name}).then(function(data){
        if(data){
            res.json(data);
        } else{
            res.json({error:"No such records"});
        }


    }).error(function(err){
        res.json({error:err.name});
    });
});

router.delete('/categories/:category',function(req,res,next){
    db.Category.find({id:req.params.category}).then(function(data){
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




