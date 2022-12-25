import VueCurrencyFilter from 'vue-currency-filter'
import Vue from 'vue';

Vue.use(VueCurrencyFilter,
    {
      symbol : 'Le',
      thousandsSeparator: '.',
      fractionCount: 2,
      fractionSeparator: ',',
      symbolPosition: 'front',
      symbolSpacing: true,
      avoidEmptyDecimals: undefined,
    })
