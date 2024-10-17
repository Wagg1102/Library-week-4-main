<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Admin Login</h1>

        <form @submit.prevent="submitForm">
          <div class="row mb-3 offset-md-4">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Admin Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
          </div>

          <div class="row mb-3 offset-md-4">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Admin Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
          </div>

          <div class="text-center" style="margin-bottom: 500px;">
            <button type="submit" class="btn btn-primary me-2">Submit</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">Clear</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import router from '../router/index';
import { useAuthticate } from '../router/authenticate';


const fixedAdminCredentials = {
  username: 'Robot',
  password: 'Hhw20001019,.'
}

const { isAuthenticated } = useAuthticate()

const formData = ref({
  username: '',
  password: ''
})

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  if (!errors.value.username && !errors.value.password) {
    if (formData.value.username === fixedAdminCredentials.username && formData.value.password === fixedAdminCredentials.password) {
      alert("Admin login success")
      isAuthenticated.value = true
      localStorage.setItem('isAuthenticated', 'true')
      router.push({ name: 'About' })
    } else {
      alert("Login failed. Please check your credentials.")
    }
  }
}

const errors = ref({
  username: null,
  password: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  if (formData.value.password.length < 8) {
    if (blur) errors.value.password = `Password must be at least 8 characters long.`
  } else {
    errors.value.password = null
  }
}

const clearForm = () => {
  formData.value.username = ''
  formData.value.password = ''
  errors.value.username = null
  errors.value.password = null
}
</script>
