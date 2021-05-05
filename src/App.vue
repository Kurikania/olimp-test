<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@font-face {
  font-family: "ALSS";
  src: url('~@/assets/scss/design-tokens/ALSS/ALSSchlangesans.otf')  format('opentype');
      font-weight: normal;
    font-style: normal;
}


#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  font-family: "ALSS", Helvetica, Arial;
  font-size: 1em;
}

html, header {
    margin-top: 0;
  }
</style>
