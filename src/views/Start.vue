<template>
  <div class="about">
    <h1>Описание эксперимента</h1>
    
      <button @click="start"> Начать </button>

  </div>
</template>

<script>
export default {
  methods: {
    start() {
      if(Math.random() > 0.5) {
        this.$router.replace({ path: '/experiment'})
      }
      else {
        this.$router.replace({ path: '/experiment2'})
      }
    }
  }
}
</script>
