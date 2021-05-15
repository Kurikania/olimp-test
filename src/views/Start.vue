<template>
  <div class="about">
    <div class="post">
      <div style="display: flex" > 
      <img style="width: 150px; display: block; padding-right: 10px" src="Sveta_circle.jpg">
      <div>
        <p>
          Здравствуйте, меня зовут Светлана, я учусь в магистратуре ИТМО на
          специальности дизайнера интерфейсов и провожу исследование о способах
          организации информации при документировании инженерных проектов.
        </p>
        <p>
          Участие в эксперименте займет около 15-20 минут и поможет мне собрать
          данные для своей ВКР. Пожалуйста, выполняйте задания с компьютера.
        </p>
      </div>
      </div>
      <p>
        После знакомства с интерфейсом вы увидите описание процесса разработки
        робота, в правой части экрана вы увидите вопросы (задания), на которые вам нужно
        будет максимально быстро найти ответ, и поля для ввода. <strong> Не волнуйтесь, мы тестируем
        интерфейс, а не вас. </strong> Если вы не нашли ответ отправьте в форме прочек
        (дефис).
      </p>
      <p>
        После ввода всех ответов вы перейдете на страницу с объявлением об
        удачном завершении эксперимента!
      </p>
    </div>

    <h3>Перед выполнением задания пожалуйста заполните анкету:</h3>

    <div class="form">
      <div class="form__group">
        <div class="form__item">
          <label for="age"> Укажите год рождения </label>
          <input v-model="userInfo.age" type="number" name="age" step="1" min="1900" max="2020" id="age" />
        </div>

        <div v-if="!otherEducation" class="form__item">
          <label for="education"> Образование </label>
          <select v-model="userInfo.education" id="education" name="filters">
            <option value="Среднее">Среднее</option>
            <option value="Среднее-специальное">Среднее-специальное</option>
            <option value="Студент">Студент</option>
            <option value="Бакалавр">Бакалавр</option>
            <option value="Магистрант">Магистрант</option>
            <option value="Магистр">Магистр</option>
            <option value="Аспирант">Аспирант</option>
          </select>
           <br>
          <input id="otherEducation" type="checkbox" v-model="otherEducation" />
          <label style="display: inline; font-size: 14px" for="otherEducation">
            Указать свой вариант
          </label>
        </div>

        <div v-if="otherEducation" class="form__item">
          <label for="prof"> Образование </label>
          <input
            v-model="userInfo.education"
            type="text"
            name="prof"
            id="prof"
          />
          <br>
          <input id="otherEducation" type="checkbox" v-model="otherEducation" />
          <label style="display: inline; font-size: 14px" for="otherEducation">
            Указать свой вариант
          </label>
        </div> 

        <div class="form__item">
          <label for="prof"> Специальность 
          </label>
          <input v-model="userInfo.prof" type="text" name="prof" id="prof" />
          <div class="small">
          *Укажите род деятельности, которым вы занимаетесь (планируете заниматься) профессионально. Если еще не определились — направление подготовки в университете
          </div>
        </div>

      </div>

      <div class="form__group">
        <div class="form__item">
          <label for="computerLevel">
            Насколько продвинутым пользователем себя считаете ?
          </label>
          <select
            v-model="userInfo.computerLevel"
            id="computerLevel"
            name="computerLevel"
          >
            <option value="1">
              1 - знаю как включить компьютер, умею работать с несколькими
              необходимыми программами
            </option>
            <option value="2">
              2 - умею работать с офисными программами, облачными хранилищами,
              электронной почтой и специализированными программами.
            </option>
            <option value="3">
              3 - смогу при необходимости установить нужные программы
            </option>
            <option value="4">
              4 - знаю устройство компьютера, могу с легкостью переустановить
              операционную систему и все программы самостоятельно
            </option>
          </select>
        </div>

        <div class="form__item">
          <label for="programming">
            Укажите опыт в программировании. 
          </label>
          <select
            v-model="userInfo.progExperience"
            id="computerLevel"
            name="computerLevel"
          >
            <option value="Нет">
              1 - Нет
            </option>
            <option value=" Когда-то изучал самостоятельно">
              2 - Когда-то изучал самостоятельно, выполнил несколько учебных упражнений
            </option>
            <option value="Изучал самостоятельно">
              3 - Изучал самостоятельно, смогу решить свои задачки вместе с гуглом
            </option>
            <option value="Изучал систематически">
              4 - Изучал систематически, умею выполнять проекты в выбранной области
            </option>
            <option value="Это мой основной вид деятельности">
              5 - Это мой основной вид деятельности, уверенно выполняю большинство проектов в выбранной области.
            </option>
          </select>
        </div>

        <div class="form__item">
          <label for="game">
            В поле ниже можно оставить комментарий к последнему вопросу.
          </label>
        <textarea
            v-model="userInfo.progComment"         
           cols="30"
           rows="4"
        />
        </div>
      </div>
    </div>
    <button v-if="!loading" @click="start">Начать</button>
    <button v-if="loading" disabled> Загрузка... </button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      number: null,
      otherEducation: false,
      loading: false,
      userInfo: {
        age: null,
        education: null,
        prof: null,
        computerLevel: null,
        progExperience: null,
        progComment: null,
      },
    };
  },
  methods: {
    start() {
      let userInfo = this.userInfo;
      if(!userInfo.age || !userInfo.education || !userInfo.prof  || !userInfo.computerLevel ) {
        alert("Пожалуйста, заполните все поля")
        return
      }
      
      this.loading = true
      axios
        .post(`${process.env.VUE_APP_SERVER_URL}/api/new`, {userInfo: this.userInfo })
        .then((response) => {
          userInfo.id = response.data.id
          localStorage.userInfo = JSON.stringify(this.userInfo);
          // this.$router.replace({ path: "/finish" });   
          // Если нет cookie о старом деревк
          let cookieTree = this.$cookies.get("tree_olimp");
          if(!cookieTree) {              
          axios.get(`${process.env.VUE_APP_SERVER_URL}/api/data`).then((res) => {
            this.number = res.data.number
            console.warn("DATA LENGTH", this.number)
            this.loading = false
            if (this.number % 2 == 0) {
               axios.post(`${process.env.VUE_APP_SERVER_URL}/api/post`, {userInfo: this.userInfo, withTree: true }).then(() => {
                 this.$router.replace({ name: "Home", params: { userInfo } });
               })
            } else {
              axios.post(`${process.env.VUE_APP_SERVER_URL}/api/post`, {userInfo: this.userInfo, withTree: false }).then(() => {
              this.$router.replace({ name: "Experiment2", params: { userInfo } });
              });
            }
          });
        } else {
          // если дерево есть 
          if (cookieTree  == "with tree") {
                 axios.post(`${process.env.VUE_APP_SERVER_URL}/api/post`, {userInfo: this.userInfo, withTree: true }).then(() => {
                 this.$router.replace({ name: "Home", params: { userInfo } });
               })
            } else {
              axios.post(`${process.env.VUE_APP_SERVER_URL}/api/post`, {userInfo: this.userInfo, withTree: false }).then(() => {
              this.$router.replace({ name: "Experiment2", params: { userInfo } })});
          }
        }})
        .catch((err) => {
          this.loading = true;
          console.log(err);
        });
    },
  },
  mounted() {
    let cookie = this.$cookies.get("tested_olimp");
    if(cookie) this.$router.replace({ path: "/thanks" })
  },
};
</script>
<style  lang="scss"  scoped>
.about {
  max-width: 800px;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  .small{
    font-size: 0.85em;
  }
  .form {
    padding: 0 15px;
    display: flex;
    justify-content: space-around;
    &__item {
      padding-bottom: 10px;
      max-width: 300px;
    }
  }
  label {
    display: block;
  }
  button {
    font-family: inherit;
    font-size: large;
    padding: 5px 10px;
    margin: 10px auto;
  }
  select {
    max-width: 200px;
  }
}
</style>
