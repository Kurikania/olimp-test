<template lang="html">
<div v-on:keydown.114.70.prevent="noSearch">
<div class="workbook">
  <div class="tree">
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
    <div class="project-filters" style="display: flex;">
      <div class="filters">
        <span> Записи </span>
        <span> Статьи </span>
        <span> О проекте </span>
        </div>
        <div style="display: flex; align-items: center;">
        <select name="filters">
        <option value="all">Фильтры</option>
        <option value="idk">Я не знаю</option>
        </select>
        <input type="text" value="">
      </div>
    </div>
    <div class="flex-column" id="scroller" style="overflow: auto; height: 80vh">
      <div class="post flex-column" :class="{active: nodeClicked == post.id}" v-for="(post, index) in posts" :key="index" :id="post.post_id">
        <div class="post-header">
        <span> {{ post.section }} </span>
        <span> {{ post.branch }} </span>
        <span> {{post.date}} </span>
        </div>
        <div @click="clickPost(post.post_id)" v-html='post.content'> </div>
        <div class="post-footer">
          <span>{{post.author}}</span>
        </div>
        </div>
        <button>Добавить запись </button>
        <div>
        <vue-editor v-model="content" :editorToolbar="customToolbar"></vue-editor>
        </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
// import { mapGetters } from "vuex";
import { VueEditor } from "vue2-editor";
import constructionTree from "../components/construcrionTree2";
import managTree from "../components/managTree2";
import schemaTree from "../components/schemaTree2";
import progTree from "../components/programmingTree2";

export default {
  data() {
    return {
      content: "<p>Some initial content</p>",
      customToolbar: [
        ["bold", "italic", "underline"],
        [{ list: "ordered" }, { list: "bullet" }],
        ["image", "code-block"],
      ],
      posts: [],
      nodeClicked: "k",
      trees: ["k", "s", "p", "m"],
      startTime: null,
      endTime: null,
    };
  },
  props: ['p'],
  components: {
    VueEditor,
    constructionTree,
    managTree,
    schemaTree,
    progTree,
  },
  methods: {
    switchTree(num) {
      if (this.trees.indexOf(this.nodeClicked) == 3 && num ===1 ) {
          this.nodeClicked = "k"
      }  else if (this.trees.indexOf(this.nodeClicked) === 0 && num === -1 ) {
           this.nodeClicked = "m"
      } else {
        this.nodeClicked = this.trees[ this.trees.indexOf(this.nodeClicked) + num]
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
    clickPost(id) {
      try {
        console.log(id);
        this.endTime = Date.now();
        let time = this.endTime - this.startTime;
        console.log(time);
        let answer = { id: id, text: "test", time: time };
        console.log(answer);
        //   axios.post("http://localhost:3000/post",  answer).then(() => {
        //  this.$router.replace({ path: '/finish'})
        //  })
      } catch (err) {
        console.log(err);
      }
    },
  },
  async mounted() {
    this.load();
    this.startTime = Date.now();
    console.log(this.p)
  },
};
</script>

<style lang="css" scoped>
.workbook {
  display: flex;
  padding: 10px;
}
.tree {
  min-width: fit-content;
  max-width: 35%;
  height: 90vh;
  overflow: auto;
}
.tree-header {
  display: flex;
  height: 30px;
  justify-content: space-between;
  align-items: center;
}
.main {
  width: 65%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
</style>
