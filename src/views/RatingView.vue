<template>
  <div class="container mt-5">
    <h2>Rate Our Service</h2>
    <div class="stars mt-3" @mouseleave="resetStars">
      <i 
        v-for="(star, index) in 5" 
        :key="index" 
        class="star" 
        :class="{'active': index < currentRating}"
        @mouseover="highlightStars(index + 1)" 
        @click="selectRating(index + 1)"
      >★</i>
    </div>
    <div class="average-rating mt-3">
      Average Rating: <span class="average-value">4.5</span> stars
    </div>
    <button class="btn btn-primary mt-3" @click="submitRating">Confirm Rating</button>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const currentRating = ref(0)
const selectedRating = ref(0)

const highlightStars = (rating) => {
  currentRating.value = rating
}

const resetStars = () => {
  currentRating.value = selectedRating.value
}

const selectRating = (rating) => {
  selectedRating.value = rating
  currentRating.value = rating
}

const submitRating = () => {
  if (selectedRating.value > 0) {
    alert(`You have rated this service ${selectedRating.value} stars.`)
  } else {
    alert('Please select a rating.')
  }
}
</script>

<style scoped>
.container {
  max-width: 600px;
}

.stars {
  font-size: 2rem;
  color: #d3d3d3;
  cursor: pointer;
}

.star.active {
  color: #f39c12;
}

.star {
  display: inline-block;
  transition: color 0.2s;
}

.average-rating {
  font-size: 1.2rem;
  color: #555;
}

.average-value {
  font-weight: bold;
  color: #f39c12;
}
</style>