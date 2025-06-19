const mongoose = require('mongoose') 
const { createPermanentAdmin } = require('../model/usertable')

const dotenv = require('dotenv')
const path = require('path');
dotenv.config({path: path.join(__dirname, "config/config.env")})

const connectDatabase = ()=>{
    mongoose.connect(process.env.DB_CONNECTION_URL, {
        //useNewUrlParser: true,
        //useUnifiedTopology: true,
    })
    .then((con) => {
        console.log('MongoDB connected , host', con.connection.host);
        createPermanentAdmin();
    })
    .catch(err => console.log('MongoDB not connection error:', err));

}

module.exports = connectDatabase;
