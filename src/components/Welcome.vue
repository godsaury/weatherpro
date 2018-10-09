<template>
	<div class="welcome">
		<mt-swipe :auto="0">
  			<mt-swipe-item class="swipef">1</mt-swipe-item>
  			<mt-swipe-item class="swipes">2</mt-swipe-item>
  			<mt-swipe-item class="swipet">3
				<button @click="onto()">进入</button>
  			</mt-swipe-item>
		</mt-swipe>
	</div>
</template>

<script>
	import Vue from 'vue'
	import { Swipe, SwipeItem } from 'mint-ui'

	Vue.component(Swipe.name, Swipe)
	Vue.component(SwipeItem.name, SwipeItem)

	export default {
  		name: 'Welcome',
  		data(){
  			return {
  				
  			}
  		},
  		methods:{
  			// onto(){
  			// 	console.log(132);
  			// }
  		}
	}
</script>

<style scoped>
	.welcome{
		height: 100%;
	}
	.swipef{
		background-color: pink;
	}
	.swipes{
		background-color: rgba(0,255,0,0.7);
	}
	.swipet{
		background-color: rgba(255,0,0,0.8);
	}
</style>