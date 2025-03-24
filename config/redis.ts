import { createClient } from "redis";
import {logger} from '../logger/logger.ts';

export const connect_redis = createClient({
    socket:{
        host:'127.0.0.1',
        port:6379
    }
});

connect_redis.on('error',(error:Error)=>{
    logger.error(error);
});

connect_redis.on('ready',()=>{
    console.log('connected to redis');
});