<template>
  <div class="registrar">
    <img
      @click="home()"
      src="@/assets/MalamboLogo.png"
      style="width: 100%; max-width: 600px"
      class="rounded"
      alt="..."
    />

    <b-form action class="form" @submit.prevent="registrarse">
      <hr />
      <p class="title h2 mt-2 text-center">
        <small>Completa los datos para registrarte</small>
      </p>
      <br />
      <b-input-group size="lg">
        <b-form-select
          size="lg"
          id="plan"
          data-checkout="Plan"
          v-model="value"
          :options="options"
          required
        ></b-form-select>
      </b-input-group>
      <br />
      <!-- 
      <div class="title h5 mt-2 text-center">
        <b-form-radio-group
          v-model="value"
          :options="options"
          :state="state"
          name="radio-validation"
        >
          <b-form-invalid-feedback :state="state"
            >Por favor seleccione una opcion</b-form-invalid-feedback
          >
        </b-form-radio-group>
      </div> -->
      <div v-if="this.value == 1 || this.value == 5 || this.value == 4">
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="nombre"
            size="lg"
            v-model="persona.nombre"
            type="text"
            autocomplete="nombre"
            required
            placeholder="Nombre"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="apellido"
            size="lg"
            v-model="persona.apellido"
            type="text"
            autocomplete="apellido"
            required
            placeholder="Apellido"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="card-checklist"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            size="lg"
            id="dni"
            v-model="persona.DNI"
            type="number"
            autocomplete="dni"
            required
            placeholder="DNI"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="phone"></b-icon>
          </b-input-group-prepend>

          <b-form-input
            size="lg"
            id="celular"
            v-model="persona.celular"
            type="number"
            required
            placeholder="Celular,con la caracteristica y sin el 15, ejemplo 2223461957"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="envelope"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="email"
            size="lg"
            v-model="persona.email"
            type="email"
            autocomplete="username"
            required
            placeholder="Direccion de correo electronico"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="password"
            size="lg"
            v-model="persona.password"
            type="password"
            required
            @click="actualizarContraseña()"
            autocomplete="current-password"
            placeholder="Ingresa la contraseña"
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
            v-model="persona.password_confirmation"
            type="password"
            required
            @click="actualizarContraseña()"
            autocomplete="current-password"
            placeholder="Confirmar la contraseña"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
      </div>
      <div v-if="this.value == 3 || this.value == 2">
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="person-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="nombre"
            size="lg"
            v-model="empresa.nombreEmpresa"
            type="text"
            autocomplete="nombreEmpresa"
            required
            :placeholder="'Nombre de ' + nombreTipoUser(this.value)"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="envelope"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="email"
            size="lg"
            v-model="empresa.emailEmpresa"
            type="email"
            autocomplete="username"
            required
            placeholder="Direccion de correo electronico"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="phone"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="celular"
            size="lg"
            v-model="empresa.celular"
            type="number"
            required
            placeholder="Celular,con la caracteristica y sin el 15, ejemplo 2223461957"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
          
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="link"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="web"
            size="lg"
            v-model="empresa.web"
            placeholder="URL de tu web"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
        <b-input-group size="lg">
          <b-input-group-prepend is-text>
            <b-icon icon="lock-fill"></b-icon>
          </b-input-group-prepend>
          <b-form-input
            id="password"
            size="lg"
            v-model="empresa.password"
            type="password"
            required
            autocomplete="current-password"
            placeholder="Ingresa la contraseña"
            @click="actualizarContraseña()"
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
            v-model="empresa.password_confirmation"
            type="password"
            required
            @click="actualizarContraseña()"
            autocomplete="current-password"
            placeholder="Confirmar la contraseña"
            class="line"
          ></b-form-input>
        </b-input-group>
        <br />
      </div>
      <b-alert v-if="contraseñaIncorrecta" show variant="danger"
        >Las contraseñas no coinciden</b-alert
      >
      <b-alert show v-if="mensaje" variant="secondary">{{ mensaje }}</b-alert>
      <b-row>
        <b-col class="text-center">
          <b-button type="submit" block variant="primary"
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
      <br />
      <b-col class="text-center">
        <router-link to="/login">¿Ya tenes una cuenta?Ingresa aca</router-link>
      </b-col>
    </b-form>
  </div>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";
