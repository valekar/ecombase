module.exports = function (sequelize, DataTypes) {

    var Cart = sequelize.define('Cart', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        quantity:DataTypes.INTEGER ,
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
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
                Cart.belongsTo(models.User,{foreignKey: 'userId'});
                Cart.belongsTo(models.Item,{foreignKey: 'itemId'});
                // Article.hasMany(models.Comments);
            }
        }
    });




    return Cart;
};