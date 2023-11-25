<template>
    <div class="modal">
      <h2>Edit Task</h2>
      <label for="title">Title:</label>
      <input type="text" v-model="editedTask.title" required>
  
      <label for="description">Description:</label>
      <input type="text" v-model="editedTask.description" required>
  
      <label for="dueDate">Due Date:</label>
      <input type="date" v-model="editedTask.dueDate" required>
  
      <button @click="updateTask">Update Task</button>
      <button @click="closeModal">Close</button>
    </div>
  </template>
  
  <script>
  export default {
    props: {
      task: Object, // Pass the selected task as a prop
    },
    data() {
      return {
        editedTask: { ...this.task }, // Make a copy of the task for editing
      };
    },
    methods: {
      async updateTask() {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/tasks/' + this.editedTask._id, {
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
          this.$emit('update-task', this.editedTask);
        } 
        this.closeModal();
      },
      closeModal() {
        this.$emit('close-modal');
      },
    },
  };
  </script>
  
  <style scoped>
  /* Add your modal styles here */
  </style>
  