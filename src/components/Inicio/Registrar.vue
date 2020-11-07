<template>
  <div class="registrar">
    <b-form action class="form" @submit.prevent="registrarse">
      <hr/>
      <p class="title h5 mt-2 text-center"><small>Registrarse</small></p>
      <br/>
      <b-input-group >
        <b-input-group-prepend is-text>
          <b-icon icon="person-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="email"
          v-model="email"
          type="email"
          autocomplete="username"
          required
          placeholder="Direccion de correo electronico"
          class="line"
        ></b-form-input>
      </b-input-group>
      <br />
      <b-input-group>
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="password"
          v-model="password"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Ingresa la contraseña"
          class="line"
        ></b-form-input>
      </b-input-group>
      <br />
      <b-input-group >
        <b-input-group-prepend is-text>
          <b-icon icon="lock-fill"></b-icon>
        </b-input-group-prepend>
        <b-form-input
          id="Currentpassword"
          v-model="password_confirmation"
          type="password"
          required
          autocomplete="current-password"
          placeholder="Confirmar la contraseña"
          class="line"
        ></b-form-input>
      </b-input-group>

      <br />
      <b-alert v-if="contraseñaIncorrecta" show variant="danger"
        >Las contraseñas no coinciden</b-alert
      >
      <b-alert show v-if="mensaje" variant="secondary">{{ mensaje }}</b-alert>
      <b-row>
        <b-col class="text-left">
          <b-button @click="volver()" variant="outline-secondary">
            <b-icon icon="arrow-left-short"></b-icon>Volver
          </b-button>
        </b-col>
        <b-col class="text-right">
          <b-button type="submit" class="my-2" variant="primary"
            >Registrar
            <b-icon
              icon="arrow-counterclockwise"
              v-if="registrando"
              animation="spin-reverse-pulse"
              font-scale="1"
            ></b-icon>
          </b-button>
        </b-col>
      </b-row>
    </b-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      nombre: "",
      password: "",
      password_confirmation: "",
      contraseñaIncorrecta: false,
      registrando: false,
      mensaje: "",
    };
  },
  methods: {
    registrarse() {
      this.registrando = true;
      if (this.password == this.password_confirmation) {
        this.contraseñaIncorrecta = false;
        let data = {
          nombre: this.email,
          email: this.email,
          password: this.password,
        };
        this.$store
          .dispatch("register", data)
          .then((resp) => (this.mensaje = resp), (this.registrando = false))
          .catch((err) => alert(err));
      } else {
        this.contraseñaIncorrecta = true;
        this.registrando = false;
      }
    },
    volver() {
      this.$router.push({ name: "listar" });
    },
  },
};
</script>

<style >
</style>