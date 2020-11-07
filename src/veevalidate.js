import Vue from 'vue'
import ar from 'vee-validate/dist/locale/es';
import {
    ValidationProvider,
    Validator ,
    ValidationObserver
} from 'vee-validate';
// Inside a component.




// Also available on the prototype.
Validator.localize('ar',ar);
   
Validator.extend('validarMonto', {
 
    message: "El monto ingresado no es valido",
    validate:  (value, args) => {
   
      if (args[0] == 'undefined' ){
           args[0]=0
      }    
      
     return ((Number(value) <= Number(args[0]) && Number(value)) >= 0)
       
    },

});


Vue.component('ValidationProvider', ValidationProvider);
Vue.component('ValidationObserver', ValidationObserver);