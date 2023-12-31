<template>
  <!-- Create Task -->
  <div class="text-center flex-grow mx-4 mt-4">
    <h2 class="text-white text-2xl mb-4">Create Task</h2>
    <form @submit.prevent="createTask" class="bg-gray-700 w-3/4 mx-auto p-4 rounded-lg flex-grow items-center">
      <div class="flex justify-center mb-2 items-center">
        <div class="flex items-center">
          <label for="title" class="block text-white mx-2">Title:</label>
          <input v-model="newTask.title" type="text" required
            class="w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-center mx-2" />
        </div>
        <div class="flex items-center">
          <label for="description" class="block text-white mx-2">Description:</label>
          <input v-model="newTask.description" type="text" required
            class="mx-2 w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-center" />
        </div>

        <div class="flex items-center">
          <label for="dueDate" class="block text-white mx-2">Due Date:</label>
          <input v-model="newTask.dueDate" type="date" required
            class="mx-2 w-full p-2 border rounded focus:outline-nonbe focus:border-blue-500 text-center" />
        </div>
        <button type="submit" class="mx-2 flex items-center bg-green-500 hover:bg-green-600 text-white p-3 rounded">Create
          Task</button>
        </div>
      </form>
      <div class="w-3/4 mx-auto p-4 rounded-lg flex-grow items-center">
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
  </div>
  <!-- Search bar -->
  <div class="text-center flex-grow mx-4">
    <input type="text" v-model="searchTerm" @input="searchTasks" placeholder="Search"
      class="p-2 border rounded focus:outline-none focus:border-blue-500 text-center w-3/4" />
  </div>

  <!-- Task List -->
  <div class="text-center flex-grow mx-8">
    <h2 class="text-white text-2xl mb-4">Task List</h2>
    <table class="bg-gray-700 w-3/4 mx-auto text-white border border-gray-600 rounded-lg overflow-hidden">
      <!-- Table header -->
      <thead>
        <tr>
          <th class="p-2 border">Title</th>
          <th class="p-2 border">Description</th>
          <th class="p-2 border">Due Date</th>
          <th class="p-2 border">Actions</th>
        </tr>
      </thead>
      <!-- Table body -->
      <tbody>
        <tr v-for="task in tasks" :key="task._id">
          <td class="p-2 border">{{ task.title }}</td>
          <td class="p-2 border">{{ task.description }}</td>
          <td class="p-2 border">{{ formatDate(task.dueDate) }}</td>
          <td class="p-2 border">
            <button @click="editTask(task._id)"
              class="bg-blue-500 hover:bg-blue-600 text-white p-2 rounded mr-2">Edit</button>
            <button @click="deleteTask(task._id)"
              class="bg-red-500 hover:bg-red-600 text-white p-2 rounded">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { format } from 'date-fns';

export default {
  data() {
    return {
      tasks: [],
      selectedTask: null,
      searchTerm: '',
      errorMessage: null,
      newTask: {
        title: '',
        description: '',
        dueDate: '',
      },
    };
  },
  mounted() {
    this.fetchTasks();
  },
  methods: {
    checkErrors(){
      return(this.errorMessage !== null);
    },
    formatDate(date) {
      // Format the date in mm/dd/yyyy format
      return format(new Date(date), 'MM/dd/yyyy');
    },
    getUsername() {
      const token = localStorage.getItem('token');
      if (token) {
        // Decode the token to extract user information
        const payload = JSON.parse(atob(token.split('.')[1]));
        return payload.username; // Adjust this based on your token structure
      }
      return '';
    },
    async fetchTasks() {
      try {
        const token = localStorage.getItem('token');
        let url = 'http://localhost:3000/api/tasks';

        // Añade el parámetro de búsqueda a la URL
        if (this.searchTerm) {
          url += `?search=${encodeURIComponent(this.searchTerm)}`;
        }

        const response = await fetch(url, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error('Error fetching tasks');
        }

        this.tasks = await response.json();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    searchTasks() {
      this.fetchTasks();
    },
    async createTask() {
      this.errorMessage = null;

      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(this.newTask),
        });

        if (response.ok) {
          this.newTask = {
            title: '',
            description: '',
            dueDate: '',
          };

          // Fetch tasks again to update the list
          this.fetchTasks();
        } else {
          console.error('Error creating task:', response.statusText);
        }
      } catch (error) {
        console.error('Error creating task:', error);
        this.errorMessage = 'Error creating task';
      }
    },
    editTask(taskId) {
      this.$router.push({ name: 'EditView', params: { id: taskId } });
    },
    async deleteTask(taskId) {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (response.ok) {
          // Remove the deleted task from the tasks array
          this.tasks = this.tasks.filter(task => task._id !== taskId);
        } else {
          console.error('Error deleting task:', response.statusText);
        }
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    },
  },
};
</script>

<style>
/* Add your styles here */
</style>