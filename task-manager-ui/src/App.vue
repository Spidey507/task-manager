<template>
  <div id="app">
    <router-view></router-view>
    <button v-if="authStatus" @click="logout">Logout</button>
  </div>
</template>

<script>
export default {
  name: 'App',
  data() {
    return {
      authStatus: this.isAuthenticated(),
    };
  },
  watch: {
    '$route': 'updateAuthStatus',
  },
  methods: {
    isAuthenticated() {
      return localStorage.getItem('token') !== null;
    },
    logout() {
      localStorage.removeItem('token');
      this.$router.push('/login');
    },
    updateAuthStatus() {
      this.authStatus = this.isAuthenticated();
    },
  },
};
</script>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
