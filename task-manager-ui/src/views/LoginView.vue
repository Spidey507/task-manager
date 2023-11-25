<template>
  <div class="bg-gray-800 min-h-screen flex items-center justify-center">
    <div class="bg-gray-700 py-10 shadow-md rounded flex flex-col w-1/3 items-center">
      <form @submit.prevent="submit" class="flex flex-col items-center mb-4">
        <input v-model="email" type="text" placeholder="Email"
          class="mb-4 p-2 border rounded focus:border-blue-500 text-center focus:outline-none" />
        <input v-model="password" type="password" placeholder="Password"
          class="mb-4 p-2 border rounded focus:border-blue-500 text-center focus:outline-none" />
        <div>
          <div v-if="checkErrors()"
            class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800"
            role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
              fill="currentColor" viewBox="0 0 20 20">
              <path
                d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{{ this.errorMessage }}</span>
            </div>
          </div>
        </div>
        <button type="submit" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded">Login</button>
      </form>
      <p class="text-white">Don't have an account? <router-link to="/register"
          class="text-blue-500 hover:text-blue-600">Register here</router-link>.</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '', 
      errorMessage: null,
    };
  },
  methods: {
    checkErrors(){
      return(this.errorMessage !== null);
    },
    async submit() {
      this.errorMessage = null;

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
        this.errorMessage = 'Error in login request';
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