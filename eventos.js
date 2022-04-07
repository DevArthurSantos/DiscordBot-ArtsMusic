const { player } = require(".");

module.exports = async () => {
  player.on("trackStart", async (queue, track) => {
    queue.metadata.channel.send(`🎤 Você esta ouvindo: \`${track.title}\``);
  });
  player.on("trackAdd", async (queue, track) => {
    queue.metadata.channel.send(
      `📝 Adicionando a lista de reprodução: \`${track.title}\``
    );
  });
};
