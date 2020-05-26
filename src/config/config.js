module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DATABASE_NAME || 'd1642ujv6vtbqn',
    user: process.env.DATABASE_USER || 'kisiocovuzzkuq',
    password: process.env.DATABASE_PASS || '7a92cc0d4f843ad6c9fda68bc03645f289897676af708c823fdc0d467b094dec',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'ec2-52-202-22-140.compute-1.amazonaws.com',
      storage: process.env.STORAGE || './funBlog.sqlite',
      retry: {
        match: [
          /SQLITE_BUSY/
        ],
        name: 'query',
        max: 15
      }
    }
  },
  auth: {
    jwtSecret: process.env.JWT_SECRET || 'secret'
  }
}
