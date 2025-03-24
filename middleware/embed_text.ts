import {openai} from '../openai/openai.ts';
import fs, { writeFileSync } from 'fs';
import { fileURLToPath } from "url";
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const raw_data = path.join(__dirname,'./FAQs/sample_qa_data_2mb.json');


const FAQs = fs.readFileSync(raw_data,'utf-8');
const data_faqs = JSON.parse(FAQs);

export async function embed_user_input(input:string){
    const embedin_res = await openai.embeddings.create({
        model:'text-embedding-ada-002',
        input:input,
    });
    return embedin_res.data[0].embedding
};



export async function embedText(){
    const vector_data = [];

    for(const entry of data_faqs){
        const text = entry.question.toLowerCase();
        const res = await openai.embeddings.create({
            model:'text-embedding-ada-002',
            input:text,
        });
        vector_data.push({
            embedding:res.data[0].embedding,
            question:entry.question,
            answer:entry.answer,
        });
    }

    writeFileSync('vector-cache.json',JSON.stringify(vector_data,null,2));
    console.log('done');
};


const raw_vector = path.join(__dirname,'./FAQs/vector-cache.json');
type Entry = {
    embedding: number[];
    question: string;
    answer: string;
};

export const vectorData: Entry[] = JSON.parse(fs.readFileSync(raw_vector, 'utf-8'));

