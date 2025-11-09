module.exports = {
  config: {
    name: "boxdeet",
    aliases: ["boxinfo", "bd"],
    version: "1.0",
    author: "MZ",
    countDown: 5,
    role: 0,
    shortDescription: "বক্স/ইনবক্স তথ্য দেখুন",
    longDescription: "গ্রুপ বা ইনবক্সের তথ্য দেখার জন্য কমান্ড",
    category: "info",
    guide: {
      en: "{pn}"
    }
  },

  onStart: async function ({ message, event, threadsData, usersData }) {
    const { threadID, senderID, isGroup } = event;

    if (isGroup) {
      const box = await threadsData.get(threadID);
      if (!box) return message.reply("❌ গ্রুপ তথ্য পাওয়া যায়নি।");

      const reply = `💬 গ্রুপ তথ্য:
- নাম: ${box.threadName}
- Box ID: ${threadID}
- সদস্য সংখ্যা: ${box.members.length}
- মেসেজ সংখ্যা: ${box.count || 0}`;

      return message.reply(reply);
    } else {
      const user = await usersData.get(senderID);
      if (!user) return message.reply("❌ ইউজার তথ্য পাওয়া যায়নি।");

      const reply = `📥 ইনবক্স তথ্য:
- ইউজার: ${user.name}
- UID: ${senderID}
- মেসেজ সংখ্যা: ${user.count || 0}`;

      return message.reply(reply);
    }
  }
};
