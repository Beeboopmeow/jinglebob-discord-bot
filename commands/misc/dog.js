const { SlashCommandBuilder } = require("discord.js");

const fetchDog = () => {
  const url = "https://api.thedogapi.com/v1/images/search";

  return fetch(url)
    .then((res) => res.json())
    .then((dog) => {
      let imageUrl = dog[0].url;
      if (imageUrl) {
        return imageUrl;
      } else {
        throw new Error("Dog data is incomplete");
      }
    });
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("dog")
    .setDescription("Replies with a random picture of a dog"),
  async execute(interaction) {
    const dogImageUrl = await fetchDog();
    await interaction.reply(dogImageUrl);
  },
};
