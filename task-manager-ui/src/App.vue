<template>
  <div id="app">
    <head>
      <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css">
    </head>
    <div class="bg-gray-800 h-screen flex flex-col">
      <!-- Navbar -->
      <div class="bg-gray-700 p-4 flex justify-between items-center">
        <!-- Welcome message and logout button -->
        <div class="text-white">
          <!-- Welcome, {{ getUsername() }}! -->
        </div>
        <div class="flex items-center">
          <!-- Logout button -->
          <button v-if="authStatus" @click="logout" class="bg-red-700 text-white p-2 rounded">Logout</button>
        </div>
      </div>
      <router-view></router-view>
    </div>
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



<style></style>
