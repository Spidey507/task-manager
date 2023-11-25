<template>
  <div class="bg-gray-800 min-h-screen flex items-center justify-center">
    <div class="bg-gray-700 py-10 shadow-md rounded flex flex-col w-1/3 items-center">
      <form @submit.prevent="submit" class="flex flex-col items-center mb-4">
        <input v-model="email" type="text" placeholder="Email" class="mb-4 p-2 border rounded focus:border-blue-500 text-center focus:outline-none" />
        <input v-model="password" type="password" placeholder="Password" class="mb-4 p-2 border rounded focus:border-blue-500 text-center focus:outline-none" />
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">Login</button>
      </form>
      <p class="text-white">Don't have an account? <router-link to="/register" class="text-blue-500 hover:text-blue-600">Register here</router-link>.</p>
    </div>
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