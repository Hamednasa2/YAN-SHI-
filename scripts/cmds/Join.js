module.exports = {
  config: {
    name: "join",
    aliases: ['addme', 'joinme'],
    version: "1.0",
    author: "Samir ",
    countDown: 5,
    role: 2,
    shortDescription: {
      en: "Add user to support group",
    },
    longDescription: {
      en: "This command adds the user to the group where bot exist",
    },
    category: "owner",
    guide: {
      en: "To use this command, simply type !join <threadID>.",
    },
  },

  onStart: async function ({ api, args, message, event }) {
    const supportGroupId = args[0];
    if (!supportGroupId) {
      api.sendMessage("𝑽𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒇𝒐𝒖𝒓𝒏𝒊𝒓 𝒍'𝒊𝒅𝒆𝒏𝒕𝒊𝒇𝒊𝒂𝒏𝒕 𝒅𝒖 𝒈𝒓𝒐𝒖𝒑𝒆 𝒅𝒆 𝒔𝒖𝒑𝒑𝒐𝒓𝒕.", event.threadID);
      return;
    }
    const threadID = event.threadID;
    const userID = event.senderID;
    const threadInfo = await api.getThreadInfo(supportGroupId);
    const participantIDs = threadInfo.participantIDs;
    if (participantIDs.includes(userID)) {
      api.sendMessage(
        "𝑽𝒐𝒖𝒔 𝒆̂𝒕𝒆𝒔 𝒅𝒆́𝒋𝒂̀ 𝒅𝒂𝒏𝒔 𝒄𝒆 𝒈𝒓𝒐𝒖𝒑𝒆. 𝑺𝒊 𝒗𝒐𝒖𝒔 𝒏𝒆 𝒍'𝒂𝒗𝒆𝒛 𝒑𝒂𝒔 𝒕𝒓𝒐𝒖𝒗𝒆́, 𝒗𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒗𝒆́𝒓𝒊𝒇𝒊𝒆𝒓 𝒗𝒐𝒔 𝒅𝒆𝒎𝒂𝒏𝒅𝒆𝒔 𝒅𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆𝒔 𝒐𝒖 𝒗𝒐𝒕𝒓𝒆 𝒃𝒐𝒊̂𝒕𝒆 𝒔𝒑𝒂𝒎🏌️🥀",
        threadID
      );
    } else {
      api.addUserToGroup(userID, supportGroupId, (err) => {
        if (err) {
          console.error("Failed to add user to support group:", err);
          api.sendMessage("𝑱𝒆 𝒏𝒆 𝒑𝒆𝒖𝒙 𝒑𝒂𝒔 𝒗𝒐𝒖𝒔 𝒂𝒋𝒐𝒖𝒕𝒆𝒓 𝒄𝒂𝒓 𝒗𝒐𝒕𝒓𝒆 𝒊𝒅𝒆𝒏𝒕𝒊𝒇𝒊𝒂𝒏𝒕 𝒏'𝒆𝒔𝒕 𝒑𝒂𝒔 𝒂𝒖𝒕𝒐𝒓𝒊𝒔𝒆́ 𝒂̀ 𝒅𝒆𝒎𝒂𝒏𝒅𝒆𝒓 𝒖𝒏 𝒎𝒆𝒔𝒔𝒂𝒈𝒆 𝒐𝒖 𝒗𝒐𝒕𝒓𝒆 𝒄𝒐𝒎𝒑𝒕𝒆 𝒆𝒔𝒕 𝒑𝒓𝒊𝒗𝒆́. 𝒔'𝒊𝒍 𝒗𝒐𝒖𝒔 𝒑𝒍𝒂𝒊̂𝒕, 𝒂𝒋𝒐𝒖𝒕𝒆𝒛-𝒎𝒐𝒊 𝒑𝒖𝒊𝒔 𝒓𝒆́𝒆𝒔𝒔𝒂𝒚𝒆́....🤧🥀", threadID);
        } else {
          api.sendMessage(
            "𝑽𝒐𝒖𝒔 𝒂𝒗𝒆𝒛 𝒆́𝒕𝒆́ 𝒂𝒋𝒐𝒖𝒕𝒆́ 𝒂̀ 𝒄𝒆 𝒈𝒓𝒐𝒖𝒑𝒆. 𝑺𝒊 𝒗𝒐𝒖𝒔 𝒏'𝒂𝒗𝒆𝒛 𝒑𝒂𝒔 𝒕𝒓𝒐𝒖𝒗𝒆́ 𝒍𝒂 𝒃𝒐𝒊̂𝒕𝒆 𝒅𝒆 𝒓𝒆́𝒄𝒆𝒑𝒕𝒊𝒐𝒏 𝒅𝒂𝒏𝒔 𝒗𝒐𝒕𝒓𝒆 𝒃𝒐𝒊̂𝒕𝒆 𝒅𝒆 𝒓𝒆́𝒄𝒆𝒑𝒕𝒊𝒐𝒏, 𝒗𝒆𝒖𝒊𝒍𝒍𝒆𝒛 𝒗𝒆́𝒓𝒊𝒇𝒊𝒆𝒓 𝒗𝒐𝒔 𝒅𝒆𝒎𝒂𝒏𝒅𝒆𝒔 𝒅𝒆 𝒎𝒆𝒔𝒔𝒂𝒈𝒆𝒔 𝒐𝒖 𝒗𝒐𝒕𝒓𝒆 𝒃𝒐𝒊̂𝒕𝒆 𝒅𝒆 𝒔𝒑𝒂𝒎...🇮🇪🥀",
            threadID
          );
        }
      });
    }
  },
};
