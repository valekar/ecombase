var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};


router.get('/users/:user/userDetails/:userDetail',function(req,res,next){
    db.UserDetail.find({id:req.params.userDetail,userId:user}).then(function(userDetail){
        if(userDetail){
            res.json(userDetail);
        } else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/users/:user/userDetails/:userDetail',function(req,res,next){
    db.UserDetail.update(
        {
            address:req.body.address,
            contact:req.body.contact,
            location:req.body.location
        },
        {
            where:
            {
                id:req.params.userDetail,
                deleted_at:null,
                userId:req.params.user
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

router.post('/userDetails',function(req,res,next){
    db.UserDetail.create(
        {
            address:req.body.address,
            contact:req.body.contact,
            location:req.body.location,
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






