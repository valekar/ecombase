module.exports = function (sequelize, DataTypes) {
    var ItemDiscount = sequelize.define('ItemDiscount', {

       discount:DataTypes.INTEGER,
        timings:DataTypes.TIME,
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
              ItemDiscount.belongsTo(models.Item,{foreignKey:"itemId"});
                // Article.hasMany(models.Comments);
            }
        }
    });

    //  Item.belongsTo(Category);


    return ItemDiscount;
};