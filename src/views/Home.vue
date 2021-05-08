<template lang="html">
<div>
  <div v-if="!isStarted">
    <h1>Инструкция</h1>
    <button @click="start">Начать</button>
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
  <div class="main" >
    <h3> Журнал проекта </h3>
    <div class="flex-column" id="scroller" >
      <div class="post flex-column" :class="{active: nodeClicked == post.id}" v-for="(post, index) in posts" :key="index" :id="post.post_id">
        <div class="post-header">
        <span> {{ post.section }} </span>
        <span class="post-header__branchname" > {{ post.branch }} </span>
        <span class="post-header__branchname"> {{ new Date(post.date).toLocaleString().slice(0,-12)}} </span>
        </div>
        <div v-html='post.content'> </div>
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
   color: #6F47EB
  }
}

.active {
  box-shadow: 0px 4px 4px rgba(255, 95, 95, 0.5);
}
.post {
  margin: 3px auto;
}
.post-body {
  font-family: Roboto;
  font-size: 12px;
  color: #3914af;
  line-height: 14px;
}
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #b1cfd6;
  border-left: 1px solid #a1bdf3;
}

::-webkit-scrollbar-thumb {
  background: #bcd1e9;
  border: solid 3px #98c0fd;
  border-radius: 7px;
}
::-webkit-scrollbar-thumb:hover {
  background: white;
}
#scroller {
  height: 80vh;
  overflow: auto;
}
</style>
