module.exports = (sequelize, DataTypes) => {
  const TagPost = sequelize.define('TagPost', {
    tagId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Tag',
        key: 'id'
      }
    },
    postId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Post',
        key: 'id'
      }
    }
  })
  TagPost.associate = (models) => { }

  return TagPost
}
