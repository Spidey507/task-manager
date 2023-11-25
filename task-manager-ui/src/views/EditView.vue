<template>
    <div>
      <h2>Edit Task</h2>
      <p>Task ID: {{ $route.params.id }}</p>
      <label for="title">Title:</label>
      <input type="text" v-model="editedTask.title" required>
  
      <label for="description">Description:</label>
      <input type="text" v-model="editedTask.description" required>
  
      <label for="dueDate">Due Date:</label>
      <input type="date" v-model="editedTask.dueDate" required>
  
      <button @click="updateTask">Update Task</button>
      <button @click="cancelEdit">Close</button>
    </div>
  </template>
    
  <script>
  export default {
    name: 'EditView',
    mounted() {
      this.getTask(this.$route.params.id);
    },
    data() {
      return {
        editedTask: {
          title: '',
          description: '',
          dueDate: '',
          _id: ''
        }
      }
    },
    watch: {
      '$route.params.id'(newId) {
        this.getTask(newId);
      }
    },
    methods: {
      async updateTask() {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/tasks/${this.editedTask._id}`, {
          method: 'PUT',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.editedTask),
        });
        // Implement the logic to update the task
        // Call an API endpoint or emit an event to update the task on the parent component
        if (response.ok) {
          this.$router.push('/tasks');
        } else {
          // Manejar el error
        }
      },
      async getTask(taskId) {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });
        // Implement the logic to update the task
        // Call an API endpoint or emit an event to update the task on the parent component
        if (response.ok) {
          const taskData = await response.json();
          this.editedTask = taskData;
        } else {
          // Manejar el error
        }
      },
      cancelEdit() {
        this.$router.push('/tasks');
      }
    }
  };
  </script>
    
  <style scoped>
  /* Add your modal styles here */
  </style>
    