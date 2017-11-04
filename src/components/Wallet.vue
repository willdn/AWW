<template>
  <div class="ui container center aligned">

      <div v-if="wallet" class="ui segment center aligned">
        <div class="ui equal width stackable grid">
          <div class="ui column center aligned">
            <img class="ui centered image" :src="QRAddress" />
            {{ wallet.address }}
            <a
              v-clipboard="this.wallet.address"
              @success="copySuccess()">
              <i class="icon copy"></i>
            </a>
          </div>
          <div class="ui column middle aligned">
            <div class="ui equal width grid center aligned">
              <div class="ui column">
                <div class="ui button teal compact"
                    :class="{ 'basic': !sendFormVisible }"
                    @click.prevent="toggleSendForm()">
                  <i class="ui icon send outline"></i>
                  Send
                </div>
              </div>
              <div class="ui column">
                <div class="ui button blue compact basic"
                    :class="{ 'disabled': balance == null || !transactions }"
                    @click.prevent="refresh()">
                  <i class="ui icon refresh" :class="{ 'loading': balance == null || !transactions }"></i>
                  Refresh
                </div>
              </div>
            </div>
            <div class="ui equal width grid center aligned">
              <div class="ui column">
                <div class="ui medium header">
                  <span v-if="balance == null"><i class="icon spinner loading"></i></span>
                  <span v-if="balance || balance === 0">{{ balance.toLocaleString() }}</span>
                  <div class="ui sub header">ARK</div>
                </div>
              </div>
              <div class="ui column">
                <div class="ui medium header">
                  <span v-if="balance == null"><i class="icon spinner loading"></i></span>
                  <span v-if="balance || balance === 0">{{ balance.toLocaleString() }}</span>
                  <div class="ui sub header">€</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <send v-if="sendFormVisible"></send>
      <!-- Transaction header -->
      <div class="ui header left aligned">
        <i class="ui icon exchange"></i>
        <div class="content">
          Transactions
        </div>
      </div>
      <div v-if="!transactions" class="ui segment center aligned">
        <i class="icon spinner loading"></i>
        Loading transactions
      </div>
      <div v-if="transactions" class="ui cards">
        <transaction v-for="transaction in transactions" :key="transaction.id" :tx="transaction"></transaction>
      </div>
      <div v-if="transactions && transactions.length === 0" class="ui segment center aligned">
        No transactions
      </div>
  </div>
</template>

<script>
import { clipboardNotification } from '../api/notification'
import { getBalance, getTransactions } from '../api/account'
import Transaction from './Transaction'
import Send from './Send'
import QRCode from 'qrcode'
import axios from 'axios'

export default {
  name: 'wallet',
  components: {
    Transaction,
    Send
  },
  data () {
    return {
      transactions: null,
      arkValueUSD: 0,
      balance: null,
      claimAmounts: null,
      QRAddress: null
    }
  },
  computed: {
    wallet () {
      return this.$store.getters.wallet
    },
    sendFormVisible () {
      return this.$store.getters.app.sendFormVisible
    }
  },
  methods: {
    toggleSendForm () {
      this.$store.dispatch('toggleSendForm')
    },
    getBalance () {
      getBalance(this.wallet.address)
        .then((response) => {
          this.balance = response
        })
    },
    getTransactions () {
      getTransactions(this.wallet.address)
        .then((response) => {
          this.transactions = response
        })
    },
    refresh () {
      this.transactions = null
      this.balance = null
      this.getTransactions()
      this.getBalance()
    },
    copySuccess () {
      clipboardNotification()
    },
    getARKMarket () {
      axios.get(`https://api.coinmarketcap.com/v1/ticker/ark`, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
        .then((res) => {
          console.log(res)
        })
        .catch((err) => {
          if (err) console.log(err)
        })
    }
  },
  beforeDestroy () {
    this.$store.dispatch('closeWallet')
  },
  mounted () {
    // Redirect if no wallet opened
    if (!this.$store.getters.wallet.open) {
      this.$router.push({ name: 'OpenWallet' })
      return null
    }
    // this.$store.dispatch('setLoadingState', true)
    this.getBalance()
    this.getTransactions()
    // this.getARKMarket()
    setInterval(() => {
      this.getBalance()
      this.getTransactions()
      // this.getARKMarket()
    }, 15000)
    this.$nextTick(() => {
      QRCode.toDataURL(this.$store.getters.wallet.address, (err, url) => {
        if (err) console.log(err)
        this.QRAddress = url
      })
    })
  }
}
</script>

<style scoped>

</style>