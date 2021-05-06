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
        данные для своей ВКР.
      </p>
      <p>
        После знакомства с интерфейсом, вы увидите описание процесса разработки
        робота, в правой части экрана вы увидите вопросы, на которые вам нужно
        будет найти ответ и поля для ввода. Не волнуйтесь, мы тестируем
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
      <div class="form__item">
        <label for="age"> Ваш возраст </label>
        <input v-model="userInfo.age" type="number" name="age" id="age" />
      </div>

      <div class="form__item">
        <label for="education"> Образование </label>
        <select v-model="userInfo.education" id="education" name="filters">
          <option value="student">Студент</option>
          <option value="bachelor-student">Бакалавр</option>
          <option value="master">Магистрант</option>
          <option value="master-student">Магистр</option>
          <option value="phd-student">Аспирант</option>
        </select>
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

      <div class="form__item">
        <label for="computerLevel"> Насколько продвинутым пользователем себя считаете ?
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
            2 - умею работать с офисными программами, облачными хранилищами, электронной почтой и специализированными программами.
          </option>
          <option value="1">
            1 - знаю как включить компьютер, умею работать с несколькими необходимыми программами
          </option>
        </select>
      </div>
      <button @click="start">Начать</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      number: null,
      userInfo: {
        age: null,
        education: null,
        prof: null,
        computerExperienceYears: null,
        computerLevel: null,
      },
    };
  },
  methods: {
    start() {
      let userInfo = this.userInfo;
      if (this.number % 2 == 0) {
        this.$router.replace({ name: "Home", params: { userInfo } });
      } else {
        this.$router.replace({ name: "Experiment2", params: { userInfo } });
      }
    },
  },
  mounted() {
    // let number;
    // Номер, чтобы определить на какой вариант эксперимента перенаправить
    axios
      .get(`${process.env.VUE_APP_SERVER_URL}/api/data`)
      .then((response) => (this.number = response.data.number));
      console.log(this.number)
  },
};
</script>
<style  lang="scss"  scoped>
.about {
  max-width: 800px;
  margin: auto;
  .form {
    padding: 0 15px;
    &__item {
      padding-bottom: 10px;
    }
  }
  label {
    display: block;
  }
  button {
    font-family: inherit;
    font-size: large;
    padding: 5px 10px;
    margin: 10px 10px 10px 0px;
  }
}
</style>
