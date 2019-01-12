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
    }
  }
}).getStore()

const createStore = () => {
  return new Vuex.Store(indexStore)
}
export default createStore
