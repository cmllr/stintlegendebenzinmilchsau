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
          div.col-9 {{ $store.state.timezone }}
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
            div.col-12 {{ $store.state.times.qualy }}
          div.col-6.row
            div.col-12 warmup
            div.col-12 {{ $store.state.times.warmup}}
          div.col-6.row
            div.col-12 briefing
            div.col-12 {{ $store.state.times.briefing }}
          div.col-6.row
            div.col-12 race
            div.col-12 {{ $store.state.times.race }}
       
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
            span.badge.badge-light(:style='"background-color:" + driver.color ',v-on:click="editDriver(driver)") {{ driver.short }} 
            i(title='start driver', v-if='isStartMember(driver, false)').fas.fa-car-side.driver-icon
            i(title='start spotter', v-if='isStartMember(driver, true)').fas.fa-binoculars.driver-icon
            i(title='end driver', v-if='isEndMember(driver, false)').fas.fa-flag-checkered.driver-icon
            a(href='#', v-on:click.prevent='removeDriver(driver)')
              i.fas.fa-trash
        div.row
          div.row.col(v-for='(driver, driver_key) in $store.state.drivers', :key='driver_key') 
            div.col-12 {{ getDriverString(driver) }} 
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
    h1 race 
    a.btn.btn-primary(v-on:click='addEmptyStint') add stint
    hr
    div.row
      div.col-12
        table.table.table-bordered.col-12
          thead
            tr
              th(scope='col') #
              th(scope='col') 
              th(scope='col') START
              th(scope='col') END
              th(scope='col') LENGTH
              th(scope='col') DRIVER
              th(scope='col') SPOTTER
              th(scope='col') Change driver
              th(scope='col') Change spotter
              th(scope='col') Delete
            tr(v-for='(stint, stint_key) in stints', :key='stint_key')
              td {{ stint_key + 1}}
              td 
                div.col-12 
                  a(href='#',v-on:click.prevent='moveStint(-1,stint_key)').far.fa-arrow-alt-circle-up
                div.col-12
                  a(href='#',v-on:click.prevent='moveStint(1,stint_key)').far.fa-arrow-alt-circle-down
              td {{ formatDate(stint.start) }}
              td {{ formatDate(stint.end) }}
              td.col-1 
                input(class='form-control', type='number', v-model.number='stint.length', @change='updateStints') 
              td(:style='"background-color: " + stint.driver.color ').driver-stint {{ stint.driver.short }}
              td(:style='"background-color: " + stint.spotter.color ').driver-stint {{ stint.spotter.short }}
              td 
                select(class='form-control',v-model='stint.driver', @change='updateStints')
                  option(v-for="(driver, driver_key) in $store.state.drivers", :key='driver_key', :value='driver') {{ driver.firstName + ' ' + driver.lastName}} 
              td  
                select(class='form-control',v-model='stint.spotter', @change='updateStints')
                  option(v-for="(driver, driver_key) in $store.state.drivers", :key='driver_key', :value='driver') {{ driver.firstName + ' ' + driver.lastName}}
              td
                a(href='#', v-on:click.prevent='removeStint(stint_key)') 
                  i.fas.fa-trash
      div.col-1
      div.col-5

</template>

<script>
import { Compact } from 'vue-color'
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
      }
    }
  },
  mounted() {
    this.stints = this.calculateStints()
  },
  methods: {
    isStartMember(driver, isSpotter) {
      if (this.stints.length > 0) {
        return (
          (!isSpotter && this.stints[0].driver.short === driver.short) ||
          (isSpotter && this.stints[0].spotter.short === driver.short)
        )
      }
      return false
    },
    isEndMember(driver, isSpotter) {
      if (this.stints.length > 0) {
        return (
          (!isSpotter &&
            this.stints[this.stints.length - 1].driver.short ===
              driver.short) ||
          (isSpotter &&
            this.stints[this.stints.length - 1].spotter.short === driver.short)
        )
      }
      return false
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
      return date.toLocaleTimeString()
    },
    calculateStints() {
      var stints = []
      var raceStart = this.$store.state.times.race
      var raceStartDateTime = new Date()
      raceStartDateTime.setUTCMinutes(0)
      raceStartDateTime.setUTCHours(12)
      raceStartDateTime.setUTCSeconds(0)
      console.log(raceStartDateTime)
      var lastTime = raceStartDateTime
      this.$store.state.stints.forEach(element => {
        var clone = this.copy(element)
        clone['driver'] = this.getDriverByShortCode(element.driver)
        clone['spotter'] = this.getDriverByShortCode(element.spotter)
        clone['start'] = new Date(lastTime.getTime())
        clone['end'] = new Date(lastTime.addMinutes(clone.length))
        lastTime = new Date(clone['end'].getTime())
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
</style>
