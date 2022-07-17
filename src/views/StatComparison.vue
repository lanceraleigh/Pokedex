<template>
  <router-link to="/">PokeDex</router-link>
  <h1>Stat Comparison</h1>
  <form
    @submit.prevent="
      imgDisplay();
      setPokemonName();
    "
  >
    <input
      @keydown="imgDisplayIsFalse"
      @click="imgDisplayIsFalse"
      type="text"
      id="pokeSearchTextOne"
      name="pokeSearchTextOne"
      v-model="pokemonOneName"
      ref="pokemonOneName"
      placeholder="Pokémon One.."
    />
    <input
      @keydown="imgDisplayIsFalse"
      @click="imgDisplayIsFalse"
      type="text"
      id="pokeSearchTextTwo"
      name="pokeSearchTextTwo"
      v-model="pokemonTwoName"
      ref="pokemonOneName"
      placeholder="Pokémon Two.."
    />
    <input type="submit" value="Compare Pokemon Stats" />
  </form>

  <div v-if="this.searchTrue" class="pulledData">
    <div class="comparisons">
      <div class="pokemonOne">
        <h1>{{ capitalizeFirstLetter(pokemonOneName) }}</h1>
        <img v-bind:src="pokemonOneImg" />
      </div>
      <div class="pokemonOne">
        <h1>{{ capitalizeFirstLetter(pokemonTwoName) }}</h1>
        <img v-bind:src="pokemonTwoImg" />
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  name: "pokeSearch",
  data() {
    return {
      pokemonOneImg: "",
      pokemonTwoImg: "",
      searchTrue: false,
      pokemonOneName: "",
      pokemonTwoName: "",
      pokemonOneUrl: [],
      pokemonTwoUrl: [],
      pokemonOneUrlDataReturn: [],
      pokemonTwoUrlDataReturn: [],
      evolutionChain: [],
      evolutionChainPull: [],
    };
  },
  methods: {
    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    imgDisplay() {
      this.searchTrue = true;
    },
    imgDisplayIsFalse() {
      this.searchTrue = false;
    },
    setPokemonName() {
      this.pullPokeInfo(this.pokemonOneName);
      this.pullPokeInfo(this.pokemonTwoName);
      console.log(this.pokemonOneName);
      console.log(this.pokemonTwoName);
    },
    async pokemonUrlData() {
      let pokemonOneImg = await axios.get(this.currentPokemonUrl);
      let pokemonTwoImg = await axios.get(this.currentPokemonUrl);
    },
    async pullPokeInfo(submitEvent) {
      let baseUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
      let pulledInfoOne = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonOneName}`
      );
      let pulledInfoTwo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${this.pokemonTwoName}`
      );
      console.log(pulledInfoOne);
      console.log(pulledInfoOne);
      this.pokemonOneImg = `${baseUrl}${pulledInfoOne.data.id}.png`;
      this.pokemonTwoImg = `${baseUrl}${pulledInfoTwo.data.id}.png`;

      // seconday data actions
      // this.pokemonUrlData();
      // this.imgDisplay();
    },
  },
  // mounted() {
  //   this.pullPokeInfo();
  // },
};
</script>
<style scoped>
h1 {
  font-size: 3rem;
  color: rgba(256, 0, 0, 0.7);
}
form input {
  background: #aaa;
  font-size: 1.5rem;
  height: 2rem;
}
form input[type="submit"] {
  background: rgba(256, 0, 0, 0.7);
  margin-left: 1rem;
}
.pulledData {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.pulledimgs {
  display: flex;
  flex-direction: column;
  color: #fff;
  background: #333;
}
.maleDiv,
.femaleDiv {
  display: flex;
}
.inGameDescriptions {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}
.views {
  border: 1px solid #000;
  height: 10rem;
  width: 10rem;
  padding: 1rem;
}
.descriptions {
  height: 17rem;
  width: 10rem;
  margin: 1rem;
  border: 1px solid #000;
}
</style>