<template>
  <div class="selection-component">
    <div class="selection-show" @click="toggleDrop">
      <span>{{selections[nowIndex].label}}</span>

      <div class="arrow"></div>
    </div>
    <div class="selection-list" v-if="isDrop">
      <ul>
        <li v-for="(item,index) in selections"
            @click="chooseSelection(index)">{{item.label}}
        </li>

      </ul>
    </div>
  </div>
</template>
<script>
  export default{
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }]
      }
    },
    data: function () {
      return {
        isDrop: false,
        nowIndex: 0
      }
    },
    methods: {
      /*用于切换 selection-list部分的显示状态*/
      toggleDrop: function () {
        this.isDrop = !this.isDrop
      },
      chooseSelection: function (index) {
        this.nowIndex = index;
        this.isDrop = false;
        this.$emit('on-change',this.selections[this.nowIndex])
      }
    }
  }
</script>
<style scoped>
  .selection-component {
    position: relative;
    display: inline-block;
  }

  .selection-show {
    border: 1px solid #e3e3e3;
    padding: 0 20px 0 10px;
    display: inline-block;
    /*position: relative;*/
    cursor: pointer;
    height: 25px;
    line-height: 25px;
    border-radius: 3px;
    background: #fff;
  }

  .selection-show .arrow {
    display: inline-block;
    border-left: 4px solid transparent;
    border-right: 4px solid transparent;
    border-top: 5px solid #e3e3e3;
  }

  .selection-list {
    display: inline-block;
    position: absolute;
    left: 0;
    top: 25px;
    /*width:100%,相对于父元素的width,本例中
    父元素的宽度由.select-show撑开*/
    width: 100%;
    background: #fff;
    border-top: 1px solid #e3e3e3;
    border-bottom: 1px solid #e3e3e3;
    z-index: 5;
  }

  .selection-list li {
    padding: 5px 15px 5px 10px;
    border-left: 1px solid #e3e3e3;
    border-right: 1px solid #e3e3e3;
    cursor: pointer;
    background: #fff;
    white-space: nowrap;
    overflow: hidden;
    /*超出部分用省略号表示*/
    text-overflow: ellipsis;
  }

  .selection-list li:hover {
    background: #e3e3e3;
  }
</style>
