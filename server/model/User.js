export default function (sequelize, DataTypes) {

  const User =  sequelize.define('User', {
    name: DataTypes.STRING,
    email:{
      type: DataTypes.STRING,
      field: 'email'
    },
    password:{
      type: DataTypes.STRING,
      field: 'password'
    },
  }, {
    underscored: true,
    tableName: 'users',
    timestamps: false
  })


  User.associate = function (models) {

    models.User.hasOne(models.Balance, {
      as: 'UserBalance',
      foreignKey: 'user_id',
      onDelete: "CASCADE",
    });
    models.User.hasMany(models.Transaction, {
      as: 'UserSender',
      foreignKey: 'sender_id',
      onDelete: "CASCADE",
      sourceKey: 'id'
    });
    models.User.hasMany(models.Transaction, {
      as: 'UserRecipient',
      foreignKey: 'recipient_id',
      onDelete: "CASCADE",
      sourceKey: 'id'
    });
  };
  
  return User;
  }