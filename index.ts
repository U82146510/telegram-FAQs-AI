import {bot} from './commands/commands.ts';
import {connect_redis} from './config/redis.ts';
import { logger } from './logger/logger.ts';
import {embedText} from './middleware/embed_text.ts';

const start = async()=>{
    try {
        //await embedText();  // vectoring the questions
        await connect_redis.connect();
        await bot.start();
    } catch (error) {
        logger.error(error);
    }
};

start()