<template>
    <div class="container" style="padding-top: 20px;">
      <h1>Get All Books API</h1>
      <pre>{{ books }}</pre>
      <p v-if="error">{{ error }}</p>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        books: null,  
        error: null,  
      };
    },
    mounted() {
      this.getAllBooks();  
    },
    methods: {
      async getAllBooks() {
        try {
          const response = await axios.get('https://getallbooks-fyoxpel6ba-uc.a.run.app'); 
          this.books = response.data;  
          this.error = null;
        } catch (error) {
          console.error("Error fetching books:", error);
          this.error = "Error fetching books";
          this.books = null;
        }
      },
    },
  };
  </script>