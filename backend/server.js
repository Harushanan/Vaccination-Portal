const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const dotenv = require('dotenv')

const path = require('path');
dotenv.config({path: path.join(__dirname, "config/config.env")})

const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

const connectDatabase = require('./config/database');

connectDatabase();




app.use(userRoutes);
//app.use()


app.listen(process.env.PORT, () => console.log(`Server started on port ${process.env.PORT}`));










