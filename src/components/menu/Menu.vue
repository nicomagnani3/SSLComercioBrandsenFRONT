<template>
  <div v-if="loading" class="text-center">
    <b-spinner
      style="width: 3rem; height: 3rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <b-container class="nav" fluid v-else>
    <b-navbar toggleable="lg" type="light" class="">
      <b-navbar-brand :to="'/'"><Header /> </b-navbar-brand>
      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>
      <b-collapse class="navbar-collapse" id="nav-collapse" is-nav>
        <b-navbar-nav>
          <!--    <b-nav-item v-if="!this.logeado" :to="{ name: 'verCategorias' }"
            >Productos</b-nav-item
          >
         
          <b-nav-item v-if="!this.logeado" :to="{ name: 'verServicio' }"
            >Servicios</b-nav-item
          > -->

          <b-nav-item-dropdown>
            <template slot="button-content">
              <span class="textoMenu">Categorias</span>
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
            >Autonomos</b-nav-item
          >
          <b-nav-item
            class="textoMenu"
            :to="{ name: 'verProductosProfesionales' }"
            >Guia profesional</b-nav-item
          >

          <b-nav-item
            :to="{ name: 'verEmpresas' }"
            style="
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              font-size: 18px;
            "
            class="logo"
            id="guia"
            ><strong>Guia Comercial</strong
            ><span
              class="badge badge-pill badge-info"
              id="valorDestacado"
              style="overflow: hidden"
            >
              NEW</span
            ></b-nav-item
          >
          <b-nav-item class="textoMenu" @click="bolsaTrabajo()"
            >Bolsa de Trabajo</b-nav-item
          >
            <b-nav-item
            class="textoMenu"
            :to="{ name: 'alquileres' }"
            >Propiedades</b-nav-item
          >

          <b-nav-item-dropdown v-if="hasPermisos('CREAR')">
            <template slot="button-content">
              <span class="light"><strong>Publicar</strong></span>
            </template>
            <b-dropdown-item
              :to="{ name: 'nuevaPublicacion' }"
              v-if="hasPermisos('CREAR_PRODUCTO')"
              >Producto</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'nuevoEmprendimiento' }"
              v-if="hasPermisos('CREAR_EMPRENDIMIENTO')"
              >Emprendimiento</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'nuevoServicio' }"
              v-if="hasPermisos('CREAR_SERVICIO')"
              >Servicio</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="hasPermisos('MIS_CONTRATOS')"
            :to="{ name: 'renovarContrato' }"
          >
            <template slot="button-content">
              <span class="light">Contrato</span>
            </template>

            <b-dropdown-item
              :to="{ name: 'renovarContrato' }"
              v-if="hasPermisos('VER_CONTRATO')"
              >Ver</b-dropdown-item
            >
          </b-nav-item-dropdown>
          <b-nav-item-dropdown
            v-if="hasPermisos('ASIGNAR_CONTRATO')"
            :to="{ name: 'asignarContrato' }"
          >
            <template slot="button-content">
              <span class="light">Contrato</span>
            </template>
            <b-dropdown-item
              :to="{ name: 'asignarContrato' }"
              v-if="hasPermisos('ASIGNAR_CONTRATO')"
              >Nuevo</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'vencimientoContrato' }"
              v-if="hasPermisos('VENCIMIENTO_CONTRATO')"
              >Vencimientos</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
        <!--   <b-nav-item 
              class="itemLoginResponsive"
              :to="{ name: 'login' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Ingresa</b-nav-item
            >
            <br>
            <b-nav-item 
              class="itemLoginResponsive"        
              :to="{ name: 'Registrarse' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Creá tu cuenta</b-nav-item
            >  
            <br> -->
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
              >Crear guia comercial</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'crearPublicidad' }"
              v-if="hasPermisos('CREAR_GUIA')"
              >Publicidades</b-dropdown-item
            >
            <b-dropdown-item
              :to="{ name: 'crearNovedad' }"
              v-if="hasPermisos('CREAR_GUIA')"
              >Crear novedad</b-dropdown-item
            >
            <b-dropdown-item
              v-if="hasPermisos('CAMBIAR_CLAVE')"
              @click.prevent="logout"
              >SALIR</b-dropdown-item
            >
          </b-nav-item-dropdown>
        </b-navbar-nav>
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
          placeholder="¿Qué  estas buscando? "
        ></b-form-input>

        <b-button size="sm" @click="buscarProducto(filterPrev)"
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
      <!--      <b-nav-item 
        class="itemLogin"
              :to="{ name: 'login' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Ingresa</b-nav-item
            >
            <b-nav-item 
              class="itemLogin"        
              :to="{ name: 'Registrarse' }"
              v-if="!hasPermisos('CAMBIAR_CLAVE')"
              >Creá tu cuenta</b-nav-item
            >   -->
      <b-nav-item
        class="itemLogin"
        :to="{ name: 'nuevaPublicacion' }"
        v-if="!hasPermisos('CAMBIAR_CLAVE')"
        >PUBLICAR</b-nav-item
      >
    </div>
    <div class="modalLogin">
      <b-modal ref="modalLogin" hide-footer style="color: #ffce4e">
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
        style="color: #ffce4e"
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
                <b-spinner variant="warning" label="Text Centered"></b-spinner>
              </div>
            </b-form-group>
          </b-form>
        </div>
      </b-modal>
    </div>
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
  props: {},
  data() {
    return {
      loading: false,
      filterPrev: null,
      filter: null,
      logeado: false,
      nombreCV: null,
      documentoCV: null,
      file1: null,
      tipo: null,
      cargando: true,
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
  .button {
    display: inline !important;
    -webkit-transition-duration: 0.4s; /* Safari */
    transition-duration: 0.4s;
    color: rgba(0, 0, 0, 0.5);
    background-color: #ffce4e !important;
    font-size: 10px !important;
  }
}

.button {
  -webkit-transition-duration: 0.4s; /* Safari */
  transition-duration: 0.4s;
  color: rgba(0, 0, 0, 0.5);
  background-color: #ffce4e !important;
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
  background-color: #ffce4e;
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
  background-color: #ffce4e !important;
  color: white !important;
}
.logo :hover {
  background-color: #ffce4e !important;
  color: white !important;
}
.itemLogin :hover {
  background-color: #ffce4e !important;
  color: white !important;
}
</style>