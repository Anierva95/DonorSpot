module.exports = function(sequelize, DataTypes) {
    var Transaction = sequelize.define("Transaction", {
        amount: {
            type: DataTypes.DECIMAL (10,2),
            allowNull: false,
            validate: {
                min: 1.00
            }
        }
    });

    Transaction.associate = function(models) {
        Transaction.belongsTo(models.Charity, {
            foreignKey: {
                allowNull: false
            }
        });
    };
    return Transaction;
};