module.exports = function(sequelize, DataTypes) {
    var Users = sequelize.define("Users", {
        username: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true, //username must be unique
            validate: {
                len: [1] //at least 1 letter for the charity name
            }
        },
        passwd: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,500] //at least 1 length, but up to 500
            }
        },
        first_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,500] //at least 1 length, but up to 500
            }
        },
        last_name: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1,500] //at least 1 length, but up to 500
            }
        }, 
    }, {
        timestamps: false
    });
    Users.associate = function(models) {
        Users.hasMany(models.Charity, {
            onDelete: 'cascade'
        });
    };

    return Users;
};