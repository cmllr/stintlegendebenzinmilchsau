<template lang="pug">
  div
    h1 facts
    div.row
      div.col-6.row
        div.col-12.row
          div.col-3 series
          div.col-9 {{ $store.state.series }}
        div.col-12.row
          div.col-3 race
          div.col-9 {{ $store.state.race }}
        div.col-12.row 
          div.col-3 date
          div.col-9 {{ $store.state.date }}
        div.col-12.row 
          div.col-3 timezone
          div.col-9 
            select(class='form-control', v-model="displayTimezone", @change="stints = calculateStints()")
              option(v-for="(timezone, timezone_key) in timezones", :key="timezone_key") {{ timezone }}
        div.col-12.row 
          div.col-3 Edit link
          div.col-9 {{ $store.state.urls.private }}
        div.col-12.row 
          div.col-3 View only link
          div.col-9 {{ $store.state.urls.public }}
      div.col-4.row
        div.col-3
        div.col-9.row
          div.col-6.row
            div.col-12 qualy
            div.col-12 {{ convertTime($store.state.times.qualy).format('HH:mm') }}
          div.col-6.row
            div.col-12 warmup
            div.col-12 {{ convertTime($store.state.times.warmup).format('HH:mm') }}
          div.col-6.row
            div.col-12 briefing
            div.col-12 {{ convertTime($store.state.times.briefing).format('HH:mm') }}
          div.col-6.row
            div.col-12 race
            div.col-12 {{ convertTime($store.state.times.race).format('HH:mm') }}
       
    hr
    div.row
      div.col-6.row
        div.col-12.row
          div.col-3 class
          div.col-9 {{ $store.state.entry.class }}
        div.col-12.row
          div.col-3 car
          div.col-9 {{ $store.state.entry.car }}
        div.col-12.row
          div.col-3 setup
          div.col-9 {{ $store.state.entry.setup }}
    hr
    div.row
      div.col-10
        div.row
          div.col(v-for='(driver, driver_key) in $store.state.drivers', :key='driver_key')
            span.badge.badge-light(:style='"background-color:" + driver.color  + "; color:" + invertColor(driver.color)',v-on:click="editDriver(driver)") {{ driver.short }} 
            a(href='#', v-on:click.prevent='removeDriver(driver)')
              i.fas.fa-trash
        div.row
          div.row.col(v-for='(driver, driver_key) in $store.state.drivers', :key='driver_key') 
            div.col-12 {{ getDriverString(driver) }} 
        div.row
          div.row.col(v-for='(driver, driver_key) in $store.state.drivers', :key='driver_key') 
            div.col-2
              i.fas.fa-car
            div.col-9 {{ Number.parseFloat(driveTimes[driver.short]/60).toPrecision(4) }} h
            div.col-2
              i.fas.fa-binoculars
            div.col-9 {{ Number.parseFloat(spotterTimes[driver.short]/60).toPrecision(4) }} h
      div.col-1 
        a(href='#',@click="driverEditData.dialogOpen = !driverEditData.dialogOpen") add driver...
    div.row(v-if="driverEditData.dialogOpen")
      div.col-4
      div.col-4
        div.form-group
          label first name
          input.form-control(placeholder='first name',v-model="driverEditData.firstName")
        div.form-group
          label last name
          input.form-control(placeholder='last name',v-model="driverEditData.lastName")
        div.form-group
          label short code
          input.form-control(placeholder='last name',v-model="driverEditData.short")
        div.form-group
          compact-picker(v-model="driverEditData.color")
        div.form-group
          button(class='btn btn-primary',v-on:click="addDriver") add
    hr
    a(href='#', v-on:click='addEmptyStint') add stint
    div.row
      div.col-12.row
        div.col-2
        table.table.col-8.table-striped.table-hover
          thead
            tr
              th(scope='col') #
              th(scope='col') stint
              th(scope='col') length
              th(scope='col') driver
              th(scope='col') spotter
              th(scope='col') actions
            tr(v-for='(stint, stint_key) in stints', :key='stint_key')
              td 
                div.row
                  div.col-12
                    a(href='#',v-on:click.prevent='moveStint(-1,stint_key)').far.fa-arrow-alt-circle-up
                  div.col-12
                    a(href='#',v-on:click.prevent='moveStint(1,stint_key)').far.fa-arrow-alt-circle-down
              td.col-2  {{ formatDate(stint.start) }} - {{ formatDate(stint.end) }}
              td.col-2 
                input(class='form-control', type='number', v-model.number='stint.length', @change='updateStints') 
              td.col-3(class="stint-name",:style='"border-left-color: " + stint.driver.color')
                span.driver-shortcode(v-if="!stint.editing",v-on:click.prevent='stint.editing = !stint.editing') {{ stint.driver.lastName }} 
                select(class='form-control',v-model='stint.driver', v-if="stint.editing", @change='updateStints')
                  option(v-for="(driver, driver_key) in $store.state.drivers", :key='driver_key', :value='driver') {{ driver.firstName + ' ' + driver.lastName}} 
              td.col-3(class="stint-name",:style='"border-left-color: " + stint.spotter.color')
                span.driver-shortcode(v-if="!stint.editing",v-on:click.prevent='stint.editing = !stint.editing') {{ stint.spotter.lastName }}  
                select(class='form-control',v-model='stint.spotter', v-if="stint.editing", @change='updateStints')
                  option(v-for="(driver, driver_key) in $store.state.drivers", :key='driver_key', :value='driver') {{ driver.firstName + ' ' + driver.lastName}}
              td.col-2
                a(href='#', v-on:click.prevent='removeStint(stint_key)') 
                  i.fas.fa-trash
      div.col-1
      div.col-5

</template>

