<template>
  <div class="container d-flex justify-content-center" style="height: 100vh; padding-top: 50px;">
    <div class="w-50">
      <h1 class="text-center mb-4">Add Book</h1>
      <form @submit.prevent="addBook">
        <div class="mb-3">
          <label for="isbn" class="form-label">ISBN:</label>
          <input type="text" v-model="isbn" id="isbn" class="form-control" required />
        </div>
        <div class="mb-3">
          <label for="name" class="form-label">Name:</label>
          <input type="text" v-model="name" id="name" class="form-control" required />
        </div>
        <button type="submit" class="btn btn-primary w-100">Add Book</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import axios from 'axios';

const isbn = ref('');
const name = ref('');

const addBook = async () => {
  try {
    console.log('ISBN:', isbn.value);   
    console.log('Name:', name.value);   

    if (isNaN(Number(isbn.value))) {
      alert('ISBN must be a valid number');
      return;
    }
    const response = await axios.post('https://addbook-fyoxpel6ba-uc.a.run.app', {
      isbn: isbn.value,
      name: name.value
    });

    console.log("response", response.data);
    alert('Add book succeed');
    
    isbn.value = '';
    name.value = '';
  } catch (err) {
    console.error('Error: ', err);
    alert('Error adding book');
  }
};
</script>

<style scoped>
.container {
  max-width: 500px;
}

button {
  margin-top: 20px;
}
</style>