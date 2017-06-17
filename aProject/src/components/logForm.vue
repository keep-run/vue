<template>
  <!--以g开头的样式，都写在layout中作为全局样式存在--->
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>

        <div class="g-form-input">
          <input type="text" v-model='userNameModel' name="username" placeholder="请输入用户名"/>
        </div>
        <span class="g-form-error">{{userErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>

        <div class="g-form-input">
          <input type="password" v-model="passwordModel" name='password' placeholder="请输入密码"/>
        </div>
        <span class="g-form-error">{{passwordErrors.errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onLogin">登录</a>
        </div>
      </div>
      <span class="g-form-error">{{errorText}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    data: function () {
      return {
        userNameModel: '',
        passwordModel: '',
        errorText: ''
      }
    },
    computed: {
      userErrors: function () {
        let errorText, status;
        if (!/@/g.test(this.userNameModel)) {
          status = false;
          errorText = '不包含@'
        } else {
          status = true;
          errorText = '';
        }
        /*当第一次进入的时候，不报错，打开悬浮窗就报错，显得不友好*/
        if (!this.userFlag) {
          errorText = '';
          this.userFlag = true;
        }
        return {
          status: status,
          errorText: errorText
        }
      },
      passwordErrors: function () {
        let errorText, status;
        if (!/^\w{1,6}$/g.test(this.passwordModel)) {
          status = false;
          errorText = '密码需要1-6位'
        } else {
          status = true;
          errorText = '';
        }
        /*当第一次进入的时候，不报错，打开悬浮窗就报错，显得不友好*/
        if (!this.passwordFlag) {
          errorText = '';
          this.passwordFlag = true;
        }
        return {
          status: status,
          errorText: errorText
        }
      }
    },
    methods: {
      onLogin: function () {
        if (this.userErrors.status && this.passwordErrors.status) {
          this.errorText = '';
          var self = this;

          this.$http.post('api/getUser').then(function (res) {
            // console.log(res)
            self.$emit('has-log', res.data);
          }, function () {
          });

        }
        else {
          this.errorText = '部分选项未通过'
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
