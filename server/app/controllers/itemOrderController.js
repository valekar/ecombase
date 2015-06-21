var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/orders/:order/items/:item/itemOrders', function (req, res, next) {
    db.ItemOrder.findAll({itemId:req.params.item,orderId:req.params.order}).then(function (itemOrders) {
        res.json(itemOrders);
    }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.get('/itemOrders/:itemOrder',function(req,res,next){
    db.ItemOrder.find({id:req.params.itemOrder}).then(function(itemOrder){
        if(itemOrder){
            res.json(itemOrder);
        } else{
            res.json({error:"No such records"});
        }
    }).
        error(function(err){
            res.json({error:err.name});
        });
});

router.put('/orders/:order/items/:item/itemOrders/:itemOrder',function(req,res,next){
    db.ItemOrder.update(
        {
            item_price:req.body.item_price,
            quantity:req.body.quantity

        },
        {
            where:
            {
                id:req.params.itemOrder,
                deleted_at:null,
                itemId:req.params.item,
                orderId:req.params.order
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

router.post('/itemOrders',function(req,res,next){
    db.ItemOrder.create(
        {
            item_price:req.body.item_price,
            quantity:req.body.quantity,
            itemId:req.body.itemId,
            orderId:req.body.orderId
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

router.delete('/itemOrders/:itemOrder',function(req,res,next){
    db.ItemOrder.find({id:req.params.itemOrder}).then(function(data){
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




