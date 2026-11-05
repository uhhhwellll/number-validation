require('dotenv').config();
const express = require('express')
const cors = require('cors')
const port = 3000;
const sequelize = require('./config/config.js')
const router = require('./routes/userRoutes.js');
const { User } = require('./models/model.js');
const app = express();

app.use(express.json());
app.use(cors({ origin: '*' }))
app.use('/api', router)

async function start() {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        app.listen(port, () => {
            console.log(`the server is running on port ${port}`);
            // console.log('User model:', User);
        })
    } catch (error) {
        console.error(error)
    }
}

start();