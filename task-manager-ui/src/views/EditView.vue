<template>
  <div class="bg-gray-800 min-h-screen flex items-center justify-center">
    <div class="bg-gray-700 py-10 shadow-md rounded flex flex-col w-1/3 items-center">
      <h1 class="text-white text-2xl mb-4">Edit Task</h1>
      <p class="text-white mb-4">Task ID: {{ $route.params.id }}</p>

      <form class="flex-col content-center items-center justify-center">
        <div class="form-group">
          <label for="title" class="flex w-full justify-center text-white mb-2">Title</label>
          <input v-model="editedTask.title" type="text" required class="flex mb-4 p-2 border rounded focus:outline-none focus:border-blue-500 text-center" />
        </div>

        <div class="form-group">
          <label for="description" class="flex w-full justify-center text-white mb-2">Description</label>
          <input v-model="editedTask.description" type="text" required class="flex mb-4 p-2 border rounded focus:outline-none focus:border-blue-500 text-center" />
        </div>

        <div class="form-group">
          <label for="dueDate" class="flex w-full justify-center text-white mb-2">Due Date</label>
          <input v-model="editedTask.dueDate" type="date" required class="flex mb-4 p-2 border rounded focus:outline-none focus:border-blue-500 text-center w-full" />
        </div>

        <!--
        <div class="error-group">
          <div v-if="checkErrors()" class="flex items-center p-4 mb-4 text-sm text-red-800 border border-red-300 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 dark:border-red-800" role="alert">
            <svg class="flex-shrink-0 inline w-4 h-4 me-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
            </svg>
            <span class="sr-only">Info</span>
            <div>
              <span class="font-medium">{{ this.errorMessage }}</span>
            </div>
          </div>
        </div>
        -->

        <div class="button-group mt-4 flex justify-between">
          <button @click="updateTask" class="bg-blue-500 hover:bg-blue-600 text-white p-3 rounded flex-grow">Update Task</button>
          <button @click="cancelEdit" class="bg-red-500 hover:bg-red-600 text-white p-3 rounded flex-grow ml-2">Close</button>
        </div>
      </form>
    </div>
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
    