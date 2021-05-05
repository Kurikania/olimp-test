<template>
  <div class="task__item">
   {{question}} <br />
    <div class="task__item-submit">
      <input v-model="item.answer" @change="send" type="text" /> 
      <!-- <button @click="send">Отправить</button> -->
    </div>
    <label for="complexity"> Оцените сложность задания </label>
    <select v-model="item.complexity" id="complexity" name="filters">
      <option v-for="option in 10" :value="option" :key="option">
        {{ option }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
    props: ['question', 'index'],
    data() {
        return {
            item: {
                answer: null,
                complexity: null,
                startTime: null,
                endTime: null,
            }
        }
    },
    methods: {
        send() {
            this.item.index=this.index
            this.item.endTime = Date.now()
            this.item.time =  this.item.endTime -  this.item.startTime
            this.$emit('info', this.item)
        }
    },
    mounted() {
      this.item.startTime = Date.now()
    }
}
</script>