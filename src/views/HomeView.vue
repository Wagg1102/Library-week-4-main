<script setup>
 import { getAuth } from "firebase/auth";
 console.log("home auth",getAuth())
 console.log("home auth current user",getAuth().currentUser)
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-12">
        <h1 class="text-center">Welcome to Our Family!</h1>
        <p class="text-center">
          We are delighted to have you here. Explore our community and become a part of our growing family.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px
}

h1 {
  font-size: 3rem;
  color: #275fda; 
  margin-top: 20px;
}

p {
  font-size: 1.5rem;
  color: #666;
  margin-top: 10px;
}
</style>