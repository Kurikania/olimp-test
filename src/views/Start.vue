<template>
  <div class="about">
    <h1>Описание эксперимента</h1>

    <h2>Расскажите немного о себе</h2>

    <div>
      <label for="prof"> Ваш род деятельности </label>
      <select id="prof" name="filters">
        <option value="student">Студент</option>
        <option value="worker">Работник</option>
      </select>
      <label for="gender"> Ваш пол </label>
      <select id="gender" name="gender">
        <option value="M">Мужской</option>
        <option value="F">Женский</option>
      </select>

      <label for="age"> Ваш возраст </label>
      <input type="number" name="age" id="age" />
    </div>

    <button @click="start">Начать</button>
  </div>
</template>

<script>
export default {
  methods: {
    start() {
      let p =  "p"
      if (Math.random() > 0.5) {
        this.$router.replace({name:'Home', params:{p}});
      } else {
        this.$router.replace({ name: "Experiment2", params:{p} });
      }
    },
  },
};
</script>
