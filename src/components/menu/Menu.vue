<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 3rem; height: 3rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>

  <b-container class="nav" fluid v-else :style="{ '--color': color }">
    <nav class="menu">
      <b-navbar toggleable="lg" type="light">
        <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
        <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
        <b-col
          style="text-align: right"
          class="temperaturaMenu"
          @click="verClima()"
        >
          <div class="temperaturaMenu">
            <span style="font-size: 12x">
              <b> {{ parseInt(daily.main.temp) }}°</b></span
            >
            <img
              :src="
                require(`@/assets/weater_elements/${
                  weathers[daily.weather[0].main]
                }.svg`)
              "
              width="50px"
              alt
              v-if="this.esMenosdeLas8()"
            />
            <img
              src="@/assets/weater_elements/luna.svg"
              width="20px"
              alt
              v-if="this.esMasDeLas8()"
            />
          </div>
        </b-col>

        <b-collapse id="nav-collapse" is-nav>
          <b-navbar-nav class="ml-auto">
            <b-nav-item-dropdown>
              <template slot="button-content">
                <span class="textoMenu">Categorías</span>
              </template>
              <b-dropdown-item :to="{ name: 'verCategorias' }"
                >Productos</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'verEmprendimiento' }"
                >Emprendimientos</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'verServicio' }"
                >Servicios</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'verProfesionales' }"
                >Profesionales</b-dropdown-item
              >
              <b-dropdown-item :to="{ name: 'verRubros' }"
                >Rubros</b-dropdown-item
              >
            </b-nav-item-dropdown>
            <b-nav-item
              class="textoMenu"
              :to="{ name: 'verProductosEmprendimientos' }"
              >Autónomos</b-nav-item
            >
            <b-nav-item
              class="textoMenu"
              :to="{ name: 'verProductosProfesionales' }"
              >Guía Profesional</b-nav-item
            >

            <b-nav-item :to="{ name: 'verEmpresas' }" class="textoMenu"
              >Guía Comercial</b-nav-item
            >
            <b-nav-item class="textoMenu" @click="bolsaTrabajo()"
              >Bolsa de Trabajo</b-nav-item
            >
            <b-nav-item
              :to="{ name: 'alquileres' }"
              style="
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                font-size: 18px;
                padding: 5px;
              "
              class="logo"
              id="guia"
              ><strong>Propiedades y Alquileres</strong
              ><span
                class="badge badge-pill badge-info"
                id="valorDestacado"
                style="overflow: hidden; padding: 5px"
              >
                NEW</span
              ></b-nav-item
            >
            <b-nav-item class="textoMenu" :to="{ name: 'utilidades' }"
              >Datos Útiles</b-nav-item
            >
          </b-navbar-nav>

          <b-nav-item
            class="itemLoginResponsive"
            :to="{ name: 'nuevaPublicacion' }"
            v-if="!hasPermisos('CAMBIAR_CLAVE')"
            >PUBLICAR</b-nav-item
          >

          <b-navbar-nav class="" v-if="logeado">
            <b-navbar-nav v-if="logeado" class="ml-auto">
              <b-nav-item class="light mx-4 my-0 py-0">
                <b-icon icon="user" />
              </b-nav-item>
            </b-navbar-nav>
            <b-nav-item-dropdown right>
              <!-- Using 'button-content' slot -->
              <template #button-content>
                <b-icon icon="person-fill"></b-icon><b> {{ username }}</b>
              </template>
              <b-dropdown-item
                :to="{ name: 'misproductos' }"
                v-if="hasPermisos('MIS_PRODUCTOS')"
                >Mis Productos</b-dropdown-item
              >

              <b-dropdown-item
                :to="{ name: 'cambiarClave' }"
                v-if="hasPermisos('CAMBIAR_CLAVE')"
                >Cambiar contraseña</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'crearEmpresa' }"
                v-if="hasPermisos('CREAR_GUIA')"
                >Administrar guia comercial</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'crear_publicidad_home' }"
                v-if="hasPermisos('VENCIMIENTO_CONTRATO')"
                >Administrar publicidades</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'crearPublicidad' }"
                v-if="hasPermisos('CREAR_GUIA')"
                >Administrar Datos Útiles</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'personalizar_plataforma' }"
                v-if="hasPermisos('CREAR_GUIA')"
                >Personalización de la plataforma</b-dropdown-item
              >

              <b-dropdown-item
                :to="{ name: 'ver_curriculums' }"
                v-if="hasPermisos('CREAR_GUIA')"
                >Listado Curriculums</b-dropdown-item
              >

              <b-dropdown-item
                :to="{ name: 'renovarContrato' }"
                v-if="hasPermisos('VER_CONTRATO')"
                >Ver Contrato</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'asignarContrato' }"
                v-if="hasPermisos('ASIGNAR_CONTRATO')"
                >Nuevo Contrato</b-dropdown-item
              >
              <b-dropdown-item
                :to="{ name: 'vencimientoContrato' }"
                v-if="hasPermisos('VENCIMIENTO_CONTRATO')"
                >Vencimientos de contratos</b-dropdown-item
              >
              <b-dropdown-item
                v-if="hasPermisos('CAMBIAR_CLAVE')"
                @click.prevent="logout"
                >SALIR</b-dropdown-item
              >
            </b-nav-item-dropdown>
          </b-navbar-nav>
          <b-col
            style="text-align: right"
            class="temperaturaResponsive"
            @click="verClima()"
          >
            <div class="temperaturaResponsive">
              <span style="font-size: 18px">
                <b>{{ parseInt(daily.main.temp) }}°</b></span
              >
              <img
                :src="
                  require(`@/assets/weater_elements/${
                    weathers[daily.weather[0].main]
                  }.svg`)
                "
                width="60px"
                alt
                v-if="this.esMenosdeLas8()"
              />
              <img
                src="@/assets/weater_elements/luna.svg"
                width="40px"
                alt
                v-if="this.esMasDeLas8()"
              />
            </div>
          </b-col>
        </b-collapse>
      </b-navbar>

      <div class="contenedorBuscador">
        <div class="Bus input-group input-group-lg" style="max-width: 700px">
          <b-form-input
            type="text"
            size="15"
            maxlength="128"
            @keyup.enter="buscarProducto(filterPrev)"
            v-model="filterPrev"
            placeholder="¿Qué Estás Buscando?  "
          ></b-form-input>

          <b-button
            style="width: 30px"
            size="sm"
            @click="buscarProducto(filterPrev)"
            ><b-icon icon="search"></b-icon
          ></b-button>
        </div>
        <br />
        <b-button
          size="sm"
          class="button"
          @click="loguearse()"
          v-if="!hasPermisos('CAMBIAR_CLAVE')"
        >
          <b-icon icon="person-fill"></b-icon>
          Ingreso o Registro
        </b-button>
        <b-nav-item
          class="itemLogin"
          :to="{ name: 'nuevaPublicacion' }"
          v-if="!hasPermisos('CAMBIAR_CLAVE')"
          >PUBLICAR</b-nav-item
        >

        <b-nav-item-dropdown
          v-if="hasPermisos('CREAR')"
          style="color: rgba(0, 0, 0, 0.5)"
        >
          <template slot="button-content">
            <span class="textoMenu" style="color: rgba(0, 0, 0, 0.5)"
              ><strong>Publicar</strong></span
            >
          </template>
          <b-dropdown-item :to="{ name: 'nuevoAlquiler' }" class="textoMenu"
            >Propiedad</b-dropdown-item
          >
          <b-dropdown-item
            :to="{ name: 'nuevaPublicacion' }"
            v-if="hasPermisos('CREAR_PRODUCTO')"
            class="textoMenu"
            >Producto</b-dropdown-item
          >
          <b-dropdown-item
            :to="{ name: 'nuevoEmprendimiento' }"
            v-if="hasPermisos('CREAR_EMPRENDIMIENTO')"
            class="textoMenu"
            >Emprendimiento</b-dropdown-item
          >
          <b-dropdown-item
            :to="{ name: 'nuevoServicio' }"
            v-if="hasPermisos('CREAR_SERVICIO')"
            class="textoMenu"
            >Servicio</b-dropdown-item
          >
        </b-nav-item-dropdown>
      </div>

      <div class="modalLogin">
        <b-modal ref="modalLogin" hide-footer>
          <Login
            :desdePublicacion="true"
            @okLoginPublicacion="okLoginPublicacion()"
          ></Login>
        </b-modal>
      </div>
      <div class="modalBolsaTrabajo">
        <b-modal
          ref="modalBolsaTrabajo"
          class="modalBolsaTrabajo"
          hide-footer
          size="400"
        >
          <div class="text-center">
            <img
              src="@/assets/curriculum.jpg"
              style="width: 100%; max-width: 800px; cursor: pointer"
              class="rounded"
              alt="..."
              @click="home()"
            />
            <br /><br />
            <h4>Sumate a la comunidad de Malambo</h4>
            <small
              >Carga tu CV en nuestra plataforma de búsquedas laborales.<br />
              Nosotros te acercamos a distintas empresas para que puedas obtener
              una entrevista de trabajo
            </small>
            <br />
            <br />
            <b-form @submit.prevent="enviarCurriculum">
              <b-form-group
                label-cols-sm="2"
                label-cols-lg="2"
                content-cols-sm
                content-cols-lg="9"
                description="Ingrese su nombre completo"
                label="Nombre:"
                label-for="input-horizontal"
              >
                <b-form-input
                  id="email"
                  v-model="nombreCV"
                  autocomplete="username"
                  required
                  placeholder="Nombre y apellido"
                  class="line"
                ></b-form-input>
              </b-form-group>
              <b-form-group
                label="Curriculum:"
                label-cols-sm="2"
                label-cols-lg="2"
                content-cols-sm
                content-cols-lg="9"
                description="Formato admitidos: .pdf,.docx "
                label-for="input-horizontal"
                required
              >
                <b-form-file
                  id="file-small"
                  size="sm"
                  placeholder="Ingrese su curriculum..."
                  browse-text="Buscar"
                  v-model="file1"
                  required
                  accept=".pdf,.doc,.docx"
                  @change="obtenerPDF($event, file1)"
                ></b-form-file>
              </b-form-group>
              <b-form-group class="text-center">
                <b-button
                  block
                  type="submit"
                  variant="outline-info"
                  v-if="cargando"
                  >Enviar
                </b-button>
                <div class="text-center" v-if="!cargando">
                  <b-spinner
                    variant="warning"
                    label="Text Centered"
                  ></b-spinner>
                </div>
              </b-form-group>
            </b-form>
          </div>
        </b-modal>
      </div>
    </nav>
  </b-container>
