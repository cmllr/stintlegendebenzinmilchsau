<template lang="pug">
  div.container
    nav.navbar.navbar-light.bg-light
      a.navbar-brand 
        img(src='~/assets/logo.png',class="d-inline-block align-top",width="100px") 
        span  stintlegendebenzinmilchsau
      span.navbar-text {{ $store.state.urls.public }}
    nuxt
</template>

<style>
</style>
