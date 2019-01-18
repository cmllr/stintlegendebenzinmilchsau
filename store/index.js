import Vapi from 'vuex-rest-api'
import Vuex from 'vuex'

const indexStore = new Vapi({
  baseURL: 'MISSING',
  state: {
    urls: {
      public: 'https://stints.seawolf-netrace.de/hpx2has/',
      private: 'https://stints.seawolf-netrace.de/hpx2has/23jkl/'
    },
    series: 'M1 Endurance',
    race: '12+11,5 hours of server admin rage quit',
    date: 'alreadyforgot',
    timezone: 'gmt+1',
    times: {
      qualy: '12:00',
      warmup: '13:00',
      briefing: '14:00',
      race: '15:00'
    },
    entry: {
      class: 'LMP 2',
      car: 'Oreca 07',
      setup: 'T12_test.svm'
    },
    drivers: [
      {
        firstName: 'Marcello',
        lastName: 'Tocco',
        color: '#4286f4',
        short: 'MTO'
      },
      {
        firstName: 'Christoph',
        lastName: 'Mueller',
        color: '#4286f4',
        short: 'CHM'
      },
      {
        firstName: 'Marius',
        lastName: 'van Wyk',
        color: '#4286f4',
        short: 'MVW'
      },
      {
        firstName: 'Rob',
        lastName: 'Timpen',
        color: '#4286f4',
        short: 'RT'
      },
      {
        firstName: 'Daryl',
        lastName: 'Russell',
        color: '#4286f4',
        short: 'DRL'
      },
      {
        firstName: 'Niklas',
        lastName: 'Probadnik',
        color: '#4286f4',
        short: 'NPK'
      }
    ],
    stints: [
      {
        length: 60,
        driver: 'NPK',
        spotter: 'RT',
        remarks: ''
      },
      {
        length: 60,
        driver: 'CHM',
        spotter: 'MTO',
        remarks: 'bar'
      },
      {
        length: 90,
        driver: 'DRL',
        spotter: 'RT',
        remarks: 'foo'
      }
    ]
  }
}).getStore()

indexStore.mutations.updateStints = (state, newStints) => {
  state.stints = newStints
}
indexStore.mutations.removeDriver = (state, driver) => {
  state.drivers.splice(state.drivers.indexOf(driver), 1)
}
indexStore.mutations.addDriver = (state, driver) => {
  state.drivers.push(driver)
}
const createStore = () => {
  return new Vuex.Store(indexStore)
}
export default createStore
