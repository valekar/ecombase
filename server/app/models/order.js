module.exports = function (sequelize, DataTypes) {
    var Order = sequelize.define('Order', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        active:DataTypes.BOOLEAN,
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
                Order.belongsTo(models.UserDetail,{foreignKey: 'userDetailId'});
                Order.belongsTo(models.User,{foreignKey: 'userId'});
                // Article.hasMany(models.Comments);
            }
        }
    });

    return Order;
};