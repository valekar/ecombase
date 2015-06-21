module.exports = function (sequelize, DataTypes) {
    var ItemOrder = sequelize.define('ItemOrder', {
        item_price:DataTypes.INTEGER,
        quantity:DataTypes.INTEGER,
        created_at: {
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        },
        updated_at: {
            type: DataTypes.DATE
        },
        deleted_at:{
            type: DataTypes.DATE
        },
        timestamps:{
            type: DataTypes.DATE,
            defaultValue: sequelize.fn('NOW')
        }
    },{
        timestamps: false,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                ItemOrder.belongsTo(models.Item,{foreignKey: 'itemId'});
                ItemOrder.belongsTo(models.Order,{foreignKey: 'orderId'});
                // Article.hasMany(models.Comments);
            }
        }
    });

    //  Item.belongsTo(Category);


    return ItemOrder;
};