</template>
<script>
import { mapActions, mapGetters, mapState } from "vuex";
import Header from "@/components/menu/Header.vue";
import Login from "@/components/Inicio/Login.vue";
import PublicacionService from "@/services/PublicacionService";

export default {
  name: "Menu",
  components: {
    Header,
    Login,
  },
  props: {
    daily: {
      type: Object,
    },
    seven: {
      type: Object,
    },
    color: {
      type: String,
      default: () => "#ffce4e",
    },
  },
  data() {
    return {
      hora: new Date(),
      loading: false,
      filterPrev: null,
      filter: null,
      logeado: false,
      nombreCV: null,
      documentoCV: null,
      file1: null,
      tipo: null,
      cargando: true,
      weathers: {
        Snow: "snowy",
        Clouds: "cloudy",
        Rain: "rainy",
        Clear: "sunny",
        Thunderstorm: "thunder",
      },
    };
  },
  created() {
    if (this.getUserId != null) {
      this.logeado = true;
    }
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre", "grupos"]),
    ...mapGetters("storeUser", ["hasPermisos", "getGrupos", "getUserId"]),
  },
  methods: {
    loguearse() {
      this.$refs["modalLogin"].show();
    },
    bolsaTrabajo() {
      this.$refs["modalBolsaTrabajo"].show();
    },
    obtenerPDF(event) {
      const file = event.target.files[0];
      this.createBase64(file);
    },
    createBase64(file) {
      console.log(file);
      const reader = new FileReader();
      reader.onload = (e) => {
        this.documentoCV = e.target.result;
      };
      reader.readAsDataURL(file);
      this.tipo = file.type == "application/pdf" ? "pdf" : "docx";
    },
    esMenosdeLas8() {
      return (
        Number(this.hora.getHours()) < Number(19) &&
        Number(this.hora.getHours()) >= Number(5)
      );
    },
    esMasDeLas8() {
      if (Number(this.hora.getHours()) >= Number(19)) {
        return true;
      }
      if (Number(this.hora.getHours()) < Number(5)) {
        return true;
      }
      return false;
    },
    async enviarCurriculum() {
      try {
        this.ingresar = false;
        const response = await PublicacionService.addCurriculum({
          nombre: this.nombreCV,
          curriculum: this.documentoCV,
          tipo: this.tipo,
        });
        if (response.data.code == 200) {
          this.$root.$bvToast.toast("Ya recibimos tu curriculum", {
            title: "Gracias!",
            toaster: "b-toaster-top-center",
            solid: true,
            variant: "success",
          });
          this.$refs["modalBolsaTrabajo"].hide();
        }
        console.log(response);
      } catch (error) {
        this.ingresar = true;
        console.log(error);
      }
    },
    okLoginPublicacion() {
      console.log("ok login");
      this.$refs["modalLogin"].hide();
      window.location.reload();
    },
    verClima() {
      this.$router.push({
        name: "utilidades",
        params: {
          desdeMenu: true,
        },
      });
    },
    buscarProducto(producto) {
      const path = `/buscarProductos/${producto}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          params: {
            producto: producto,
          },
        });
    },
    ...mapActions("storeUser", ["LOGOUT_REQUEST"]),
    logout() {
      this.logeado = false;
      this.LOGOUT_REQUEST().then(() => {
        this.$router.push("/").catch({});
      });
      location.reload();
    },
  },
  mounted() {},
};
</script>

<style scoped>
@media only screen and (max-width: 480px) {
  .itemLogin {
    display: none !important;
  }
  .modalBolsaTrabajo {
    max-width: auto !important;
  }
  @media (min-width: 992px) {
    .modalBolsaTrabajo {
      max-width: auto !important;
    }
  }
  @media (min-width: 576px) {
    .modalBolsaTrabajo {
      max-width: auto !important;
    }
  }

  .itemLoginResponsive {
    display: inline !important;
    border: none;
    left: 11px;
    font-size: 14px;
    display: inline;
    height: auto;
    border-top: none;
    color: #333;
  }
  .temperaturaResponsive {
    display: none;
  }
  .temperaturaMenu {
    display: inline !important;
    cursor: pointer;
  }
  .button {
    display: inline !important;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    color: rgba(0, 0, 0, 0.5);
    background-color: var(--color) !important;
    font-size: 10px !important;
  }
}
.temperaturaResponsive {
  cursor: pointer;
}
.button {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  color: rgba(0, 0, 0, 0.5);
  background-color: var(--color) !important;
  font-size: 20px;
}
.button:hover {
  background-color: #efbe3c;
  color: white;
}
.itemLoginResponsive a {
  display: inline;
  height: auto;
  border-top: none;
  color: #333;

  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 20px;
}
.imgTemp {
  width: 70px;
}
.navbar-toggler not-collapsed {
  width: 70px;
  height: 50px;
}
.itemLogin {
  border: none;
  left: 12px;
  padding: 0 10px;
  font-size: 14px;
  display: inline;
  height: auto;
  border-top: none;
  color: #333;
}
.itemLogin a {
  display: inline;
  height: auto;
  border-top: none;
  color: #333;
  font-size: 18px;
}
.temperaturaMenu {
  display: none;
}
.itemLoginResponsive {
  display: none;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
}

.Buscador {
  color: rgb(255, 206, 78);
  cursor: pointer;
}

.nav {
  background-color: var(--color);
  display: flex;
  flex-direction: column;
}

.Bus {
  margin: 10px;
}

.contenedorBuscador {
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: center;
}

.logo {
  -webkit-animation: tiembla 2.1s infinite;
}
@-webkit-keyframes tiembla {
  0% {
    -webkit-transform: rotateZ(0deg);
  }
  50% {
    -webkit-transform: rotateZ(0deg) scale(0.7);
  }
  100% {
    -webkit-transform: rotateZ(0deg);
  }
}
.textoMenu {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 18px;
}
.textoMenu :hover {
  background-color: var(--color) !important;
  color: white !important;
}
.logo :hover {
  background-color:var(--color) !important;
  color: white !important;
}
.itemLogin :hover {
  background-color: var(--color) !important;
  color: white !important;
}
.navbar-toggler {
  overflow-anchor: none;
  width: 72px !important;
  height: 42px !important;
}
</style>