<template>
    <div>
        <input type="text" v-model="name" />
		<!--默认写法-->
		<ul class="tab-tit">
			<li v-bind:class="n==0?'active':''" v-on:click="action(0)">标题一{{n}}</li>   
			<li :class="n==1?'active':''" @click="n=1">标题二</li>
			<li :class="n==2?'active':''" @click="action(2)">标题三</li>
			<li>标题四</li>
		</ul>
		<div class="tab-con">
			<div v-show="n==0">
				内容一
			</div>
			<div v-show="n==1">
				内容二
			</div>
			<div v-show="n==2">
				内容三
			</div>
			<div v-show="n==3">
				内容四
			</div>
		</div>

		<!--数组-->
		<ul class="tab-tit">
			<li v-for="(v,i) in title"  :key="i" :class="n==i?'active':''" v-on:click="action(i)">
				{{v}}</li>   
		</ul>
		<div class="tab-con">
			<div v-for="(v,i) in content"  :key="i" v-show="n==i">
				{{v}}
			</div>
		</div>

		<!--数组对象-->
		<ul class="tab-tit">
			<li v-for="(v,i) in obj"  :key="i" :class="n==i?'active':''" v-on:click="action(i)">
				{{v.title}}</li>   
		</ul>
		<div class="tab-con">
			<div v-for="(v,i) in obj"  :key="i" v-show="n==i">
				{{v.content}}
			</div>
		</div>

		<!--动态数据-->
		<ul class="tab-tit">
			<li v-for="(v,i) in lists"  :key="i" :class="n==i?'active':''" v-on:click="action(i)">
				{{v.title}}</li>   
		</ul>
		<div class="tab-con">
			<div v-for="(v,i) in lists"  :key="i" v-show="n==i">
				{{v.content}}
			</div>
		</div>
    </div>
</template>
<script>
export default {
    data(){
        return {   //响应式的数据
            name:'abc',
            n:2 ,//默认值
            title:['标题1','标题2','标题3','标题2','标题3'],
            content:['内容1','内容2','内容3','内容2','内容3'],
            obj:[
                {title:'标题1',content:'内容1'},
                {title:'标题2',content:'内容2'},
                {title:'标题3',content:'内容3'},
                {title:'标题4',content:'内容4'}
            ],
            lists:[]
        }
    },
    methods:{   //管理函数
        action(i){
            this.n = i;
        },
        getData:function(){
            //var self = this;
            this.axios({
                method:'get',
                url:'get_tab'
            }).then(res=>{
                console.log(res);
                this.lists = res.data.result;
            }).catch(function(){

            })
        }
    },
    mounted:function(){
        this.getData();
    }
}
</script>
<style scoped>
ul,li {
    padding:0;
    margin:0;
}
.tab-tit li{
    padding: 10px 15px;
    text-align: center;
    list-style:none;
    cursor:pointer;
    display: inline-block;
}
.tab-tit .active{
    color: #09f;
    border-bottom: 1px solid #09f;
}
.tab-con div{
    margin:30px;
}
</style>