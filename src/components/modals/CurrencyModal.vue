<template>
  <modal
    name="currencyModal"
    height="auto"
    :adaptive="true">
      <div class="ui container center aligned currency-modal">
        <div class="ui cards">
          <a v-for="curr in currencies" :key="curr.id" class="ui card fluid"
             @click.prevent="setCurrency(curr)">
            <div class="content">
              <b>{{ curr.label }} {{ curr.id }}</b>
            </div>
          </a>
        </div>
        <div class="ui segment basic">
          <button class="ui button compact basic"
            @click.prevent="closeModal()">
            <i class="fa fa-remove"></i>
            Close
          </button>
        </div>
      </div>
  </modal>
</template>

<script>
import currencies from '../../api/currencies'

export default {
  name: 'currencyModal',
  data () {
    return {
      currencies: currencies
    }
  },
  methods: {
    setCurrency (curr) {
      this.$store.dispatch('setFiatCurrency', curr)
      this.$modal.hide('currencyModal')
    },
    closeModal () {
      this.$modal.hide('currencyModal')
    }
  },
  mounted () {
  }
}
</script>
<style scoped>
.currency-modal {
  padding: 1.5em;
}
.ui.fluid.card {
  margin-top: 0.35rem;
  margin-bottom: 0.15rem;
  color: rgba(0,0,0,.87);
}
</style>
