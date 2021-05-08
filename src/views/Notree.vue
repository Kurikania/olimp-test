<template lang="html">
<div> 
  <div v-if="!isStarted">
    <h1> </h1>
    <button @click="start">Начать</button>
  </div>
<div v-else class="flex-row align-berween">
<div class="workbook">
  <h2> Всенаправленная (омни) платформа </h2>
  <div class="main" >    
    <div class="flex-column"  >
      <h3> Журнал проекта </h3>
      <div class="post flex-column" :class="{active: nodeClicked == post.id}" v-for="(post, index) in posts" :key="index" :id="post.post_id">
        <div class="post-header">
        <span> {{ post.section }} </span>
        <span> {{ post.branch }} </span>
        <span> {{post.date}} </span>
        </div>
        <div  @click="clickPost(post.post_id)" v-html='post.content'> </div>
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
    start() {
      this.isStarted = true;
      this.startTime = Date.now();
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
}
.post-header {
  font-family: Roboto;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
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
