const { Post, Tag } = require('../models')

module.exports = {
  async getAllTags (req, res) {
    try {
      const allTags = await Tag.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        include: [{
          model: Post
        }]
      }).then((value) => {
        res.send({
          data: value
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '获取失败'
      })
    }
  },
  async getTag (req, res) {
    try {
      const name = req.params.name
      const allTags = await Tag.findOne({
        where: {
          name: name
        },
        include: [{
          model: Post,
          include: { model: Tag }
        }]
      }).then((value) => {
        res.send({
          data: value
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '获取失败'
      })
    }
  }
}
