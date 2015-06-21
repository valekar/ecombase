module.exports = function (sequelize, DataTypes) {
    var Rating = sequelize.define('Rating', {
       rating:DataTypes.INTEGER,
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
               Rating.belongsTo(models.Item,{foreignKey: 'itemId'});
                Rating.belongsTo(models.User,{foreignKey: 'userId'});
                // Article.hasMany(models.Comments);
            }
        }
    });

    return Rating;
};