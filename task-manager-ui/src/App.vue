<template>
  <div id="app">
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    </head>
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

</style>
