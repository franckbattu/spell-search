const axios = require('axios').default;

export class SpellService {

  static search(spellName, schools, components, classes, description) {
    return axios.post('http://localhost:8000/spells', {
      spellName,
      schools,
      components,
      classes,
      description
    })
  }

}
