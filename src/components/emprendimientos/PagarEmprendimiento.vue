<template>
  <b-container>
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h3 text-center">Pagar publicacion</p>
          <strong
            >Para que tu pago sea seguro integramos Mercado Pago en el
            sistema</strong
          >
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
                                :src="
                                  this.imagen[0] == null
                                    ? 'https://picsum.photos/400/400/?image=20'
                                    : this.imagen[0].base64
                                "
                                alt="Image"
                                class="rounded-0"
                              ></b-card-img>
                            </b-col>
                            <div class="col-md-4 product-detail">
                              <h3>{{ this.publicacion.titulo }}</h3>
                              <div class="product-info">
                                <div>
                                  <div v-if="Number(this.publicacion.precio) > Number(0)">
                                  <b                                           
                                    >Precio</b  
                                  >{{ this.getImporte(this.publicacion.precio)
                                  }}
                                  </div>
                                  <b>Descripcion: </b
                                  ><span id="product-description">{{
                                    this.publicacion.observaciones
                                  }}</span
                                  ><br />
                                  <b>Autor: </b>{{ username }}<br />
                                  <b>Publicacion destacada: </b
                                  >{{ this.esDestacada(this.destacada) }}<br />                                 
                              
                                  <b>Total de la publicacion:</b> $
                                  <span id="unit-price">{{
                                    this.ponerPrecio(this.destacada)
                                  }}</span>
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
                    Presiona el boton "pagar" para pagar la publicacion<strong>
                      {{ this.publicacion.titulo }}</strong
                    >, cuando finalizes el pago tu publicacion se cargara en
                    Malambo<span id="summary-quantity"></span>
                  </p>
                </div>
                <br />
                <div class="total">
                  Total :${{ this.ponerPrecio(this.destacada)
                  }}<span class="price" id="summary-total"></span>
                </div>
              </div>
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
  </b-container>
</template> 

<script>
import { mapState } from "vuex";

export default {
  name: "PagarEmprendimiento",
  props: {
    destacada: {
      type: Boolean,
    },
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
  },
  data() {
    return {};
  },
  computed: {
    ...mapState("storeUser", ["username", "nombre"]),
  },
  methods: {
    esDestacada(destacada) {
      return destacada == true ? "SI" : "NO";
    },
    ponerPrecio(destacada) {
      return destacada == true ? "700" : "500";
    },
    getImporte(precio) {
      const options2 = { style: "currency", currency: "USD" };
      const numberFormat2 = new Intl.NumberFormat("en-US", options2);
      return numberFormat2.format(precio);
    },
  },
  mounted() {
  },
};
</script>




<style>
</style>