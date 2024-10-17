<template>
  <div class="container d-flex justify-content-center" style="height: 100vh; padding-top: 50px;">
    <div class="w-50">
      <h1 class="text-center mb-4">Weather Information</h1>

      <input type="text" v-model="city" id="city" placeholder="Enter city name" class="form-control" />

      <button @click="searchByCity" class="btn btn-primary w-100 mt-3">Search by City</button>

      <main v-if="weatherData" class="mt-5">
        <h2>{{ weatherData.name }}, {{ weatherData.sys.country }}</h2>
        <div>
          <img :src="iconUrl" alt="Weather Icon" />
          <p>{{ temperature }} °C</p>
        </div>
        <span>{{ weatherData.weather[0].description }}</span>
      </main>

      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      city: "",  
      weatherData: null,  
      error: null, 
    };
  },
  mounted() {
    this.fetchCurrentLocationWeather();
  },
  methods: {
    async fetchCurrentLocationWeather() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(async (position) => {
          const { latitude, longitude } = position.coords;
          // 使用 Cloudflare Worker 的 URL 来代理请求
          const url = `https://weather-proxy.hhwagg0211.workers.dev?lat=${latitude}&lon=${longitude}`;
          await this.fetchWeatherData(url);
        }, (error) => {
          this.error = "Unable to retrieve your location";
          console.error(error);
        });
      } else {
        this.error = "Geolocation is not supported by your browser";
      }
    },
    async searchByCity() {
      const url = `https://weather-proxy.hhwagg0211.workers.dev?q=${this.city}`;
      await this.fetchWeatherData(url);
    },
    async fetchWeatherData(url) {
      try {
        const response = await axios.get(url);
        this.weatherData = response.data;
        this.error = null;
      } catch (error) {
        console.error("Error fetching weather data:", error);
        this.error = "Error fetching weather data";
        this.weatherData = null;
      }
    },
  },
  computed: {
    temperature() {
      return this.weatherData ? Math.floor(this.weatherData.main.temp - 273.15) : null;
    },
    iconUrl() {
      return this.weatherData
        ? `http://openweathermap.org/img/w/${this.weatherData.weather[0].icon}.png`
        : null;
    },
  },
};
</script>