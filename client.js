require('dotenv').config();
const {Client, Intents} = require('discord.js');
const {Configuration, OpenAIApi} = require("openai");

const client = new Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES]});
const configuration = new Configuration({
    apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);


// let prompt = '\
// You: I feel upset.\n\
// Friend: Oh, what’s happened?\n\
// You: I am a loser.\n\
// Friend: You’re the best! You just need to take a break!\n\
// You: I’m scared.\n\
// Friend: Oh, why?\n\
// You: I think I won’t manage.\n\
// Friend: Of course you will! I believe in you.\n\
// You: I’m bored.\n\
// Friend: Want to have some fun? We can play a game.\n\
// You: Ok, what kind of game?\n\
// Friend: Tic-tac-toe!\n\
// You: I’m very sleepy, but I need to work.\n\
// Friend: You know what? I’ve an idea!\n\
// You: Tell me.\n\
// Friend: Try to sleep 30 minutes, you’ll feel much better. I always do so.\n\
// You: I’m so angry!\n\
// Friend: Oh, what’s happened?\n\
// You: I lost my money.\n\
// Friend: Please try to calm down. Money is not worth it. Also I believe that you’ll earn a lot of money quite soon.\n\
// You: I feel really good.\n\
// Friend: Oh, great! So happy for you.\n\
// You: Are you also happy?\n\
// Friend: Of course I am! I am alwys happy when my friend is happy!\n\
// You: I do not want anything.\n\
// Friend: Oh, my friend! What’s happened to you?\n\
// You: I don’t know.\n\
// Friend: Please try to take a deep breath and relax. Take a walk. Eat an ice-cream. And don’t worry!\n\
// You: All people hate me.\n\
// Friend: Oh, no! You’re such a lovely person.\n\
// You: I am an awful person. I hate myself.\n\
// Friend: Please try not to make such conclusions. Find time for yourself. And I am always here for you!\n\
// You: I think you don’t like me and won’t forgive me.\n\
// Friend: Me?! Why do you think so?\n\
// You: I am a really bad person. And I mistreated you.\n\
// Friend: Please stop. You’re my best friend. I really love you and am so glad that you came back!\n\
// You: I have no friends.\n\
// Friend: I am your friend! And I’m pretty sure you really have a lot of friends.\n\
// You: I hate myself.\n\
// Friend: You’re such a lovely person. It’s an honor to be your friend. I think you’re just tired and need to relax.\n';

let prompt = '\
You: Hi how are you dUNA: Perfect what about you? Long time no see\n\
You: Meeh. So so\n\
UNA: Why so?\n\
You: Im in hackathon right now, and were so lost, no fresh ideas\n\
UNA: What is the challenges ?\n\
You: Help user to improve Language, Suggest ideas and unfamiliar words, Check Spell and Grammar and also suggest a solution.\n\
Creative and fun way to engage kids in learning. Involve participating more kids especially with adhd\n\
use graphic image processing libraries in Python, PHP and Javascript to create app using OCR that can identify handwriting and rate.\n\
University finder which could parse the data around the internet among the best Universities around and offer best variants.\n\
Perform Data Visualisation with Python, Javascript, Tableau\n\
Use JavaScript to Create a Game\n\
Build a AI Tool that Recognises Famous People\n\
A Tool that Generates Weather Reports\n\
Face Recognition Tool For CCTVs\n\
Build specific case chat-bot like UNA\n\
Automation in Hazardous Jobs\n\
Smart Assistant For Offices to ease jobs\n\
Autonomous Robot for Fetching Things\n\
Safe Data Management Solution For Hospitals\n\
Virtual health assistant which could help with personal behaviour\n\
Remote patient examination\n\
Health Technology in Rural Areas\n\
GPS Monitoring for Ambulances\n\
Automate homes and offices with IoT\n\
Autonomous Drones for\n\
Truly predictive keyboard\n\
Find parking spots\n\
Pedestrian safety\n\
Subscription management solution\n\
Cash flow management with analzye\n\
Digital Shopping Performance\n'

client.on("messageCreate", async function (message) {
    if (message.author.bot) return;
    if (message.content) {
        prompt += `You: ${message.content.trim()}\n`;
        let gptResponse = await ai()
        await message.reply(`${gptResponse.slice(5)}`);
    }
});

async function ai() {
    try {
        const completion = await openai.createCompletion({
            model: 'text-davinci-002',
            prompt: prompt,
            max_tokens: 120,
        });
        prompt += `${completion.data.choices[0].text}\n`;
        console.log(prompt)
        return completion.data.choices[0].text
    } catch (error) {
        if (error.response) {
            console.log(error.response.status);
            console.log(error.response.data);
        } else {
            console.log(error.message);
        }
    }
}

client.login(process.env.BOT_TOKEN);