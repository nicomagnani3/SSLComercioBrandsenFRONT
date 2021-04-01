<template>
  <div>
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
      <div fluid class="categoria">
        <b-row class="pb-2">
          <b-col class="text-center pt-3">
            <br />
            <p class="h1 font-britannic text">
              <strong class="parrafoCategorias">Categorias disponibles</strong>
            </p>
          </b-col>
        </b-row>
      </div>
      <br />
      <b-row class="text-center">
                <b-col cols="3" class="text-center d-none d-sm-none d-md-block">
                </b-col>
        <b-col>
          <b-list-group >
            <b-list-group-item
              button
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
    </div>
  </div>
</template>
<script>
import CategoriasService from "@/services/CategoriasService";

import axios from "axios";
export default {
  name: "VerEmpresas",
  components: {},
  data() {
    return {
      loading: false,
      empresas: [],
      categoriasHijas: [],
      categoriaHijaElegida: [],
    };
  },
  created() {},
  computed: {},
  methods: {
    verHijos(categoria) {
      this.anchorHashCheck();
      this.categoriaHijaElegida = this.categoriasHijas.filter(
        (c) => c.idPadre == categoria.id
      );
      this.categoriaHijaElegida = this.ordenarDatos(this.categoriaHijaElegida);
    },
    anchorHashCheck() {
      window.scrollTo(0, 0);
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
        const response = await CategoriasService.getCategorias();
        this.empresas = response.data.data;
        this.empresas = this.ordenarDatos(this.empresas);
      } catch (err) {
        this.empresas = "ATENCION NO SE PUDIERON OBTENER LAS EMPRESAS";
        this.loading = true;
      } finally {
        this.loading = false;
      }
    },
    async getcategoriasHijas() {
      try {
        const response = await CategoriasService.getcategoriasHijas();
        this.categoriasHijas = response.data.data;
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
      .all([this.getcategorias(), this.getcategoriasHijas()])
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

.categoria {
  text-align: center;
  /* margin: 10px; */
  background-color: rgb(70 70 70);
  font-size: 22px;
  color: white;
}
</style>
