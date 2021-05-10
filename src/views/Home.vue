<template lang="html">
<div  v-shortkey="['ctrl', 'f']" @shortkey="theAction()" >
  <div class="workbook" style="flex-direction: column; align-items: center"   v-if="!isStarted">
        <div class="greeting">
          Интерфейс в который вы сейчас попадете содержит: <br>
(1) Дерево проекта, где схематично отображается процесс разработки <br>
(2) Журнал проекта, где собраны записи о процессе реализации проекта.<br>
(3) Поле с заданиями<br>

Каждой записи соответствует точка на дереве проекта. Точки в дереве и записи в журнале имеют одинаковые атрибуты: раздел, 
ветку и дату внесения записи. <strong>Дерево кликабельно! </strong> <br> 
<ul>
<li> Вы можете открывать нужные вам разделы по клику на свернутую ветку 
или на стрелочку около названия.  </li>
<li> При нажатии на точку в дереве журнал пролистывается к соответствующей записи. </li>
</ul>
Ваша задача — максимально быстро найти ответ на вопрос из поля с заданиями. 
<strong>Не волнуйтесь, мы тестируем интерфейс, а не вас. </strong>
        </div>
    <div style="margin: auto; background-repeat: no-repeat;     background-size: contain; width: 100%; height:432px; background-image: url('/Instruktsia1.png')">
    <img src="url('/Instruktsia1.png')"  style="visibility : hidden;">
    </div>
    <button style=" height: 24px;
    background: #ffffff;
    border: 1px solid #6f47eb;
    color: #6f47eb;
    font-size: 20px;
    box-sizing: border-box;
    border-radius: 4px;" class="greeting" @click="start">Начать</button>
  </div>
<div v-else class="workbook">
<div>
<h2> Всенаправленная (омни) платформа </h2>
<div class="workbook">    
  <div class="tree">
    <h3> Дерево проекта </h3>
      <div class="tree-header flex "> 

        <button @click="switchTree(-1)">
          &#60;
          </button>
          <div v-if="nodeClicked=='k'"> КОНСТРУИРОВАНИЕ </div> 
          <div v-else> К </div>
          <div v-if="nodeClicked=='s'"> СХЕМОТЕХНИКА </div>
          <div v-else> С </div>
          <div v-if="nodeClicked=='p'"> ПРОГРАММИРОВАНИЕ </div>
          <div v-else> П </div>
          <div v-if="nodeClicked=='m'"> МЕНЕДЖМЕНТ </div>
          <div v-else> М </div>
          <button @click="switchTree(1)">
            &#62;
          </button>

      </div>
       <constructionTree v-if="nodeClicked[0] == 'k'" @clickTree="clickTree" />
       <schemaTree  v-else-if="nodeClicked[0] == 's'" @clickTree="clickTree" />
       <progTree  v-else-if="nodeClicked[0] == 'p'" @clickTree="clickTree" />
       <managTree  v-else-if="nodeClicked[0] == 'm'" @clickTree="clickTree" />

  </div>
  <div class="main"  v-shortkey="['ctrl', 'а']" @shortkey="theAction()" >
    <h3> Журнал проекта </h3>
    <div class="flex-column" id="scroller" >
      <div class="post flex-column" :class="{active: nodeClicked == post.id}" v-for="(post, index) in posts" :key="index" :id="post.post_id">
        <div class="post-header">
        <span> {{ post.section }} </span>
        <span class="post-header__branchname" > {{ post.branch }} </span>
        <span class="post-header__branchname"> {{ getCorrectDate(post.date) }} </span>
        </div>
        <div v-html='post.content'> </div>
        <div v-if="post.pictures" class>
          <img  v-for="picture in post.pictures" :key="picture" :src="picture"  >        
        </div>
        <div class="post-footer">
          <!-- <span>{{post.author}}</span> -->
        </div>
      </div>
    </div>
  </div>
  </div>
</div>
  <tasks :userInfo="$attrs.userInfo" :withTree="withTree" style="position: sticky; position: -webkit-sticky; top: 0"> </tasks>
</div>
</div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
// import { mapGetters } from "vuex";
import constructionTree from "../components/construcrionTree2";
import managTree from "../components/managTree2";
import schemaTree from "../components/schemaTree2";
import progTree from "../components/programmingTree2";
import tasks from "../components/tasks";

export default {
  data() {
    return {
      posts: [],
      nodeClicked: "k",
      trees: ["k", "s", "p", "m"],
      startTime: null,
      endTime: null,
      withTree: true,
      isStarted: false,
    };
  },
  props: ["p"],
  components: {
    tasks,
    constructionTree,
    managTree,
    schemaTree,
    progTree,
  },
  methods: {
    getCorrectDate(date) {
      let d = new Date(date);
      return new Date(d.setDate(d.getDate() - 1))
        .toLocaleString()
        .split(',')[0]
    },
    theAction() {
      alert("Вы не можете использовать поиск");
    },
    start() {
      this.isStarted = true;
      this.startTime = Date.now();
    },
    switchTree(num) {
      if (this.trees.indexOf(this.nodeClicked) == 3 && num === 1) {
        this.nodeClicked = "k";
      } else if (this.trees.indexOf(this.nodeClicked) === 0 && num === -1) {
        this.nodeClicked = "m";
      } else {
        this.nodeClicked = this.trees[
          this.trees.indexOf(this.nodeClicked) + num
        ];
      }
    },
    async load() {
      const res = await axios.get("/data.json"); // dev
      this.posts = res.data;
    },
    noSearch() {
      console.log("No search");
    },
    clickTree(id) {
      console.log(id);
      this.nodeClicked = id;
    },
    // clickPost(id) {
    //   try {
    //     console.log(id);
    //     this.endTime = Date.now();
    //     let time = this.endTime - this.startTime;
    //     console.log(time);
    //     let answer = { id: id, text: "test", time: time };
    //     console.log(answer);
    //     axios.post("http://localhost:3000/post", answer).then(() => {
    //       this.$router.replace({ path: "/finish" });
    //     });
    //   } catch (err) {
    //     console.log(err);
    //   }
    // },
  },
  async mounted() {
    this.load();
  },
};
</script>

<style lang="scss" scoped>
.workbook {
  display: flex;
  padding: 10px;
}
.tree {
  min-width: fit-content;
  max-width: 20vw;
  margin-right: 10px;
  height: 85vh;
  overflow: auto;
}
.tree-header {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
  button {
    height: 24px;
    background: #ffffff;
    border: 1px solid #6f47eb;
    color: #6f47eb;
    box-sizing: border-box;
    border-radius: 4px;
  }
}
.main {
  width: 40vw;
  display: flex;
  flex-direction: column;
}
.post-header {
  font-family: Roboto;
  font-weight: normal;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
  padding-bottom: 5px;
  &__branchname {
    font-weight: bold;
    color: #6f47eb;
  }
  span {
    padding-right: 10px;
  }
}

.active {
  box-shadow: 0px 4px 4px rgba(255, 95, 95, 0.5);
}
.post {
  margin: 3px auto;
  img {
    width: 45%;
    margin-left: 5px;
  }
}
.post-body {
  font-family: Roboto;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
}

#scroller {
  height: 80vh;
  overflow: auto;
}
</style>
