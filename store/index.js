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
        color: 'fuchsia',
        short: 'MTO'
      },
      {
        firstName: 'Christoph',
        lastName: 'Mueller',
        color: 'green',
        short: 'CHM'
      },
      {
        firstName: 'Marius',
        lastName: 'van Wyk',
        color: 'red',
        short: 'MVW'
      },
      {
        firstName: 'Rob',
        lastName: 'Timpen',
        color: 'yellow',
        short: 'RT'
      },
      {
        firstName: 'Daryl',
        lastName: 'Russell',
        color: '#00008366',
        short: 'DRL'
      },
      {
        firstName: 'Niklas',
        lastName: 'Probadnik',
        color: 'brown',
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

const createStore = () => {
  return new Vuex.Store(indexStore)
}
export default createStore
