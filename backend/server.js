const mongoose = require('mongoose');
const app = require('./app.js');
import config from './config';

mongoose.connect(config.DATABASE, {
// mongoose.connect(process.env.DATABASE_LOCAL, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  autoIndex: true
})
.then(()=> console.log("DB Connection..."))

app.listen(config.PORT, () => {
  console.log(`App running on port ${config.PORT}...`);
});