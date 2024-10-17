<template>
    <div class="container d-flex justify-content-center" style="height: 100vh;">
      <div class="w-50 mt-5">
        <h1 class="text-center">Firebase Login</h1>
        <p><input type="text" class="form-control" placeholder="Email" v-model="email" /></p>
        <p><input type="password" class="form-control" placeholder="Password" v-model="password" /></p>
        <p><button @click="fireSignin" class="btn btn-primary w-100">Signin to Firebase</button></p>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from "vue";
  import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
  import { useRouter } from "vue-router";
  
  const email = ref("");
  const password = ref("");
  const auth = getAuth();  
  const router = useRouter();
  const adminEmail = "admin123@outlook.com"
  const fireSignin = () => {
 signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      if (userCredential.user.email == adminEmail)
    {
        alert("Welcome our staff!")
        router.push('/admin-login')
    }else{
        alert("Login Succeed!")
    }
      console.log("Login Succeed!");  
      console.log("userCredential", userCredential);  
      console.log("userCredential.user", userCredential.user);  
      console.log("auth", auth)
      
      router.push('/');                   
    })
    .catch((error) => {
      console.log("Login Failed!");  
      const errorCode = error.code
      const errorMessage = error.message
      console.log("register error code", errorCode);
      console.log("register error message", errorMessage);    
      alert("Login Failed!" + errorMessage)                
    });
};
  </script>
