<template lang="pug">
  div.container
    nav.navbar.navbar-light.bg-light
      a.navbar-brand 
        img(src='~/assets/logo.png',class="d-inline-block align-top",height="30px") 
        span  {{ $store.state.config.name }}
      span.navbar-text {{ $store.state.urls.public }}
    nuxt
</template>

<style>
</style>
