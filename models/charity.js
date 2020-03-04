module.exports = function(sequelize, DataTypes) {
    var Charity = sequelize.define("Charity", {
        title: {
            type: DataTypes.STRING,
            allowNull: false,
            validate: {
                len: [1] //at least 1 letter for the charity name
            }
        },
        descript: {
            type: DataTypes.TEXT,
            allowNull: false,
            validate: {
                len: [1,500] //at least 1 length, but up to 500
            }
        },
        goal: {
            type: DataTypes.DECIMAL(10, 2), //length 10 and 2 decimal places
            allowNull: false,
            validate: {
                min: 10.00,
                max: 1000000.00
            }
        }
    }, {
        timestamps: false
    })
    Charity.associate = function(models) {
        Charity.belongsTo(models.Users, {
            foreignKey: {
                allowNull: true
            }
        });
    };

    return Charity;
};