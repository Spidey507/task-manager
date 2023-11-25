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
import axios from 'axios';

export default {
  data() {
    return {
      username: '',
      password: ''
    };
  },
  methods: {
    async submit() {
      try {
        const response = await axios.post(, {
          username: this.username,
          password: this.password
        });
        localStorage.setItem('token', response.data.token);
        // Redirige o cambia el estado de la aplicación
      } catch (error) {
        console.error(error);
        // Manejo de errores
      }
    }
  }
};
</script>

<style>
  
</style>