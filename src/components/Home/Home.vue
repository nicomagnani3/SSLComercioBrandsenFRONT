<template>
  <div v-if="loading" class="text-center">
    <br /><br />
    <b-spinner
      style="width: 5rem; height: 5rem"
      variant="warning"
      label="Text Centered"
    >
    </b-spinner>
  </div>
  <div v-else class="body">
    <a
      href="https://api.whatsapp.com/send?text=Hola!%20,me%20quiero%20sumar%20al%20grupo%20de%20Whatsapp%20😃%20¿me%20suman?&phone=+542223463623"
      class="btn-wsp"
      target="_blank"
      ><img
        style="max-width: 100%"
        src="@/assets/wspsigue.png"
        alt="logo carrito"
      />
      <span
        style="display: none"
        class="position-absolute bottom-0 start-50 translate-middle-x"
      >
        Sumate a nuestro grupo
      </span></a
    >

    <br />
    <Slider :publicidades="this.publicidadesSlider2"
    :publicidades1="this.publicidadesSlider1" />
    <br />
    <NuevoSlide
      :productos="this.productosDestacados"
      :nuevaPublicacion="this.nuevaPublicacionDestacada"
    />
    <CategoriasHomeImagenes />
    <sliderUltimasPublicaciones
      :productos="this.productos"
      :nuevaPublicacion="this.nuevaPublicacion"
    />
    <div>
      <Novedades :novedades="novedades"> </Novedades>
    </div>
    <sliderPubli :publicidades="this.publicidadesSlider4" />
    <!-- <sliderServicios />
    <sliderEmprendimientos /> -->
    <!-- 
    <Sliderempresa :publicidades="this.publicidadesSlider3" /> -->
  </div>
</template>


<script>
import CategoriasHomeImagenes from "@/components/categorias/CategoriasHomeImagenes.vue";
import Slider from "@/components/Home/Slider.vue";
import NuevoSlide from "@/components/Home/NuevoSlide.vue";
/*import Sliderempresa from "@/components/Home/slideEmpresas.vue";
 import sliderServicios from "@/components/Home/sliderServicios.vue";
import sliderEmprendimientos from "@/components/Home/sliderEmprendimientos.vue"; */
import sliderUltimasPublicaciones from "@/components/Home/sliderUltimasPublicaciones.vue";
import sliderPubli from "@/components/Home/sliderPubli.vue";
import axios from "axios";
import PublicidadService from "@/services/PublicidadService";
import Novedades from "../novedades/novedades.vue";

export default {
  name: "Home",

  components: {
    CategoriasHomeImagenes,
    Slider,
    NuevoSlide,
    //sliderServicios,
    //Sliderempresa,
    //sliderEmprendimientos,
    sliderPubli,
    sliderUltimasPublicaciones,
    Novedades,
  },
  props: {
    productos: {
      type: Array,
    },
    productosDestacados: {
      type: Array,
    },
  },
  data() {
    return {
      loading: true,
      novedades: [],
      publicidades: [],
      publicidadesSlider1: [],
      publicidadesSlider2: [],
      publicidadesSlider4: [],
      publicidadesSlider3: [],
      nuevaPublicacion: false,
      nuevaPublicacionDestacada: false,
    };
  },
  created() {
    if (this.$route.params.nuevaPublicacion == true) {
      this.nuevaPublicacion = true;
    }
    if (this.$route.params.nuevaPublicacionDestacada == true) {
      this.nuevaPublicacionDestacada = true;
    }
  },
  methods: {
    async getPublicidades() {
      try {
        const response = await PublicidadService.getPublicidades();
        if (response.data.error == false) {
          this.publicidades = response.data.data;
          this.asignarPublicidades(this.publicidades);
          //this.asignarPublicidades1(this.publicidades);
          //this.asignarPublicidades2(this.publicidades);
          //this.asignarPublicidades3(this.publicidades);
        }
      } catch (err) {
        this.getPublicidades();
        this.publicidades = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
    },
    asignarPublicidades(publicidades) {
      publicidades.forEach((publicidad) => {
        if (publicidad.ubicacion == 1) {
          this.publicidadesSlider1.push(publicidad);
        }
        if (publicidad.ubicacion == 2) {
          this.publicidadesSlider2.push(publicidad);
        }
        if (publicidad.ubicacion == 4) {
          this.publicidadesSlider4.push(publicidad);
        }

        
      });
    },
    asignarPublicidades2(publicidades) {
      this.publicidadesSlider2 = publicidades.filter((c) => c.ubicacion == 2);
    },
    asignarPublicidades4(publicidades) {
      this.publicidadesSlider4 = publicidades.filter((c) =>
        console.log(c.ubicacion)(c.ubicacion == 4)
      );
    },
    /*   asignarPublicidades3(publicidades) {
      this.publicidadesSlider3 = publicidades.filter((c) => c.ubicacion == 3);
    }, */
    async getNovedad() {
      this.loading = true;
      try {
        const response = await PublicidadService.getNovedad();
        this.novedades = response.data.data;
      } catch (err) {
        this.novedades = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
  },
  mounted() {
    axios
      .all([this.getPublicidades(), this.getNovedad()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>