import Vue from 'vue'
import Router from 'vue-router'
import IndexPage from '../pages/index.vue'
import DetailPage from '../pages/detail.vue'
import DetailAnaysis from '../pages/detail/analysis.vue'
import DetailCount from '../pages/detail/count.vue'
import DetailForecast from '../pages/detail/forecast.vue'
import DetailPublish from '../pages/detail/publish.vue'
import OrderListPage from '../pages/orderList.vue'
Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [

    {
      path: '/',
      component: IndexPage
    }, {
      path: '/orderList',
      component: OrderListPage
    }, {
      path: '/detail',
      component: DetailPage,
      redirect: '/detail/analysis',
      children: [
        {
          path: 'forecast',
          component: DetailForecast
        },
        {
          path: 'analysis',
          component: DetailAnaysis
        }, {
          path: 'publish',
          component: DetailPublish
        }, {
          path: 'count',
          component: DetailCount
        }
      ]
    }

  ]
})
