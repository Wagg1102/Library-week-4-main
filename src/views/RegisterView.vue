<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

const formData = ref({
  username: '',
  password: '',
  confirmPassword: '',
  isCommunityMember: false, 
  reason: '',
  gender: '',
  suburb: '',
  role: 'user' 
})

const adminUsers = ref([])
const normalUsers = ref([])

const submitForm = () => {
  validateName(true)
  validatePassword(true)
  validateConfirmPassword(true)
  validateReason(true)
  if (
    !errors.value.username &&
    !errors.value.password &&
    !errors.value.confirmPassword &&
    !errors.value.reason
  ) {
    const newUser = { ...formData.value }
    if (formData.value.role === 'admin') {
      adminUsers.value.push(newUser)
    } else {
      normalUsers.value.push(newUser)
    }
    clearForm()
  }
}

const clearForm = () => {
  formData.value = {
    username: '',
    password: '',
    confirmPassword: '',
    isCommunityMember: false, 
    reason: '',
    gender: '',
    suburb: '',
    role: 'user'
  }
}

const errors = ref({
  username: null,
  password: null,
  confirmPassword: null,
  resident: null,
  gender: null,
  reason: null
})

const validateName = (blur) => {
  if (formData.value.username.length < 3) {
    if (blur) errors.value.username = 'Name must be at least 3 characters'
  } else {
    errors.value.username = null
  }
}

const validatePassword = (blur) => {
  const password = formData.value.password
  const minLength = 8
  const hasUppercase = /[A-Z]/.test(password)
  const hasLowercase = /[a-z]/.test(password)
  const hasNumber = /\d/.test(password)
  const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password)

  if (password.length < minLength) {
    if (blur)
      errors.value.password = `Password must be at least ${minLength} characters long.`
  } else if (!hasUppercase) {
    if (blur)
      errors.value.password = 'Password must contain at least one uppercase letter.'
  } else if (!hasLowercase) {
    if (blur)
      errors.value.password = 'Password must contain at least one lowercase letter.'
  } else if (!hasNumber) {
    if (blur)
      errors.value.password = 'Password must contain at least one number.'
  } else if (!hasSpecialChar) {
    if (blur)
      errors.value.password = 'Password must contain at least one special character.'
  } else {
    errors.value.password = null
  }
}

const validateConfirmPassword = (blur) => {
  if (formData.value.password !== formData.value.confirmPassword) {
    if (blur) errors.value.confirmPassword = 'Passwords do not match.'
  } else {
    errors.value.confirmPassword = null
  }
}

const validateReason = (blur) => {
  if (formData.value.reason.length < 10) {
    if (blur) errors.value.reason = 'Reason must be more than 10 characters'
  } else {
    errors.value.reason = null
  }
}

const validateReasonContainWord = (blur) => {
  if (formData.value.reason.includes('friend')) {
    if (blur) containFriend.value = true
  } else {
    containFriend.value = false
  }
}

const containFriend = ref(false)
</script>

<template>
  <div class="container mt-5">
    <div class="row">
      <div class="col-md-8 offset-md-2">
        <h1 class="text-center">Community Service Center Registration</h1>
        <p class="text-center">
          Please fill out the form below to register as an admin or user.
        </p>
        <form @submit.prevent="submitForm">
          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="username" class="form-label">Username</label>
              <input
                type="text"
                class="form-control"
                id="username"
                @blur="() => validateName(true)"
                @input="() => validateName(false)"
                v-model="formData.username"
              />
              <div v-if="errors.username" class="text-danger">{{ errors.username }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="gender" class="form-label">Gender</label>
              <select
                class="form-select"
                id="gender"
                v-model="formData.gender"
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <label for="password" class="form-label">Password</label>
              <input
                type="password"
                class="form-control"
                id="password"
                @blur="() => validatePassword(true)"
                @input="() => validatePassword(false)"
                v-model="formData.password"
              />
              <div v-if="errors.password" class="text-danger">{{ errors.password }}</div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="confirm-password" class="form-label">Confirm Password</label>
              <input
                type="password"
                class="form-control"
                id="confirm-password"
                @blur="() => validateConfirmPassword(true)"
                @input="() => validateConfirmPassword(false)"
                v-model="formData.confirmPassword"
              />
              <div v-if="errors.confirmPassword" class="text-danger">
                {{ errors.confirmPassword }}
              </div>
            </div>
          </div>

          <div class="row mb-3">
            <div class="col-md-6 col-sm-6">
              <div class="form-check mt-4">
                <input
                  type="checkbox"
                  class="form-check-input"
                  id="isCommunityMember"
                  v-model="formData.isCommunityMember"
                />
                <label class="form-check-label" for="isCommunityMember">
                  Community Resident?
                </label>
              </div>
            </div>
            <div class="col-md-6 col-sm-6">
              <label for="role" class="form-label">Register As</label>
              <select
                class="form-select"
                id="role"
                v-model="formData.role"
                required
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>

          <div class="mb-3">
            <label for="reason" class="form-label">Reason for Joining</label>
            <textarea
              class="form-control"
              id="reason"
              rows="3"
              v-model="formData.reason"
              @blur="() => validateReason(true)"
              @input="() => { validateReason(false); validateReasonContainWord(true) }"
            ></textarea>
            <div v-if="errors.reason" class="text-danger">{{ errors.reason }}</div>
            <div v-if="containFriend" class="text-success">Great to have a friend!</div>
          </div>

          <div class="mb-3">
            <label for="suburb" class="form-label">Suburb</label>
            <input
              type="text"
              class="form-control"
              id="suburb"
              v-model="formData.suburb"
            />
          </div>

          <div class="text-center mb-5">
            <button type="submit" class="btn btn-primary me-2">Register</button>
            <button type="button" class="btn btn-secondary" @click="clearForm">
              Clear
            </button>
          </div>
        </form>
      </div>
    </div>

    <div class="row mt-5" v-if="adminUsers.length">
      <h4>Admin Users</h4>
      <DataTable :value="adminUsers" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column
          field="isCommunityMember"
          header="Community Resident"
        ></Column>
        <Column field="reason" header="Reason"></Column>
        <Column field="suburb" header="Suburb"></Column>
      </DataTable>
    </div>

    <div class="row mt-5" v-if="normalUsers.length">
      <h4>Normal Users</h4>
      <DataTable :value="normalUsers" tableStyle="min-width: 50rem">
        <Column field="username" header="Username"></Column>
        <Column field="gender" header="Gender"></Column>
        <Column
          field="isCommunityMember"
          header="Community Resident"
        ></Column>
        <Column field="reason" header="Reason"></Column>
        <Column field="suburb" header="Suburb"></Column>
      </DataTable>
    </div>
  </div>
</template>

<style scoped>
.container {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  max-width: 80vw;
  margin: 0 auto;
  padding: 20px;
  border-radius: 10px;
}

.form {
  text-align: center;
  margin-top: 50px;
}

#username:focus,
#password:focus,
#isAustralian:focus,
.card {
  border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.card-header {
  background-color: #275fda;
  color: white;
  padding: 10px;
  border-radius: 10px 10px 0 0;
}

.list-group-item {
  padding: 10px;
}
</style>