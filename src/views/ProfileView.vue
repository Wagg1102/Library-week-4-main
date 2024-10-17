<template>
  <div class="container mt-5">
    <h2>Profile</h2>
    <div v-if="isAuthenticated" class="card mt-3">
      <div class="card-body">
        <h5 class="card-title">User Information</h5>
        <p class="card-text">Detail information</p>
      </div>
    </div>
    <div v-else class="alert alert-warning mt-3">
      <p>Need to login to check your information</p>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const isAuthenticated = ref(localStorage.getItem('isAuthenticated') === 'true');

// Watch for changes in localStorage to update the component when logging out
window.addEventListener('storage', () => {
  isAuthenticated.value = localStorage.getItem('isAuthenticated') === 'true';
});
</script>
