module.exports = {
  port: process.env.PORT || 8081,
  db: {
    database: process.env.DATABASE_NAME || 'samsblog',
    user: process.env.DATABASE_USER || 'postgres',
    password: process.env.DATABASE_PASS || '',
    options: {
      dialect: process.env.DIALECT || 'postgres',
      host: process.env.HOST || 'localhost',
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
