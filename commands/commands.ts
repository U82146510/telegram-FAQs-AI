import { Bot } from "grammy";
import dotenv from 'dotenv';
import {connect_redis} from '../config/redis.ts';
import {cosineSimilarity} from '../middleware/cousine.ts';
import {embed_user_input,vectorData} from '../middleware/embed_text.ts';
import {send_to_ai} from '../middleware/send_requests_to_openai.ts';
import { logger } from "../logger/logger.ts";


dotenv.config();

const t_token = process.env.t_token;
if(!t_token){
    throw new Error('missing telegram token');
}

export const bot = new Bot(t_token);



bot.command("start",async (data)=>{
    const message = `
    🕷️ *WELCOME TO GRIMCORE*

    > Access granted for: *${data.from?.first_name}*

    ╔══════════════════════╗
    ║  ☠️  SYSTEM: ACTIVE         
    ║  🔒  STATUS: ENCRYPTED      
    ║  🧠  NODE: AI-OPENAI   
    ╚══════════════════════╝

    ☣️ How can I help you?
    `;
    const exist = await connect_redis.exists(`user${data.from?.id}`);
    if(!exist){
        logger.info('added a new user',data.from?.id);
        await connect_redis.hSet(`user${data.from?.id}`,
            {
                id:`${data.from?.id}`,
                username:`${data.from?.username}`,
                language:`${data.from?.language_code}`,
                name:`${data.from?.last_name}`
            });
        await connect_redis.lPush('users',JSON.stringify(data.from?.id));
    }

    data.reply(message)
});

bot.on('message:text',async(input)=>{
    const user_input = input.msg.text.toLocaleLowerCase();
    const embedin_response = await embed_user_input(user_input);

    const top_similarity = vectorData.map(entry=>({
        ...entry,
        similarity:cosineSimilarity(embedin_response,entry.embedding),
    })).sort((a,b)=>b.similarity-a.similarity).slice(0,3);

    const prompt = `You are a helpful FAQ assistant. A user asked:
    "${input.msg.text}"

    Here are relevant FAQ entires:
    1.  Q: ${top_similarity[0].question}
        A: ${top_similarity[0].answer}
    2.  Q: ${top_similarity[0].question}
        A: ${top_similarity[0].answer}
    3.  Q: ${top_similarity[0].question}
        A: ${top_similarity[0].answer}
    
    Respond in a natural, helpful tone.
    `;
    const data = await send_to_ai(prompt);
    input.reply(data)
});