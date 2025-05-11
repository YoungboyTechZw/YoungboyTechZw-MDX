

const { cmd } = require('../command');

cmd({
  pattern: 'sendimage',
  desc: 'Send an image from a URL.',
  category: 'fun',
  react: '🖼️',
  filename: __filename,
  use: '.sendimage <image_url>',
}, async (conn, mek, m, { reply, args }) => {
  try {
    // Vérifie si un lien d'image a été fourni
    if (!args[0]) {
      return reply('❌ Please provide an image URL!');
    }

    const imageUrl = args[0];
    
    // Envoie l'image avec la légende
    await conn.sendMessage(m.chat, {
      image: { url: imageUrl },
      caption: `Here is your image!`,
      mimetype: "image/png"
    }, { quoted: mek });
  } catch (error) {
    console.error('Error in sendimage command:', error);
    reply(`❌ An error occurred: ${error.message}`);
  }
});