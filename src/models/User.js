// const Sequelize = require('sequelize')
const Promise = require('bluebird')
const bcrypt = Promise.promisifyAll(require('bcrypt-nodejs'))
const Post = require('./Post')

function hashPassword (user) {
  const SALT = 8
  // if (!user.changed('password')) {
  //   return
  // }
  const salt = bcrypt.genSaltSync(SALT)
  bcrypt.hashAsync(user.password, salt, null).then(hash => {
    user.setDataValue('password', hash)
    user.save()
  })
}

module.exports = function (sequelize, DataTypes) {
  // class User extends Sequelize.Model {  }
  var User = sequelize.define('User', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize
  })
  User.addHook('afterCreate', hashPassword)
  // User.addHook('afterUpdate', hashPassword)
  // User.addHook('afterSave', hashPassword)

  User.prototype.comparePassword = function (password, user) {
    return bcrypt.compareAsync(password, user.password)
  }
  User.associate = (models) => {
    User.hasMany(models.Post, { as: 'posts', foreignKey: 'author' })
  }

  User.prototype.hashPassword = hashPassword

  return User
}
