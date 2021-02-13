<template>
  <b-container>
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 text-center">Pagar publicacion</p>
        </b-col>
      </b-row>

      <b-card
        no-body
        class="mb-3 p-0"
        header="Realiza el pago y tu publicacion estara disponible en Malambo para que sea vista por miles de usuarios!"
      >
        <b-container class="pb-3">
          <ValidationObserver ref="validarPago">
            <b-form-group>
              <b-alert
                v-for="alert in alerts"
                dismissible
                v-bind:key="alert.key"
                show
                :variant="alert.variant"
                >{{ alert.message }}</b-alert
              >
            </b-form-group>
            <!--    <b-form
              @submit="getCardToken($event)"             
              v-if="show"
              id="paymentForm"
            > -->
            <!--   <b-row class="pb-2">
                <b-col class="text-center pt-3">
                  <p class="h4 text-center">Tipo de publicacion(Las publicaciones destacadas se veran en el inicio de Malambo llegando a mas usuarios)</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="4" md="6">
                  <b-form-group id="Publoicacion-label" label="Publicacion :" label-for="Publicacion">
                    <b-form-select
                     @change="cambiarMonto()"
                      id="Publicacion"
                      data-checkout="Publicacion"
                      size="sm"
                      v-model="selectedPlan"
                      :options="optionsPlan"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row> -->

            <b-row class="pb-2">
              <b-col class="text-center pt-3">
                <p class="h3 text-center">Datos personales</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group
                  id="email-label"
                  label="E-mail :"
                  label-for="email"
                >
                  <ValidationProvider
                    :name="'email'"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      size="sm"
                      name="email"
                      value="test@test.com"
                      v-model="form.email"
                      type="email"
                      id="email"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" md="6">
                <b-form-group
                  id="docType-label"
                  label="Tipo de documento :"
                  label-for="docType"
                >
                  <ValidationProvider
                    :name="'docType '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-select
                      name="docType"
                      type="text"
                      required
                      data-checkout="docType"
                      id="docType"
                      size="sm"
                      v-model="form.docType"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-select>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <b-col lg="4" md="6">
                <label for="docNumber">Número de documento</label>
                <input
                  id="docNumber"
                  name="docNumber"
                  data-checkout="docNumber"
                  v-model="form.docNumber"
                  type="text"
                />
              </b-col>
            </b-row>
            <b-row class="pb-2">
              <b-col class="text-center pt-3">
                <p class="h3 text-center">Datos de la tarjeta</p>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group
                  id="cardholderName-label"
                  label="Titular :"
                  label-for="cardholderName"
                >
                  <ValidationProvider
                    :name="'Titular '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      required
                      id="cardholderName"
                      size="sm"
                      data-checkout="cardholderName"
                      type="text"
                      v-model="form.cardholderName"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <p>Vencimiento de la tarjetas</p>
            <b-row>
              <b-col lg="2" md="4">
                <b-form-group
                  id="cardExpirationMonth-label"
                  label="Mes :"
                  label-for="cardExpirationMonth"
                >
                  <ValidationProvider
                    :name="'titulo '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      required
                      type="text"
                      v-model="form.cardExpirationMonth"
                      placeholder="MM"
                      id="cardExpirationMonth"
                      data-checkout="cardExpirationMonth"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
              <span class="date-separator">/</span>
              <b-col lg="2" md="4">
                <b-form-group
                  id="cardExpirationMonth-label"
                  label="Año :"
                  label-for="cardExpirationMonth"
                >
                  <ValidationProvider
                    :name="'Expiracion '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      required
                      type="text"
                      v-model="form.cardExpirationYear"
                      placeholder="YY"
                      id="cardExpirationYear"
                      data-checkout="cardExpirationYear"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                      :state="errors[0] ? false : valid ? true : null"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" md="6">
                <b-form-group
                  id="cardNumber-label"
                  label="Numero de la tarjeta:"
                  label-for="cardNumber"
                >
                  <ValidationProvider
                    :name="'Año '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      id="cardNumber"
                      data-checkout="cardNumber"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      :state="errors[0] ? false : valid ? true : null"
                      autocomplete="off"
                      type="text"
                      required
                      v-model="form.cardNumber"
                      @change="guessPaymentMethod($event)"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="2" md="6">
                <b-form-group
                  id="securityCode-label"
                  label="Codigo de seguridad:"
                  label-for="securityCode"
                >
                  <ValidationProvider
                    :name="'securityCode '"
                    :rules="'required'"
                    v-slot="{ errors, valid }"
                  >
                    <b-form-input
                      required
                      id="securityCode"
                      v-model="form.securityCode"
                      data-checkout="securityCode"
                      type="text"
                      :state="errors[0] ? false : valid ? true : null"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                    ></b-form-input>
                    <b-form-invalid-feedback
                      v-for="error in errors"
                      :key="error.key"
                    >
                      {{ error }}
                    </b-form-invalid-feedback>
                  </ValidationProvider>
                </b-form-group>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="6" md="6">
                <div id="issuerInput">
                  <label for="issuer">Banco emisor</label>
                  <select
                    id="issuer"
                    name="issuer"
                    data-checkout="issuer"
                    v-model="form.issuer"
                  ></select>
                </div>
              </b-col>
            </b-row>
            <b-row>
              <b-col lg="4" md="4">
                <b-form-group
                  id="transactionAmount-label"
                  label="Cuotas:"
                  label-for="transactionAmount"
                >
                  <select
                    type="text"
                    v-model="form.installments"
                    id="installments"
                    name="installments"
                  ></select>
                </b-form-group>
                <div v-if="selectedPlan == 1">
                  <input
                    type="hidden"
                    name="transactionAmount"
                    id="transactionAmount"
                    value="400"
                    v-model="form.transactionAmount"
                  />
                </div>
                <div v-else>
                  <input
                    type="hidden"
                    name="transactionAmount"
                    id="transactionAmount"
                    value="800"
                    v-model="form.transactionAmount"
                  />
                </div>
                <input
                  type="hidden"
                  name="paymentMethodId"
                  id="paymentMethodId"
                  v-model="form.paymentMethodId"
                />
                <input
                  type="hidden"
                  name="description"
                  v-model="form.description"
                  id="description"
                />
              </b-col>
            </b-row>
            <b-row class="pb-2">
              <b-col class="text-center pt-3">
                <b-button @click="getCardToken($event)" variant="primary"
                  >Pagar</b-button
                >
              </b-col>
            </b-row>
            <!--             </b-form> -->
          </ValidationObserver>
        </b-container>
      </b-card>
    </div>
  </b-container>
