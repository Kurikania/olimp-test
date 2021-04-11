<template lang="html">
<div v-on:keydown.114.70.prevent="noSearch">
<div class="workbook">
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
        <div v-html='post.content'> </div>
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
import constructionTree from "../components/construcrionTree";
import managTree from "../components/managTree";
import schemaTree from "../components/schemaTree";

export default {
  layout: "olimp",
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
    };
  },
  components: {
    VueEditor,
    constructionTree,
    managTree,
    schemaTree,
  },
  methods: {
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
  },
  async mounted() {
    this.load();
  },
};
</script>

<style lang="css" scoped>
.workbook {
  display: flex;
  padding: 10px;
}
.tree {
  background-color: rgb(240, 240, 240);
  width: 35%;
  height: 90vh;
  overflow: auto;
}
.main {
  width: 65%;
  display: flex;
  flex-direction: column;
  overflow: auto;
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
