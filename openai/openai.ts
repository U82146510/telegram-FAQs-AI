import { OpenAI } from "openai";
import dotenv from 'dotenv';

dotenv.config();

const OPENAI_KEY = process.env.OPENAI_KEY;
if(!OPENAI_KEY){
    throw new Error('openapi missing key');
};

export const openai = new OpenAI({apiKey:OPENAI_KEY});




