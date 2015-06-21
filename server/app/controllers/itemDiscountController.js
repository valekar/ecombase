var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/items/:item/itemDiscounts', function (req, res, next) {
    db.ItemDiscount.findAll({itemId:req.params.item}).then(function (itemDiscounts) {
        res.json(itemDiscounts);
    }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.get('/itemDiscounts/:itemDiscount',function(req,res,next){
    db.ItemDiscount.find({id:req.params.itemDiscount}).then(function(itemDiscount){
        if(itemDiscount){
            res.json(itemDiscount);
        } else{
            res.json({error:"No such records"});
        }
    }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.put('/items/:item/itemDiscount/:itemDiscount',function(req,res,next){
    db.ItemDiscount.update(
        {
            discount:req.body.discount,
            timings:req.body.timings

        },
        {
            where:
            {
                id:req.params.itemDiscount,
                deleted_at:null,
                itemId:req.params.item
            }
        }).
        then(function(data){
            if(data[0] == 1){
                res.json({message:"successfully updated"});
            }
            else{
                res.json({error:"No such records"});
            }
        }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.post('/itemDiscounts',function(req,res,next){
    db.ItemDiscount.create(
        {
            discount:req.body.discount,
            timings:req.body.timings,
            itemId:req.body.itemId
        }
    ).
        then(function(data){
            if(data){
                res.json(data);
            } else {
                res.json({error:"No such records"});
            }

        }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.delete('/itemDiscounts/:itemDiscount',function(req,res,next){
    db.ItemDiscount.find({id:req.params.itemDiscount}).then(function(data){
        if(data) {
            data.destroy().then(function(){
                res.json({message:"Deleted successfully"});
            });
        }
        else{
            res.json({error:"No such records"});
        }

    }).
        error(function(err){
            res.json({error:err.name});
        });
});




