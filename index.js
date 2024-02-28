import openai from './config/open-ai.js';
import readlineSync from 'readline-sync';
import colors from 'colors';

async function main() {
  console.log(colors.bold.green('ChatGPT chat program!'));
  console.log(colors.bold.green('You can start chatting with the bot.'));


  // Store conversation history
  const chatHistory = []; 

  while (true) {
    const userInput = readlineSync.question(colors.yellow('You: '));

    try {
      // Construct messages by iterating over the history
      const messages = chatHistory.map(([role, content]) => ({
        role,
        content,
      }));

      // Add latest user input
      messages.push({ role: 'user', content: userInput });

      // Call the API gpt-3.5-turbo is the free tier, you need to pay to use GPT-4
      const completion = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: messages,
      });

      // Get completion text/content
      let completionText = completion.data.choices[0].message.content;

      // type exit to break out of the nodejs program
      if (userInput.toLowerCase() === 'exit') {
        console.log(colors.green('Bot: ') + completionText);
        return;
      }

      console.log(colors.green('Bot: ') + completionText);

      // Update history with user input and assistant response
      chatHistory.push(['user', userInput]);
      chatHistory.push(['assistant', completionText]);
    } catch (error) {
      console.error(colors.red(error));
    }
  }
}

async function callSingleChatGPT(messages) {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [{role: 'user', content: userInput}],
  });
}
async function callConcurrentChatGPT(messages) {
  return await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: messages,
  });
}


main();
