<template>
  <div class="counter-component">
    <div class="counter-btn" @click="minus">-</div>
    <div class="counter-show">
      <input type="text" v-model="number" @keyup="fixNumber"/>
    </div>
    <div class="counter-btn" @click="add">+</div>
  </div>
</template>
<script>
  export default {
    props: {
      max: {
        type: Number,
        default: 5
      },
      min: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        number: this.min
      }
    },
    methods: {
      minus: function () {
        if (this.number > this.min) {
          this.number--;
        }
      },
      add: function () {
        if (this.number < this.max) {
          this.number++;
        }
      },
      fixNumber: function () {
        let fix;
        if (typeof this.number === 'string') {
          /*\d 匹配数字，\D匹配非数字*/
          fix = Number(this.number.replace(/\D/g, ''))
        }
        if (fix > this.max || fix < this.min) {
          fix = this.min;
        }
        this.number = fix;
      }
    },
    watch: {
      number: function () {
        this.$emit('on-change', this.number);
      }
    }
  }
</script>
<style scoped>
  .counter-component {
    position: relative;
    display: inline-block;
    overflow: hidden;
    vertical-align: middle;
  }

  .counter-show {
    float: left;
  }

  .counter-show input {
    border: none;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    height: 23px;
    line-height: 23px;
    width: 30px;
    outline: none;
    text-align: center;
    /*text-indent: 4px; /*text-indent:段首缩进*/
  }

  .counter-btn {
    border: 1px solid #e3e3e3;
    float: left;
    height: 25px;
    line-height: 25px;
    width: 25px;
    text-align: center;
    cursor: pointer;
  }

  .counter-btn:hover {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
