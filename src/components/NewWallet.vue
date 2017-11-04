<template>
  <div class="ui container center aligned">
      <h2 class="ui header">
        <div class="content">
          New Ark wallet
        </div>
      </h2>
      <!-- Generate new wallet button -->
      <div class="ui button teal compact"
        @click.prevent="newWallet()">
        <i class="icon refresh"></i>
        New
      </div>
      <!-- Open generated wallet -->
      <div class="ui button green compact"
        @click.prevent="openWallet()">
        <i class="icon unlock"></i>
        Open
      </div>
      <!-- Switch network -->
      <div class="ui button basic compact"
        @click.prevent="switchNetwork()">
        <i class="icon disk outline"></i>
        Switch network
      </div>
      <div v-if="networkType.label === 'Test'" class="ui orange message">
        Key generated for the <b>DEV network</b>
      </div>
      <!-- QR keys -->
      <div v-if="wallet" class="ui equal width stackable grid segment center aligned">
        <div class="column">
              <div class="content">
                <div class="ui header">Address</div>
                <img class="ui centered image" width="148" :src="QRAddress" />
                <div>{{ wallet.address }}</div>
            </div>
        </div>
        <div class="column">
              <div class="content">
                <div class="ui header">Passphrase</div>
                <img class="ui centered image" width="148" :src="QRPassphrase" />
                <div>{{ wallet.passphrase }}</div>
            </div>
        </div>
      </div>
      <div v-if="wallet" class="ui segment left aligned">
        <!-- Keys warning -->
        <div class="ui negative message">
          <div class="header">
            <i class="icon warning"></i>
            Save  your keys
          </div>
          <p>
            <i class="icon chevron right"></i>
            Be sure to store the passphrase in a secure place, 
            if you lose it your funds <b>cannot be recovered</b>.
          </p>
          <p>
            <i class="icon chevron right"></i>
            Do not share your passphrase with anyone, 
            your funds <b>will be stolen</b>.
          </p>
        </div>
        <div class="ui column grid left aligned">
          <div class="two column row">
            <div class="column six wide"><div class="ui small header">Address</div></div>
            <div class="column ten wide">
              <a
                v-clipboard="wallet.address"
                @success="copySuccess()">
                <i class="icon copy"></i>
              </a>
              {{ wallet.address }}
            </div>
          </div>
          <div class="two column row">
            <div class="column six wide"><div class="ui small header">Passphrase</div></div>
            <div class="column ten wide">
              <a
                v-clipboard="wallet.passphrase"
                @success="copySuccess()">
                <i class="icon copy"></i>
              </a>
              {{ wallet.passphrase }}
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
import { clipboardNotification } from '../api/notification'
import { createWallet } from '../api/account'
import QRCode from 'qrcode'

export default {
  name: 'newWallet',
  data () {
    return {
      wallet: null,
      QRAddress: null,
      QRPassphrase: null
    }
  },
  computed: {
    networkType () {
      return this.$store.getters.networkType
    }
  },
  methods: {
    newWallet () {
      this.wallet = createWallet()
      this.$nextTick(() => {
        QRCode.toDataURL(this.wallet.address, (err, url) => {
          if (err) console.log(err)
          this.QRAddress = url
        })
        QRCode.toDataURL(this.wallet.passphrase, (err, url) => {
          if (err) console.log(err)
          this.QRPassphrase = url
        })
      })
    },
    switchNetwork () {
      this.$store.dispatch('switchNetwork')
      this.wallet = createWallet()
    },
    openWallet () {
    },
    copySuccess () {
      clipboardNotification()
    }
  },
  mounted () {
    this.newWallet()
  }
}
</script>

<style>
</style>