var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/items/:item/ratings', function (req, res, next) {
    db.Rating.findAll({where:{itemId:req.params.item}}).then(function (ratings) {
        res.json(ratings);
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get('/ratings/:rating',function(req,res,next){
    db.Rating.find({id:req.params.rating}).then(function(rating){
        if(rating){
            res.json(rating);
        } else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/items/:item/ratings/:rating',function(req,res,next){
    db.Rating.update(
        {
            url:req.body.url,
            caption:req.body.caption
        },
        {
            where:
            {
                id:req.params.rating,
                deleted_at:null,
                itemId:req.params.item
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

router.post('/ratings',function(req,res,next){
    db.Rating.create(
        {
            rating:req.body.rating,
            itemId:req.body.itemId,
            userId:req.body.userId
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

router.delete('/ratings/:rating',function(req,res,next){
    db.Rating.find({id:req.params.rating}).then(function(data){
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




