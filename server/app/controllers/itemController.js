var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/categories/:category/items', function (req, res, next) {
    db.Item.findAll({categoryId:req.params.category}).then(function (items) {
        res.json(items);
    }).
    error(function(err){
         res.json({status:"error",message:err.name});
    });
});

router.get('/items', function (req, res, next) {
    db.Item.findAll().then(function (items) {
        res.json({"items":items});
    }).
    error(function(err){
         res.json({status:"error",message:err.name});
    });
});

router.get('/items/:item',function(req,res,next){
    db.Item.find({where:{id:req.params.item}}).then(function(item){
        if(item){
            res.json(item);
        } else{
            res.json({error:"No such records"});
        }
    }).
    error(function(err){
        res.json({status:"error",message:err.name});
    });
});

router.put('/items/:item',function(req,res,next){
    db.Item.update(
            {
                name:req.body.name,
                price:req.body.price,
                veg_flag:req.body.veg_flag,
                categoryId:req.body.categoryId
            },
            {
                where:
                    {
                        id:req.params.item,
                        deleted_at:null
                    }
            }).
    then(function(data){
        if(data[0] == 1){
            res.json({status:"success",message:"Successfully updated the item",result:data});
        }
        else{
           res.json({status:"error",message:"No such records"});
        }
    }).
    error(function(err){
        res.json({status:"error",message:err.name});
    });
});

router.post('/items',function(req,res,next){
    db.Item.create(
        {
            name:req.body.name,
            price:req.body.price,
            veg_flag:req.body.veg_flag,
            categoryId:req.body.categoryId
        }
    ).
    then(function(data){
        if(data){
            res.json({status:"success",message:"Successfully updated the item",result:data});
        } else {
            res.json({status:"error",message:"No such records"});
        }

    }).
    error(function(err){
            res.json({status:"error",message:err.name});
    });
});

router.delete('/items/:item',function(req,res,next){
    db.Item.find({where:{id:req.params.item}}).then(function(data){
        if(data) {
            data.destroy().then(function(){
                res.json({status:"success",message:"Successfully deleted the Item",result:""});
            });
        }
        else{
             res.json({status:"error",message:"No such records"});
        }

    }).
    error(function(err){
        res.json({status:"error",message:err.name});
    });
});




