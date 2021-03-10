<template>
  <div class="registrar">
    <img
      @click="home()"
      src="@/assets/MalamboLogo.png"
      style="width: 100%; max-width: 600px"
      class="rounded"
      alt="..."
    />
    <br />
    <div class="text-center">
      <p>¡Hola! Para cambiar tu contraseña ingresa tu nueva contraseña</p>
    </div>
    <hr />
    <div class="text-center">
      <p class="title h5 mt-2 text-center">Cambiar Contraeña</p>
    </div>
    <hr />
    <b-alert show variant="danger" v-if="error">{{ error }}</b-alert>

    <b-form @submit.prevent="login">
      <b-form-group id="input-group-1">
        <b-form-input
          disabled
          id="email"
          v-model="this.getUsername"
          autocomplete="username"
          required
          placeholder="Direccion de correo electronico"
          class="line"
        ></b-form-input>
      </b-form-group>
      <b-input-group size="lg">
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="password"
          size="lg"
          v-model="form.password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Ingresa la nueva contraseña"
          class="line"
        ></b-form-input>
      </b-input-group>
      <br />
      <b-input-group size="lg">
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          size="lg"
          id="Currentpassword"
          v-model="form.password_confirmation"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Confirmar la nueva contraseña"
          class="line"
        ></b-form-input>
      </b-input-group>
      <b-form-group class="text-center">
        <b-button
          type="submit"
          class="my-2"
          v-if="form.ingresar"
          variant="primary"
          >Cambiar
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
import { mapGetters } from "vuex";

import AuthenticationService from "@/services/AuthenticationService";
export default {
  name: "RecuperarClAVE",
  data() {
    return {
      form: {
        email: "",
        password: "",
        password_confirmation: "",
        ingresar: true,
      },
      error: "",
      contraseñaIncorrecta:false
    };
  },
  created() {
  },
  computed: {
    ...mapGetters("storeUser", ["getUsername", "getUserId"]),
  },
  methods: {
    async login() {
      if (this.form.password == this.form.password_confirmation) {
        try {
          this.form.ingresar = false;
          const response = await AuthenticationService.recuperarClave({
            user: this.getUserId,
            email: this.form.email,
            password: this.form.password,
          });
           this.$root.$bvToast.toast(
              "Se cambio su contraseña",
              {
                title: "Usted modifico la contraseña en MALAMBO",
                toaster: "b-toaster-top-center succes",
                solid: true,
                variant: "success",
              }
            );
            this.$router.push({ name: "login" });
          console.log(response)
        } catch (err) {
           this.$root.$bvToast.toast(
              "No se pudo cambiar la contraseña, intente nuevamente",
              {
                title: "ATENCION!",
                toaster: "b-toaster-top-center succes",
                solid: true,
                variant: "danger",
              }
            );
        }
      }else {
        this.contraseñaIncorrecta = true;
        this.registrando = false;
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

