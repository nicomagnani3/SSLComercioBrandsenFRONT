<template>
<div>
    <div v-if="loading" class="text-center">
      <br /><br />
      <b-spinner
     style="width: 7rem; height: 7rem"
        variant="warning"
        label="Text Centered"
      >
      </b-spinner>
    </div>
    <div v-else class="body">
      <div fluid class="categoria">
        <b-row class="pb-2">
          <b-col class="text-center pt-3">
            <br />
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Rubros</strong>
            </p>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-row class="text-center">
        <b-col cols="3" class="text-center d-none d-sm-none d-md-block">
        </b-col>
        <b-col>
          <b-list-group>
            <b-list-group-item
              button
              class="list-group-item"
              v-for="item in this.empresas"
              :key="item.id"
              @click="buscarProductoporRubro(item)"
            >
              <br />
              <a class="buscador">{{ item.nombre }}</a>
            </b-list-group-item>
          </b-list-group>
        </b-col>
        <b-col class="text-center d-none d-sm-none d-md-block"></b-col>
      </b-row>
    </div>
</div>
</template>
<script>
import PublicacionService from "@/services/PublicacionService";

import axios from "axios";
export default {
  name: "verRubros",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
    };
  },
  created() {},
  computed: {},
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
    async getRubros() {
      this.loading = true;
      try {
        const response = await PublicacionService.getRubros();
        this.empresas = response.data.data;
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LOS RUBROS";
      } finally {
        this.loading = false;
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
   buscarProductoporRubro(rubro) {
      const path = `/productos/${rubro.nombre}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "productos",
          query: {
            q: this.searchQuery,
            t: new Date().getTime(),
          },
          params: {
            producto: rubro.nombre,
            rubro: rubro.id,
          },
        });
    },
  },
  mounted() {
    axios
      .all([ this.getRubros()])
      .then(() => {
        this.loading = false;
      })
      .catch((err) => {
        console.log(err);
      });
  },
};
</script>