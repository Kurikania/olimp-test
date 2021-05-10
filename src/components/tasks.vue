<template >
  <div class="contain">
    <div class="task display-column">
      <h3>Задания</h3>
      <p>
        Максимально быстро найдите ответ на вопрос и оцените сложность выполнения каждого задания. Пожалуйста не пользуйтесь поиском по странице. 
        <br> Уведомление: Поиск по странице отключен для чистоты эксперимента
      </p>
      <task-item
        @info="onInfo"
        v-for="(question, index) in questions"
        :key="question"
        :question="question"
        :index="index"
      >
      </task-item>
      <button @click="send">Закончить эксперимент</button>
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
        "1. Что изучалась в рамках программирования в этом проекте (укажите название ветки)?",
        "2. Когда была начата работа над модульными платами драйвера шагового двигателя (схемотехника)",
        "3. Сколько записей было сделано в разделе менеджмент за все время ведения данного журнала? ",
        "4. В каком месяце случился самый длинный перерыв в ходе ведения проекта? ",
        "5. Сколько тем было затронуто в разделе конструирование?",
      ],
      form: [],
    };
  },
  components: { TaskItem },
  props: ['userInfo', 'withTree'],
  methods: {
    send() {
      console.log(" Is form ", this.form)
      console.log(" Is not filled", this.form.filter(a => a.isFilled == false))
      console.log("this.userInfo",this.userInfo)
      if(this.form.some(a => a.isFilled == false)) {
        console.warn(" Is not filled",this.form.some(a => a.isFilled == false))
        alert("Пожалуйста, заполните все поля")
        return
      }
      if(!this.userInfo) {        
        alert("Нет данных о пользователе, вернитесь на предыдущую страницу")
        return
      }
     
      axios.post(`${process.env.VUE_APP_SERVER_URL}/api/post`, {questions: this.form, userInfo: this.userInfo, withTree: this.withTree}).then(() => {
        this.$router.replace({ path: "/finish" , params: { id: this.userInfo.id }});
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
    height: 24px;
    background: #ffffff;
    border: 1px solid #6f47eb;
    color: #6f47eb;
    box-sizing: border-box;
    border-radius: 4px;
    font-weight: bold;
      &:hover {        
        color: #ffffff;
        background-color: #6f47eb;
      }
      transition: all 1s cubic-bezier(0.075, 0.82, 0.165, 1);
  }
  .task {
    h3 {
      margin: 10px 0;
    }
    max-height: 100vh;
    width: 260px;
    // height: fit-content;
    overflow: auto;
    font-size: 0.94em;
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