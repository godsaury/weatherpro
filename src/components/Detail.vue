<template>
	<div class="lp_m_auto detail">
		<p class="addCity" @click="addToList()"></p>
		<p class="lp_t_center lp_padt3 det_city">{{city}}</p>
		<p class="lp_t_center det_week">{{week}}</p>
		<p class="lp_t_center det_temp">{{temp}}℃</p>
		<div class="lp_overflow">
			<p class="lp_f_left">{{weather}}</p>
			<p class="lp_f_right">{{temperature}}</p>			
		</div>
		<ul class="lp_mt1 det_list">
			<li class="lp_overflow" v-for="item in futureList" :key="item.id">
				<p class="lp_f_left lp_t_center detList_date">{{item.date}}</p>
				<p class="lp_f_left lp_t_center detList_week">{{item.week}}</p>
				<p class="lp_f_left lp_t_center detList_weather">{{item.weather}}</p>				
				<p class="lp_f_right lp_t_center detList_temperature">{{item.temperature}}</p>
			</li>
		</ul>
		<div class="lp_f_right toMaincon" @click="toMaincon()"></div>
	</div>
</template>

<script>
	import { Toast,MessageBox } from 'mint-ui'
	export default {
		name:'detail',
		data(){
			return {
				futureList:[],
				city:'',
				week:'',
				temp:'',
				weather:'',
				temperature:'',
			}
		},
		methods:{
			toMaincon(){
				this.$router.push('./main');
			},
			addToList(){
				if(this.city == "北京" || this.city == "深圳" || this.city == "武汉"){
					Toast("主页列表中已存在哦");
				}else{
					MessageBox.confirm("添加到主页列表吗？").then((action) => {
	                	let getcity = localStorage.getItem("newCity");
						let getCityArr = JSON.parse(getcity);
						if(getCityArr == null){
							localStorage.setItem("newCity",JSON.stringify(this.city));
						}else{
							// getCityArr.push(this.city);
							// let newCityArr = JSON.stringify(getCityArr);
							// localStorage.setItem("newCity",newCityArr);
							localStorage.removeItem("newCity");
							localStorage.setItem("newCity",JSON.stringify(this.city));
						}
	                }).catch((e) => {
	                	console.log(e);
	                });	
	            }					
			},
		},
		mounted(){
			let cityName = this.$route.query.city;
			this.$axios.get('/api/weather/index?key=ea4ba0baef88ff9f66b37eb8778bee78&cityname='+cityName)
			.then((ret) => {
				if(ret.data.resultcode == 200){
					this.futureList = ret.data.result.future;
					this.city = ret.data.result.today.city;
					this.week = ret.data.result.today.week;
					this.temp = ret.data.result.sk.temp;
					this.weather = ret.data.result.today.weather;
					this.temperature = ret.data.result.today.temperature;
				}
			});
		},
	}
</script>

<style scoped>
	.detail{
		position: relative;
		width: 80%;
		min-height: 100%;
        overflow: hidden;
		overflow-y: scroll;
	}
	.addCity{
        position: absolute;
        top: 2.4rem;
        right: 0;
        width: 24px;
        height: 24px;
        border: solid 2px #fff;
        border-radius: 50%;
    }
    .addCity:before{
        position: absolute;
        content: "";
        left: 50%;
        top: 15%;
        transform: translate(-50%,0);
        width: 2px;
        height: 70%;
        background-color: #fff;
    }
    .addCity:after{
        position: absolute;
        content: "";
        left: 15%;
        top: 50%;
        transform: translate(0,-50%);
        width: 70%;
        height: 2px;
        background-color: #fff;
    }
	.det_city{
		font-size: 1.6rem;
	}
	.det_temp{
		margin: 0.8rem auto;
		font-size: 3rem;
	}
	.det_list li{
        padding: 0.4rem 0 0.6rem;
        border-bottom: solid 1px rgba(255,255,255,0.3);
        border-radius: 1px;		
	}
	.det_list li p{
		font-size: 0.8rem;
	}
	.detList_date{
		width: 4rem;
	}
	.detList_week{
		width: 3rem;
	}
	.detList_weather{
		width: 7rem;
	}
	.detList_temperature{
		width: 5rem;
		text-align: right;
	}
	.toMaincon{
		position: relative;
		top: 2rem;
		right: 0;
		width: 1.6rem;
		height: 2px;
		background-color: #fff;
	}
	.toMaincon::before{
		position: absolute;
		top: -0.45rem;
		left: 0;
		content: "";
		width: 1.6rem;
		height: 2px;
		background-color: #fff;
	}
	.toMaincon::after{
		position: absolute;
		top: 0.45rem;
		left: 0;
		content: "";
		width: 1.6rem;
		height: 2px;
		background-color: #fff;
	}
</style>