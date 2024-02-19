const mongoose = require('mongoose');

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>');
  process.exit(1);
}

const password = process.argv[2];


const url = `mongodb+srv://nastyachasovskikh:${password}@cluster0.qkpvmtp.mongodb.net/personApp?retryWrites=true&w=majority`;

mongoose.set('strictQuery', false)
mongoose.connect(url).then(() => {
  const personSchema = new mongoose.Schema({
    name: String,
    number: Number,
  })
  
  const Person = mongoose.model('Person', personSchema)
  
  // const person = new Person({
  //   name: String,
  //   number: Number,
  // })
  
  /*
  note.save().then(result => {
    console.log('note saved!')
    mongoose.connection.close()
  })
  */
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person)
    })
    mongoose.connection.close()
  })
})