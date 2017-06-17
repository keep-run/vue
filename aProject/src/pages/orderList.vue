<template>
  <div class="order-wrap">
    <h3>您的产品订单：</h3>

    <div class="order-list-choose">
      <div class="order-list-option">
        选择产品:
        <v-selection :selections="products" @on-change="productChange"></v-selection>
      </div>
      <div class="order-list-option">
        开始日期
        <v-date-picker @change="changeStartDate"></v-date-picker>
      </div>
      <div class="order-list-option">
        结束日期
        <v-date-picker @change="changeEndDate"></v-date-picker>
      </div>
      <div class="order-list-option">
        关键词:
        <input type="text" v-model.lazy="query" class="order-query"/><!--.lazy表示输入完之后，query的值才改变-->
      </div>
    </div>
    <div class="order-list-table">
      <table>
        <tr>
          <th v-for="head in tableHeads"
              @click="changeOrder(head)"
              :class="{active:head.active}"
            >{{head.label}}
          </th>
        </tr>
        <tr v-for="data in tableData">
          <td v-for="item in tableHeads">{{data[item.key]}}</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
  import VSelection from '../components/base/selection.vue'
  import VDatePicker from '../components/base/datepicker.vue'
  export default {
    components: {
      VSelection: VSelection,
      VDatePicker: VDatePicker
    },
    data: function () {
      return {
        currentOrder: 'asc',
        tableData: [],
        productId: 0,
        startDate: '',
        endDate: '',
        query: '',
        products: [
          {
            label: '数据统计',
            value: 0
          }, {
            label: '数据预测',
            value: 1
          }, {
            label: '流量分析',
            value: 2
          }, {
            label: '广告发布',
            value: 3
          }],
        tableHeads: [
          {
            label: '订单号',
            key: 'orderId'
          }, {
            label: '购买产品',
            key: 'product'
          }, {
            label: '版本类型',
            key: 'version'
          }, {
            label: '有效时间',
            key: 'period'
          }, {
            label: '购买日期',
            key: 'date'
          }]
      }
    },
    methods: {
      productChange: function (obj) {
        this.getTableData();
        this.productId = obj.value;
      },
      changeStartDate: function (date) {
        this.getTableData();
        this.startDate = date;
      },
      changeEndDate: function (date) {
        this.getTableData();
        this.endDate = date;
      },
      getTableData: function () {
        let self = this;
        let reqParm = {
          query: this.query,
          productId: this.productId,
          startDate: this.startDate,
          endDate: this.endDate
        };
        this.$http.post('/api/getOrderList', reqParm)
          .then(function (res) {
            self.tableData = res.data.list;
          }, function (err) {
            console.log(err);
          })
      },

      changeOrder: function (headItem) {
        /*根据vue2.0变化检测问题，这里给已经生成的对象添加属性，他不是响应式的，
         解决办法就是如下所示，变化之后，再次赋值，或者利用 vue.set方法添加属性*/
        this.tableHeads = this.tableHeads.map(function (item) {
          item.active = false;
          return item;
        });
        headItem.active = true;
        //this.tableData.reverse();
      }
    },
    mounted: function () {
      this.getTableData();
    },
    watch: {
      query: function () {
        this.getTableData();
      }
    }

  }
</script>
<style scoped>
  .order-wrap {
    width: 1200px;
    min-height: 800px;
    margin: 20px auto;
    overflow: hidden;
  }

  .order-wrap h3 {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 20px;
  }

  .order-query {
    height: 25px;
    line-height: 25px;
    border: 1px solid #e3e3e3;
    outline: none;
    text-align: center;
  }

  .order-list-option {
    display: inline-block;
    padding-left: 15px;
  }

  .order-list-option:first-child {
    padding-left: 0;
  }

  .order-list-table {
    margin-top: 20px;
  }

  .order-list-table table {
    width: 100%;
    background: #fff;
  }

  .order-list-table td,
  .order-list-table th {
    border: 1px solid #e3e3e3;
    text-align: center;
    padding: 10px 0;
  }

  .order-list-table th {
    background: #4fc08d;
    color: #fff;
    border: 1px solid #4fc08d;
    cursor: pointer;
  }

  .order-list-table th.active {
    background: #35495e;
  }
</style>
