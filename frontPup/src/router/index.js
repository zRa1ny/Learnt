import Vue from 'vue'
import Router from 'vue-router'
import MainIndex from '@/components/Main'
import ElementUi from '@/components/ElementUi'
import ElementUiTree from '@/components/elementui/Tree'

Vue.use(Router)

export default new Router({
  routes: [{
    path: '/',
    name: 'index',
    component: MainIndex,
    children: [{
      path: 'elment-ui',
      name: 'elementui',
      component: ElementUi,
      children: [{
        path: 'tree',
        name: 'tree',
        component: ElementUiTree
      }]
    }]
  }]
})
