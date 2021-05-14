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
              <strong class="parrafoCategorias">Empresas-Comercios adheridos</strong>
            </p>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-container class="bv-example-row">

      <b-row class="grid-container">
       
        <b-col     
       class="grid-item1"
        cols="10" sm="4"
         button
           
              v-for="item in this.empresas"
              :key="item.id"
              @click="verEmpresa(item)">
                 <a class="buscador">{{ item.nombre }}</a>
     <!--      <b-list-group>
            <b-list-group-item
              button
              class="list-group-item"
              v-for="item in this.empresas"
              :key="item.id"
              @click="verEmpresa(item)"
            >
              <br />
              <a class="buscador">{{ item.nombre }}</a>
            </b-list-group-item>
          </b-list-group> -->
        </b-col>
      </b-row>
      </b-container>
    </div>
</div>
</template>
<script>
import AuthenticationService from "@/services/AuthenticationService";

import axios from "axios";
export default {
  name: "VerEmpresas",
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
      const path = `/buscarProductos/${producto}`;
      if (this.$route.path !== path)
        this.$router.push({
          name: "buscarProductos",
          params: {
            producto: producto,
          },
        });
    },
    async getEmpresas() {
      this.loading = true;
      try {
        const response = await AuthenticationService.getEmpresas();
        this.empresas = response.data.data;
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
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
      .all([this.getEmpresas()])
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
@media only screen and (max-width: 480px) {


}
.buscador:hover {
  color: rgb(255, 206, 78);
  cursor: pointer;
}

.grid-item1 {
    background: #ffffff;
    text-align: center;
    border: rgb(165, 165, 165) 1px solid;
    /* width: 100px !important; */ 
    font-size: 20px;
    cursor: pointer;
    padding-top: 20px;

}
</style>
