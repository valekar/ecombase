var express = require('express'),
    router = express.Router(),
    db = require('../models/index'),
    path = require('path');
module.exports = function (app) {
    app.use('/api', router);
};

router.get('/carts', function (req, res, next) {
    db.Cart.findAll().then(function (carts) {
        res.json(carts);
    }).error(function(err){
        res.json({error:err.name});
    });
});

router.get('/users/:user/carts/:cart',function(req,res,next){
    db.Cart.find({id:req.params.cart,userId:req.params.user}).then(function(cart){
        if(cart){
            res.json(cart);
        } else{
            res.json({error:"No such records"});
        }

    }).error(function(err){
        res.json({error:err.name});
    });
});

router.put('/users/:user/carts/:cart',function(req,res,next){
    db.Cart.update({quantity:req.body.quantity},{where:{id:req.params.cart,deleted_at:null,userId:req.params.user}}).then(function(data){
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

router.post('/carts',function(req,res,next){
    db.Cart.create(
        {
            quantity:req.body.quantity,
            userId:req.body.userId,
            itemId:req.body.itemId
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

router.delete('/users/:user/carts/:cart',function(req,res,next){
    db.Cart.find({id:req.params.category,userId:req.params.user}).then(function(data){
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




