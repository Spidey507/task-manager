<template>
    <div>
      <h2>Login</h2>
      <form @submit.prevent="loginUser">
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
  
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
  
        <button type="submit">Login</button>
      </form>
  
      <router-link to="/register">Don't have an account? Register here.</router-link>
    </div>
</template>
  
<script>
    export default {
    name: 'LoginView',
    data() {
        return {
        email: '',
        password: '',
        };
    },
    methods: {
        loginUser() {
        // Implement login logic here
        console.log('Login form submitted:', this.email, this.password);
        },
    },
    };
</script>