<template>
  <div class="recuperarClave">
    <br />
    <div class="text-center">
      <p>¡Hola! Para recuperar tu contraseña ingresa tu email y se te enviara una clave provista</p>
    </div>
    <hr />
    <div class="text-center">
      <p class="title h5 mt-2 text-center">Recuperar Contraeña</p>
    </div>
    <hr />
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>

    <b-form @submit.prevent="login">
      <b-form-group id="input-group-1">
        <b-form-input
          id="email"
          v-model="form.email"
          type="email"
          autocomplete="username"
          required
          placeholder="Direccion de correo electronico"
          class="line"
        ></b-form-input>
      </b-form-group>      
      <b-form-group class="text-center">
        <b-button
          type="submit"
          class="my-2"
          v-if="form.ingresar"
          variant="primary"
          >Recuperar
        </b-button>

        <div class="text-center" v-if="!form.ingresar">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
      </b-form-group>     
      <hr />
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "RecuperarClAVE",
  data() {
    return {
      form: {
        email: "",        
        ingresar: true,
      },
      error: "",
    };
  },
  methods: {
    ...mapMutations("storeUser", [
      "setToken",
      "setUsername",
      "setuserId",
      "setGrupos",
      "setPermisos",
      "setNombre",
    ]),

    async login() {
      try {
        this.form.ingresar = false;
        const { email } = this.form;

        const response = await AuthenticationService.recuperarClave({
          email: email,         
        });      
        if (response.data.error == true){ 
          this.form.ingresar = true;              
                this.registrando = false     
                  this.$bvToast.toast(response.data.data, {
                  title: `No se pudo recuperar la clave`,
                  toaster: "b-toaster-top-center",
                  solid: true,
                  variant: "danger",
                  });   
        }
      } catch (err) {
        this.form.ingresar = true;
        this.error = err.response.data.errors[0];
      }
    },
  },
};
</script>

<style scoped>
html {
  background-color: #ecedf7;
}
</style>

