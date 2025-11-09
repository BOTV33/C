module.exports = {
  config: {
    name: "ipp",
    aliases: ["mybox", "mbox", "digs"],
    version: "3.1",
    author: "MZ",
    countDown: 5,
    role: 0,
    shortDescription: "ইনবক্সে বটকে নক করুন",
    longDescription: "এই কমান্ড ব্যবহার করে বটকে ইনবক্সে নক করানো যায় এবং অটো হেল্প চালু হয়",
    category: "utility",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ api, event }) {
    const userID = event.senderID;

    // ✅ Step 1: Try sending inbox message
    api.sendMessage(
      "✅ SUCCESSFULLY SEND MSG\n🔰 [চাঁদের পাহাড়] PLEASE CK YOUR INBOX OR MSG REQUEST BOX",
      userID,
      async (err) => {
        if (err) {
          // ❌ Fallback if inbox message fails
          return api.sendMessage(
            "⚠️ ইনবক্সে নক পাঠানো যায়নি। Messenger-এ বটকে আগে 'Hi' বা '/' পাঠান, তারপর আবার চেষ্টা করুন।",
            event.threadID
          );
        }

        // ✅ Step 2: Confirm in group
        api.sendMessage(
          "📨 ইনবক্সে নক পাঠানো হয়েছে! ইনবক্সে গিয়ে বটের গাইডলাইন দেখতে পারবেন ✅",
          event.threadID
        );

        // ✅ Step 3: Auto trigger /help in inbox
        api.handleReply &&
          api.handleReply({
            body: "/help",
            senderID: userID,
            threadID: userID,
            messageID: null
          });
      }
    );
  }
};
