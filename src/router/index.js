import {
  createRouter,
  createWebHashHistory
} from 'vue-router'
import Home from '../views/Home.vue'
import Test from '../views/Test.vue'
import ProgressBar from '../views/ProgressBar.vue'
import TestIdCardOcr from '../views/TestIdCardOcr.vue'

const routes = [{
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/test',
    name: 'Test',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    // component: () => import(/* webpackChunkName: "about" */ '../views/Test.vue')
    component: Test
  },
  {
    path: '/progressBar',
    name: 'ProgressBar',
    component: ProgressBar
  },
  {
    path: '/testIdCardOcr',
    name: 'TestIdCardOcr',
    component: TestIdCardOcr
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
