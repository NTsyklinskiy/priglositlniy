const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, 'Введите Ваше Имя!']
  },
  lastName: {
    type: String,
    required: [true, 'Введите Вашу Фамилию!'],
  },
  options: String,
  fl: String
});

const User = mongoose.model('User', userSchema)

module.exports = User;