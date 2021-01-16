<template>
  <div>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <p class="h3 text-center">Pagar la publicacion</p>
      </b-col>
    </b-row>
    <b-row class="pb-2">
      <b-col class="text-center pt-3">
        <form
          action="/process_payment"
          method="post"
          id="paymentForm"
          @submit="getCardToken()"
        >
          <h3>Detalles del comprador</h3>
          <div>
            <div>
              <label for="email">E-mail</label>
              <input
                id="email"
                v-model="email"
                name="email"
                type="text"
                value="test@test.com"
              />
            </div>
            <div>
              <label for="docType">Tipo de documento</label>
              <b-form-select
                id="docType"
                name="docType"
                v-model="selected"
                :options="options"
                data-checkout="docType"
              ></b-form-select>
            </div>
            <div>
              <label for="docNumber">Número de documento</label>
              <input
                id="docNumber"
                v-model="docNumber"
                name="docNumber"
                data-checkout="docNumber"
                type="text"
              />
            </div>
          </div>
          <h3>Detalles de la tarjeta</h3>
          <div>
            <div>
              <label for="cardholderName">Titular de la tarjeta</label>
              <input
                id="cardholderName"
                v-model="cardholderName"
                data-checkout="cardholderName"
                type="text"
              />
            </div>
            <div>
              <label for="">Fecha de vencimiento</label>
              <div>
                <input
                  type="text"
                  v-model="cardExpirationMonth"
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
                />
                <span class="date-separator">/</span>
                <input
                  type="text"
                  v-model="cardExpirationYear"
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
                />
              </div>
            </div>
            <div>
              <label for="cardNumber">Número de la tarjeta</label>
              <input
                type="text"
                v-model="cardNumber"
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
              />
            </div>
            <div>
              <label for="securityCode">Código de seguridad</label>
              <input
                id="securityCode"
                v-model="securityCode"
                data-checkout="securityCode"
                type="text"
                onselectstart="return false"
                onpaste="return false"
                oncopy="return false"
                oncut="return false"
                ondrag="return false"
                ondrop="return false"
                autocomplete="off"
              />
            </div>
            <div id="issuerInput">
              <label for="issuer">Banco emisor</label>
              <select id="issuer" name="issuer" data-checkout="issuer"></select>
            </div>
            <div>
              <label for="installments">Cuotas</label>
              <select
                type="text"
                id="installments"
                name="installments"
              ></select>
            </div>
            <div>
              <input
                type="hidden"
                name="transactionAmount"
                id="transactionAmount"
                value="100"
                v-model="transactionAmount"
              />
              <input
                type="hidden"
                name="paymentMethodId"
                id="paymentMethodId"
              />
              <input type="hidden" name="description" id="description" />
              <br />
              <b-button type="submit" @click="pagar()">Pagar</b-button>
              <br />
            </div>
          </div>
        </form>
      </b-col>
    </b-row>
  </div>
</template> 
<script src="https://secure.mlstatic.com/sdk/javascript/v1/mercadopago.js"></script>

<script>
export default {
  name: "tipoPublicacion",
  props: {
    tipoPublicacion: {
      type: Array,
    },
  },
  data() {
    return {
      selected: null,
      email: null,
      docNumber: null,
      cardholderName: null,
      cardExpirationMonth: null,
      cardExpirationYear: null,
      cardNumber: null,
      securityCode: null,
      transactionAmount:1,
      options: [
        { value: "DNI", text: "DNI" },
        { value: "CI", text: "Cédula de Identidad" },
        { value: "LI", text: "Libreta Cívica" },
        { value: "LE", text: "Libreta de Enrolamiento" },
      ],
    };
  },
  computed: {},
  created() {},
  methods: {
    onRowSelected(items) {
      this.$emit("update-tipoPublicacion", items);
    },
    guessPaymentMethod() {
      let cardnumber = this.cardNumber;
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

    getCardToken() {
      console.log("entrosubmit");
      doSubmit = false;
      event.preventDefault();
      if (!doSubmit) {
        let $form = document.getElementById("paymentForm");
        window.Mercadopago.createToken($form, setCardTokenAndPay);
        return false;
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
       