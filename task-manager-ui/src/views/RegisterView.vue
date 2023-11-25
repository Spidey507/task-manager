<template>
    <div>
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <label for="username">Username:</label>
        <input type="text" v-model="username" required>
  
        <label for="email">Email:</label>
        <input type="email" v-model="email" required>
  
        <label for="password">Password:</label>
        <input type="password" v-model="password" required>
  
        <button type="submit">Register</button>
      </form>
  
      <router-link to="/login">Already have an account? Login here.</router-link>
    </div>
  </template>
  
<script>
    export default {
    name: 'RegisterView',
    data() {
        return {
        username: '',
        email: '',
        password: '',
        };
    },
    methods: {
        registerUser() {
        // Implement registration logic here
        console.log('Registration form submitted:', this.username, this.email, this.password);
        },
    },
    };
</script>

<style>

</style>
  