<template>
  <b-container>
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h3 text-center">Finalizar</p>
          <!--  <strong
            >Para que tu pago sea seguro integramos Mercado Pago en el
            sistema</strong
          > -->
        </b-col>
      </b-row>
      <b-card class="text-center" header="Detalles de tu publicacion">
        <section class="shopping-cart dark">
          <div class="container" id="container">
            <div class="content">
              <div class="row">
                <div class="col-md-12 col-lg-8">
                  <div class="items">
                    <div class="product">
                      <div class="info">
                        <div class="product-details">
                          <div class="row justify-content-md-center">
                            <b-col md="6">
                              <b-card-img
                                thumbnail
                                fluid
                                alt="Responsive image"
                                style="max-height: 130px; object-fit: contain"
                                :src="
                                  this.imagen[0] == null
                                    ? 'https://picsum.photos/400/400/?image=20'
                                    : this.imagen[0].base64
                                "
                                class="rounded-0"
                              ></b-card-img>
                            </b-col>
                            <div class="col-md-4 product-detail">
                              <h4>{{ this.publicacion.titulo }}</h4>
                              <div class="product-info">
                                <div>
                                  <div
                                    v-if="
                                      Number(this.publicacion.precio) >
                                      Number(0)
                                    "
                                  >
                                    <b>Precio: </b
                                    >{{
                                      this.getImporte(this.publicacion.precio)
                                    }}
                                  </div>
                                  <!--   <b>Descripcion: </b
                                  ><span id="product-description">{{
                                    this.publicacion.observaciones
                                  }}</span
                                  ><br /> -->
                                  <b>Autor: </b>{{ username }}<br />
                                  <b>Publicacion destacada: </b
                                  >{{
                                    this.esDestacada(
                                      this.publicacion.destacada
                                    )
                                  }}<br />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </b-card>
      <br />
      <div v-if="this.contrato.length > 0">
        <b-card
          no-body
          class="mb-3 p-0"
          header="Detalles de tu contrato(Cuando presiones finalizar se utilizara el contrato y la publicacion estara disponible)"
        >
          <b-container class="pb-3">
            <b-table
              show-empty
              small
              responsive
              :items="this.contrato"
              :fields="fields"
              empty-text="Usted todavia no pose ningun contrato,vaya al menu en la seccion CONTRATO,para crear o renovar un contrato"
            >
              <template v-slot:cell(desde)="row">{{
                row.item.desde | formatDate
              }}</template>
              <template v-slot:cell(hasta)="row">{{
                row.item.hasta | formatDate
              }}</template>
            </b-table>
            <b-alert v-if="verificarVencimiento()" show variant="danger"
              >Atencion: su contrato se encuentra vencido, no podra realizar la
              publicacion
              <a href="renovarContrato" class="alert-link"
                >presione aqui para renovarlo</a
              ></b-alert
            >
            <b-alert v-if="verificarCantPublicaciones()" show variant="danger"
              >Atencion: Usted llego al limite de publicaciones, no podra
              realizar la publicacion
              <a href="renovarContrato" class="alert-link"
                >presione aqui para renovarlo y comprar nuevas publicaciones</a
              ></b-alert
            >
          </b-container>
        </b-card>
      </div>
      <div v-else-if="yapublico">
        <!--payment-->
        <b-card
          v-if="finalizo"
          border-variant="success"
          header="Pagar y finalizar"
          header-bg-variant="success"
          header-text-variant="white"
          align="center"
        >
          <section class="payment-form dark">
            <div class="container_payment">
              <div class="form-payment">
                <div class="products">
                  <h3 class="title">Obtuviste tu boton de pago</h3>
                  <div class="item">
                    <span class="price" id="summary-price"></span>
                    <p class="item-name">
                      En un instante estara listo el boton "pagar" para pagar la
                      publicacion<strong> {{ this.publicacion.titulo }}</strong
                      >, cuando finalices el pago tu publicacion se cargara en
                      Malambo<span id="summary-quantity"></span>
                    </p>
                  </div>
                  <br />
                  <div class="total">
                    Total :${{ this.ponerPrecio(this.publicacion.destacada)
                    }}<span class="price" id="summary-total"></span>
                  </div>
                </div>
                <b-spinner
                  style="width: 5rem; height: 5rem"
                  variant="warning"
                  v-if="esperarBotonMercadoPago"
                  label="Text Centered"
                >
                </b-spinner>
                <div class="payment-details">
                  <div class="form-group col-sm-12">
                    <br />
                    <div id="button-checkout"></div>
                    <br />
                  </div>
                </div>
              </div>
            </div>
          </section>
        </b-card>
      </div>
    </div>
  </b-container>
</template> 

<script>
import { mapState } from "vuex";

export default {
  name: "PagarEmprendimiento",
  props: {
    imagen: {
      type: Array,
    },
    publicacion: {
      type: Array,
      default: () => ({
        precio: 0,
      }),
    },
    finalizo: {
      type: Boolean,
    },
    contrato: {
      type: Array,
    },
    preciosPublicacion: {
      type: Array,
    },
    esperarBotonMercadoPago: {
      type: Boolean,
    },
    yapublico: {
      type: Boolean,
    },
  },
  data() {
    return {
      fields: [
        { key: "desde", label: "Fecha Inicio", class: "text-center p2" },
        { key: "hasta", label: "Fecha Vencimiento", class: "text-left p2" },
        { key: "paquete", label: "Tipo", class: "text-left p2" },
        {
          key: "cantnormal",
          label: "Publicaciones comunes",
          class: "text-left p2",
        },
        {
          key: "cantDestacada",
          label: "Publicaciones destacadas",
          class: "text-left p2",
        },
      ],
    };
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre"]),
  },
  methods: {
    esDestacada(destacada) {
      return destacada == true ? "SI" : "NO";
    },
    ponerPrecio(destacada) {
      return destacada
        ? this.preciosPublicacion[1].precio
        : this.preciosPublicacion[0].precio;
    },
    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
    verificarVencimiento() {
      var fechaHoy = new Date();
      fechaHoy.setHours(0, 0, 0, 0);
      var fechaContrato = new Date(this.contrato[0].hasta);
      fechaContrato.setHours(0, 0, 0, 0);
      return fechaHoy.getTime() > fechaContrato.getTime();
    },
    verificarCantPublicaciones() {
      if (this.publicacion.destacada) {
        return this.contrato[0].cantDestacada <= 0;
      } else {
        this.contrato[0].cantnormal <= 0;
      }
    },
  },
  mounted() {},
};
</script>




<style>
</style>