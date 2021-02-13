<template>
  <div class="login">
    <div class="text-center">
      <img
        src="@/assets/MalamboLogo.png"
        style="width: 120%"
        class="rounded"
        alt="..."
        @click="home()"
      />
    </div>
    <br />
    <br />
    <div class="text-center">
      <p>¡Hola! Ingresá tu e‑mail y contraseña</p>
    </div>
    <div class="text-center">
      <p class="title h3 mt-2 text-center">Iniciar Sesion</p>
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

      <b-form-group id="input-group-2">
        <b-form-input
          id="password"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Ingresa la contraseña"
          class="line"
        ></b-form-input>
      </b-form-group>
      <hr />
      <b-form-group class="text-center">
        <b-button type="submit" block variant="primary" v-if="form.ingresar"
          >Ingresar
        </b-button>

        <div class="text-center" v-if="!form.ingresar">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
      </b-form-group>
      <b-form-group class="text-center">
        <b-button
          block
          @click="$router.push('registrar')"
          variant="outline-light"
          >Crear cuenta
        </b-button>
      </b-form-group>
      <div class="text-center">
        <router-link to="/recuperarClave"
          >¿Haz olvidado la contraseña?</router-link
        >
      </div>
      <b-button  @click="volver()"  variant="outline-secondary">                                       
              <b-icon icon="arrow-left-short"></b-icon>Volver 
          </b-button>  
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "Login",
  props: {   
  },
  data() {
    return {
      form: {
        email: "",
        password: "",
        ingresar: true,
      },
      error: "",
    };
  },
  created() {
    
    if ( this.$route.params.autentificacion == false) {
      this.$bvToast.toast(
        `Usted tiene que iniciar sesion para poder publicar en Mercado Local`,
        {
          title: 'Atencion!!',
          toaster: "b-toaster-top-center",
          solid: true,
          variant: "danger",
        }
      );
    }
  },
  methods: {
    home(){
       this.$router.push("/");
    },
    ...mapMutations("storeUser", [
      "setToken",
      "setUsername",
      "setuserId",
      "setGrupos",
      "setPermisos",
      "setNombre",
    ]),
    volver(){
      this.$router.push("/");
    },
    async login() {
      try {
        this.form.ingresar = false;
        const { email, password } = this.form;

        const response = await AuthenticationService.login({
          email: email,
          password: password,
        });

        this.setToken(response.data.token);
        this.setUsername(response.data.username);
        this.setuserId(response.data.userId);
        this.setGrupos(response.data.grupos);
        //this.setNombre (response.data.nombre);
        this.setPermisos(response.data.permission);
        this.$router.push("/");
      } catch (err) {
        this.form.ingresar = true;
        this.error = err.response.data.errors[0];
      }
    },
  },
};
</script>

<style scoped>
</style>

