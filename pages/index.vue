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

      div.col-6.row
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
      div.col driver
      div.col driver
      div.col driver
      div.col driver
      div.col driver
    div.row
      div.col drivername
      div.col drivername
      div.col drivername
      div.col drivername
      div.col drivername
    h1 race
    div.row
      div.col-6
        table.table.table-bordered.col-12
          thead
            tr
              th(scope='col') START
              th(scope='col') END
              th(scope='col') LENGTH
              th(scope='col') DRIVER
              th(scope='col') SPOTTER
              th(scope='col') REMARKS
            tr
              td 12:00
              td 13:00
              td 1,00
              td foo bar
              td bar barz
              td regular length
      div.col-1
      div.col-5

</template>

<script>
export default {}
</script>

<style>
</style>
