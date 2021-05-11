<template>
  <div class="finish" style="height: 100vh">
    <div>
      <h4>
        Спасибо за уделенное время! Вы очень поможете если поделитесь ссылкой на
        этот эксперимент со своими знакомыми
      </h4>
      <!-- <div class="form__item">
        Оцените, насколько сложно было выполнить поставленные задачи? (от 1 до
        10)
        <select
          v-model="complexity"
          id="complexity"
          name="filters"
        >
          <option v-for="option in 10" :value="option" :key="option">
            {{ option }}
          </option>
        </select>
      </div> -->
      <div class="form__item">
        Как вы считаете, как можно улучшить данный интерфейс? <br />
        <br />
        <textarea v-model="improvments" cols="50" rows="5" />
      </div>
      <div class="form__item">
        Ваши комментарии о процессе проведения эксперимента, что было не
        понятно, не удобно, с какими сложностями столкнулись <br />
        <br />
        <textarea v-model="comments" cols="50" rows="5" />
      </div>
    </div>
    <button @click="send">Отправить</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  props: ["id"],
  data() {
    return {
      improvments: null,
      comments: null,
    };
  },
  methods: {
    send() {
      let id = this.$attrs.id;
      console.log(id);
      axios
        .post(`${process.env.VUE_APP_SERVER_URL}/api/comments`, {
          improvments: this.improvments,
          comments: this.comments,
          userId: id,
        })
        .then(() => {
          alert("Ответ принят!");
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss">
.finish {
  button {
    font-weight: bold;
    padding: 5px;
    background: #ffffff;
    border: 1px solid #6f47eb;
    color: #6f47eb;
    border-radius: 4px;
  }
  display: flex;
  flex-direction: column;
  max-width: 800px;
  width: 100%;
  margin: auto;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  .form__item {
    text-align: center;
    padding-bottom: 30px;
    max-width: 400px;
    margin: auto;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  textarea {
    border: 1px solid #6f47eb;
  }
}
</style>
