var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/orders', function (req, res, next) {
    db.Order.findAll().then(function (orders) {
        res.json(orders);
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get('/users/:user/orders/:order',function(req,res,next){
    db.Order.find({id:req.params.order,userId:req.params.user}).then(function(order){
        if(order){
            res.json(order);
        } else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/users/:user/orders/:order',function(req,res,next){
    db.Order.update(
        {
            active:req.body.active
        },
        {
            where:
            {
                id:req.params.order,
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

router.post('/orders',function(req,res,next){
    db.Order.create(
        {
           active:req.body.active,
           userDetailId:req.body.userDetailId,
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

router.delete('/orders/:order',function(req,res,next){
    db.Order.find({id:req.params.order}).then(function(data){
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




