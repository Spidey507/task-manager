<template>
  <div>
    <form @submit.prevent="submit">
      <input v-model="username" type="text" placeholder="Username" />
      <input v-model="email" type="email" placeholder="Email" />
      <input v-model="password" type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
    <p>Already have an account? <router-link to="/login">Log in here</router-link>.</p>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      email: '',
      password: '',
    };
  },
  methods: {
    async submit() {
      try {
        const response = await fetch("http://localhost:3000/api/users/register", {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: this.username,
            email: this.email,
            password: this.password,
          }),
        });

        if (!response.ok) {
          throw new Error('Error in registration request');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);

        // Update authentication status
        this.$root.updateAuthStatus();
        this.$router.push('/tasks');

        // Redirect or change application state
      } catch (error) {
        console.error(error);
        // Handle errors
      }
    },
  },
  mounted() {
    // If user is already authenticated, redirect to tasks page
    if (this.$root.isAuthenticated()) {
      this.$router.push('/tasks');
    }
  }
};
</script>
