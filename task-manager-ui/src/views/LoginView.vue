<template>
  <div>
    <form @submit.prevent="submit">
      <input v-model="email" type="text" placeholder="email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Login</button>

    </form>
    <p>Don't have an account? <router-link to="/register">Register here</router-link>.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    async submit() {
      try {
        const response = await fetch("http://localhost:3000/api/users/login", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.email,
            password: this.password
          })
        });

        if (!response.ok) {
          throw new Error('Error in login request');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        this.$router.push('/tasks');

        // Redirect or change application state
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    }

  },
  mounted() {
    // If user is already authenticated, redirect to tasks page
    if (this.$root.isAuthenticated()) {
      this.$router.push('/tasks');
    }
  }
};
</script>