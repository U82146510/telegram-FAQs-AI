import {openai} from '../openai/openai.ts';

export async function send_to_ai(input:string){
    const completion = await openai.chat.completions.create({
        model:'chatgpt-4o-latest',
        messages:[{role:'user',content:input}]
    })
    return completion.choices[0].message?.content ?? '🤖 Sorry, I had trouble generating a reply.';
};
