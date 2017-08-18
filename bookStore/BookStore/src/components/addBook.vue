<template>
  <div>
    <book-dialog :is-show="isShowAddBookDialog" @on-close="hideMySelf">
      <div class="g-dialog-head">添加书籍</div>

      <div class="dialog-content-body">
        <div class="dialog-content-body-wrap">
          <div class="g-form-line">
            <span class="g-form-label">书名：</span>

            <div class="g-form-input">
              <input type="text" v-model="name"/>
            </div>
          </div>
          <div class="g-form-line">
            <span class="g-form-label">作者：</span>

            <div class="g-form-input">
              <input type="text" v-model="author"/>
            </div>
          </div>
          <div class="g-form-line">
            <span class="g-form-label">出版社：</span>

            <div class="g-form-input">
              <input type="text" v-model="publisher"/>
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
      isShowAddBookDialog: {
        type: Boolean,
        default: false
      }
    },
    data: function () {
      return {
        name: '',
        author: '',
        publisher: '',
        errorText: ''
      }
    },
    methods: {
      hideMySelf: function () {
        this.$emit('onCloseAddBookDialog')
      },
      confirm: function () {
        let self = this;
        let flag = this.name && this.author && this.publisher;

        if (flag) {
          let book = {
            name: this.name,
            author: this.author,
            publisher: this.publisher
          };
          this.$http.post('http://localhost:3000/addBook', book)
            .then(function (docs) {
              self.name = '';
              self.author = '';
              self.publisher = '';
              this.hideMySelf();
              self.$emit('addBook', docs.body);
              // console.log(docs.body);
            }, function () {
              console.log('failed')
            })
        } else {
          this.errorText = '以上三项为必填项，均不能为空';
        }
      }
    }
  }
</script>
