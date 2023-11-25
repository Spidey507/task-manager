<template>
  <form @submit.prevent="submit">
    <input v-model="email" type="text" placeholder="email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
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
          console.log(response)
          throw new Error('Error en la solicitud');
        }

        const data = await response.json();
        localStorage.setItem('token', data.token);
        // Redirige o cambia el estado de la aplicación
      } catch (error) {
        console.error(error);
        // Manejo de errores
      }
    }
  }
};
</script>