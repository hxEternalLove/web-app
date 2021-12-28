<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <!-- <HelloWorld msg="Welcome to Your Vue.js App"/> -->
    <Main/>
  </div>
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Main from './components/main.vue'

export default {
  name: 'App',
  components: {
    // HelloWorld,
    Main
  }
}
</script>

<style>
@import './assets/index.css';
body, ul, li {
    margin: 0;
    padding: 0;
    font-family: "微软雅黑",Arial, Helvetica, sans-serif,\u5FAE\u8F6F\u96C5\u9ED1;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  min-height: 100%;
  /* margin-top: 60px; */
}
</style>
