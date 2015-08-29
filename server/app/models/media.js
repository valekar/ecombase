module.exports = function (sequelize, DataTypes) {
    var Media = sequelize.define('Media', {
        id:{
            type:DataTypes.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        url:DataTypes.STRING,
        caption:DataTypes.STRING,
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
        freezeTableName: true
    });

    //  Item.belongsTo(Category);


    return Media;
};