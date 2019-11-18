<template>
  <div class="container mt-4 mb-5">
    <h2 class="text-center mb-4">Recherche de sorts</h2>
    <div class="card">
      <div class="card-body">
        <form action="">
          <div class="row">
            <div class="col-lg-3">
              <p class="text-center font-weight-bold">Classe</p>
            </div>
            <div class="col-lg-9">
              <div v-for="classe of classes" class="form-check form-check-inline" v-bind:key="classe.id">
                <input class="form-check-input" type="checkbox" :id="classe" :value="classe" v-model="checkedClasses">
                <label class="form-check-label" :for="classe">{{ classe | capitalize }}</label>
              </div>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-3">
              <p class="text-center font-weight-bold">Composantes</p>
            </div>
            <div class="col-lg-9">
              <div v-for="component of components" class="form-check form-check-inline" v-bind:key="component.id">
                <input class="form-check-input" type="checkbox" :id="component" :value="component"
                       v-model="checkedComponenents">
                <label class="form-check-label" :for="component">{{ component }}</label>
              </div>
            </div>
          </div>
          <br>
          <div class="row">
            <div class="col-lg-3">
              <p class="text-center font-weight-bold">Nom du sort</p>
            </div>
            <div class="col-lg-9">
              <div class="form-group">
                <input class="form-control" type="text" :id="spellName" v-model="spellName">
              </div>
            </div>
          </div>
        </form>
      </div>
      <div class="card-footer">
        <div class="text-center">
          <button class="btn btn-danger mr-1" @click="clear">Vider filtres</button>
          <button class="btn btn-success" @click="search">Rechercher</button>
        </div>
      </div>
    </div>

    <br>

    <h3 class="text-center" id="similarities">{{ spells.length }} <span v-if="spells.length > 1">correspondances</span><span v-else>correspondance</span></h3>

    <div class="row">
      <div class="col-lg-6">
        <h4 class="text-center">Sorts</h4>
        <hr>
        <div id="spells">
          <p v-for="spell of spells" v-bind:key="spell.name" @click="showCreatures(spell)" class="spell">
            {{ spell.name }}
          </p>
        </div>
      </div>
      <div class="col-lg-6" >
        <h4 class="text-center">Créatures pour <span class="font-weight-bold">{{ selectedSpell }}</span></h4>
        <hr>
        <div id="creatures">
          <p v-for="creature of creatures" v-bind:key="creature.id">
            {{ creature }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

  import {SpellService} from "../services/spell-service";

  export default {
    name: 'app',
    data() {
      return {
        spells: [],
        selectedSpell: "",
        creatures: [],
        spellName: "",
        checkedClasses: [],
        classes: ['sorcerer/wizard', 'druid', 'cleric/oracle', 'ranger', 'paladin',
          'alchemist', 'summoner', 'witch', 'inquisitor', 'antipaladin', 'magus',
          'adept', 'bloodrager', 'shaman', 'bard'],
        components: ['V', 'S', 'M'],
        checkedComponenents: []
      }
    },
    methods: {
      reset() {
        this.creatures = [];
        this.selectedSpell = '';
      },
      search() {
        SpellService.search(this.spellName, this.checkedComponenents, this.checkedClasses).then(res => {
          this.spells = res.data.data;
          this.reset();
          let container = this.$el.querySelector("#similarities");
          this.$scrollTo(container, 400);

        })
      },
      showCreatures(spell) {
        this.reset();
        this.creatures = this.spells.find(element => element === spell).creatures;
        this.selectedSpell = spell.name;
      },
      clear() {
        this.checkedClasses = [];
        this.checkedComponenents = [];
        this.spellName = "";
      }
    },
    filters: {
      capitalize: function(word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      }
    }
  }
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Alatsi&display=swap');

  body {
    font-family: Alatsi, sans-serif;
  }

  .spell {
    cursor: pointer;
  }

  #spells, #creatures {
    height: 500px;
    overflow-y: auto;
  }
</style>
