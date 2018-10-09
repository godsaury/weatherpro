<template>
	<div class="main lp_m_auto">        
        <h5 class="lp_white lp_padt6 main_title"><span></span>国内主要城市天气预报</h5>
        <div class="lp_overflow">
            <h6 class="lp_f_left lp_white Subtitle">{{todayDate}}</h6>
            <p class="lp_f_right lp_white Subweek">{{curweek}}</p>
        </div>
        <ul class="lp_mt3 list">
            <li class="lp_overflow" v-for="item in infoList" :key="item.id">
                <div class="lp_f_left">
                    <p class="info_time">{{item[1].time}}</p>                    
                    <p class="info_city">{{item[0].city}}</p>
                </div>
                <p class="lp_f_right info_temp">{{item[1].temp}}℃</p>
            </li>
            <li class="lp_overflow" v-show="isAdded">
                <div class="lp_f_left">
                    <p class="info_time">{{addEdTime}}</p>                    
                    <p class="info_city">{{addEdCity}}</p>
                </div>
                <p class="lp_f_right info_temp">{{addEdTemp}}℃</p>
            </li>
        </ul>
        <div class="lp_m_auto addCity" @click="addCity()"></div>
        <div class="pop" :class="{popShow:isAdd}">
            <div class="lp_m_auto lp_padt2 popcon">
                <div class="lp_overflow">
                    <input v-model="message" class="lp_f_left pop_ipt" type="text" placeholder="请输入城市名称">
                    <p class="lp_f_right pop_cancel" @click="cancelNew()">取消</p>
                </div>
                <p class="pop_click" @click="addNew()">{{message}}</p>
            </div>
        </div>
        <ul>
            <li v-for="item in listData" :key="item.id">
                <p>{{item.id}}</p>
                <p>{{item.name}}</p>
                <p>{{item.email}}</p>
                <p>{{item.body}}</p>
            </li>
        </ul>
        <button @click="test()">click me!</button>
    </div>
</template>

<script>
    import qs from 'qs'

	export default {
  	    name: 'Maincon',
  	    data(){
  		    return {
  			    todayDate:'',
                infoList:[],
                curweek:'',
                message:'',
                isAdd:false,
                isAdded:false,
                addEdTime:'',
                addEdCity:'',
                addEdTemp:'',
                l:["日","一","二","三","四","五","六"],
                listData:[],
  		    }
  	    },
        methods:{            
            getWuhan(){
                return this.$axios.get("/api/weather/index?key=ea4ba0baef88ff9f66b37eb8778bee78&cityname=武汉")
            },
            getShenzhen(){
                return this.$axios.get("/api/weather/index?key=ea4ba0baef88ff9f66b37eb8778bee78&cityname=深圳")
            },
            getBeijing(){
                return this.$axios.get("/api/weather/index?key=ea4ba0baef88ff9f66b37eb8778bee78&cityname=北京")
            },
            addCity(){
                this.isAdd = true;
            },
            cancelNew(){
                this.isAdd = false;
            },
            addNew(){
                this.$router.push('/detail?city='+this.message);
                // this.$router.push({name:'路由命名',params:{参数名:参数值,参数名:参数值}})            
            },
            public(cityname){
                return this.$axios.get("/api/weather/index?key=ea4ba0baef88ff9f66b37eb8778bee78&cityname="+cityname);
            },
            test(){
                this.$axios.get('http://jsonplaceholder.typicode.com/posts/1/comments').then((ret) =>{
                    if(ret.status == "200"){
                        this.listData = ret.data;
                    }
                });
            }
        },
        mounted(){
            let currDate = new Date();
            this.todayDate = currDate.getFullYear() + '-' + (currDate.getMonth()+1) + '-' + currDate.getDate();
            this.curweek = '星期' + this.l[currDate.getDay()];
            let selfCity = JSON.parse(localStorage.getItem("newCity"));

            // this.$axios.all([this.getBeijing(),this.getShenzhen(),this.getWuhan()]).then(this.$axios.spread((a,b,c) => { 
            //     this.infoList.push([a.data.result.today,a.data.result.sk]);    
            //     this.infoList.push([b.data.result.today,b.data.result.sk]);    
            //     this.infoList.push([c.data.result.today,c.data.result.sk]); 
            //     if(selfCity != null){
            //         this.public(selfCity).then((ret) => {
            //             if(ret.data.resultcode == 200){
            //                 this.isAdded = true;
            //                 this.addEdTime = ret.data.result.sk.time;
            //                 this.addEdCity = ret.data.result.today.city;
            //                 this.addEdTemp = ret.data.result.sk.temp;                            
            //             }
            //         })
            //     }  
            // }));
        },
	}
</script>

<style scoped>
	.main{
        position: relative;
        width: 80%;
        height: 100%;
        overflow: hidden;
        overflow-y: scroll;
    }
    .main::-webkit-scrollbar{
        display: none;
    }
    .main_title{
        font-size: 1.1rem;
    }
    .Subtitle,
    .Subweek{
        margin: 0.4rem 0 0 0;
        font-size: 0.9rem;
    }
    .list li{
        padding: 0.4rem 0;
        border-bottom: solid 1px rgba(255,255,255,0.3);
        border-radius: 1px;
    }
    .info_time{
        font-size: 0.7rem;
    }
    .info_temp{
        font-size: 1.4rem;
        font-weight: bold;
        padding: 0.3rem 0.2rem 0 0;
    }
    .addCity{
        position: relative;
        top: 1rem;
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
    .pop{
        position: fixed;
        top: 0;
        left: 0;
        transform: translateY(100%);
        z-index: 2;
        width: 100%;
        height: 100%;
        background: rgba(0,0,0,0.5);
        transition: all .5s ease-out;
    }
    .popShow{
        transform: translateY(0);
    }
    .popcon{
        width: 90%;
    }
    .pop_ipt{
        padding: 0.1rem 0 0.1rem 0.5rem;
        height: 2rem;
        width: 16rem;
        background-color: transparent;
        color: #fff;
        font-size: 0.8rem;
        border-radius: 1rem;
        border: solid 2px rgba(255,255,255,0.7);
        outline: none;
    }
    .pop_ipt::-webkit-input-placeholder{
        color: #fff;
    }
    .pop_cancel{
        line-height: 2rem;
    }
    .pop_click{
        position: absolute;
        top: 4.2rem;
        left: calc(5% + 0.5rem);
    }
</style>