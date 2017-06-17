<template>
  <div class="chooser-component">
    <div class="chooser-list">
      <li v-for="(item,index) in selections"
          @click="toggleSelection(index)"
          :class="{active:checkActive(index)}"
        >{{item.label}}
      </li>
    </div>
  </div>
</template>
<script>
  export default {
    props: {
      selections: {
        type: Array,
        default: [{
          label: 'test',
          value: 0
        }, {
          label: 'test1',
          value: 1
        }]
      }
    },
    data: function () {
      return {
        chosenIndex: [0]
      }
    },
    methods: {
      checkActive: function (index) {
        return this.chosenIndex.indexOf(index) !== -1
      },
      /*切换选中状态*/
      toggleSelection: function (index) {
        if (this.chosenIndex.indexOf(index) === -1) {
          this.chosenIndex.push(index);
        } else {
          this.chosenIndex.splice(this.chosenIndex.indexOf(index), 1);
        }
        let self = this;
        let nowObjArray = this.chosenIndex.map(function (item) {
          return self.selections[item]
        });
        //console.log(nowObjArray);
        this.$emit('on-change', nowObjArray)
      }
    }
  }
</script>
<style scoped>
  .chooser-component {
    display: inline-block;
  }

  .chooser-list li {
    display: inline-block;
    border: 1px solid #e3e3e3;
    height: 25px;
    line-height: 25px;
    padding: 0 8px;
    margin-right: 5px;
    border-radius: 3px;
    text-align: center;
    cursor: pointer;
  }

  .chooser-list li.active {
    border-color: #4fc08d;
    background: #4fc08d;
    color: #fff;
  }
</style>
