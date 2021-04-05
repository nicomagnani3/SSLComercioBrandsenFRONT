/** VUEX module for todos management in todolist app **/
// import Axios from 'axios';



export default {
    namespaced: true,
    // -----------------------------------------------------------------
    state: {
        username: localStorage.getItem('username') || null,
        token: localStorage.getItem('token') || null,      
        grupos: localStorage.getItem('grupos') ||  null,
        permisos: localStorage.getItem('permisos') ||  null,
        userId :localStorage.getItem('userId') || null,     
        nombre:localStorage.getItem('nombre') ||  null,


        /***
         * mensajes a traveas de toast por la aplicacion 
         * la estructura debera ser la siguiente 
         * {[
         *  'Message': 'Mensaje del aviso
         *  'variante': 'Danger',
         *  ... config adicional de las props de topast
         * ], []}
         */
        
        toast: []


    },
    // -----------------------------------------------------------------
    mutations: {
        setToken(state, payload) {
            state.token = payload
            localStorage.setItem("token", payload)
        },

        setUsername(state, payload) {
            state.username = payload
            localStorage.setItem("username", payload)
        },
        setGrupos(state, payload) {
            state.grupos = payload
            localStorage.setItem("grupos", payload)

        },
        setPermisos(state, payload) {
            state.permisos = payload
            localStorage.setItem("permisos", JSON.stringify(payload))
        },

        setuserId(state, payload) {
            state.userId = payload
            localStorage.setItem("userId", payload)
        },
        setNombre(state, payload) {
            state.nombre = payload
            localStorage.setItem("nombre",payload)
        },


        clearToken(state) {
            state.token = null
            localStorage.removeItem("token")
            localStorage.removeItem("username")
            localStorage.removeItem("nombre")
            localStorage.removeItem("grupos")
            localStorage.removeItem("permisos")
            localStorage.removeItem("userId")
        },
        addToast (state,payload) {
            state.toast.push(payload);
        },

       

      
    },
    // -----------------------------------------------------------------

    // -----------------------------------------------------------------
    actions: {
        LOGOUT_REQUEST: ({state,commit}) => {
            state.username = '';
         
            commit('clearToken');
        },


        showToast( {vm,payload}) {
            vm.$bvToast.toast(payload.message, {
                title: payload.title || '',
                toaster: payload.toaster || 'b-toaster-top-center',
                solid: true,
                variant: payload.variant || 'secondary',
                appendToast: payload.append || false
            })
        }



    },
    getters: {
        isAuthenticated(state) {
            return state.token != null
        },
        hasPermisos: (state) => (permiso) => {
      
            if(state.permisos == null){
                return false
            }
            return JSON.parse(state.permisos.includes(permiso)) ;
        },
        getGrupos(state) {                
            return JSON.parse(state.grupos);
        },
        getUserId(state) {          
            return JSON.parse(state.userId);
        },
        getUsername(state) {                            
            return state.username
        },
        
       
    }
}