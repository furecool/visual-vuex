import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Director from '@/views/Director.vue'
import Group from '@/views/Group.vue'
import Branch from '@/views/Branch.vue'

Vue.use(VueRouter)

const routes = [
  // 總行
  {
    path: '/',
    // path: '/ :homeName',
    name: 'Home',
    component: Home
  },
  // 處長
  {
    // path: '/director',
    path: '/',
    // path: '/ :directorName',
    name: 'Director',
    component: Director
  },
  // 分區
  {
    // path: '/group',
    path: '/',
    // path: '/ :districtName',
    // path: '/2/ :districtName',
    name: 'Group',
    component: Group
  },
  // 分行
  {
    // path: '/branch',
    path: '/',
    // path: '/ :branchId',
    // path: '/3/ :branchId',
    name: 'Branch',
    component: Branch
  },

]

const router = new VueRouter({
  // mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
