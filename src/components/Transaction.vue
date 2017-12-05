<template>
  <a class="ui fluid card"
    :class="{ 'raised' : tx.id === selectedTx }"
    @click.prevent="selectTx(tx.id)">
    <!-- Header -->
    <div class="content">
      <div class="ui equal width grid stackable">
        <!-- Date -->
        <div class="ui column left aligned">
          <i class="fa fa-calendar"></i>
          {{ date }}
        </div>
        <!-- From -->
        <div class="ui column left aligned"
            :class="{ 'is-address': tx.senderId === address }">
          <i class="fa fa-chevron-left"></i>
          {{ truncateTxId(tx.senderId) }}
        </div>
        <!-- To -->
        <div class="ui column left aligned"
            :class="{ 'is-address': tx.recipientId === address }">
          <i class="fa fa-chevron-right"></i>
          {{ truncateTxId(tx.recipientId) }}
        </div>
        <!-- Amount -->
        <div class="ui column right aligned"
             :class="{ 'deposit-bg' : txWay === 'deposit',
                       'withdrawal-bg' : txWay === 'withdrawal',
                       'vote-bg': txType === 'vote' }">
          {{ (tx.amount / 100000000).toLocaleString() }} {{ networkType.symbol }}
        </div>
      </div>
    </div>
    <!-- Tx details -->
    <div v-if="tx.id === selectedTx" class="ui content">
      <div v-if="tx.vendorField" class="ui segment basic center aligned tx-message">
        {{ tx.vendorField }}
      </div>
      <div class="ui equal width grid stackable">
        <div class="ui column">
          <div class="ui small header">From</div>
          <div class="text" :class="{ 'is-address': tx.senderId === address }">
            {{ tx.senderId }}
          </div>
        </div>
        <div class="ui column middle aligned">
          <i class="fa fa-arrow-right"></i>
        </div>
        <div class="ui column">
          <div class="ui small header">To</div>
          <div class="text" :class="{ 'is-address': tx.recipientId === address }">
            {{ tx.recipientId }}
          </div>
        </div>
      </div>
    </div>
    <!-- Extra details -->
    <div v-if="tx.id === selectedTx" class="content">
      <div class="ui equal width grid">
        <!-- Tx hash -->
        <div class="ui column left aligned">
          <i class="fa fa-hashtag"></i>
          {{ truncateTxId(tx.id) }}
          <a
            v-clipboard="tx.id"
            @success="copySuccess()">
            <i class="fa fa-copy"></i>
          </a>
        </div>
        <div class="ui column center aligned">
          <i class="fa fa-money"></i>
          {{ (tx.fee / 100000000).toLocaleString() }} {{ networkType.symbol }}
        </div>
        <div class="ui column right aligned">
          <i class="fa fa-cube"></i>
          {{ tx.confirmations.toLocaleString() }}
        </div>
      </div>
    </div>
  </a>
</template>

<script>
import { clipboardNotification } from '../api/notification'
import * as utils from '../api/utils'
import * as api from '../api'

export default {
  name: 'transaction',
  props: ['tx'],
  data () {
    return {
      selectedTx: null
    }
  },
  computed: {
    address () {
      return this.$store.getters.wallet.address
    },
    networkType () {
      return this.$store.getters.networkType
    },
    date () {
      return api.dateFromNow(this.tx.timestamp)
    },
    txWay () {
      if (this.tx.senderId === this.address) return 'withdrawal'
      if (this.tx.recipientId === this.address) return 'deposit'
    },
    txType () {
      switch (this.tx.type) {
        case 0 : return 'transaction'
        case 3 : return 'vote'
      }
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

    },
    copySuccess () {
      clipboardNotification()
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
.tx-message {
  font-style: italic;
}
.withdrawal-bg {
  color: rgba(219, 40, 40, 1);
}
.deposit-bg {
  color: rgba(33, 186, 69, 1);
}
.vote-bg {
  color: rgba(33, 133, 208, 1);
}
</style>