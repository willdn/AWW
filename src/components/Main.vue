<template>
  <div class="ui container">
    <div class="ui segment basic center aligned">
      <!-- Ark logo -->
      <img class="ui centered image tiny" :src="`../../static/ark-logo.png`">
      <div class="ui segment center aligned">
        <div class="ui equal width grid">
          <div class="column">
            <router-link :to="{ name: 'NewWallet'}" class="ui button teal">
              <i class="fa fa-rocket"></i>
              New Wallet
            </router-link>
          </div>
          <div class="column">
            <router-link :to="{ name: 'OpenWallet'}" class="ui button green">
              <i class="fa fa-unlock"></i>
              Open Wallet
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'main'
}
</script>

<style scoped>
.ui.segment {
  width:100%;
}
.container{
  display: flex; 
  align-items: center; 
  justify-content: center;
}
</style>