import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import About from '../components/About.vue';
import Error from '../components/Error.vue';
import Pagea from '../components/Pagea.vue';
import Pageb from '../components/Pageb.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    children: [
      {
        path: 'pagea:username', // 注意：二级路由不需要添加`/`符号
        name: 'aboutPagea',
        component: Pagea
      },
      {
        path: 'pageb',
        // 标明name属性应该是pageb，这样的话，当router-link的to属性传入一个json对象的时候，就可以发挥功能。
        name: 'aboutPageb',
        component: Pageb,
      }
    ]
  },
  {
    path: '/err',
    name: 'Error',
    component: Error
  },
  {
    // 找不到的路径自动跳转到`/err`路径
    path: "/*", readreject: '/err'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
