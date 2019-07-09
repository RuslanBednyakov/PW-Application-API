export default function (sequelize, DataTypes){

  const Transaction = sequelize.define('Transaction', {
    date: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    amount: DataTypes.BIGINT,
    sender_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    sender_result_balance: DataTypes.BIGINT,
    recipient_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    recipient_result_balance: DataTypes.BIGINT,
  },
  {
    underscored: true,
    tableName: 'transactions',
    timestamps: false
  })
  
  Transaction.associate = function (models) {

    models.Transaction.belongsTo(models.User, {
      foreignKey: 'sender_id',
      as: 'UserSender',
      targetKey: 'id'
    });

    models.Transaction.belongsTo(models.User, {
      foreignKey: 'recipient_id',
      as: 'UserRecipient',
      targetKey: 'id'
    });
  };

    return Transaction;
  }