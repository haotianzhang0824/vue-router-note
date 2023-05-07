# vue-router笔记

## 安装vue-router

安装完成后，在`package.json`中可以看到vue-router的依赖。

## 配置router

在src下面新建一个`router`文件夹，在其中新建`index.js`。

现在假设我们在`components`下面有两个vue组件：`Home.vue`和`About.vue`。

那么首先在`index.js`中进行如下配置：

```javascript
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import About from '../components/About.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

```

然后在main.js中添加配置（其实下面的可以直接覆盖掉main的内容）：

```javascript
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

createApp(App).use(router).mount('#app');
```

最后在`App.vue`中添加用于显示组件的标签：

```vue
<template>
  <div>
    <h1>App.vue</h1>
    <!-- 在下面添加router-view标签，不用写内容。 -->
    <router-view></router-view>
  </div>
</template>

```

这样即可通过指定的url访问对应的组件（他们将会显示在`router-view`的位置）。

## 解决无法识别的路径

如果用户访问了index.js中没有指定的路径，那么`<router-view>`标签中间将会是空的，对应的就是什么都不显示，为了防止这种问题，可以手动配置一个`/err`路径指向出错页面，然后通过拦截用户的路径请求并转发到`/err`来实现显示错误，下面是修改以后的index.js文件。

```javascript
import { createRouter, createWebHistory } from 'vue-router';

import Home from '../components/Home.vue';
import About from '../components/About.vue';
// 导入对应的vue组件。
import Error from '../components/Error.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
    // 在这里添加一个新的Error
  {
    path: '/err',
    name: 'Error',
    component: Error
  },
  {
    // 找不到的路径自动跳转到`/err`路径
    path:"/*", readreject: '/err'
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

```

## 渲染二级路由

vue-router可以渲染二级路由，也就是组件中的组件。

下面是一个二级路由的代码，假设`About.vue`下面有一个`<router-view>`标签，用来选择`a.vue`和`b.vue`。

```javascript
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
    // 在这里添加二级路由
    children: [
      {
        path: 'pagea', // 注意：二级路由不需要添加`/`符号
        name: 'aboutPagea',
        component: Pagea
      },
      {
        path: 'pageb',
        name: 'aboutPageb',
        component: Pageb
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
```

## router-link

router-link用于路由之间的跳转，使用起来和a标签类似。

还是上面的例子，现在在App.vue中添加`router-link`标签实现路由跳转。通过添加`target`属性，可以像`a`标签一样设置是否在新页面打开。

```vue
<template>
  <div>
    <h1>App.vue</h1>
    <!-- 其他组件内容 -->
    <hr>
    <router-link to="/">跳转到首页</router-link><br>
    <router-link to="/about">跳转到about</router-link> <br>
    <router-link to="/about/pagea">跳转到about/pagea</router-link> <br> 
    <router-link to="/about/pageb">跳转到about/pageb</router-link> <br>
    <!-- 可以通过设置target决定是否在新标签页打开 -->
    <router-link to="/err" target="_blank">跳转到err</router-link> <br>
    <hr>
    <router-view></router-view>
  </div>
</template>

```

### 替换历史记录

`router-link`组件的`replace`属性**用于指定导航时是否替换浏览器的历史记录**。默认情况下，当用户点击一个`router-link`导航链接时，会在浏览器的历史记录中添加一个新的记录，这样用户可以通过浏览器的后退按钮返回到之前的页面。

然而，有时候你可能希望在导航时替换当前的历史记录，而不是添加一个新的记录。这时就可以使用`replace`属性。将`replace`属性设置为`true`时，导航会替换当前的历史记录，而不会创建新的记录。这意味着用户无法通过后退按钮返回到之前的页面。

下面是一个示例，演示了如何使用`replace`属性：

```html
<router-link to="/home" replace>Home</router-link>
```

在上述代码中，当用户点击该链接时，应用程序将导航到`/home`路径，并且会替换当前的浏览器历史记录。

使用`replace`属性可以在某些情况下很有用，**例如在用户进行登录后，将其重定向到受保护的页面，以防止用户通过后退按钮返回到登录页面。**

需要注意的是，`replace`属性仅在支持HTML5历史记录API的浏览器中有效。对于不支持该API的浏览器，`replace`属性会被忽略，导航行为会默认添加新的历史记录。

### `to`属性接收对象

`router-link`组件的`to`属性是可以接收一个json对象的，但是需要将对象要传递的数据的`key`在`index.js`中设置路由的时候标明。

这里没有测试成功，另外因为感觉用处不大所以这里就不记录了。

### 通过button实现跳转

为`button`绑定push函数即可实现跳转：

```html
<script>
export default {
  methods: {
    newPush () {
      this.$router.push('/');
    },
    pushToAbout() {
      this.$router.push({path: "/about"})
    },
    pushObj() {
      this.$router.push({ path: '/about/pagea', query: { value: 2 } });
    }
  }
}

</script>
```

同理，这里也可以push一个json对象进去。利用这样的方式可以实现传递参数。

```js
// 通过将query修改成params，可以实现类似post的方式，将参数放在请求体中。
pushObj2() {
  this.$router.push({name: 'aboutPagea', params: {username: 'zhangsan'}});
}    
```

注意，使用上述方法的时候，要同时保证index.js中对应路径有配置username参数，否则控制台会给警告。

```js
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
```

