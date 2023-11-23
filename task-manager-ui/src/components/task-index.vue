<template>
  <div>
    <h2>Task List</h2>
    <ul>
      <li v-for="task in tasks" :key="task._id">
        {{ task.title }} - {{ task.description }} - {{ task.dueDate }}
        <button @click="deleteTask(task._id)">Delete</button>
      </li>
    </ul>

    <h2>Create Task</h2>
    <form @submit.prevent="createTask">
      <label for="title">Title:</label>
      <input type="text" v-model="newTask.title" required>

      <label for="description">Description:</label>
      <input type="text" v-model="newTask.description" required>

      <label for="dueDate">Due Date:</label>
      <input type="date" v-model="newTask.dueDate" required>

      <button type="submit">Create Task</button>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tasks: [],
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
    async fetchTasks() {
      try {
        const response = await fetch('http://localhost:3000/api/tasks');
        this.tasks = await response.json();
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    },
    async createTask() {
      try {
        const response = await fetch('http://localhost:3000/api/tasks', {
          method: 'POST',
          headers: {
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
    async deleteTask(taskId) {
      try {
        const response = await fetch(`http://localhost:3000/api/tasks/${taskId}`, {
          method: 'DELETE',
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
