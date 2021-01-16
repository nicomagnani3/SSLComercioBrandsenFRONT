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
        <ListarEmprendimientos
          :emprendimientos="this.emprendimientos"
          @update-emprendimiento="updateEmprendimiento"
        ></ListarEmprendimientos>
      </tab-content>
      <tab-content
        title="Detalles de tu emprendimiento"
        :before-change="validarDetalleEmprendimiento"
      >
        <DetalleEmprendimiento
          ref="detalleEmprendimiento"
          :publicacion="this.publicacionEmprendimiento"
        ></DetalleEmprendimiento>
      </tab-content>
      <tab-content
        title="Imagenes de tu emprendimiento"
        :before-change="validarImagenes"
      >
        <ImagenesCarga
          ref="altaImagenes"
          :imagenes="imagenesEmprendimiento"
          :imgPrimera="imgPrimeraEmprendimiento"
        >
        </ImagenesCarga>
      </tab-content>
    </form-wizard>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import axios from "axios";
import EmprendimientoService from "@/services/EmprendimientoService";
import ListarEmprendimientos from "@/components/emprendimientos/ListarEmprendimientos.vue";
import DetalleEmprendimiento from "@/components/emprendimientos/DetalleEmprendimiento.vue";
//import ListarProductos from "@/components/producto/ListarProducto.vue";
import ImagenesCarga from "@/components/imagenes/ImagenesCarga.vue";


export default {
  name: "nuevaPublicacion",
  components: {
    ImagenesCarga,    
    ListarEmprendimientos,
    DetalleEmprendimiento,
  },
  data() {
    return {
      tipoPublicacion: [],
      tipoPublicacionSeleccionada: null,
      categorias: [],
      categoriaSeleccionada: null,
      categoriasHijas: [],
      categoriaHijaElegida: [],
      categoriaHijaSeleccionada: null,
      emprendimientos: [],
      emprendimientoSeleccionado: null,
      emprendimientosHijos: [],
      emprendimientoHijoElegido: [],
      emprendimientoHijoSeleccionado: null,

      loading: true,
      publicacion: {
        titulo: null,
        precio: 0,
        fecha: new Date().toISOString().slice(0, 10),
        observaciones: null,
      },
      publicacionEmprendimiento: [],
      alerts: [],
      montoEntregaInvalido: false,
      imagenes: [],
      imgPrimera: [],
      imgPrimeraEmprendimiento: [],
      imagenesEmprendimiento: [],
      creando: false,
    };
  },
  created() {
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
    async validarDetalleEmprendimiento() {
      let result = await this.$refs.detalleEmprendimiento.validate();
      return result;
    },
    async validarImagenes() {
      let result = await this.$refs.altaImagenes.validate();
      return result;
    },
    async onComplete() {
        console.log("termino")
        console.log( this.emprendimientoSeleccionado )
         console.log(  this.publicacionEmprendimiento)
         console.log(this.imagenesEmprendimiento)
         console.log(this.imgPrimeraEmprendimiento)
          if (this.getUserId == null) {
              this.$router.push({
                name: "login",
                params: {
                  autentificacion: false,
                },
              });
          }else{
             this.creando = true;
              try {
                  const response = await EmprendimientoService.addEmprendimiento({
                    titulo: this.publicacionEmprendimiento.titulo,
                    importe: this.publicacionEmprendimiento.precio,                  
                    observaciones: this.publicacionEmprendimiento.observaciones,
                    destacada:this.publicacionEmprendimiento.destacada,
                    imagenes: this.imagenesEmprendimiento,
                    imgPrimera: this.imgPrimeraEmprendimiento.base64,
                    emprendimiento: this.emprendimientoSeleccionado,                    
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
    updateEmprendimiento(emprendimiento) {
      this.emprendimientoSeleccionado = emprendimiento[0].id;
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
    async getEmprendimientos() {
      try {
        const response = await EmprendimientoService.getEmprendimientos();
        this.emprendimientos = response.data.data;
        this.emprendimientos = this.ordenarDatos(this.emprendimientos);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },  
    async validate() {
      let result = await this.$refs.nuevaPublicacion.validate();
      if (result == true) {
        if (Number(this.publicacion.precio) <= 10) {
          this.montoEntregaInvalido = true;
          return false;
        }
        if (this.getUserId == null) {
          this.$router.push({
            name: "login",
            params: {
              autentificacion: false,
            },
          });
          return false;
        }
      }
      return result;
    },
  
  },
  mounted() {
    axios
      .all([      
        this.getEmprendimientos(),
        //this.getEmprendimientosHijos(),
      ])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>
