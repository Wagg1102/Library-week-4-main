import {ref} from 'vue'
import router from '../router/index'
const isAuthenticated = ref(false)

export function useAuthticate(){
    const login = () => {
        isAuthenticated.value = true;
        

    }
    const logout = () =>{
        isAuthenticated.value = false;
    }
    return { isAuthenticated, login,logout}
}