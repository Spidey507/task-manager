<template> 
  <form @submit.prevent="submit"> 
    <input v-model="username" type="text" placeholder="Username" /> 
    <input v-model="email" type="email" placeholder="Email" /> 
    <input v-model="password" type="password" placeholder="Password" /> 
    <button type="submit">Register</button> 
  </form> 
</template> 
 
<script> 
export default { 
  data() { 
    return { 
      username: '', 
      email: '', 
      password: '' 
    }; 
  }, 
  methods: { 
    async submit() { 
      const urlCompleta = "http://localhost:3000/api/users/register";
 
      try { 
        const response = await fetch(urlCompleta, { 
          method: 'POST', 
          headers: { 
            'Content-Type': 'application/json', 
          }, 
          body: JSON.stringify({ 
            username: this.username, 
            email: this.email, 
            password: this.password 
          }) 
        }); 
 
        if (!response.ok) { 
          throw new Error('Error en la solicitud de registro'); 
        } 
 
        const data = await response.json(); 
        console.log(data)
        // Manejo de la respuesta, como redirigir al usuario o mostrar un mensaje de éxito 
      } catch (error) { 
        console.error(error); 
        // Manejo de errores 
      } 
    } 
  } 
}; 
</script> 
