<template>
  <b-container>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
        style="width: 11rem; height: 11rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="body">
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 font-italic text-warning">
           Servicios disponibles
          </p>
        </b-col>
      </b-row>
     <b-container class="bv-example-row">
        <b-row>
          <b-col>
            <b-list-group>
              <b-list-group-item
                button
                class="list-group-item"
                v-for="item in this.empresas"
                :key="item.id"
                @click="verHijos(item)"
              >
                <br />
                <a class="buscador">{{ item.nombre }}</a>
              </b-list-group-item>
            </b-list-group>
          </b-col>
          <b-col>
            <b-list-group>
              <b-list-group-item
                button
                class="list-group-item"
                v-for="item in this.categoriaHijaElegida"
                :key="item.id"
                @click="verEmpresa(item)"
              >
                <br />
                <a class="buscador">{{ item.nombre }}</a>
              </b-list-group-item>
            </b-list-group>
          </b-col>
        </b-row>
      </b-container>
    </div>
  </b-container>
</template>
<script>
import ServiciosService from "@/services/ServiciosService";

import axios from "axios";
export default {
  name: "VerEmpresas",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
     categoriasHijas:[],
      categoriaHijaElegida:[],
    };
  },
  created() {},
  computed: {},
  methods: {
    verHijos(categoria){
        this.categoriaHijaElegida = this.categoriasHijas.filter(
        (c) => c.idPadre == categoria.id
      );
      this.categoriaHijaElegida = this.ordenarDatos(this.categoriaHijaElegida);
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
    async getcategorias() {
      this.loading = true;
      try {
        const response = await ServiciosService.getServicios();
        this.empresas = response.data.data;
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
      async getServiciosHijos() {
      try {
        const response = await ServiciosService.getserviciossHijos();
        this.categoriasHijas = response.data.data;
        this.categoriasHijas = this.ordenarDatos(this.categoriasHijas);
      } catch (err) {
        this.categorias = "ATENCION NO SE PUDIERON OBTENER LAS CATEGORIAS";
      }
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
    verEmpresa(empresa) {
      const path = `/buscarProductos/${empresa.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
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
  },
  mounted() {
    axios
      .all([this.getcategorias(),
      this.getServiciosHijos(),])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>

<style >
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}
</style>