export default {
  data() {
    return {
      persona: {
        nombre: "",
        apellido: "",
        DNI: null,
        celular: null,
        email: "",
        password: "",
        password_confirmation: "",
      },
      empresa: {
        nombreEmpresa: "",
        emailEmpresa: "",
        password: "",
        password_confirmation: "",
        celular: null,
        web:""
      },
      contraseñaIncorrecta: false,
      registrando: false,
      mensaje: "",
      value: null,
      options: [
        {
          value: null,
          text: "Seleccione el tipo de usuario para registrarse",
          selected: true,
          disabled: true,
        },
        { text: "Usuario", value: 1 },
        { text: "Profesional", value: 5 },
        { text: "Emprendedor", value: 4 },
        { text: "Comercio", value: 3 },
        { text: "Empresa", value: 2 },
      ],
    };
  },
  computed: {
    state() {
      return Boolean(this.value);
    },
  },
  methods: {
    home() {
      this.$router.push("/");
    },
    registrarse() {
      if (this.value == 1 || this.value == 5 || this.value == 4) {
        this.registrarCliente();
      } else {
        this.registrarEmpresa();
      }
    },
    async registrarCliente() {
      this.registrando = true;
      if (this.persona.password == this.persona.password_confirmation) {
        try {
          this.contraseñaIncorrecta = false;
          const response = await AuthenticationService.register({
            nombre: this.persona.nombre,
            apellido: this.persona.apellido,
            DNI: this.persona.DNI,
            celular: this.persona.celular,
            email: this.persona.email,
            password: this.persona.password,
            grupo: this.value,
          });
          if (response.data.error == true) {
            this.registrando = false;
            this.$bvToast.toast(response.data.data, {
              title: `No se pudo realizar el registro`,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
            });
          } else {
            this.$root.$bvToast.toast(
              "Su email para ingresar es " + response.data.data,
              {
                title: "Usted se a registrado en el sistema de Malambo",
                toaster: "b-toaster-top-center succes",
                solid: true,
                variant: "success",
              }
            );
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo realizar el registro`, {
            title: error,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      } else {
        this.contraseñaIncorrecta = true;
        this.registrando = false;
      }
    },
    async registrarEmpresa() {
      this.registrando = true;
      if (this.empresa.password == this.empresa.password_confirmation) {
        try {
          this.contraseñaIncorrecta = false;
          const response = await AuthenticationService.registerEmpresa({
            nombre: this.empresa.nombreEmpresa,
            email: this.empresa.emailEmpresa,
            password: this.empresa.password,
            celular: this.empresa.celular,
            web:this.empresa.web,
            grupo: this.value,
          });
          if (response.data.error == true) {
            this.registrando = false;
            this.$bvToast.toast(response.data.data, {
              title: `No se pudo realizar el registro`,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
            });
          } else {
            this.$root.$bvToast.toast(
              "Su email para ingresar es " + response.data.data,
              {
                title: "Usted se a registrado en el sistema de Mercado Local",
                toaster: "b-toaster-top-center succes",
                solid: true,
                variant: "success",
              }
            );
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          this.$bvToast.toast(`No se pudo realizar el registro`, {
            title: error,
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "danger",
          });
        }
      } else {
        this.contraseñaIncorrecta = true;
        this.registrando = false;
      }
    },
    actualizarContraseña() {
      this.contraseñaIncorrecta = false;
    },
    volver() {
      this.$router.push({ name: "listar" });
    },
    nombreTipoUser(nombre) {
      if (nombre == 2) {
        return "empresa";
      }
      return "comercio";
    },
  },
};
</script>

<style>

  
</style>