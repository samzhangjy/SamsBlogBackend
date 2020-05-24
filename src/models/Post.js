// const Sequelize = require('sequelize')
const User = require('./User')
console.log(User.name)

module.exports = (sequelize, DataTypes) => {
  // class Post extends Sequelize.Model {  }
  const Post = sequelize.define('Post', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    HTMLContent: {
      type: DataTypes.TEXT
    },
    MarkdownContent: {
      type: DataTypes.TEXT
    },
    description: {
      type: DataTypes.TEXT
    },
    imageURL: {
      type: DataTypes.TEXT
    }
  })
  Post.associate = (models) => {
    Post.belongsTo(models.User, {  as: 'author'  })
    Post.belongsToMany(models.Tag, { through: 'TagPost', foreignKey: 'postId' })
  }
  // Post.belongsTo(models.User, {as: 'author'})

  return Post
}
