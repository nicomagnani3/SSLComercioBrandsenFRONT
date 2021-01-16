<template>
  <div v-if="loading" class="text-center">
    <span class="text-danger">
      <b>Cargando</b>
    </span>
    <b-spinner variant="primary" label="Text Centered"></b-spinner>
  </div>
  <div v-else>
    <form-wizard
      @on-complete="onComplete"
      title="Mercado Local te simplifica las cosas"
      subtitle="Elegi lo que quieras publicar en unos simples pasos"
      back-button-text="Volver!"
      next-button-text="Siguiente!"
      finish-button-text="Finalizar"
      color="#FFCE4E"
    >
      <b-col v-if="creando" class="text-center">
        <div>
          <b-spinner
            style="width: 5rem; height: 5rem"
            variant="warning"
            label="Text Centered"
            type="grow"
          ></b-spinner>
          <span style="font-size: 24px" class="text-warning">
            <b>Creando publicacion,aguarde un instante....</b>
          </span>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
          ></b-spinner>
          <b-spinner
            style="width: 3rem; height: 3rem"
            variant="warning"
            label="Text Centered"
            type="variant"
          ></b-spinner>
        </div>
      </b-col>

      <tab-content title="¡Hola! Antes que nada contanos,¿qué vas a publicar?">
        <ListarServicios
          :servicios="this.servicios"
          @update-servicio="update"
        ></ListarServicios>
      </tab-content>
      <tab-content
        title="¿Cual es el servicio que vas a publicar?"
        :before-change="validarServicioHijo"
      >
        <ListarServiciosHijos
          :servicioshijos="this.serviciosHijoElegido"
          @update-servicioHijo="updateServicioHijo"
        ></ListarServiciosHijos>
      </tab-content>
      <tab-content
        title="Detalles del servicio"
        :before-change="validarDetalleservicio"
      >
        <DetalleServicio
          ref="detalleServicio"
          :publicacion="this.publicacion"
        ></DetalleServicio>
      </tab-content>
      <tab-content
        title="Imagenes"
        :before-change="validarImagenes"
      >
        <ImagenesCarga
          ref="altaImagenes"
          :imagenes="imagenesEmprendimiento"
          :imgPrimera="imgPrimeraEmprendimiento"
        >
        </ImagenesCarga>
      </tab-content>
      <!--   <tab-content title="Pagar Publicacion">
        <PagoPublicacion> </PagoPublicacion>
      </tab-content> -->
    </form-wizard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import ServiciosService from "@/services/ServiciosService";
import ListarServicios from "@/components/servicios/ListarServicios.vue";
import ListarServiciosHijos from "@/components/servicios/ListarServiciosHijos.vue";
import DetalleServicio from "@/components/servicios/DetalleServicio.vue";
//import PagoPublicacion from "@/components/publicaciones/PagoPublicacion.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";

export default {
  name: "nuevaPublicacion",
  components: {
    ImagenesCarga,
    ListarServicios,
    ListarServiciosHijos,
    DetalleServicio,
    //PagoPublicacion,
  },
  data() {
    return {
      servicios: [],
      servicioSeleccionado: null,
      serviciosHijos: [],
      serviciosHijoElegido: [],
      serviciosHijoSeleccionado: null,
      loading: true,
      publicacion: [],
      imagenes: [],
      imgPrimera: [],
      imgPrimeraEmprendimiento: [],
      imagenesEmprendimiento: [],
      creando: false,
    };
  },
  created() {
    console.log("entro aca");
    if (this.getUserId == null) {
      this.$router.push({
        name: "login",
        params: {
          autentificacion: false,
        },
      });
    }
  },
  computed: {
    ...mapGetters("storeUser", ["getUserId"]),
  },
  methods: {
    async validarDetalleservicio() {
      let result = await this.$refs.detalleServicio.validate();
      return result;
    },
    async validarServicioHijo() {
      console.log(this.serviciosHijoSeleccionado);
      if (this.serviciosHijoSeleccionado == null) {
        return false;
      }
      return true;
    },
    async validarImagenes() {
      let result = await this.$refs.altaImagenes.validate();
      return result;
    },
    async onComplete() {      
      console.log(this.servicioSeleccionado);
      console.log(this.serviciosHijoSeleccionado);
      console.log(this.publicacion);
      console.log(this.imagenesEmprendimiento);
      console.log(this.imgPrimeraEmprendimiento);
      if (this.getUserId == null) {
        this.$router.push({
          name: "login",
          params: {
            autentificacion: false,
          },
        });
      } else {
        this.creando = true;
        try {
          const response = await ServiciosService.addServicio({
            titulo: this.publicacion.titulo,
            importe: this.publicacion.precio,
            observaciones: this.publicacion.observaciones,
            destacada: this.publicacion.destacada,
            imagenes: this.imagenesEmprendimiento,
            imgPrimera: this.imgPrimeraEmprendimiento.base64,
            servicio: this.servicioSeleccionado,
            servicioHijo: this.serviciosHijoSeleccionado,
            usuarioID: this.getUserId,
          });
          this.$root.$bvToast.toast(`Usted a creado una publicacion`, {
            title: response.data.data,
            toaster: "b-toaster-top-center succes",
            solid: true,
            variant: "success",
          });
          this.$router.push("/");
        } catch (error) {
          error.response.data.data.forEach((data) => {
            this.$bvToast.toast(`No se pudo crear la publicacion`, {
              title: data,
              toaster: "b-toaster-top-center",
              solid: true,
              variant: "danger",
            });
          });
        }
      }
    },
    update(servicio) {
      this.servicioSeleccionado = servicio[0].id;
      this.serviciosHijoElegido = this.serviciosHijos.filter(
        (c) => c.idPadre == servicio[0].id
      );
      this.serviciosHijoElegido = this.ordenarDatos(this.serviciosHijoElegido);
    },
    updateServicioHijo(serHija) {
      console.log("update");
      this.serviciosHijoSeleccionado = serHija[0].id;
    },
    ordenarDatos(categoria) {
      return categoria.sort(function (a, b) {
        if (a.nombre > b.nombre) {
          return 1;
        }
        if (a.nombre < b.nombre) {
          return -1;
        }
        return 0;
      });
    },
    async getServicios() {
      try {
        const response = await ServiciosService.getServicios();
        this.servicios = response.data.data;
        this.servicios = this.ordenarDatos(this.servicios);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    async getServiciosHijos() {
      try {
        const response = await ServiciosService.getserviciossHijos();
        this.serviciosHijos = response.data.data;
        this.serviciosHijos = this.ordenarDatos(this.serviciosHijos);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
  },
  mounted() {
    axios
      .all([this.getServicios(), this.getServiciosHijos()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
