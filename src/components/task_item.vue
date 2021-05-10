<template>
  <div class="task__item">
   {{question}} <br />
    <div class="task__item-submit">
      <input v-model="item.answer" @change="send" type="text" /> 
      <!-- <button @click="send">Отправить</button> -->
    </div>
    <label for="complexity"> Оцените сложность задания </label>
    <select @change="upd" v-model="item.complexity" id="complexity" name="filters">
      <option value=1>
        1 - очень просто
      </option>
      <option v-for="option in options" :value="option" :key="option">
        {{ option }}
      </option>
      <option value=5>
       5 - очень сложно
      </option>
      <option value=6>
       6 - не справился
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
                answer: "",
                complexity: null,
                startTime: null,
                endTime: null,
                isFilled: false,
            },
            options: [2,3,4]
        }
    },
    methods: {
        send() {
            if(!!this.item.complexity && (this.item.answer.length !==0) ) {
              this.item.isFilled = true
            }
            this.item.index=this.index
            this.item.endTime = Date.now()
            this.item.time =  this.item.endTime -  this.item.startTime
            this.$emit('info', this.item)
        },
        upd() {
            if(!!this.item.complexity && (this.item.answer.length !==0) ) {
              this.item.isFilled = true
            }
            this.item.index=this.index
            this.$emit('info', this.item)
        }
    },
    mounted() {
      this.item.startTime = Date.now();
      this.item.index=0
      this.$emit('info', this.item)
    },
}
</script>