<template>
  <router-link to="/statcomparison">Compare Base Stats</router-link>
  <h1>Pokédex</h1>
  <form @submit.prevent="setPokemonName">
    <input
      @keydown="imgDisplayIsFalse"
      @click="imgDisplayIsFalse"
      type="text"
      id="pokeSearchText"
      name="pokeSearchText"
      placeholder="Pokémon Name.."
    />
    <input type="submit" value="Pokédex Search" />
  </form>

  <div v-if="this.searchTrue" class="pulledData">
    <h1>{{ currentPokemonName }}</h1>
    <div class="pulledimgs">
      <div class="maleDiv">
        <div class="views">
          <p>Front:</p>
          <img v-bind:src="this.imgPulls.front_default" />
        </div>
        <div class="views">
          <p>Back:</p>
          <img v-bind:src="this.imgPulls.back_default" />
        </div>
        <div class="views">
          <p>Shiny Front:</p>
          <img v-bind:src="this.imgPulls.front_shiny" />
        </div>
        <div class="views">
          <p>Shiny Back:</p>
          <img v-bind:src="this.imgPulls.back_shiny" />
        </div>
      </div>
      <div v-if="this.femaleOption" class="femaleDiv">
        <div class="views">
          <p>Female Front:</p>
          <img v-bind:src="this.imgPulls.front_female" />
        </div>
        <div class="views">
          <p>Female Back:</p>
          <img v-bind:src="this.imgPulls.back_female" />
        </div>
        <div class="views">
          <p>Shiny Female Front:</p>
          <img v-bind:src="this.imgPulls.front_shiny_female" />
        </div>
        <div class="views">
          <p>Shiny Female Back:</p>
          <img v-bind:src="this.imgPulls.back_shiny_female" />
        </div>
      </div>
    </div>
    <button
      @click="
        imgDisplayIsFalse();
        pullPokeInfo(this.evolutionChainPull);
      "
    >
      {{ evolutionChainPull }}
    </button>
    <h2>In Game Descriptions: {{ currentLanguage }}</h2>
    <label for="languages">Pick Language:</label>
    <select name="languages" id="languages" v-model="currentLanguage">
      <option value="english">English</option>
      <option value="spanish">Español</option>
      <option value="french">Français</option>
      <option value="japanese">日本語</option>
    </select>
    <div class="inGameDescriptions">
      <div v-if="currentLanguage === `english`">
        <div
          v-for="object in englishDescriptions"
          :key="object"
          class="descriptions"
        >
          <p>
            <strong>{{ capitalizeFirstLetter(object.version.name) }}:</strong>
            <br />{{ object.flavor_text }}
          </p>
        </div>
      </div>
      <div v-if="currentLanguage === `spanish`">
        <div
          v-for="object in spanishDescriptions"
          :key="object"
          class="descriptions"
        >
          <p>
            <strong>{{ capitalizeFirstLetter(object.version.name) }}:</strong>
            <br />{{ object.flavor_text }}
          </p>
        </div>
      </div>
      <div v-if="currentLanguage === `french`">
        <div
          v-for="object in frenchDescriptions"
          :key="object"
          class="descriptions"
        >
          <p>
            <strong>{{ capitalizeFirstLetter(object.version.name) }}:</strong>
            <br />{{ object.flavor_text }}
          </p>
        </div>
      </div>
      <div v-if="currentLanguage === `japanese`">
        <div
          v-for="object in japaneseDescriptions"
          :key="object"
          class="descriptions"
        >
          <p>
            <strong>{{ capitalizeFirstLetter(object.version.name) }}:</strong>
            <br />{{ object.flavor_text }}
          </p>
        </div>
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
      imgPulls: {
        front_default: [],
        back_default: [],
        front_shiny: [],
        back_shiny: [],
        front_female: [],
        back_female: [],
        front_shiny_female: [],
        back_shiny_female: [],
      },
      englishDescriptions: [],
      spanishDescriptions: [],
      japaneseDescriptions: [],
      frenchDescriptions: [],
      searchTrue: false,
      currentPokemonName: [],
      currentPokemonUrl: [],
      pokemonUrlDataReturn: [],
      femaleOption: [],
      currentLanguage: "",
      evolutionChain: [],
      evolutionChainPull: [],
    };
  },
  computed: {
    languageSelect: {
      get() {
        return document.getElementById("languages").value;
      },
    },
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
    setPokemonName(submitEvent) {
      this.pullPokeInfo(submitEvent.target.elements.pokeSearchText.value);
    },
    async pokemonUrlData() {
      let pokemonUrl = await axios.get(this.currentPokemonUrl);
      console.log(pokemonUrl);
      this.pokemonUrlDataReturn = pokemonUrl.data.flavor_text_entries;
      this.evolutionChain = pokemonUrl.data.evolution_chain.url;
      let evolutions = await axios.get(this.evolutionChain);
      this.evolutionChainPull = evolutions.data.chain.species.name;
      console.log(this.evolutionChainPull);
      // Cleaning up rendering for images
      this.femaleOption = pokemonUrl.data.has_gender_differences;
      for (let i = 0; i < this.pokemonUrlDataReturn.length; i++)
        if (pokemonUrl.data.flavor_text_entries[i].language.name === "en") {
          this.englishDescriptions.push(pokemonUrl.data.flavor_text_entries[i]);
        } else if (
          pokemonUrl.data.flavor_text_entries[i].language.name === "es"
        ) {
          this.spanishDescriptions.push(pokemonUrl.data.flavor_text_entries[i]);
        } else if (
          pokemonUrl.data.flavor_text_entries[i].language.name === "fr"
        ) {
          this.frenchDescriptions.push(pokemonUrl.data.flavor_text_entries[i]);
        } else if (
          pokemonUrl.data.flavor_text_entries[i].language.name === "ja"
        ) {
          this.japaneseDescriptions.push(
            pokemonUrl.data.flavor_text_entries[i]
          );
        }
    },
    async pullPokeInfo(pokemon) {
      let baseUrl =
        "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/";
      let pulledInfo = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemon}`
      );
      console.log(pulledInfo);
      this.currentPokemonName = this.capitalizeFirstLetter(
        pulledInfo.data.name
      );
      this.currentPokemonUrl = pulledInfo.data.species.url;
      // Specifying images
      this.imgPulls.front_default = `${baseUrl}${pulledInfo.data.id}.png`;
      this.imgPulls.back_default = `${baseUrl}back/${pulledInfo.data.id}.png`;
      this.imgPulls.front_shiny = `${baseUrl}shiny/${pulledInfo.data.id}.png`;
      this.imgPulls.back_shiny = `${baseUrl}back/shiny/${pulledInfo.data.id}.png`;
      this.imgPulls.front_female = `${baseUrl}female/${pulledInfo.data.id}.png`;
      this.imgPulls.back_female = `${baseUrl}back/female/${pulledInfo.data.id}.png`;
      this.imgPulls.front_shiny_female = `${baseUrl}shiny/female/${pulledInfo.data.id}.png`;
      this.imgPulls.back_shiny_female = `${baseUrl}back/shiny/female/${pulledInfo.data.id}.png`;
      // seconday data actions
      this.pokemonUrlData();
      this.imgDisplay();
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