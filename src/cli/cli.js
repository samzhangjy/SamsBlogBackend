const models = require('../models')

const defaultUser = {
  username: 'root',
  email: 'root@example.com',
  password: 'root'
}

models.User.create(defaultUser).then(
  data => {
    console.log(`User created as ${defaultUser.username}! The default password for the user
    is ${defaultUser.password}, and the default email is ${defaultUser.email}. Please change
    these information to your own later!`)
  }
).catch(err => {
  console.log('Error while creating user:', err.name)
})
