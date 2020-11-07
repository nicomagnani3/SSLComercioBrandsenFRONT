<template>
  <div class="login">
    <br />
    <div class="text-center">
      <p>¡Hola! Ingresá tu e‑mail y contraseña</p>
    </div>

    <hr />

    <div class="text-center">
      <p class="title h5 mt-2 text-center">Iniciar Sesion</p>
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
      <b-form-group class="text-center">
        <b-button
          type="submit"
          class="my-2"
          v-if="form.ingresar"
          variant="primary"
          >Ingresar
        </b-button>
        <div class="text-center" v-if="!form.ingresar">
          <b-spinner variant="primary" label="Text Centered"></b-spinner>
        </div>
      </b-form-group>
    </b-form>
  </div>
</template>

<script>
import { mapMutations } from "vuex";

import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "Login",
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
        const { email, password } = this.form;

        const response = await AuthenticationService.login({
          email: email,
          password: password,
        });

        this.setToken(response.data.token);
        this.setUsername(response.data.username);
        //this.setuserId (response.data.userId);
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
html {
  background-color: #ecedf7;
}
</style>

