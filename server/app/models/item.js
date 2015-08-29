module.exports = function (sequelize, DataTypes) {
    var Item = sequelize.define('Item', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        price:DataTypes.INTEGER,
        veg_flag:DataTypes.BOOLEAN,
        name:DataTypes.STRING,
		//url:DataTypes.STRING,
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
              Item.belongsTo(models.Category,{foreignKey: 'categoryId'});
                Item.hasMany(models.Cart,{foreignKey: 'itemId'});
                Item.hasMany(models.ItemOrder,{foreignKey: 'itemId'});
                Item.hasMany(models.Rating,{foreignKey: 'itemId'});
            }
        }
    });
    return Item;
};