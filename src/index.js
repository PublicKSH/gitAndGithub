const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const http = require("http");
const redisClient = require("./config/database/redis");
const {sequelize} = require('./models');
const {createSchema} = require("./config/database/mysql");

let server;

(async () => {
    try {
        // redis 관련
        redisClient.on('error', (err)=> console.error("redis Error :", err))
        await redisClient.connect();
        
        if(process.env.NODE_ENV !== 'test' && !await redisClient.isOpen()){
            console.log('redis connection err')
            exitHandler();
        }
        
        // mysql 관련
        await createSchema();
        sequelize.sync({alter: true})
            .then(() => {
                // 서버 실행 관련
                server = app.listen(config.port, () => {
                    logger.info('Listening to port %d', config.port);
                })
                server.keepAliveTimeout = 61 * 1000;
                server.headersTimeout = 65 * 1000; // This should be bigger than `keepAliveTimeout + your server's expected response time`
            })
            .catch((err) => {
                console.log(err);
            });
        
    } catch (e) {
        console.error(e);
        exitHandler();
    }
})()

const exitHandler = () => {
    if (server) {
        server.close(() => {
            logger.info('Server closed');
            process.exit(1);
        })
    } else {
        process.exit(1);
    }
}

const unexpectedErrorHandler = (error) => {
    logger.error(error);
    exitHandler();
}

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGINT', exitHandler);

