const { User, Post, Tag, TagPost } = require('../models')
const sequelize = require('sequelize')
const config = require('../config/config')

async function addTags (tags) {
  for (var value of tags) {
    try {
      const [tag, created] = await Tag.findOrCreate({
        where: { name: value },
        defaults: {
          name: value
        }
      })
      tag.save()
      if (created) {
        const tag = await Tag.findOne({
          where: {
            name: value
          }
        })
      } else {
        const tag = await Tag.findOne({
          where: {
            name: value
          }
        })
      }
      // console.log(tag)
    } catch (err) {
      console.log(err)
    }
  }
}

module.exports = {
  async addPost (req, res) {
    try {
      const { title, markdownContent, HTMLContent, author, description, imageURL, tags } = req.body
      const authorUser = await User.findOne({
        where: {
          username: author
        }
      })
      addTags(tags).then(async (value) => {
        const post = {
          title: title,
          MarkdownContent: markdownContent,
          HTMLContent: HTMLContent,
          authorId: authorUser.id,
          description: description,
          imageURL: imageURL
        }
        // console.log(tags)
        const createdPost = await Post.create(post, { returning: true })
        tags.forEach(async (item) => {
          const tag = await Tag.findOne({
            where: {
              name: item
            }
          })
          console.log(tag)
          const po = {
            tagId: tag.id,
            postId: createdPost.id
          }

          const savedTagPost = await TagPost.create(po, { returning: true })
        })
        res.send({
          message: '博客添加成功'
        })
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '添加失败'
      })
    }
  },
  async getLatestPosts (req, res) {
    try {
      const allPosts = await Post.findAll({
        limit: 8,
        order: [
          ['createdAt', 'DESC']
        ],
        include: [{
          model: Tag
        }]
      })
      res.send({
        data: allPosts
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '获取失败'
      })
    }
  },
  async getAllPosts (req, res) {
    try {
      const allPosts = await Post.findAll({
        order: [
          ['createdAt', 'DESC']
        ],
        include: [{
          model: Tag
        }]
      })
      res.send({
        data: allPosts
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '获取失败'
      })
    }
  },
  async getPost (req, res) {
    try {
      const postId = req.params.postId
      await Post.findOne({
        where: {
          id: postId
        },
        include: [{
          model: Tag
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
  async searchPost (req, res) {
    try {
      console.log(req.body)
      const { query } = req.body
      await Post.findAll({
        where: {
          [sequelize.Op.or]: {
            MarkdownContent: sequelize.where(sequelize.fn('LOWER', sequelize.col('MarkdownContent')), 'LIKE', '%' + query + '%'),
            title: sequelize.where(sequelize.fn('LOWER', sequelize.col('title')), 'LIKE', '%' + query + '%'),
            description: sequelize.where(sequelize.fn('LOWER', sequelize.col('description')), 'LIKE', '%' + query + '%')
          }
        },
        include: {
          model: Tag
        }
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
  async editPost (req, res) {
    try {
      const { title, markdownContent, HTMLContent, author, description, imageURL, tags } = req.body
      const postId = req.params.postId
      const authorUser = await User.findOne({
        where: {
          username: author
        }
      })
      await Post.findOne({
        where: {
          id: postId
        }
      }).then((value) => {
        if (value) {
          value.title = title
          value.MarkdownContent = markdownContent
          value.HTMLContent = HTMLContent
          value.authorId = authorUser.id
          value.description = description
          value.imageURL = imageURL
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
  async deletePost (req, res) {
    try {
      const postId = req.params.postId
      await Post.findOne({
        where: {
          id: postId
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
