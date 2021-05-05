<template >
  <div class="contain">
    <div class="task display-column">
      <h3>Задания <button @click="send">Send</button></h3>
      <task-item
        @info="onInfo"
        v-for="(question, index) in questions"
        :key="question"
        :question="question"
        :index="index"
      >
      </task-item>
    </div>
  </div>
</template>

<script>
import TaskItem from "./task_item";
import axios from "axios";
export default {
  data() {
    return {
      questions: [
        "1. Какая тема изучалась в рамках программирования в этом проекте?",
        "2. Когда была начата работа над модульными платами драйвера шагового двигателя (схемотехника)",
        "3. Сколько записей было сделано в разделе менеджмент за все время ведения данного журнала? ",
        "4. В каком месяце случился самый длинный перерыв в ходе ведения проекта? ",
        "5. Сколько тем было затронуто в разделе схемотехники?",
      ],
      form: [],
    };
  },
  components: { TaskItem },
  props: ['userInfo'],
  methods: {
    send() {
      console.log(this.userInfo)
      console.log(process.env.VUE_APP_SERVER_URL);
      axios.post(`${process.env.VUE_APP_SERVER_URL}/post`, {questions: this.form, userInfo: this.userInfo}).then(() => {
        this.$router.replace({ path: "/finish" });
      }).catch((err) => console.log(err));
    },
    onInfo(data) {
      this.form[data.index] = data;
      console.log(data);
    },
  },
};
</script>

<style  lang="scss">
.contain {
  button {
    display: inline-block;
  }
  .task {
    h3 {
      margin: 10px 0;
    }
    max-height: 100vh;
    width: 260px;
    // height: fit-content;
    overflow: auto;

    border: 1px solid black;
    box-sizing: border-box;
    border-radius: 4px;
    padding: 7px 10px;
    text-align: left;
    position: sticky;
    top: 0;
    &__item {
      padding-bottom: 10px;
      &-submit {
        display: flex;
        width: 100%;
      }
      button {
        display: inline-block;
      }
      input {
        max-width: 60%;
      }
    }
  }
}
</style>