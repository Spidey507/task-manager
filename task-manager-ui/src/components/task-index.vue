<template>
  <div class="bg-gray-800 h-screen flex flex-col">
    <!-- Navbar -->
    <div class="bg-gray-700 p-4 flex justify-between items-center">
      <!-- Welcome message and logout button -->
      <div class="text-white">
        <!-- Welcome, {{ getUsername() }}! -->
      </div>
      <div class="flex items-center">
        <!-- Search bar -->
        <div class="mx-4">
          <label for="search" class="text-white">Search:</label>
          <input type="text" v-model="searchTerm" @input="searchTasks"
            class="p-2 border rounded focus:outline-none focus:border-blue-500 text-center" />
        </div>
        <!-- Logout button -->
        <button @click="logout" class="bg-red-700 text-white p-2 rounded">Logout</button>
      </div>
    </div>

    <!-- Create Task form -->

    <!-- Create Task -->
    <div class="text-center flex-grow mx-8 mt-4">
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
              class="mx-2 w-full p-2 border rounded focus:outline-none focus:border-blue-500 text-center" />
          </div>
          <button type="submit"
            class="mx-2 flex items-center bg-green-500 hover:bg-green-600 text-white p-3 rounded">Create Task</button>
        </div>

      </form>
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
            <td class="p-2 border">{{ formatDate(task.dueDate)  }}</td>
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

<style>/* Add your styles here */</style>