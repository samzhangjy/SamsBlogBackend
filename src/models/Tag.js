// const Sequelize = require('sequelize')
// console.log(User.name)

module.exports = (sequelize, DataTypes) => {
  const Tag = sequelize.define('Tag', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING,
      unique: true
    }
  })
  Tag.associate = (models) => {
    Tag.belongsToMany(models.Post, { through: 'TagPost', foreignKey: 'tagId' })
  }

  return Tag
}
