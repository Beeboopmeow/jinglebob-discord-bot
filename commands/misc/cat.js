const { SlashCommandBuilder } = require("discord.js");

const fetchCat = () => {
  const url = "https://api.thecatapi.com/v1/images/search";

  return fetch(url)
    .then((res) => res.json())
    .then((cat) => {
      let imageUrl = cat[0].url;
      if (imageUrl) {
        return imageUrl;
      } else {
        throw new Error("Cat data is incomplete");
      }
    });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("cat")
    .setDescription("Replies with a random picture of a cat"),
  async execute(interaction) {
    const catImageUrl = await fetchCat();
    await interaction.reply(catImageUrl);
  },
};
