const { player } = require(".");
module.exports = async (client, msg, args, command) => {
  if (command === "tocar") {
    const channel = msg.member.voice.channel;
    if (!channel)
      return msg.channel.send("Você precisa entrar no canal de voz!");

    const search_music = args.join(" ");
    if (!search_music)
      return msg.channel.send("Digite um nome ou um link para a musica!");

    const queue = player.createQueue(msg.guild.id, {
      metadata: {
        channel: msg.channel,
      },
    });

    try {
      if (!queue.connection) await queue.connect(channel);
    } catch (error) {
      queue.destroy();
      return await msg.reply({
        content: "Não me foi permitido entrar no canal de voz!",
        ephemeral: true,
      });
    }

    const song = await player
      .search(search_music, {
        requestedBy: msg.author,
      })
      .then((x) => x.tracks[0]);
    client.user.setActivity(song.title, { type: "LISTENING" });
    if (!song) return msg.reply(`Erro ao procurar música: ${search_music}!!!`);
    queue.play(song);

    msg.channel.send({ content: `🔎 | Buscando: \`${song.title}\`` });
  } else if (command === "pular") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    queue.skip();
    msg.channel.send(`Tocando a proxima musica!`);
  } else if (command === "parar") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    queue.stop();
    msg.channel.send(`Pediu pra parar parouu!!`);
  } else if (command === "pause") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    queue.setPaused(true);
    msg.channel.send(`Musica pausada!`);
  } else if (command === "cont") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    queue.setPaused(false);
    msg.channel.send(`Continuando a tocar!`);
  } else if (command === "lista") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    console.log(queue);
    let cont = 1;
    msg.channel.send(`**Musicas na fila**`);
    queue.tracks.forEach((songs) => {
      msg.channel.send(` \`\`\`${cont}º: ${songs.title}. \`\`\``);
      cont++;
    });
  } else if (command === "dawn") {
    const queue = player.getQueue(msg.guild.id);
    if (!queue) return msg.channel.send(`**Não tem uma fila de musicas**`);
    queue.setPaused(true);
    msg.channel.send(`Musica pausada!`);
  } else if (command === "comandos") {
    msg.channel.send(`\`\`\`
    !tocar: Tocar uma musica.
    !parar: Parar musica e desconectar bot.
    !lista: Para ver as musica que estão na fila.
    !pause: Pauser a reprodução da musica.
    !cont:  Continuar a reprodução da musica.
    !pular: Pulra a musica.\`\`\` `);
  }
};
