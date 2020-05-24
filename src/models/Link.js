module.exports = (sequelize, DataTypes) => {
  const Link = sequelize.define('Link', {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.TEXT
    },
    URL: {
      type: DataTypes.TEXT
    }
  })
  Link.associate = (models) => { }

  return Link
}
