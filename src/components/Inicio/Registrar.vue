<template>
  <div>
    <div v-if="loading" class="text-center">
      <img
        @click="home()"
        src="@/assets/MalamboLogo.png"
        style="width: 100%; max-width: 600px; cursor: pointer"
        class="rounded"
        alt="..."
      />

      <br /><br />
      <b-spinner
        style="width: 7rem; height: 7rem"
        variant="info"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="container">
      <b-container>
        <img
          @click="home()"
          src="@/assets/MalamboLogo.png"
          style="width: 100%; max-width: 600px; cursor: pointer"
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
              :options="foptions"
              required
            ></b-form-select>
          </b-input-group>
          <br />
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
                placeholder="Celular ingresar sin 0 y sin 15"
                class="line"
              ></b-form-input>
            </b-input-group>
            <div v-if="this.value == 5 || this.value == 4">
              <br />
              <b-input-group size="lg">
                <b-input-group-prepend is-text>
                  <b-icon icon="link"></b-icon>
                </b-input-group-prepend>
                <b-form-input
                  id="web"
                  size="lg"
                  v-model="persona.web"
                  placeholder="URL de tu web o red social"
                  class="line"
                ></b-form-input>
              </b-input-group>
            </div>
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
              <b-form-select
                size="lg"
                id="rubro"
                data-checkout="Rubro"
                v-model="empresa.rubro"
                :options="fRubros"
                required
              ></b-form-select>
            </b-input-group>
            <br />
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
                id="emailEmpresa"
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
                placeholder="Celular ingresar sin 0 y sin 15"
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
                placeholder="URL de tu web o red social"
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
          <b-alert show v-if="mensaje" variant="secondary">{{
            mensaje
          }}</b-alert>
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
            <router-link to="/login"
              >¿Ya tenes una cuenta?Ingresa aca</router-link
            >
          </b-col>
          <br />
          <b-col class="text-center">
            <router-link to="/verSoporte">¿Necesitas ayuda?</router-link>
          </b-col>
        </b-form>
      </b-container>
    </div>
  </div>
</template>
<script>
import axios from "axios";
import PublicacionService from "@/services/PublicacionService";
import AuthenticationService from "@/services/AuthenticationService";
import swal from "sweetalert";
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
        web: "",
      },
      empresa: {
        nombreEmpresa: "",
        emailEmpresa: "",
        password: "",
        password_confirmation: "",
        celular: null,
        web: "",
        rubro: null,
      },
      contraseñaIncorrecta: false,
      registrando: false,
      mensaje: "",
      loading: true,
      value: null,
      rubros: [],
      tiposUsuarios: [],
    };
  },
  computed: {
    fRubros() {
      let mc = this.rubros.map((e) => ({
        value: e.id,
        text: e.nombre,
      }));
      mc.push({
        value: null,
        text: "-Seleccione el rubro-",
        disabled: true,
      });

      return mc;
    },
    foptions() {
      let mc = this.tiposUsuarios.map((e) => ({
        value: e.id,
        text: e.nombreMuestra,
      }));
      mc.push({
        value: null,
        text: "-Seleccione un tipo de usuario para registrarte-",
        disabled: true,
      });

      return mc;
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
            web: this.persona.web,
          });
          if (response.data.error == true) {
            this.registrando = false;
            swal(
              "¡Ups, verifica los datos!",
               response.data.data,
              "error"
            );
          } else {
            swal(
              "¡Bienvenido, usted se registro en el sistema!",
              "Su email para ingresar al sistema es " + response.data.data,
              "success"
            );
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          swal(
            "¡Ups, verifica los datos!",
            "No se pudo realizar el registro " + error,
            "error"
          );
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
            web: this.empresa.web,
            grupo: this.value,
            rubro: this.empresa.rubro,
          });
          if (response.data.error == true) {
            this.registrando = false;
            swal(
              "¡Ups, verifica los datos!",
               response.data.data,
              "error"
            );
          } else {
            swal(
              "¡Bienvenido, usted se registro en el sistema!",
              "Su email para ingresar al sistema es " + response.data.data,
              "success"
            );
            this.$router.push({ name: "login" });
          }
        } catch (error) {
          swal(
            "¡Ups, verifica los datos!",
            "No se pudo realizar el registro " + error,
            "error"
          );
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
    async getRubros() {
      try {
        const response = await PublicacionService.getRubros();
        if (response.data.error == false) {
          this.rubros = response.data.data;
        }
      } catch (err) {
        this.rubros =
          "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS DE RUBROS";
        this.loading = true;
      }
    },
    async getTipoUsuarios() {
      try {
        const response = await AuthenticationService.tiposUsuarios();
        if (response.data.error == false) {
          console.log(response.data.data);

          this.tiposUsuarios = response.data.data.filter((c) => c.id != 4);
        }
      } catch (err) {
        this.rubros =
          "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS DE RUBROS";
        this.loading = true;
      }
    },
  },

  mounted() {
    axios
      .all([this.getRubros(), this.getTipoUsuarios()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style>
</style>