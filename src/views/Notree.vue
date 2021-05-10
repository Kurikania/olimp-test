<template lang="html">
<div v-shortkey="['ctrl', 'f']" @shortkey="theAction()" > 
  <div  class="workbook" style="flex-direction: column; align-items: center"   v-if="!isStarted">
    <div  class="greeting">И
      Интерфейс в который вы сейчас попадете содержит: <br>
(1) Журнал проекта, где собраны записи о процессе реализации проекта.где собраны записи о процессе разработки всенаправленной платформы.
У каждой записи в журнале есть следующие атрибуты: раздел, ветка и дата внесения записи. <br>
(2) Поле с заданиями

    </div>
    <div style=" margin: auto; background-repeat: no-repeat;    background-size: contain; height:432px; width: 100%; background-image: url('/Instruktsia2.png');">
    <img src="url('/Instruktsia2.png')"  style="visibility : hidden;"/>
    </div>
    <button style=" height: 24px;
    background: #ffffff;
    border: 1px solid #6f47eb;
    font-size: 20px;
    color: #6f47eb;
    box-sizing: border-box;
    border-radius: 4px;" class="greeting" @click="start">Начать</button>
  </div>
<div v-else class="flex-row align-berween">
<div class="workbook">
  <h2> Всенаправленная (омни) платформа </h2>
  <div class="main" v-shortkey="['ctrl', 'а']" @shortkey="theAction()">    
    <div class="flex-column"  >
      <h3> Журнал проекта </h3>
      <div class="post flex-column" :class="{active: nodeClicked == post.id}" v-for="(post, index) in posts" :key="index" :id="post.post_id">
        <div class="post-header">
        <span> {{ post.section }} </span>
        <span class="post-header__branchname" > {{ post.branch }} </span>
        <span class="post-header__branchname"> {{  getCorrectDate(post.date) }} </span>
        </div>
        <div  @click="clickPost(post.post_id)" v-html='post.content'> </div>
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
      <tasks :userInfo="$attrs.userInfo" :withTree="withTree" style="float:right; top: 0"> </tasks> 
</div>
</div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
// import { mapGetters } from "vuex";
import tasks from "../components/tasks";
export default {
  layout: "olimp",
  data() {
    return {
      posts: [],
      nodeClicked: "k",
      startTime: null,
      endTime: null,
      withTree: false,
      isStarted: false,
    };
  },
  components: {
    tasks,
  },
  methods: {
    theAction() {
      alert("Вы не можете использовать поиск");
    },
    start() {
      this.isStarted = true;
      this.startTime = Date.now();
    },
    getCorrectDate(date){
      let d =  new Date(date)
     return new Date(d.setDate(d.getDate() -1)).toLocaleString().split(',')[0]
    },
    async load() {
      const res = await axios.get("/data.json"); // dev
      this.posts = res.data;
    },
    noSearch() {
      console.log("No search");
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

    console.log(this.$attrs.userInfo);
  },
};
</script>

<style lang="scss" scoped>
.align-berween {
  justify-content: space-between;
}
.workbook {
  display: flex;
  padding: 10px;
  flex-direction: column;
}
.tree {
  background-color: rgb(240, 240, 240);
  width: 35%;
}
.main {
  width: 65%;
  display: flex;
  flex-direction: column;
  margin: auto;
}
.post {
  border: 1px solid #ccccff;
  box-sizing: border-box;
  border-radius: 4px;
  padding: 7px 30px;
  img{
    width: 45%;
    margin-left: 5px;
  }
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
  span{
    padding-right: 10px;
  }
}

.active {
  box-shadow: 0px 4px 4px rgba(255, 95, 95, 0.5);
}

.post-body {
  font-family: Roboto;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
}
</style>