</template> 
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>

<script>
export default {
  name: "PagarEmprendimiento",
  props: {
    destacada: {
      type: Boolean,
    },
    
  },
  data() {
    return {
      show: true,
      selected: null,
      doSubmit: false,
      alerts: [],
      pago: false,
      form: {
        email: null,
        docNumber: null,
        cardholderName: null,
        cardExpirationMonth: null,
        cardExpirationYear: null,
        cardNumber: null,
        securityCode: null,
        transactionAmount: 400,
        url: null,
        docType: null,
        description: null,
        paymentMethodId: null,
        installments: null,
        issuer: null,
      },
      selectedPlan: null,
      optionsPlan: [
        { value: 1, text: "Publicacion comun" },
        { value: 2, text: "Publicacion destacada (mayor visibilidad)" },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    async validate() {
      let result = await this.$refs.validarPago.validate();
      if (result == true) {
        if (this.pago) {
          return true;
        }
        return false
      }
          return result;
    },
    cambiarMonto() {
      console.log("entra");
      if (this.selectedPlan == 1) {
        this.form.transactionAmount = 400;
      } else {
        this.form.transactionAmount = 800;
      }
    },
    guessPaymentMethod(event) {
      console.log(event);
      let cardnumber = document.getElementById("cardNumber").value;
      if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);
        window.Mercadopago.getPaymentMethod(
          {
            bin: bin,
          },
          this.setPaymentMethod
        );
      }
    },
    setPaymentMethod(status, response) {
      if (status == 200) {
        let paymentMethod = response[0];
        document.getElementById("paymentMethodId").value = paymentMethod.id;

        this.getIssuers(paymentMethod.id);
      } else {
        alert(`payment method info error: ${response}`);
      }
    },
    getIssuers(paymentMethodId) {
      window.Mercadopago.getIssuers(paymentMethodId, this.setIssuers);
    },
    setIssuers(status, response) {
      if (status == 200) {
        let issuerSelect = document.getElementById("issuer");
        response.forEach((issuer) => {
          let opt = document.createElement("option");
          opt.text = issuer.name;
          opt.value = issuer.id;
          issuerSelect.appendChild(opt);
        });

        this.getInstallments(
          document.getElementById("paymentMethodId").value,
          document.getElementById("transactionAmount").value,
          issuerSelect.value
        );
      } else {
        alert(`issuers method info error: ${response}`);
      }
    },
    getInstallments(paymentMethodId, transactionAmount, issuerId) {
      window.Mercadopago.getInstallments(
        {
          payment_method_id: paymentMethodId,
          amount: parseFloat(transactionAmount),
          issuer_id: parseInt(issuerId),
        },
        this.setInstallments
      );
    },
    setInstallments(status, response) {
      if (status == 200) {
        document.getElementById("installments").options.length = 0;
        response[0].payer_costs.forEach((payerCost) => {
          let opt = document.createElement("option");
          opt.text = payerCost.recommended_message;
          opt.value = payerCost.installments;
          document.getElementById("installments").appendChild(opt);
        });
      } else {
        alert(`installments method info error: ${response}`);
      }
    },
    async getCardToken(event) {
      console.log(event);
      let result = await this.$refs.validarPago.validate();
      if (result) {
        this.pago = true;
        alert("Se realizo el pago con exito");
      }
      /*   event.preventDefault();
      if (!this.doSubmit) {
        alert(this.form);
        let $form = document.getElementById("paymentForm");
        alert($form);
        window.Mercadopago.createToken(this.form, this.setCardTokenAndPay);
        alert(
          window.Mercadopago.createToken(this.form, this.setCardTokenAndPay)
        ); */
      //this.mercadoPagoAPI();
    },
    setCardTokenAndPay(status, response) {
      if (status == 200 || status == 201) {
        let form = document.getElementById("paymentForm");
        let card = document.createElement("input");
        card.setAttribute("name", "token");
        card.setAttribute("type", "hidden");
        card.setAttribute("value", response.id);
        form.appendChild(card);
        this.doSubmit = true;
        form.submit();
      } else {
        alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
      }
    },
    onReset(event) {
      event.preventDefault();
      (this.form.email = null),
        (this.form.docNumber = null),
        (this.form.cardholderName = null),
        (this.form.cardExpirationMonth = null),
        (this.form.cardExpirationYear = null),
        (this.form.cardNumber = null),
        (this.form.securityCode = null),
        (this.form.transactionAmount = 1),
        (this.show = false);
      this.$nextTick(() => {
        this.show = true;
      });
    },
    /*   async mercadoPagoAPI() {
      try {
        const response = await PublicacionService.mercadoPago({
          email: this.form.email,
          docNumber: this.form.docNumber,
          titularTarjeta: this.form.cardholderName,
          mesTarjeta: this.form.cardExpirationMonth,
          añoTarjeta: this.form.cardExpirationYear,
          numTarjeta: this.form.cardNumber,
          codigoSeguridad: this.form.securityCode,
          cuotas: this.form.transactionAmount,
        });
        console.log(response.data);
      } catch (error) {}
    }, */
  },
  mounted() {
    if (this.destacada == true) {
      this.form.transactionAmount = 800;
    } else {
      this.form.transactionAmount = 400;
    }

    window.Mercadopago.setPublishableKey(
      "TEST-062c5ddc-eeb4-40c6-b068-efde028b2af1"
    );
    window.Mercadopago.getIdentificationTypes();
  },
};
</script>




<style>
</style>