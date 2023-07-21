<template>
  <div>
    <div class="body">
      <div fluid class="categoria">
        <b-row class="pb-3">
          <p style="font-size: 17px">
            ¡¡¡¡Sumate aca!
            <a :href="'https://api.whatsapp.com/send?text=Hola!%20,me%20quiero%20sumar%20a%20la%20guia%20Comercial%20😃' +
              '&phone=+542223431948'
              " target="_black">
              <img class="icono" src="@/assets/wsp.png" alt="" />
            </a>
          </p>
          <b-col class="text-center pt-3">
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias"> ¡Guia Comercial!</strong>
            </p>
          </b-col>
        </b-row>
      </div>
    </div>
    <br />
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner style="width: 7rem; height: 7rem" variant="warning" label="Text Centered">
      </b-spinner>
    </div>
    <div v-else>
      <section class="py-7">
        <div class="container-fluid">
          <div class="row">
            <div class="col-lg-9">
              <div class="container-cards" style="margin: 0 auto;">
                <div class="row gx-4 gx-lg-4 row-cols-2 row-cols-md-3 row-cols-xl-4">
                  <div class="col mb-3" v-for="(producto, index) in paginatedCards" :key="index">
                    <div class="card h-100 card-custom" itemscope itemtype="https://schema.org/LocalBusiness">
                      <!-- Product image -->
                      <div class="square-image">
                        <img :src="producto.imagen" :alt="producto.titulo" class="card-img-top" itemprop="image" />
                      </div>
                      <!-- Product details -->
                      <div class="card-body">
                    <div class="text-md-center text-lg-left">
                          <!-- Product name -->
                          <h5 class="fw-bolder" itemprop="name">{{ tituloAjustar(producto.nombre) }}</h5>
                          <!-- Product price -->
                        </div>
                      </div>
                      <!-- Product actions -->
                      <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                        <div class="text-center">                       
                          <b-btn @click="verdetalles(producto)"  block
                            class="btn btn btn--block card__btn btn-block">Ver más</b-btn>
                        </div>
                      </div>
                      <!-- Agrega el marcado estructurado para la información adicional -->
                      <div itemprop="address" itemscope itemtype="https://schema.org/PostalAddress">
                        <meta itemprop="addressLocality" content="General Belgrano">
                        <meta itemprop="addressRegion" content="Buenos Aires">
                        <meta itemprop="addressCountry" content="Argentina">
                      </div>
                      <meta itemprop="latitude" content="35.766666666667">
                      <meta itemprop="longitude" content="-58.5">
                      <meta itemprop="description" :content="producto.descripcion">
                      <meta itemprop="category" :content="producto.rubroNombre">
                    </div>
                  </div>
                </div>
              </div>
              <div class="d-flex justify-content-center">
                <b-pagination pills v-model="currentPage" :per-page="perPage"
                  :total-rows="empresas.length"></b-pagination>
              </div>
            </div>
            <div class="col-lg-3">
              <strong style="font-weight: 700; font-size: 20px">
                Filtrar Por:
              </strong>
              <b-form-group>
                <b-form-checkbox v-for="item in rubros" :key="item.id" v-model="selected" :value="item.nombre"
                  name="flavour-3a" class="buscador" @change="buscarPorCategoria(item.id)" :indeterminate="indeterminate">
                  {{ item.nombre }}
                </b-form-checkbox>
              </b-form-group>
            </div>
          </div>
        </div>
      </section>



    </div>
    <b-modal ref="modalDetalle" id="modal-center" ok-only ok-title="Cerrar" ok-variant="secondary" centered :title="productoSeleccionado.nombre" @hide="resetModal"
      :no-fade="true" :animation="animationOptions">
      <div class="modal-body">
        <p class="modal-description">{{ productoSeleccionado.descripcion }}</p>
      </div>

    </b-modal>
  </div>
</template>
<script>
import PublicidadService from "@/services/PublicidadService";
import PublicacionService from "@/services/PublicacionService";

import axios from "axios";
export default {
  name: "comercios",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
      empresasCompleta: [],
      rubros: [],
      noFiltro: false,
      indeterminate: false,
      selected: null,
      currentPage: 1,
      perPage: 12,
      productoSeleccionado: [],
      animationOptions: {
        enterActiveClass: 'animate__animated animate__fadeIn',
        leaveActiveClass: 'animate__animated animate__fadeOut',
      },
    };
  },
  created() { },
  watch: {
    selected(newValue) {
      this.noFiltro = newValue;
      if (newValue == false) {
        this.empresas = this.empresasCompleta;
      }
    },
  },
  computed: {
    paginatedCards() {
      const { currentPage, perPage } = this;
      const start = (currentPage - 1) * perPage;
      const end = currentPage * perPage;
      window.scrollTo(0, 200);
      return this.empresas.slice(start, end);
    },
  },
  methods: {
    buscarProducto(producto) {
      const path = `/productos/${producto}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "productos",
          params: {
            producto: producto,
          },
        });
    },
    async getGuiaComercial() {
      this.loading = true;
      try {
        const response = await PublicidadService.getGuiaComercial();
        this.empresas = response.data.data;
        this.empresasCompleta = this.empresas;
        this.empresas = this.ordenarDatos(this.empresas);
        this.seleccionarRubros(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    seleccionarRubros(empresas) {
      let mc = empresas.map((e) => ({
        id: e.rubroId,
        nombre: e.rubroNombre,
      }));
      this.rubros = Array.from(new Set(mc.map(JSON.stringify))).map(JSON.parse);
      this.ordenarRubros(this.rubros);
    },
    ordenarRubros(categoria) {
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

    ordenarDatos(categoria) {
      /* return categoria.sort((a, b) => b.id - a.id) */
      return categoria.sort(function (a, b) {
        if (a.id < b.id) {
          return 1;
        }
        if (a.id > b.id) {
          return -1;
        }
        return 0;
      });
    },
    verEmpresa(empresa) {
      const path = `/productos/${empresa.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "productos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: empresa.nombre,
            empresa: empresa.usuario,
          },
        });
    },
    async getRubros() {
      this.loading = true;
      try {
        const response = await PublicacionService.getRubros();
        this.rubros = response.data.data;
        this.rubros = this.ordenarDatos(this.rubros);
      } catch (err) {
        this.rubros = "ATENCION NO SE PUDIERON OBTENER LOS RUBROS";
      } finally {
        this.loading = false;
      }
    },
    buscarPorCategoria(rubrosId) {
      window.scrollTo(0, 200);

      if (this.noFiltro != false) {
        this.empresas = this.empresasCompleta;
        this.empresas = this.empresasCompleta.filter(
          (c) => c.rubroId == rubrosId
        );
      }
    },
    tituloAjustar(titulo) {
      return this.primerMayuscula(titulo);
    },
    primerMayuscula(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },
    verdetalles(producto) {
      this.productoSeleccionado = producto;
      this.$refs["modalDetalle"].show();
    },
    okDetalles() {
      this.$refs["modalDetalle"].hide();
    },
  },
  mounted() {
    axios
      .all([this.getGuiaComercial() /* , this.getRubros() */])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

