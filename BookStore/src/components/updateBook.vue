<template>
  <div>
    <book-dialog :is-show="isShowUpdateBookDialog" @on-close="hideMySelf">
      <div class="g-dialog-head">修改书籍</div>

      <div class="dialog-content-body">
        <div class="dialog-content-body-wrap">
          <div class="g-form-line">
            <span class="g-form-label">书名：</span>

            <div class="g-form-input">
              <input type="text" v-model="book.name"/>
            </div>
          </div>
          <div class="g-form-line">
            <span class="g-form-label">作者：</span>

            <div class="g-form-input">
              <input type="text" v-model="book.author"/>
            </div>
          </div>
          <div class="g-form-line">
            <span class="g-form-label">出版社：</span>

            <div class="g-form-input">
              <input type="text" v-model="book.publisher"/>
            </div>
          </div>
          <div class="g-form-error">{{errorText}}</div>
        </div>
      </div>
      <div class="g-dialog-foot">
        <button @click="confirm">确认</button>
        <button @click="hideMySelf">取消</button>
      </div>
    </book-dialog>
  </div>
</template>

<script>
  import BookDialog from './dialog.vue'
  export default {
    components: {
      BookDialog: BookDialog
    },
    props: {
      isShowUpdateBookDialog: {
        type: Boolean,
        default: false
      },
      book: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {
        errorText: ''
      }
    },
    methods: {
      hideMySelf: function () {
        this.$emit('onCloseUpdateBookDialog')
      },
      confirm: function () {
        let flag = this.book.name && this.book.author && this.book.publisher;
        let self = this;
        if (flag) {
          this.$http.post('http://localhost:3000/updateBook', this.book)
            .then(function (docs) {
              self.hideMySelf();
              self.$emit('updateBook', docs.body);
              // console.log(docs.body);
            }, function () {
              console.log('failed')
            })
        } else {
          self.errorText = '以上三项为必填项，均不能为空'
        }
      }
    }
  }
</script>
