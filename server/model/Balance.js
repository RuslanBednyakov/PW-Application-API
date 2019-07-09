export default function (sequelize, DataTypes){

  const Balance = sequelize.define('Balance', {
    user_id: {
      type: DataTypes.BIGINT,
      references: {
        model: 'users',
        key: 'id'
      }
    },
    balance: {
      type: DataTypes.BIGINT
    }
  },
  {
    underscored: true,
    tableName: 'balance',
    timestamps: false
  })

  Balance.associate = function (models) {

    models.Balance.belongsTo(models.User, {
      onDelete: "CASCADE"
    });
  };
  
  return Balance;
}