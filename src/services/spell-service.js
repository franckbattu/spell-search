const axios = require('axios').default;

export class SpellService {

  static search(spellName, components, classes) {
    return axios.post('http://localhost:8000/spells', {
      spellName,
      components,
      classes
    })
  }

}
