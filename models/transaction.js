module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        amount: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: false,
            validate: {
                min: 1.00
            }
        }
    },
    {
        timestamps: false
    });
    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Charity, {
            foreignKey: {
                allowNull: false
            }
        });
        Transaction.belongsTo(models.Users, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Transaction;
};