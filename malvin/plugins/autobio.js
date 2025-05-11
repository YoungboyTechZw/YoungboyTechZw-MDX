/*const connectDB = require('../../lib/db'); // Import the MongoDB connection
const { cmd } = require('../command');
const config = require('../../settings');
const BotSettings = require('../models/BotSettings'); // Import the model


// Connect to MongoDB
connectDB();

// Function to update autoBio setting
async function updateAutoBio(userId, status) {
    await BotSettings.findOneAndUpdate(
        { userId },
        { autoBio: status },
        { upsert: true, new: true }
    );
}

// Function to get autoBio setting
async function getAutoBio(userId) {
    const settings = await BotSettings.findOne({ userId });
    return settings ? settings.autoBio : false;
}

// Command to toggle autoBio
cmd({
    pattern: 'autobio',
    alias: ['bio'],
    react: '📝',
    desc: 'Toggle autoBio on/off',
    category: 'misc',
    filename: __filename
}, async (conn, mek, m, {
    from,
    quoted,
    body,
    isCmd,
    command,
    args,
    q,
    isGroup,
    sender,
    senderNumber,
    botNumber2,
    botNumber,
    pushname,
    isMe,
    isOwner,
    groupMetadata,
    groupName,
    participants,
    groupAdmins,
    isBotAdmins,
    isAdmins,
    reply
}) => {
    if (!isOwner) return reply('This command is only for the bot owner.');

    try {
        const [action, status] = body.split(' ');

        if (!action || !['on', 'off'].includes(status?.toLowerCase())) {
            return reply('Usage: `.autobio on` or `.autobio off`');
        }

        const newStatus = status.toLowerCase() === 'on';
        await updateAutoBio(sender, newStatus);

        // Send the status message with an image
        await conn.sendMessage(from, {
            image: { url: 'https://files.catbox.moe/y65ffs.jpg' }, // Image URL
            caption: `AutoBio has been turned ${newStatus ? 'on ✅' : 'off ❌'}.`,
            contextInfo: {
                mentionedJid: [m.sender],
                forwardingScore: 999,
                isForwarded: true,
                forwardedNewsletterMessageInfo: {
                    newsletterJid: '120363306168354073@newsletter',
                    newsletterName: '『 MALVIN XD 』',
                    serverMessageId: 143
                }
            }
        }, { quoted: mek });

    } catch (error) {
        console.error('Error in autobio command:', error);
        reply('An error occurred while processing your request.');
    }
});

// Handler to update bot's bio
let handler = m => m;

handler.all = async function (m) {
    try {
        // Get the autoBio setting from MongoDB
        const autoBio = await getAutoBio(this.user.jid);

        if (autoBio) {
            let _muptime;

            // Calculate uptime
            if (process.send) {
                process.send('uptime');
                _muptime = await new Promise(resolve => {
                    process.once('message', resolve);
                    setTimeout(resolve, 1000);
                }) * 1000;
            }

            // Log the uptime for debugging
            console.log('Uptime calculated:', _muptime);

            // Format the uptime
            let muptime = clockString(_muptime);

            // Log the formatted uptime for debugging
            console.log('Formatted uptime:', muptime);

            // Set the bot's bio
            let bio = `\n⌚ Time Active: ${muptime}\n\n ┃ 🛡️MALVIN ᗷOT Xᗪ🛡️`;
            await this.updateProfileStatus(bio)
                .then(() => console.log('Bio updated successfully!'))
                .catch(err => console.error('Error updating bio:', err));
        }
    } catch (error) {
        console.error('Error in bio updater:', error);
    }
};

module.exports = handler;

// Function to format uptime
function clockString(ms) {
    let d = isNaN(ms) ? '--' : Math.floor(ms / 86400000); // Days
    let h = isNaN(ms) ? '--' : Math.floor(ms / 3600000) % 24; // Hours
    let m = isNaN(ms) ? '--' : Math.floor(ms / 60000) % 60; // Minutes
    let s = isNaN(ms) ? '--' : Math.floor(ms / 1000) % 60; // Seconds

    return [d, ' Day(s) ️', h, ' Hour(s) ', m, ' Minute(s)']
        .map(v => v.toString().padStart(2, 0))
        .join('');
}
*/
