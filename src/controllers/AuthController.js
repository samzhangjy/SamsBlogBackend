const { User } = require('../models')
const jwt = require('jsonwebtoken')
const config = require('../config/config')

function jwtSignIn (user) {
  const ONE_WEEK = 60 * 60 * 24 * 7
  return jwt.sign(user, config.auth.jwtSecret, {
    expiresIn: ONE_WEEK
  })
}

module.exports = {
  async login (req, res) {
    try {
      const { username, password } = req.body
      const user = await User.findOne({
        where: {
          username: username
        }
      })
      console.log(req.user)
      if (!user) {
        res.status(403).send({
          error: '用户不存在'
        })
      }
      console.log(user.password)
      const isPasswordIsValid = await User.prototype.comparePassword(password, user)
      if (!isPasswordIsValid) {
        return res.status(403).send({
          error: '用户名或密码错误'
        })
      }
      const userJson = user.toJSON()
      res.send({
        user: userJson,
        token: jwtSignIn(userJson)
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '登录失败'
      })
    }
  },
  loginRemember (req, res) {
    try {
      const { token } = req.body
      try {
        var decoded = jwt.verify(token, config.auth.jwtSecret)
        res.send({
          decoded: decoded
        })
      } catch (error) {
        res.status(400).send({
          error: '令牌无效'
        })
      }
    } catch (err) {
      res.status(500).send({
        error: '登录失败'
      })
    }
  },
  async resetPassword (req, res) {
    try {
      const { username, password } = req.body
      var user = await User.findOne({
        where: {
          username: username
        }
      })
      user.setDataValue('password', password)
      User.prototype.hashPassword(user)
      user = await User.findOne({
        where: {
          username: username
        }
      })
      res.send({
        data: user
      })
    } catch (err) {
      console.log(err)
      res.status(500).send({
        error: '登录失败'
      })
    }
  }
}
