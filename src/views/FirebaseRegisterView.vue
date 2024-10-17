<template>
    <div class="container d-flex justify-content-center" style="height: 100vh;">
      <div class="w-50 mt-5">
        <h1 class="text-center">Create an Account</h1>
        <p><input type="text" class="form-control" placeholder="Email" v-model="email" /></p>
        <p><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>
        <p><button @click="register" class="btn btn-primary w-100">Save to Firebase</button></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const auth = getAuth();  
  const router = useRouter();
  const register = () => {
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log("Registration Succeed!");  
      console.log("userCredential", userCredential);  
      console.log("userCredential.user", userCredential.user);  
      alert("Registration Succeed!")
      
      router.push('/FireLogin');                   
    })
    .catch((error) => {
      console.log("Registration Failed!");  
      const errorCode = error.code
      const errorMessage = error.message
      console.log("register error code", errorCode);
      console.log("register error message", errorMessage);    
      alert("Registration Failed!" + errorMessage)                
    });
};
  </script>


