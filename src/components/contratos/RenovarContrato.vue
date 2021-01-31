<template>
  <b-container>
    <div>
      <b-row class="pb-2">
        <b-col class="text-center pt-3">
          <br />
          <p class="h1 text-center">Detalles de tu contrato</p>
        </b-col>
      </b-row>
      <b-card
        no-body
        class="mb-3 p-0"
        header="Fecha hasta que tiene disponible publicar productos"
      >
        <b-container class="pb-3">
          <b-row no-gutters>
            <b-col g="5" md="6">
              <br />
              <b-alert show variant="primary"
                >La fecha de expiracion del paquete es 17/02/2020</b-alert
              >
            </b-col>
          </b-row>
        </b-container>
      </b-card>
      <b-card
        no-body
        class="mb-3 p-0"
        header="Comprar un paquete para realizar publicaciones"
      >
        <b-container class="pb-3">
          <ValidationObserver ref="renovarContrato">
            <b-form
              @submit="getCardToken"
              @reset="onReset"
              v-if="show"
              id="paymentForm"
            >
              <b-row class="pb-2">
                <b-col class="text-center pt-3">
                  <p class="h3 text-center">Tipo de plan</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="4" md="6">
                  <b-form-group id="plan-label" label="Plan :" label-for="plan">
                    <b-form-select
                      id="plan"
                      data-checkout="Plan"
                      size="sm"
                      v-model="form.selectedPlan"
                      :options="optionsPlan"
                      required
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>

              <b-row class="pb-2">
                <b-col class="text-center pt-3">
                  <p class="h3 text-center">Detalles de la empresa/comercio</p>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6" md="6">
                  <b-form-group
                    id="email-label"
                    label="E-mail :"
                    label-for="email"
                  >
                    <b-form-input
                      size="sm"
                      name="email"
                      value="test@test.com"
                      v-model="form.email"
                      type="email"
                      id="email"
                      required
                    ></b-form-input>
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
                    <b-form-select
                      required
                      data-checkout="docType"
                      id="docType"
                      size="sm"
                      v-model="form.selected"
                      :options="options"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
                <b-col lg="4" md="6">
                  <b-form-group
                    id="docNumber-label"
                    label="Numero de documento :"
                    label-for="docNumber"
                  >
                    <b-form-input
                      required
                      id="docNumber"
                      size="sm"
                      name="docNumber"
                      type="number"
                      v-model="form.docNumber"
                    ></b-form-input>
                  </b-form-group>
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
                    <b-form-input
                      required
                      id="cardholderName"
                      size="sm"
                      data-checkout="cardholderName"
                      type="text"
                      v-model="form.cardholderName"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <p>Vencimiento de la tarjeta</p>
              <b-row>
                <b-col lg="2" md="4">
                  <b-form-group
                    id="cardExpirationMonth-label"
                    label="Mes :"
                    label-for="cardExpirationMonth"
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
                    ></b-form-input>
                  </b-form-group>
                </b-col>
                <span class="date-separator">/</span>
                <b-col lg="2" md="4">
                  <b-form-group
                    id="cardExpirationMonth-label"
                    label="Año :"
                    label-for="cardExpirationMonth"
                  >
                    <b-form-input
                      required
                      type="text"
                      v-model="form.cardExpirationYear"
                      placeholder="YY"
                      id="cardExpirationMonth"
                      data-checkout="cardExpirationYear"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                    ></b-form-input>
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
                    <b-form-input
                      required
                      type="number"
                      v-model="form.cardNumber"
                      @change="guessPaymentMethod()"
                      id="cardNumber"
                      data-checkout="cardNumber"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                    ></b-form-input>
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
                    <b-form-input
                      required
                      id="securityCode"
                      v-model="form.securityCode"
                      data-checkout="securityCode"
                      type="text"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="6" md="6">
                  <b-form-group
                    id="issuerInput-label"
                    label="Banco emisor :"
                    label-for="issuerInput"
                  >
                    <b-form-select
                      required
                      id="issuerInput"
                      name="issuer"
                      data-checkout="issuer"
                      size="sm"
                      v-model="form.selectedBanco"
                      :options="optionsBanco"
                    ></b-form-select>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row>
                <b-col lg="4" md="4">
                  <b-form-group
                    id="transactionAmount-label"
                    label="Cuotas:"
                    label-for="transactionAmount"
                  >
                    <b-form-input
                      required
                      type="text"
                      name="transactionAmount"
                      id="transactionAmount"
                      value="100"
                      v-model="form.transactionAmount"
                    ></b-form-input>
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="pb-2">
                <b-col class="text-center pt-3">
                  <b-button type="submit" variant="primary">Comprar</b-button>
                </b-col>
              </b-row>
            </b-form>
          </ValidationObserver>
        </b-container>
      </b-card>
    </div>
  </b-container>
