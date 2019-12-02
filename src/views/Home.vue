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
              <p class="text-center font-weight-bold">Ecole</p>
            </div>
            <div class="col-lg-9">
              <div v-for="school of schools" class="form-check form-check-inline" v-bind:key="school.id">
                <input class="form-check-input" type="checkbox" :id="school" :value="school"
                       v-model="checkedSchools">
                <label class="form-check-label" :for="school">{{ school | capitalize }}</label>
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
          <div class="row">
            <div class="col-lg-3">
              <p class="text-center font-weight-bold">Description du sort</p>
            </div>
            <div class="col-lg-9">
              <textarea name="description" id="description" class="form-control" v-model="description"></textarea>
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

    <h3 class="text-center" id="similarities">{{ spells.length }} <span
        v-if="spells.length > 1">correspondances</span><span v-else>correspondance</span></h3>

    <div class="row">
      <div class="col-lg-6">
        <h4 class="text-center">Sorts</h4>
        <hr>
        <div id="spells">
          <div v-for="spell of spells" v-bind:key="spell.name">
            <div class="row">
              <div class="col-lg-9">
                <p v-on:click="showCreatures(spell)" class="spell" v-bind:class="{ 'text-danger': selectedSpell === spell.name }">
                  {{ spell.name }}
                </p>
              </div>
              <div class="col-lg-3">
                <a :href="'https://www.d20pfsrd.com/magic/all-spells/' + spell.name.charAt(0) + '/' + spell.name.replace(' ', '-')" target="_blank">Lien</a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-lg-6">
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
        resistance: false,
        description: "",
        classes: ['sorcerer/wizard', 'druid', 'cleric/oracle', 'ranger', 'paladin',
          'alchemist', 'summoner', 'witch', 'inquisitor', 'antipaladin', 'magus',
          'adept', 'bloodrager', 'shaman', 'bard'],
        checkedClasses: [],
        schools: ['abjuration', 'conjuration', 'divination', 'enchantment', 'evocation', 'illusion', 'necromancy', 'transmutation'],
        checkedSchools: [],
        components: ['V', 'S', 'M'],
        checkedComponenents: []
      }
    },
    methods: {
      search() {
        SpellService.search(this.spellName, this.checkedSchools, this.checkedComponenents, this.checkedClasses, this.description).then(res => {
          this.spells = res.data.data;
          this.creatures = [];
          this.selectedSpell = "";
          let container = this.$el.querySelector("#similarities");
          this.$scrollTo(container, 500);
        })
      },
      showCreatures(spell) {
        this.creatures = this.spells.find(element => element === spell).creatures;
        this.selectedSpell = spell.name;
      },
      clear() {
        this.checkedClasses = [];
        this.checkedComponenents = [];
        this.checkedSchools = [];
        this.spellName = "";
        this.description = "";
      }
    },
    filters: {
      capitalize: function (word) {
        return word.charAt(0).toUpperCase() + word.slice(1);
      },
      firstLetter: function (word) {
        return word.charAt(0);
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

  .spell:hover {
    color: rgb(220, 0, 78);
  }

  #spells, #creatures {
    height: 500px;
    overflow-y: auto;
  }
</style>
