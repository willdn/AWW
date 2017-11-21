<template>
  <div class="ui container">
    <div class="ui segment basic center aligned">
      <!-- Ark logo -->
      <img class="ui centered image tiny" :src="require('../assets/img/ark-logo.png')">
      <div class="ui segment raised center aligned">
        <div class="ui two stackable cards">
          <router-link :to="{ name: 'NewWallet'}" class="card teal raised">
            <div class="content">
              <i class="fa fa-rocket"></i>
              <b>New Wallet</b>
            </div>
          </router-link>
          <router-link :to="{ name: 'OpenWallet'}" class="card green raised">
            <div class="content">
              <i class="fa fa-unlock"></i>
              <b>Open Wallet</b>
            </div>
          </router-link>
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
.card {
  margin-top: 0.35rem;
  margin-bottom: 0.15rem;
  color: rgba(0,0,0,.87);
}
.cards {
    margin-top: 0.15em;
    margin-bottom: 0.1em;
}
.container{
  display: flex; 
  align-items: center; 
  justify-content: center;
}
</style>