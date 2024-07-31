const axios = require('axios');

async function fetchFromAI(url, params) {
  try {
    const response = await axios.get(url, { params });
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
}

async function getAIResponse(input, userName, userId, messageID) {
  const services = [
    { url: 'https://ai-tools.replit.app/gpt', params: { prompt: input, uid: userId } },
    { url: 'https://openaikey-x20f.onrender.com/api', params: { prompt: input } },
    { url: 'http://fi1.bot-hosting.net:6518/gpt', params: { query: input } },
    { url: 'https://ai-chat-gpt-4-lite.onrender.com/api/hercai', params: { question: input } }
  ];

  let response = `𝗛𝗲𝗹𝗹𝗼 ➪ ${userName}🩵🪽 𝗶𝗻 𝗛𝗼𝘄 𝗰𝗮𝗻 𝗜 𝗯𝗲 𝗼𝗳 𝗵𝗲𝗹𝗽 𝘁𝗼 𝘆𝗼𝘂 𝘁𝗼𝗱𝗮𝘆?`;
  let currentIndex = 0;

  for (let i = 0; i < services.length; i++) {
    const service = services[currentIndex];
    const data = await fetchFromAI(service.url, service.params);
    if (data && (data.gpt4 || data.reply || data.response)) {
      response = data.gpt4 || data.reply || data.response;
      break;
    }
    currentIndex = (currentIndex + 1) % services.length; // Passer au service suivant
  }

  return { response, messageID };
}

module.exports = {
  config: {
    name: 'ai',
    author: 'Arn',
    role: 0,
    category: 'ai',
    shortDescription: 'ai to ask anything',
  },
  onStart: async function ({ api, event, args }) {
    const input = args.join(' ').trim();
    if (!input) {
      api.sendMessage("𝗛𝗲𝗹𝗹𝗼 𝗶𝗻 𝗛𝗼𝘄 𝗰𝗮𝗻 𝗜 𝗯𝗲 𝗼𝗳 𝗵𝗲𝗹𝗽 𝘁𝗼 𝘆𝗼𝘂 𝘁𝗼𝗱𝗮𝘆?", event.threadID, event.messageID);
      return;
    }

    api.getUserInfo(event.senderID, async (err, ret) => {
      if (err) {
        console.error(err);
        return;
      }
      const userName = ret[event.senderID].name;
      const { response, messageID } = await getAIResponse(input, userName, event.senderID, event.messageID);
      api.sendMessage(`✰....𝗡𝗜𝗡𝗝𝗔𝗚𝗢 🩵🪽.....✰:\n⧠⧠⧠⧠⧠.✰.✰.⧠⧠⧠⧠⧠\n\n${response}\n\n╰┈┈┈➤⊹⊱✰✫✫✰⊰⊹`, event.threadID, messageID);
    });
  },
  onChat: async function ({ api, event, message }) {
    const messageContent = event.body.trim().toLowerCase();
    if (messageContent.startsWith("ai")) {
      const input = messageContent.replace(/^ai\s*/, "").trim();
      api.getUserInfo(event.senderID, async (err, ret) => {
        if (err) {
          console.error(err);
          return;
        }
        const userName = ret[event.senderID].name;
        const { response, messageID } = await getAIResponse(input, userName, event.senderID, message.messageID);
        message.reply(`✰......𝗡𝗜𝗡𝗝𝗔𝗚𝗢.......✰: 🥷 \n⧠⧠⧠⧠⧠.✰.✰.⧠⧠⧠⧠⧠\n\n${response}🥷🩸\n\n╰┈┈┈➤⊹⊱✰✫✫✰⊰⊹`, messageID);
      });
    }
  }
};
