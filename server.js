const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const Sequelize = require('sequelize');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

const { importModels } = require('./models');
const users = require('./routes/users');
const credentials = require('./routes/credentials');
const progress = require('./routes/progress');
const permissions = require('./routes/permissions');
const promotions = require('./routes/promotions');

const PORT = process.env.PORT || 3000;
const DB_HOST = process.env.DB_HOST || 'localhost';
const DB_PORT = process.env.DB_PORT || 5432;
const DB_DIALECT = process.env.DB_DIALECT || 'postgres';
const DB_POOL_MAX = parseInt(process.env.DB_POOL_MAX) || 20;


const db = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASS,
    {
        host: DB_HOST,
        port: DB_PORT,
        dialect: DB_DIALECT,
        pool: {
            max: parseInt(DB_POOL_MAX) || 20,
            min: 0,
            acquire: 30000,
            idle: 10000
        }
    }
);

importModels(db);

db.authenticate().then(() => db.sync().then(() => {
    console.log(`Database connected at ${DB_HOST}:${DB_PORT}`);

    const server = express();

    server.use(logger(process.env.MORGAN_LOGGER_LEVEL || 'dev'));
    server.use(express.json());
    server.use(express.urlencoded({ extended: false }));
    server.use(cookieParser());
    server.use(cors());

    server.use('/users', users(db));
    server.use('/credentials', credentials(db));
    //server.use('/permissions', permissions(db));
    //server.use('/progress', progress(db));
    //server.use('/promotions', promotions(db));

    server.get('/', function (req, res) {
        res.send('hello world')
    })

    server.listen(PORT, () => console.log(`Rampart is live on port ${PORT}!`));
})).catch(err => console.error('Unable to connect to database:', err));
