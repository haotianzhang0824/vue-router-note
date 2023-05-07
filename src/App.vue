<template>
  <div>
    <h1>App.vue</h1>
    <!-- 其他组件内容 -->
    <hr>
    <router-link to="/">跳转到首页</router-link><br>
    <router-link to="/about">跳转到about</router-link> <br>
    <router-link to="/about/pagea">跳转到about/pagea</router-link> <br>
    <!-- 这里传入了一个json对象。 -->
    <router-link to="/about/pageb">跳转到about/pageb</router-link> <br>
    <!-- 这里指定在新标签页打开页面。 -->
    <router-link to="/err" target="_blank">跳转到err</router-link> <br>
    <hr>
    <button @click="getParam">取参数/</button><br>
    <button @click="newPush">简单的跳转/</button><br>
    <button @click="pushToAbout">跳转到about</button><br>
    <button @click="pushObj">带有数据的get访问/about/pagea</button><br>
    <button @click="pushObj2">带有数据的post访问/about/pagea</button><br>    
    <hr>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  methods: {
    getParam() {
      console.log(this.$route);
    },
    newPush () {
      this.$router.push('/');
    },
    pushToAbout() {
      this.$router.push({path: "/about"})
    },
    // 这样可以通过对象携带数据到请求中，使用query的话相当于使用了get请求，请求参数会被暴露在地址栏中。
    pushObj() {
      this.$router.push({ path: '/about/pagea', query: { value: 2 } });
    },
    // 通过将query修改成params，可以实现类似post的方式，将参数放在请求体中。
    pushObj2() {
      this.$router.push({name: 'aboutPagea', params: {username: 'zhangsan'}});
    }    
  }
}

</script>