</template> 
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>

<script>
export default {
  name: "RenovarContrato",
  props: {},
  data() {
    return {
      show: true,
      selected: null,
      form: {
        email: null,
        docNumber: null,
        cardholderName: null,
        cardExpirationMonth: null,
        cardExpirationYear: null,
        cardNumber: null,
        securityCode: null,
        transactionAmount: 1,
      },

      options: [
        { value: "DNI", text: "DNI" },
        { value: "CI", text: "Cédula de Identidad" },
        { value: "LI", text: "Libreta Cívica" },
        { value: "LE", text: "Libreta de Enrolamiento" },
      ],
      selectedPlan: null,
      optionsPlan: [
        { value: "E", text: "Plan Estandar" },
        { value: "P", text: "Plan Premium" },
      ],
      selectedBanco: null,
      optionsBanco: [
        { value: "E", text: "Plan Estandar" },
        { value: "P", text: "Plan Premium" },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    guessPaymentMethod() {
      let cardnumber = this.form.cardNumber;
      console.log(cardNumber);
      if (cardnumber.length >= 6) {
        let bin = cardnumber.substring(0, 6);
        window.Mercadopago.getPaymentMethod(
          {
            bin: bin,
          },
          this.setPaymentMethod()
        );
      }
    },
    setPaymentMethod(status, response) {
      console.log("entra setPaymentMethod");
      if (status == 200) {
        let paymentMethod = response[0];
        this.transactionAmount = paymentMethod.id;

        getIssuers(paymentMethod.id);
      } else {
        alert(`payment method info error: ${response}`);
      }
    },
    getIssuers(paymentMethodId) {
      window.Mercadopago.getIssuers(paymentMethodId, setIssuers);
    },
    setIssuers(status, response) {
      if (status == 200) {
        let issuerSelect = this.issuer;
        response.forEach((issuer) => {
          let opt = document.createElement("option");
          opt.text = issuer.name;
          opt.value = issuer.id;
          issuerSelect.appendChild(opt);
        });

        getInstallments(
          document.getElementById("paymentMethodId").value,
          document.getElementById("transactionAmount").value,
          issuerSelect.value
        );
      } else {
        alert(`issuers method info error: ${response}`);
      }
    },

    async getCardToken() {
      event.preventDefault();
      alert(JSON.stringify(this.form));
      console.log("entrosubmit");
      doSubmit = false;
      event.preventDefault();
      if (!doSubmit) {
        //let $form = document.getElementById("paymentForm");
        window.Mercadopago.createToken(this.form, setCardTokenAndPay);
        return false;
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
    setCardTokenAndPay(status, response) {
      if (status == 200 || status == 201) {
        let form = this.form
        let card = document.createElement("input");
        card.setAttribute("name", "token");
        card.setAttribute("type", "hidden");
        card.setAttribute("value", response.id);
        form.appendChild(card);
        doSubmit = true;
        form.submit();
      } else {
        alert("Verify filled data!\n" + JSON.stringify(response, null, 4));
      }
    },
  },
  mounted() {},
};
</script>

<style>
</style>
       