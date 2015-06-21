
module.exports = function (sequelize, DataTypes) {

    var User = sequelize.define('User', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        name:DataTypes.STRING,
        password:DataTypes.STRING,
        uid:DataTypes.STRING,
        token:DataTypes.STRING,
        admin:DataTypes.BOOLEAN,
        userType:DataTypes.STRING,
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
              User.hasMany(models.Cart, {foreignKey: 'userId'});
                User.hasMany(models.Rating, {foreignKey: 'userId'});
                // Article.hasMany(models.Comments);
            }
        }
    });
    return User;
};
