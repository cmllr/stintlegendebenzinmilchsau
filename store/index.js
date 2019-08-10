import Vapi from 'vuex-rest-api'
import Vuex from 'vuex'

const indexStore = new Vapi({
  baseURL: 'MISSING',
  state: {
    config: {
      name: 'stints legende benzinmilchsau'
    },
    urls: {
      public: 'https://stints.seawolf-netrace.de/hpx2has/',
      private: 'https://stints.seawolf-netrace.de/hpx2has/23jkl/'
    },
    series: 'M1 Endurance',
    raceName: '12+11,5 hours of server admin rage quit',
    date: '2019-01-01',
    timezone: 'Europe/London', //timezone (local)
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
    drivers: [],
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
// Mutations for all common values
indexStore.mutations.updateSeries = (state, series) => {
  state.series = series
}
indexStore.mutations.updateRaceName = (state, race) => {
  state.raceName = race
}
indexStore.mutations.updateDate = (state, date) => {
  state.date = date
}
indexStore.mutations.updateTimes = (state, payload) => {
  state.times[payload.time] = payload.value
}
const createStore = () => {
  return new Vuex.Store(indexStore)
}
export default createStore
