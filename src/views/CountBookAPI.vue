<template>
  <div id="app" style="text-align: center; padding-top: 20px;">

    <pre>{{ jsondata }}</pre>
    <p v-if="error">{{ error }}</p>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      jsondata: null,
      error: null,
    };
  },
  mounted() {
    this.getBookCountAPI();
  },
  methods: {
    async getBookCountAPI() {
      try {
        const response = await axios.get('https://countbooks-fyoxpel6ba-uc.a.run.app');
        this.jsondata = response.data;  
        this.error = null;
      } catch (error) {
        console.error('Error fetching book count:', error);
        this.error = 'Error fetching book count';
        this.jsondata = null;
      }
    },
  },
};
</script>
  <style scoped>
  button {
    margin-top: 20px;
  }
  </style>