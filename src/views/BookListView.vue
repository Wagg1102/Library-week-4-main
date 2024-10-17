<template>
    <div class="card">
      <div class="mb-4">
        <button @click="fetchBooks('asc')" class="btn btn-outline-primary me-2">Order by Ascending</button>
        <button @click="fetchBooks('desc')" class="btn btn-outline-primary">Order by Descending</button>
      </div>
  
      <DataTable :value="books" tableStyle="min-width: 50rem">
        <Column field="isbn" header="ISBN"></Column>
        <Column field="name" header="Name"></Column>

        <Column header="Actions">
          <template #body="slotProps">
            <p>ID: {{ slotProps.data.id }}</p>
            <button @click="editBook(slotProps.data.id)" class="btn btn-primary me-2">Edit</button>
            <button @click="deleteBook(slotProps.data.id)" class="btn btn-danger">Delete</button>
          </template>
        </Column>
      </DataTable>
    </div>
  </template>
 <script setup>
 import { ref, onMounted } from 'vue';
 import { useRouter } from 'vue-router';  
 import db from '../firebase/init.js';
 import { collection, query, getDocs, doc, deleteDoc, orderBy } from 'firebase/firestore';
 import DataTable from 'primevue/datatable';
 import Column from 'primevue/column';
 
 const books = ref([]);
 const router = useRouter(); 
 
 const fetchBooks = async (sortOrder = 'asc') => {
   try {
     
     const q = query(collection(db, 'books'), orderBy('isbn', sortOrder));
     const queryResult = await getDocs(q);
 
     books.value = [];  
     queryResult.forEach((doc) => {
       books.value.push({ id: doc.id, ...doc.data() });
     });
 
     console.log("booklist: ", books.value);
 
   } catch (error) {
     console.error("Booking list fetch error", error);
   }
 };
 

 const editBook = (id) => {
   router.push({ name: 'EditBook', params: { id } });  
 };
 

 const deleteBook = async (id) => {
   try {
     const confirmDelete = confirm("Are you sure you want to delete this book?");
     if (confirmDelete) {
       await deleteDoc(doc(db, 'books', id));  
       alert("Book deleted successfully!");
 
      
       fetchBooks();
     }
   } catch (error) {
     console.error("Error deleting book:", error);
     alert("Error deleting book!");
   }
 };
 
 onMounted(() => {
   fetchBooks();  
 });
 </script>