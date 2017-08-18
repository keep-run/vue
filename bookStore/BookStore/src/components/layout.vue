<template>
  <div>
    <div class="app-header">
      <h1>个人书单管理系统</h1>

      <div>本项目简单演示了Express4.x配合MongoDb实现一个图书管理系统的增删改查功能</div>
    </div>
    <div class="app-content">
      <div class="search-book">
        <div class="g-form-line">
          <span class="g-form-label">以书名检索</span>

          <div class="g-form-input">
            <input type="text" v-model="searchKey"/>
          </div>
        </div>
      </div>
      <table>
        <thead>
        <tr>
          <th v-for="Heads in tableHeaders">{{Heads.label}}</th>
          <th>操作</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(data,index) in filteredTableData">
          <td v-for="item in tableHeaders">
            {{data[item.name]}}
          </td>
          <td>
            <span @click="removeBook(index)">删除|</span><span @click="updateBook(index)">修改</span></td>
        </tr>
        </tbody>
      </table>
      <div class="add-book">
        <button class="btn" @click="showAddBookDialog">增加书籍</button>
      </div>
    </div>
    <div class="app-footer">
      <p>&copy; 2017/06</p>
    </div>
    <add-book-dialog :isShowAddBookDialog="isShowAddBookDialog" @onCloseAddBookDialog="hideAddBookDialog"
                     @addBook="updateView"></add-book-dialog>
    <update-book-dialog :isShowUpdateBookDialog="isShowUpdateBookDialog" :book="targetBook"
                        @onCloseUpdateBookDialog="hideUpdatedBookDialog" @updateBook="updateView"></update-book-dialog>
  </div>
</template>

<script>
  import AddBookDialog from './addBook.vue'
  import UpdateBookDialog from './updateBook.vue'
  export default {
    components: {
      AddBookDialog: AddBookDialog,
      UpdateBookDialog: UpdateBookDialog
    },
    data: function () {
      return {
        isShowAddBookDialog: false,
        isShowUpdateBookDialog: false,
        tableHeaders: [{name: 'name', label: '书名'},
          {name: 'author', label: '作者'},
          {name: 'publisher', label: '出版社'}],
        tableData: [],
        targetBook: {},
        searchKey: ''
      }
    },
    computed: {
      filteredTableData: function () {
        var self = this;
        return this.tableData.filter(function (item) {
          if (item.name) {
            return item.name.toLowerCase().indexOf(self.searchKey.toLowerCase()) !== -1;
          } else {
            return true;
          }
        })
      }
    },
    mounted: function () {
      this.getAllBooks()
    }
    ,
    methods: {
      getAllBooks: function () {
        let self = this;
        this.$http.get('http://localhost:3000/getBooks')
          .then(function (res) {
            //console.log(res);
            self.tableData = res.data;
          }, function (err) {
            console.log(err);
          })
      },
      hideAddBookDialog: function () {
        this.isShowAddBookDialog = false;
      }
      ,
      showAddBookDialog: function () {
        this.isShowAddBookDialog = true
      }
      ,
      hideUpdatedBookDialog: function () {
        this.isShowUpdateBookDialog = false;
        this.getAllBooks();
      }
      ,
      updateView: function (bookList) {
        this.searchKey = '';
        this.tableData = bookList;
      }
      ,
      removeBook: function (index) {
        let self = this;
        let book = this.filteredTableData[index];
        //console.log(book);
        this.$http.post('http://localhost:3000/deleteBook', book)
          .then(function (res) {
            self.tableData = res.body;
            //console.log('success')
          }, function () {
            console.log('failed')
          });
      }
      ,
      updateBook: function (index) {
        this.isShowUpdateBookDialog = true;
        this.targetBook = this.filteredTableData[index];
      }
    }
  }
</script>

<style>
  * {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    margin: 0;
    padding: 0;
    border: 0;
  }

  .g-form-line {
    padding: 15px 0;
    text-align: center;
  }

  .g-form-label {
    width: 100px;
    font-size: 16px;
    display: inline-block;
    text-align: left;
  }

  .g-form-input {
    display: inline-block;
  }

  .g-form-input input {
    height: 30px;
    width: 200px;
    line-height: 30px;
    padding: 0 10px;
    border: 1px solid #ccc;
  }

  .g-form-error {
    color: red;
    text-align: center;
    font-size: smaller;
  }

  .g-dialog-head {
    text-align: center;
    background: #0090D3;
    color: white;
    font-size: 30px;
    height: 60px;
    line-height: 60px;
    margin-bottom: 15px;
  }

  .g-dialog-foot {
    margin-top: 15px;
    border-top: 1px solid #cccccc;
    text-align: center;
  }

  .g-dialog-foot button {
    display: inline-block;
    background: #0090d3;
    color: white;
    margin: 20px 15px;
    height: 30px;
    width: 50px;
  }
</style>
<style scoped>
  .app-header {
    padding: 30px 15px;
    background: purple;
    color: white;
  }

  .app-footer {
    text-align: center;
    height: 50px;
    line-height: 50px;
    background: #e3e4e8;
    margin-top: 30px;
  }

  .app-content .search-book {
    margin-top: 30px;
  }

  .app-content table {
    width: 80%;
    min-width: 720px;
    margin: 10px auto 30px;
    padding: 15px 30px;
    background: #fff;
    text-align: center;
    border-collapse: collapse;
  }

  .app-content th,
  .app-content td {
    border: 1px solid #e3e3e3;
    padding: 10px 0;
  }

  .app-content th {
    background: #4fc08d;
    color: #fff;
  }

  .app-content table td span {
    cursor: pointer;
  }

  .add-book {
    text-align: center;
  }

  button {
    background: #4fc08d;
    display: inline-block;
    width: 80px;
    height: 30px;
    margin: 10px auto;
    color: white;
  }
</style>
