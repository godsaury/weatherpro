<template>
  <div class="lp_m_auto" id="app">
  	<!-- <wel v-show="false"></wel>
    <con></con> -->
    <router-view></router-view>
  </div>
</template>

<script>
import con from './components/Maincon'
import wel from './components/Welcome'

export default {
  name: 'app',
  components: {
    wel,con
  }
}
</script>

<style>
	#app{
		width: 100%;
		height: 100%;
    max-width: 24rem;
    background: url(./img/cloud.png) no-repeat;
    background-repeat-y:repeat; 
    background-size: 100% auto;
    background-position:  left top;
	}
</style>
