const { Link } = require('../models')
const config = require('../config/config')

module.exports = {
  async addLink (req, res) {
    try {
      const { name, description, URL } = req.body
      const link = {
        name: name,
        description: description,
        URL: URL
      }
      const createdLink = await Link.create(link, { returning: true })
      res.send({
        message: '链接添加成功'
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '添加失败'
      })
    }
  },
  async getAllLinks (req, res) {
    try {
      const allLinks = await Link.findAll({
        order: [
          ['createdAt', 'DESC']
        ]
      })
      res.send({
        data: allLinks
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '获取失败'
      })
    }
  },
  async getLink (req, res) {
    try {
      const linkId = req.params.linkId
      const link = await Link.findOne({
        where: {
          id: linkId
        }
      })
      res.send({
        data: link
      })
    } catch (err) {
      res.status(500).send({
        error: '获取失败'
      })
    }
  },
  async editLink (req, res) {
    try {
      const { name, description, URL } = req.body
      const linkId = req.params.linkId
      await Link.findOne({
        where: {
          id: linkId
        }
      }).then((value) => {
        if (value) {
          value.name = name
          value.description = description
          value.URL = URL
          value.save()
        }
        res.send({
          message: '更新成功'
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '更改失败'
      })
    }
  },
  async deleteLink (req, res) {
    try {
      const linkId = req.params.linkId
      await Link.findOne({
        where: {
          id: linkId
        }
      }).then((value) => {
        value.destroy()
        res.send({
          message: '删除成功'
        })
      })
    } catch (err) {
      res.status(500).send({
        error: '删除失败'
      })
    }
  }
}
