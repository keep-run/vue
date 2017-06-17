<template>
  <div class="slide-show" @mouseover="clearInv" @mouseout="runInv">
    <div class="slide-img">
      <a :href="slides[nowIndex].href">
        <transition name="slide-trans">
          <img v-if='isShow' :src="slides[nowIndex].src"/>
        </transition>
        <transition name="slide-trans-old">
          <img v-if='!isShow' :src="slides[nowIndex].src"/>
        </transition>
      </a>
    </div>
    <h2>{{slides[nowIndex].title}}</h2>
    <ul class="slide-pages">
      <li @click="goto(prevIndex)">&lt;</li>
      <li v-for="(item,index) in slides" @click='goto(index)'>
        <a :class="{on:index===nowIndex}">{{index+1}}</a>
      </li>
      <li @click="goto(nextIndex)">&gt;</li>
    </ul>
  </div>
</template>

<script>
  export default {
    props: {
      slides: {
        //设置slides的类型是一个数组，默认值为空
        type: Array,
        default: []
      },
      //设置幻灯片默认时间间隔自己切换
      inv: {
        type: Number,
        default: 1000
      }
    },
    data: function () {
      return {
        nowIndex: 0,
        isShow: true
      }
    },
    computed: {
      prevIndex: function () {
        if (this.nowIndex === 0) {
          return this.slides.length - 1
        } else {
          return this.nowIndex - 1;
        }
      },
      nextIndex: function () {
        if (this.nowIndex === this.slides.length - 1) {
          return 0
        } else {
          return this.nowIndex + 1;
        }
      }
    },
    methods: {
      goto: function (index) {
        var self = this;
        this.isShow = false;
        setTimeout(function () {
          self.isShow = true;
          self.nowIndex = index;
          self.$emit('onchange',index);
        }, 10)
      },

      runInv: function () {
        let self = this;
        this.invId = setInterval(function () {
          self.goto(self.nextIndex);
        }, this.inv)
      }
      ,
      clearInv: function () {
        clearInterval(this.invId)
      }
    },
    //组件渲染完毕之后，就开始执行runInv函数
    mounted: function () {
      this.runInv();
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  /*从右边进入，整个过程持续1s*/
  .slide-trans-enter-active {
    transition: all 1s;
  }

  .slide-trans-enter {
    transform: translateX(900px);
  }

  /*向左离开，持续1s*/

  .slide-trans-old-leave-active {
    transition: all 1s;
    transform: translateX(-900px);
  }

  .slide-show {
    position: relative;
    margin: 15px 0;
    width: 900px;
    height: 500px;
    overflow: hidden;
  }

  .slide-show h2 {
    position: absolute;
    /*100% 分别相对于父元素非默认定位的宽高*/
    width: 100%;
    background: #000;
    color: #fff;
    opacity: .5;
    bottom: 0;
    height: 30px;
    text-align: left;
    padding-left: 15px;
    line-height: 30px;
  }

  /*这里需要绝对定位，设置top=0，不然在动画过程中，下一项图片进入会将本章图片挤到下边去*/
  .slide-img img {
    position: absolute;
    top: 0
  }

  .slide-pages {
    position: absolute;
    bottom: 10px;
    right: 15px;
  }

  .slide-pages li {
    display: inline-block;
    padding: 0 10px;
    cursor: pointer;
    color: #ccc;
  }

  .on {
    text-decoration: underline;
    color: #fff;
  }

</style>
