
module.exports = function (sequelize, DataTypes) {

    var UserDetail = sequelize.define('UserDetail', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        address:DataTypes.STRING,
        contact:DataTypes.INTEGER,
        location:DataTypes.STRING,
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
        timestamps: true,
        paranoid: true,
        underscored: true,
        freezeTableName: true,
        classMethods: {
            associate: function (models) {
               UserDetail.belongsTo(models.User, {foreignKey: 'userId'});
            }
        }
    });
    return UserDetail;
};