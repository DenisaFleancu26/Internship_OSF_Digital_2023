var mongoose = require('mongoose');
require('dotenv').config();

const url = `mongodb+srv://${process.env.DATABASE_NAME}:${process.env.DATABASE_PASSWORD}@cluster0.wv2ku4y.mongodb.net/${process.env.DATABASE}?retryWrites=true&w=majority`;
const connectionParams={
  useNewUrlParser: true
}

async function connectToDatabase() {
    return mongoose.connect(url,connectionParams)
            .then( () => {
                console.log('Connected to MongoDB ')
            })
            .catch( (err) => {
                console.error(`Error connecting to the database. \n${err}`);
            })

}

module.exports = connectToDatabase;