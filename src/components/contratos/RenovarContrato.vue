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
              @submit="getCardToken($event)"
              action="http://localhost:8000/api/process_payment"
              method="POST"
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
                      name="docType"
                      type="text"
                      required
                      data-checkout="docType"
                      id="docType"
                      size="sm"
                      v-model="form.docType"
                    ></b-form-select>
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
              <p>Vencimiento de la tarjetas</p>
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
                      id="cardExpirationYear"
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
                      id="cardNumber"
                      data-checkout="cardNumber"
                      onselectstart="return false"
                      onpaste="return false"
                      oncopy="return false"
                      oncut="return false"
                      ondrag="return false"
                      ondrop="return false"
                      autocomplete="off"
                      type="text"
                      required
                      v-model="form.cardNumber"
                      @change="guessPaymentMethod($event)"
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
                  <input
                    type="hidden"
                    name="transactionAmount"
                    id="transactionAmount"
                    value="10000"
                    v-model="form.transactionAmount"
                  />
                  <input
                    type="hidden"
                    name="paymentMethodId"
                    id="paymentMethodId"
                    v-model="form.paymentMethodId"
                  />
                  <input type="hidden" name="description" v-model="form.description" id="description" />
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
import PublicacionService from "@/services/PublicacionService";

export default {
  name: "RenovarContrato",
  props: {},
  data() {
    return {
      show: true,
      selected: null,
      doSubmit: false,

      form: {
        email: null,
        docNumber: null,
        cardholderName: null,
        cardExpirationMonth: null,
        cardExpirationYear: null,
        cardNumber: null,
        securityCode: null,
        transactionAmount: 10000,
        url: null,
        docType:null,
        description:null,
        paymentMethodId:null,
        installments:null,
        issuer:null
      },
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
    guessPaymentMethod(event) {
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
    getCardToken(event) {
      event.preventDefault();
      if (!this.doSubmit) {
        alert(this.form);
        let $form = document.getElementById("paymentForm");
        alert($form);
        window.Mercadopago.createToken(this.form, this.setCardTokenAndPay);
        alert(window.Mercadopago.createToken(this.form, this.setCardTokenAndPay));
        //this.mercadoPagoAPI();
      }
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
    async mercadoPagoAPI() {
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
      } catch (error) {}
    },
  },
  mounted() {
    window.Mercadopago.setPublishableKey(
      "TEST-062c5ddc-eeb4-40c6-b068-efde028b2af1"
    );
    window.Mercadopago.getIdentificationTypes();
  },
};
</script>

<style>
</style>
       