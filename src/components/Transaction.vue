<template>
  <a class="ui fluid card"
    :class="{ 'raised' : tx.id === selectedTx }"
    @click.prevent="selectTx(tx.id)">
    <!-- Header -->
    <div class="content">
      <div class="ui equal width grid">
        <!-- Date -->
        <div class="ui column left aligned">
          <i class="icon calendar"></i>
          03-11-2017
        </div>
        <!-- From -->
        <div class="ui column left aligned"
            :class="{ 'is-address': tx.senderId === address }">
          <i class="icon chevron left"></i>
          {{ truncateTxId(tx.senderId) }}
        </div>
        <!-- To -->
        <div class="ui column left aligned"
            :class="{ 'is-address': tx.recipientId === address }">
          <i class="icon chevron right"></i>
          {{ truncateTxId(tx.recipientId) }}
        </div>
        <!-- Amount -->
        <div class="ui column right aligned">
          {{ (tx.amount / 100000000).toLocaleString() }}
        </div>
      </div>
    </div>
    <!-- Tx details -->
    <div v-if="tx.id === selectedTx" class="ui content">

    </div>
    <!-- Extra details -->
    <div v-if="tx.id === selectedTx" class="content">

    </div>
  </a>
</template>

<script>
// import axios from 'axios'
import * as utils from '../api/utils'

export default {
  name: 'transaction',
  props: ['tx'],
  data () {
    return {
      selectedTx: null
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    },
    address () {
      return this.$store.getters.wallet.address
    }
  },
  methods: {
    selectTx (txid) {
      // If already selected tx, unselect it
      if (txid === this.selectedTx) {
        this.selectedTx = null
        return
      }
      this.selectedTx = txid
    },
    truncateTxId (str) {
      return utils.truncateHash(str, 4)
    },
    getTransactionDetails () {

    }
  },
  mounted () {
    // this.getTransactionDetails()
  }
}
</script>

<style scoped>
.ui.fluid.card {
  margin-top: 0.35rem;
  margin-bottom: 0.15rem;
  color: rgba(0,0,0,.87);
}
.is-address {
  font-style: italic;
  font-weight: bold;
}
.withdrawal-bg {
  color: rgba(219, 40, 40, 1);
}
.deposit-bg {
  color: rgba(33, 186, 69, 1);
}
</style>