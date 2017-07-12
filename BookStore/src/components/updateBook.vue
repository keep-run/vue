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
      return {}
    },
    methods: {
      hideMySelf: function () {
        this.$emit('onCloseUpdateBookDialog')
      },
      confirm: function () {
        let self = this;
        this.$http.post('http://localhost:3000/updateBook', this.book)
          .then(function (docs) {
            this.hideMySelf();
            self.$emit('updateBook', docs.body);
            // console.log(docs.body);
          }, function () {
            console.log('failed')
          })
      }
    }
  }
</script>
