<template>
  <div class="container">
    <header class="d-flex justify-content-between py-3">
      <div>
        <router-link to="/profile" class="nav-link d-inline-block" active-class="active">Profile</router-link>
      </div>
      <div class="d-flex justify-content-center w-100">
        <ul class="nav nav-pills">
          <li class="nav-item">
            <router-link to="/" class="nav-link" active-class="active" aria-current="page">Home</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/register" class="nav-link" active-class="active">Register</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/bookList" class="nav-link" active-class="active">Book List</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GetBookCount" class="nav-link" active-class="active">Get Book Count</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/CountBookAPI" class="nav-link" active-class="active">Count Book API</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/GetAllBookAPI" class="nav-link" active-class="active">Get All Book API</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/addBook" class="nav-link" active-class="active">Add Book</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/editBook" class="nav-link" active-class="active">Edit Book</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/about" class="nav-link" active-class="active">About</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/rating" class="nav-link" active-class="active">Rating</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/WeatherView" class="nav-link" active-class="active">Weather View</router-link>
          </li>
          <li class="nav-item">
            <router-link v-if="!isAuthenticated" to="/login" class="nav-link d-inline-block" active-class="active">Login</router-link>
            <router-link v-if="!isAuthenticated" to="/admin-login" class="nav-link d-inline-block" active-class="active">Admin Login</router-link>
            <button v-if="isAuthenticated" class="nav-link btn" @click="logout">Logout</button>
          </li>
          <li class="nav-item">
            <router-link to="/FireLogin" class="nav-link" active-class="active">Firebase Login</router-link>
          </li>
          <li class="nav-item">
            <router-link to="/FireRegister" class="nav-link" active-class="active">Firebase Register</router-link>
          </li>
          <li class="nav-item">
            <button class="nav-link btn" @click="firebaseLogout">Firebase Logout</button>
          </li>
        </ul>
      </div>
    </header>
  </div>
</template>

<script setup>
import {signOut } from 'firebase/auth'
import { getAuth } from 'firebase/auth';
import { useAuthticate } from '../router/authenticate';
import router from '../router/index';
import { Alert } from 'bootstrap';
const { isAuthenticated } = useAuthticate()
const logout = () => {
  isAuthenticated.value = false;
  localStorage.removeItem('isAuthenticated');
  alert("Logout successful");
  router.push({ name: 'Home' });
}
const auth = getAuth()
const firebaseLogout = () =>
     signOut(auth).then(()=>{
      alert("Sign out sucessful")
     }).catch((error) => {
      console.log("logout error", error)
     })
</script>
<style scoped>
.b-example-divider {
  height: 3rem;
  background-color: rgba(0, 0, 0, 0.1);
  border: solid rgba(0, 0, 0, 0.15);
  border-width: 1px 0;
  box-shadow:
    inset 0 0.5em 1.5em rgba(0, 0, 0, 0.1),
    inset 0 0.125em 0.5em rgba(0, 0, 0, 0.15);
}

.form-control-dark {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: var(--bs-gray);
}
.form-control-dark:focus {
  color: #fff;
  background-color: var(--bs-dark);
  border-color: #fff;
  box-shadow: 0 0 0 0.25rem rgba(255, 255, 255, 0.25);
}

.bi {
  vertical-align: -0.125em;
  fill: currentColor;
}

.text-small {
  font-size: 85%;
}

.dropdown-toggle {
  outline: 0;
}
</style>
