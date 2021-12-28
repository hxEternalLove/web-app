<template>
    <div class="menu-content">
        <ul>
            <li class="menu-list" v-for="(v,i) in obj" :key="i">
                <i class="icon-lists iconfont" :class="v.icon" :style="{'background-color': bgColorList[Math.floor(Math.random()*6)]}"></i><span>{{v.title}}</span>
            </li>
        </ul>
    </div>
</template>
<script>
export default {
    data() {
        return {
            obj:[
                {title:'美食',url:'/home',icon:"iconfenzu"},
                {title:'电影',url:'/qiye',icon:"icondianying"},
                {title:'住宿',url:'/caiwu',icon:"iconzhusu"},
                {title:'娱乐',url:'/canpin',icon:"iconQQkandian"},
                {title:'外卖',url:'/dingdan',icon:"iconkuaidi1"},
                {title:'打车',url:'/huiyuan',icon:"icondache"},
                {title:'景点',url:'/shuju',icon:"iconmeijing"},
                {title:'旅游',url:'/shuju',icon:"iconlvyou"},
            ],
            bgColorList: [
                '#19d5d6',
                '#ff1054',
                '#02a76a',
                '#dd0dd1',
                '#0294fa',
                '#f54704',
                '#ec9be0',
                '#c7da0e'
            ]
        };
    },
}
</script>
<style scoped>
.menu-content {
    width: 100%;
    text-align: center;
}
.menu-list {
    width: 23%;
    display: inline-block;
    margin-top: 20px;
}
.menu-list span {
    color: #a2a2a2;
    display: block;
    margin: 15px 0
}
.menu-list i {
    color: #fff;
    font-size: 33px;
    padding: 11px;
    box-shadow: 0px 0px 3px rgb(0 0 0 / 50%);
}
.menu-list i {
    width: 23%;
    height: 23%;
    border-radius: 50%;
}

</style>