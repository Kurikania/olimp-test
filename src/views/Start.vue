<template>
  <div class="about">
    <div class="post">
      <p>
        Здравствуйте, меня зовут Светлана, я учусь в магистратуре ИТМО на
        специальности дизайнера интерфейсов и провожу исследование о способах
        организации информации при документировании инженерных проектов.
      </p>
      <p>
        Участие в эксперименте займет около 10 минут и поможет мне собрать
        данные для своей ВКР. Пожалуйста, выполняйте задания с компьютера.
      </p>
      <p>
        После знакомства с интерфейсом вы увидите описание процесса разработки
        робота, в правой части экрана вы увидите вопросы, на которые вам нужно
        будет найти ответ, и поля для ввода. Не волнуйтесь, мы тестируем
        интерфейс, а не вас. Если вы не нашли ответ отправьте в форме прочек
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
          <label for="age"> Ваш возраст </label>
          <input v-model="userInfo.age" type="number" name="age" id="age" />
        </div>

        <div v-if="!otherEducation" class="form__item">
          <label for="education"> Образование </label>
          <select v-model="userInfo.education" id="education" name="filters">
            <option value="student">Среднее</option>
            <option value="student">Среднее-специальное</option>
            <option value="student">Студент</option>
            <option value="bachelor-student">Бакалавр</option>
            <option value="master">Магистрант</option>
            <option value="master-student">Магистр</option>
            <option value="phd-student">Аспирант</option>
          </select>
        </div>
        <div v-if="otherEducation">
          <label for="prof"> Образование </label>
          <input
            v-model="userInfo.education"
            type="text"
            name="prof"
            id="prof"
          />
        </div>

        <div>
          <input id="otherEducation" type="checkbox" v-model="otherEducation" />
          <label style="display: inline" for="otherEducation">
            Указать свой вариант
          </label>
        </div>

        <div class="form__item">
          <label for="prof"> Специальность </label>
          <input v-model="userInfo.prof" type="text" name="prof" id="prof" />
        </div>
        <div class="form__item">
          <label for="computer-experience-years">
            Сколько лет всего работаете за компьютером?
          </label>
          <input
            v-model="userInfo.computerExperienceYears"
            type="number"
            name="computer-experience-years"
            id="computer-experience-years"
          />
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
            <option value="4">
              4 - знаю устройство компьютера, могу с легкостью переустановить
              операционную систему и все программы самостоятельно
            </option>
            <option value="3">
              3 - смогу при необходимости установить нужные программы
            </option>
            <option value="2">
              2 - умею работать с офисными программами, облачными хранилищами,
              электронной почтой и специализированными программами.
            </option>
            <option value="1">
              1 - знаю как включить компьютер, умею работать с несколькими
              необходимыми программами
            </option>
          </select>
        </div>

        <div class="form__item">
          <label for="programming">
            Если есть опыт программирования, укажите сколько лет 
          </label>
          <input
            v-model="userInfo.progExperience"
            type="text"
            name="programming"
            id="programming"
          />
        </div>

        <div class="form__item">
          <label for="game">
            Играете ли вы в компьютерные игры, как давно?
          </label>
          <input
            v-model="userInfo.gamingExperience"
            type="text"
            name="game"
            id="game"
          />
        </div>
      </div>
    </div>
    <button @click="start">Начать</button>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      number: null,
      otherEducation: false,
      userInfo: {
        age: null,
        education: null,
        prof: null,
        computerExperienceYears: null,
        computerLevel: null,
        progExperience: null,
        gamingExperience: null,
      },
    };
  },
  methods: {
    start() {
      let userInfo = this.userInfo;
      if(!userInfo.age || !userInfo.education || !userInfo.prof || !userInfo.computerExperienceYears || !userInfo.computerLevel ) {
        alert("Пожалуйста, заполните все поля")
        return
      }
      axios
        .post(`${process.env.VUE_APP_SERVER_URL}/api/new`, {userInfo: userInfo })
        .then((response) => {
          userInfo.id = response.data.id
          // this.$router.replace({ path: "/finish" });
          axios.get(`${process.env.VUE_APP_SERVER_URL}/api/data`).then((res) => {
            this.number = res.data.number
            console.warn("DATA LENGTH", this.number)
            if (this.number % 2 == 0) {
              this.$router.replace({ name: "Home", params: { userInfo } });
            } else {
              this.$router.replace({
                name: "Experiment2",
                params: { userInfo },
              });
            }
          });
        })
        .catch((err) => console.log(err));
    },
  },
  mounted() {
    // let number;
    // Номер, чтобы определить на какой вариант эксперимента перенаправить
    // axios
    //   .get(`${process.env.VUE_APP_SERVER_URL}/api/data`)
    //   .then((response) => (this.number = response.data.number));
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
