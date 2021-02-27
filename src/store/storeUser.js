/** VUEX module for todos management in todolist app **/
// import Axios from 'axios';



export default {
    namespaced: true,
    // -----------------------------------------------------------------
    state: {
        username: sessionStorage.getItem('username') || null,
        token: sessionStorage.getItem('token') || null,      
        grupos: sessionStorage.getItem('grupos') ||  null,
        permisos: sessionStorage.getItem('permisos') ||  null,
        userId :sessionStorage.getItem('userId') || null,     
        nombre:sessionStorage.getItem('nombre') ||  null,


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
            sessionStorage.setItem("token", payload)
        },

        setUsername(state, payload) {
            state.username = payload
            sessionStorage.setItem("username", payload)
        },
        setGrupos(state, payload) {
            state.grupos = JSON.stringify(payload)
            sessionStorage.setItem("grupos", JSON.stringify(payload))

        },
        setPermisos(state, payload) {
            state.permisos = payload
            sessionStorage.setItem("permisos", JSON.stringify(payload))
        },

        setuserId(state, payload) {
            state.userId = payload
            sessionStorage.setItem("userId", payload)
        },
        setNombre(state, payload) {
            state.nombre = payload
            sessionStorage.setItem("nombre",payload)
        },


        clearToken(state) {
            state.token = null
            sessionStorage.removeItem("token")
            sessionStorage.removeItem("username")
            sessionStorage.removeItem("nombre")
            sessionStorage.removeItem("grupos")
            sessionStorage.removeItem("permisos")
            sessionStorage.removeItem("userId")
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
            return JSON.parse(state.permisos.includes(permiso)) || JSON.parse(state.permisos.includes('ADMINISTRADOR')) ;
        },
        getGrupos(state) {
            return JSON.parse(state.grupos);
        },
        getUserId(state) {
            return JSON.parse(state.userId);
        },
        
       
    }
}