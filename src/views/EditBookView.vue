<template>
    <div class="container d-flex justify-content-center" style="height: 100vh; padding-top: 50px;">
      <div class="w-50">
        <h1 class="text-center mb-4">Edit Book</h1>
        <form @submit.prevent="editBook">
          <div class="mb-3">
            <label for="isbn" class="form-label">ISBN:</label>
            <input type="text" v-model="isbn" id="isbn" class="form-control" required />
          </div>
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" v-model="name" id="name" class="form-control" required />
          </div>
          <button type="submit" class="btn btn-primary w-100">Submit</button>
        </form>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted } from 'vue';
  import { useRoute, useRouter } from 'vue-router'; 
  import db from '../firebase/init.js';
  import { setDoc, getDoc, doc } from 'firebase/firestore';
  
  const isbn = ref('');
  const name = ref('');
  const route = useRoute();  
  const router = useRouter();  

  const getBook = async () => {
    try {
      const docRef = doc(db, 'books', route.params.id);  
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        isbn.value = docSnap.data().isbn;
        name.value = docSnap.data().name;
      } else {
        console.log('No such document!');
      }
    } catch (error) {
      console.error('Error getting book:', error);
    }
  };
 
  const editBook = async () => {
    try {
      if (isNaN(Number(isbn.value))) {
        alert('ISBN must be a valid number');
        return;
      }
  
      await setDoc(doc(db, 'books', route.params.id), {
        isbn: Number(isbn.value),
        name: name.value
      }, { merge: true });
  
      alert('Book updated successfully!');
      router.push('/booklist');  
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  onMounted(() => {
    getBook();
  });
  </script>