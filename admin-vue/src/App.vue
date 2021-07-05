<template>
  <div id="app">
    <!--<div id="nav">-->
    <!--  &lt;!&ndash;<router-link to="/login">Login</router-link> |&ndash;&gt;-->
    <!--  &lt;!&ndash;<router-link to="/about">About</router-link>&ndash;&gt;-->
    <!--   App.vue外部页面-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: "App",
    watch: {
      $route(to, from){
        if (to.path != '/login'){
          let obj = {
            name: to.name,
            title: to.meta.title
          }
          this.$store.commit("abbTab", obj)
        }
      }
    }
  }
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

  /*html, body, #app {*/
  /*  font-family: 'Helvetica Neue', 'Hiragino Sans GB', 'WenQuanYi Micro Hei', 'Microsoft Yahei', sans-serif;*/
  /*  height: 100%;*/
  /*  padding: 0;*/
  /*  margin: 0;*/
  /*  font-size: 15px;   }*/


#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>
