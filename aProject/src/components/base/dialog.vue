<template>
  <div class="dialog-wrap">

    <div class="dialog-cover" @click="closeMyself" v-if="isShow">
    </div>
    <transition name="drop">
      <div class="dialog-content" v-if="isShow">
        <p class="dialog-close" @click="closeMyself">x</p>
        <slot>empty</slot>
      </div>
    </transition>
  </div>
</template>

<script>
  export default {
    props: {
      isShow: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      closeMyself: function () {
        this.$emit('on-close', 'close')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /* .dialog-wrap {
     position: fixed;
     width: 100%;
     height: 100%;
   }*/
  /*弹窗进入的动画*/
  .drop-enter {
    transform: translateY(-500px);
  }

  /*ease 表示慢慢开始，然后变快，然后变慢至结束*/
  .drop-enter-active {
    transition: all 1s ease;
  }

  .drop-leave-active {
    transition: all .5s ease;
  }

  .drop-leave-active {
    transform: translateY(-500px);
  }

  /*做一个满屏的阴影*/
  .dialog-cover {
    color: white;
    background: #000;
    opacity: .3;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    /*fixed定位之后，宽度和高度的%都相对于浏览器窗口*/
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    width: 50%;
    position: fixed;
    max-height: 50%;
    overflow: auto;
    background: #fff;
    top: 20%;
    left: 50%;
    /*-25%是自身宽度的25%  实现横条的居中*/
    margin-left: -25%;
    z-index: 10;
    border: 2px solid #464068;
    padding: 2%;
    line-height: 1.6;
  }

  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    text-align: center;
    cursor: pointer;
  }

  .dialog-close:hover {
    background: #4fc08d;
  }
</style>
