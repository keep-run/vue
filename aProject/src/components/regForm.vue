<template>
  <!--以g开头的样式，都写在layout中作为全局样式存在--->
  <div class="login-form">
    <div class="g-form">
      <div class="g-form-line">
        <span class="g-form-label">用户名：</span>

        <div class="g-form-input">
          <input type="text" v-model='userNameModel' name="username" placeholder="请输入用户名"/>
        </div>
        <span class="g-form-error">{{userErrors. errorText}}</span>
      </div>
      <div class="g-form-line">
        <span class="g-form-label">密码：</span>

        <div class="g-form-input">
          <input type="password" v-model="passwordModel" name='password' placeholder="请输入密码"/>
        </div>
        <span class="g-form-error">{{passwordErrors. errorText}}</span>
      </div>
      <div class="g-form-line">
        <div class="g-form-btn">
          <a class="button" @click="onReg">注册</a>
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
          errorText = '不包含@';
          status = false;
        } else {
          errorText = '';
          status = true;
        }
        /*第一次进入不显示错误*/
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
        if (!/^\w{1,6}$/.test(this.passwordModel)) {
          errorText = '密码是1到6位';
          status = false;
        } else {
          errorText = '';
          status = true;
        }
        /*第一次进入不显示错误*/
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
      onReg: function () {
        if (this.userErrors.status && this.passwordErrors.status) {
          this.errorText = '';
          var self = this;
          let data = {
            username: this.userNameModel,
            password: this.passwordModel
          };
          console.log('run post');
          this.$http.post('api/getUser', data).then(
            function (res) {
              self.$emit('has-reg', res.data);
            }, function (err) {
              console.log(err);
            }
          )
        } else {
          this.errorText = '部分选项未通过';
        }
      }
    }
  }
</script>
<style scoped></style>
