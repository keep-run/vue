<template>
  <div class="dialog-wrap">
    <div class="dialog-cover" @click="closeMyself" v-if="isShow"></div>
    <div class="dialog-content" v-if="isShow">
      <p class="dialog-close" @click="closeMyself">X</p>
      <slot>empty</slot>
    </div>
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
        this.$emit('on-close');
      }
    }
  }
</script>

<style scoped>
  .dialog-cover {
    background: #000000;
    opacity: 0.5;
    position: fixed;
    z-index: 5;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .dialog-content {
    width: 600px;
    position: fixed;
    top: 20%;
    left: 50%;
    margin-left: -300px;
    z-index: 10;
    border: 1px solid #464068;
    background: #fff;
    overflow: hidden;
  }

  /* .dialog-content-body {
     text-align: center;
   }
 */
  .dialog-close {
    position: absolute;
    right: 5px;
    top: 5px;
    width: 20px;
    height: 20px;
    line-height: 20px;
    text-align: center;
  }

  .dialog-close:hover {
    background: yellow;
    cursor: pointer;
  }

</style>
