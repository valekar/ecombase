var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
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