<script>
import { Compact } from 'vue-color'
import invert from 'invert-color'
import moment from 'moment'
import 'moment-timezone'
Date.prototype.addMinutes = function(minutes) {
  this.setTime(this.getTime() + minutes * 60 * 1000)
  return this
}
export default {
  components: {
    'compact-picker': Compact
  },
  data: () => {
    return {
      stints: [],
      driverEditData: {
        firstName: null,
        lastName: null,
        dialogOpen: false,
        color: 'black',
        short: null
      },
      displayTimezone: null
    }
  },
  computed: {
    timezones() {
      return moment.tz.names()
    },
    drivers() {
      return [...this.$store.state.drivers].sort(
        (a, b) => (a.short > b.short ? 1 : -1)
      )
    },
    driveTimes() {
      var result = {}
      this.drivers.forEach(driver => {
        result[driver.short] = 0
      })
      this.stints.forEach(stint => {
        result[stint.driver.short] += stint.length
      })
      return result
    },
    spotterTimes() {
      var result = {}
      this.drivers.forEach(driver => {
        result[driver.short] = 0
      })
      this.stints.forEach(stint => {
        result[stint.spotter.short] += stint.length
      })
      return result
    }
  },
  mounted() {
    this.stints = this.calculateStints()
    this.displayTimezone = this.$store.state.timezone
    window.addEventListener('keydown', this.closeAllStints)
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.closeAllStints)
  },
  methods: {
    convertTime(time) {
      var initial = moment.tz(
        this.$store.state.date + ' ' + time,
        this.$store.state.timezone
      )
      return initial.tz(
        this.displayTimezone ? this.displayTimezone : this.$store.state.timezone
      )
    },
    invertColor(color) {
      return invert(color)
    },
    copy(data) {
      return JSON.parse(JSON.stringify(data))
    },
    getDriverByShortCode(shortCode) {
      return this.$store.state.drivers.find(driver => {
        return driver.short === shortCode
      })
    },
    getDriverString(driver) {
      return driver.firstName + ' ' + driver.lastName
    },
    formatDate(date) {
      return moment.tz(date, this.displayTimezone).format('HH:mm')
    },
    calculateStints() {
      //TODO: Use timezone which is set
      var stints = []
      var raceStart = this.$store.state.times.race
      var raceStartDateTime = this.convertTime(raceStart).toDate()
      var lastTime = raceStartDateTime

      var timezoneAwareStart = moment
        .tz(
          this.$store.state.date + ' ' + raceStart,
          this.$store.state.timezone
        )
        .tz(
          this.displayTimezone
            ? this.displayTimezone
            : this.$store.state.timezone
        )
      var lastTimezoneAwareTime = timezoneAwareStart
      this.$store.state.stints.forEach(element => {
        var clone = this.copy(element)
        clone['editing'] = false
        clone['driver'] = this.getDriverByShortCode(element.driver)
        clone['spotter'] = this.getDriverByShortCode(element.spotter)
        clone['start'] = moment
          .tz(lastTimezoneAwareTime.format(), this.displayTimezone)
          .format()
        clone['end'] = lastTimezoneAwareTime
          .add(clone.length, 'minutes')
          .format()
        lastTimezoneAwareTime = moment.tz(clone['end'], this.displayTimezone)
        stints.push(clone)
      })
      return stints
    },
    addEmptyStint() {
      this.stints.push(this.copy(this.stints[this.stints.length - 1]))
      this.updateStints()
    },
    removeStint(index) {
      if (this.stints.length === 1) {
        return
      }
      this.stints.splice(index, 1)
      this.updateStints()
    },
    changeStintMembers(index, driver, isSpotter) {
      if (!isSpotter) {
        this.stints[index].driver = driver
      } else {
        this.stints[index].spotter = driver
      }
    },
    updateStints() {
      var rawStints = this.copy(this.stints)
      rawStints.forEach(element => {
        element.driver = element.driver.short
        element.spotter = element.spotter.short
      })
      this.$store.commit('updateStints', rawStints)
      this.stints = this.calculateStints()
    },
    moveStint(direction, index) {
      if (direction < 0 && index > 0) {
        var element = this.stints[index - 1]
        this.stints[index - 1] = this.stints[index]
        this.stints[index] = element
        this.updateStints()
      }
      if (direction > 0 && index < this.stints.length - 1) {
        var element = this.stints[index + 1]
        this.stints[index + 1] = this.stints[index]
        this.stints[index] = element
        this.updateStints()
      }
    },
    closeAllStints() {
      this.stints.forEach(s => {
        s.editing = false
      })
    },
    removeDriver(driver) {
      if (
        typeof this.stints.find(function(e) {
          return e.spotter === driver || e.driver === driver
        }) === 'undefined'
      ) {
        this.$store.commit('removeDriver', driver)
        this.updateStints()
      }
    },
    addDriver() {
      var old = this.$store.state.drivers.find(
        d => d.short === this.driverEditData.short // if already there -> update
      )
      if (old) {
        this.$store.commit('removeDriver', old) //dont use removeDriver b/c updateStints causes null...
      }
      this.$store.commit('addDriver', {
        firstName: this.driverEditData.firstName,
        lastName: this.driverEditData.lastName,
        short: this.driverEditData.short,
        color: this.driverEditData.color.hex
      })
      this.driverEditData.dialogOpen = false
      this.updateStints()
    },
    editDriver(driver) {
      this.driverEditData = this.copy(driver)
      this.driverEditData.dialogOpen = true
    }
  }
}
</script>

<style>
.driver-icon {
  margin-left: 1em;
}
.driver-stint {
  vertical-align: middle !important;
  text-align: center;
}
.stint-name {
  text-align: center;
  border-left-width: 15px;
  border-left-style: solid;
  vertical-align: middle;
}
</style>
