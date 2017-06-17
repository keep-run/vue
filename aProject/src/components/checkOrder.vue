<template>
  <div>
    <confirm-dialog :is-show="isShowCheckDialog">
      请检查你的支付状态!
      <!--用户可能支付成功，但是误点支付失败，那么这里点击任意一个，都要去检查一下
      是否支付成功，取决于后台返回的数据，不是取决于用户点击了哪个按钮-->
      <div class="button" @click="checkStatus">支付成功</div>
      <div class="button" @click="checkStatus">支付失败</div>
    </confirm-dialog>
    <confirm-dialog :is-show="isShowSuccessDialog" @on-close="toOrderList">
      购买成功！
    </confirm-dialog>
    <confirm-dialog :is-show="isShowFailDialog" @on-close="toOrderList">
      购买失败！
    </confirm-dialog>
  </div>
</template>
<script>
  import Dialog from './base/dialog'
  export default {
    components: {
      confirmDialog: Dialog
    },
    props: {
      isShowCheckDialog: {
        type: Boolean,
        default: false
      },
      orderId: {
        type: [String, Number]
      }
    },
    data: function () {
      return {
        isShowSuccessDialog: false,
        isShowFailDialog: false
      }
    },
    methods: {
      checkStatus: function () {
        let self = this;
        this.$http.post('/api/checkOrder', {orderId: this.orderId})
          .then(function (res) {
            self.$emit('on-close-check-dialog');
            self.isShowSuccessDialog = true
          }, function (err) {
            self.$emit('on-close-check-dialog');
            self.isShowFailDialog = true
          })

      },
      toOrderList: function () {
        this.$router.push({path: "/orderList"})
      }
    }
  }
</script>
