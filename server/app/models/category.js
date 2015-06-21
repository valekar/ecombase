module.exports = function (sequelize, DataTypes) {

    var Category = sequelize.define('Category', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING,
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
               Category.hasMany(models.Item,{foreignKey: 'categoryId'});
                // Article.hasMany(models.Comments);
            }
        }
    });

    return Category;
};



