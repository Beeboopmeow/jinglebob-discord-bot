const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

const totalPokemons = 1025;

const fetchPokemon = async (id) => {
  const url = `https://pokeapi.co/api/v2/pokemon/${id}`;

  const response = await fetch(url);
  const pokemon = await response.json();
  let name = pokemon.name;
  let imageUrl = pokemon.sprites.other["official-artwork"].front_default;
  if (name && imageUrl) {
    return { name, imageUrl };
  } else {
    throw new Error("Pokemon data is incomplete");
  }
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
};

module.exports = {
  data: new SlashCommandBuilder()
    .setName("pokemon")
    .setDescription("Replies with a Pokemon!"),
  async execute(interaction) {
    try {
      const { name, imageUrl } = await fetchPokemon(
        randomNumber(1, totalPokemons)
      );
      const capitalizedName = capitalizeFirstLetter(name);
      const pokemonEmbed = new EmbedBuilder()
        .setColor("FC8EAC")
        .setTitle(capitalizedName)
        .setImage(imageUrl);

      await interaction.reply({ embeds: [pokemonEmbed] });
    } catch (error) {
      await interaction.reply("Failed to fetch Pokemon data.");
    }
  },
};
