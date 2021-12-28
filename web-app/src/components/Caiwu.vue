<template>
    <div class="home">
        <div class="top"><p style="margin-right: 200px;">QQ空间时光轴</p></div>
        <div class="header"></div>
        <div class="container">
            <div class="scrubber" :style="fixed?'position: fixed;top: 60px;left:'+scrubber_left+'px;':''">
                <a href="javascript:;" @click="show_0_0('content_month_0')">现在</a>
                <div v-for="(v,year,i) in dateArr" :key="year">
                    <a href="javascript:;" class="scrubber-year " :class="i==0?'current':''" :ref="'scrubber-year-'+year" @click="show_year(year)">{{year}}</a>
                    <div v-for="(v2,month) in v" :key="year+'-'+month">
                        <a href="javascript:;" class="scrubber-month" :class="'scrubber-month-in-'+year" :ref="'scrubber-month-'+year+'-'+month" @click="show_month(year,month)">{{month}}月</a>
                    </div>
                </div>

                <!-- 展示newlist -->
                <div v-for="(v) in newlist" :key="v.year+'_new'">
                    <a href="javascript:;" class="scrubber-year" :ref="'scrubber-year-'+v.year+'_new'" @click="show_year(v.year+'_new')">{{v.year+'_new'}}</a>
                    <div v-for="(v2) in v.content" :key="v.year+'_new'+'-'+v2.month">
                        <a href="javascript:;" class="scrubber-month" :class="'scrubber-month-in-'+v.year+'_new'" :ref="'scrubber-month-'+v.year+'_new'+'-'+v2.month" @click="show_month(v.year+'_new',v2.month)">{{v2.month}}月</a>
                    </div>
                </div>
                <a href="javascript:;" @click="show_0_0('content_month_0_0')">出生</a>
            </div>
            <div class="content" ref="content">
                
                <div class="content-year" ref="content_month_0">现在</div>
                <div v-for="(v,year) in dateArr" :key="year">
                    <div class="content-year" :ref="'content-year-'+year">{{year}}</div>
                    <div v-for="(v2,month) in v" :key="year+'-'+month" class="clearfloat">
                        <div class="content-month" :ref="'content-month-'+year+'-'+month" :id="'content-month-'+year+'-'+month">{{month}}月</div>
                        <div v-for="(v3,k3) in v2" :key="year+'-'+month+k3">
                            <div class="content-item">
                                <div class="content-item-icon-arrow"></div>
                                <div class="content-item-icon-dot">    
                                    <div class="content-item-icon-dot-child"></div>
                                </div>
                                <div class="content-item-head">
                                    <div class="content-item-head-title">
                                        <div class="content-item-head-title-lunar" v-html="v3.lunar"></div>
                                        {{v3.date}}
                                    </div>
                                    <div class="content-item-head-intro">
                                        <i class="ui-icon qutoe-before"></i>
                                        {{v3.intro}}
                                        <i class="ui-icon qutoe-after"></i>
                                    </div>
                                </div>
                                <div class="content-item-media" v-html="v3.media"></div>
                                <div class="content-item-footer">
                                    <div class="content-item-footer-info">
                                        <a href="javascript:;" title="赞">({{v3.comment}})</a>
                                        <a href="javascript:;" title="评论">({{v3.comment}})</a>
                                    </div>
                                    <div class="content-item-footer-like">{{v3.like_format}}人觉得很赞</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- 展示newlist-content -->
                <div v-for="(v) in newlist" :key="v.year+'_new'">
                    <div class="content-year" :ref="'content-year-'+v.year+'_new'">{{v.year+'_new'}}</div>
                    <div v-for="(v2) in v.content" :key="v.year+'_new'+'-'+v2.month" class="clearfloat">
                        <div class="content-month" :ref="'content-month-'+v.year+'_new'+'-'+v2.month" :id="'content-month-'+v.year+'_new'+'-'+v2.month">{{v2.month}}月</div>
                        <div v-for="(v3,i) in v2.content" :key="v.year+'_new'+'-'+v2.month+i">
                            <div class="content-item">
                                <div class="content-item-icon-arrow"></div>
                                <div class="content-item-icon-dot">    
                                    <div class="content-item-icon-dot-child"></div>
                                </div>
                                <div class="content-item-head">
                                    <div class="content-item-head-title">
                                        <div class="content-item-head-title-lunar" v-html="v3.lunar"></div>
                                        {{v3.date}}
                                    </div>
                                    <div class="content-item-head-intro">
                                        <i class="ui-icon qutoe-before"></i>
                                        {{v3.intro}}
                                        <i class="ui-icon qutoe-after"></i>
                                    </div>
                                </div>
                                <div class="content-item-media" v-html="v3.media"></div>
                                <div class="content-item-footer">
                                    <div class="content-item-footer-info">
                                        <a href="javascript:;" title="赞">({{v3.comment}})</a>
                                        <a href="javascript:;" title="评论">({{v3.comment}})</a>
                                    </div>
                                    <div class="content-item-footer-like">{{v3.like_format}}人觉得很赞</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="content-year" ref="content_month_0_0">出生</div>
            </div>
        </div>
    </div>
</template>
<script>
import Lunar from '../assets/js/datetool.js';// eslint-disable-line no-unused-vars
import Data from '../assets/js/data.js';// eslint-disable-line no-unused-vars
// import { fx } from '../assets/js/action.js';
export default {
    data() {
        return {
            list: Data,
            newlist: [],
            body_w: document.body.offsetWidth,
            body_h: document.body.offsetHeight,
            fixed: 0,
            scrubber_left: 200+(document.body.offsetWidth-960-200>0?(document.body.offsetWidth-960-200)/2:0)
        };
    },
    mounted() {
        this.scrollHandle();
        // 或 监听
        // this.listener();
    },
    beforeDestroy() {
        document.removeEventListener('scroll',this.listener);
    },
    computed: {
        // 计算属性的 getter
        dateArr() {
            // `this` 指向 vm 实例
            /**
             * [
             *      {year:2014,monthArr:[{month:3,lunar:"",like_format:500},{month:3,lunar:"",like_format:500}]},
             *      {year:2014,monthArr:[{month:3,lunar:"",like_format:500}]}
             * ]
             */
            return this.getMonthArr();
        }
    },
    methods: {
        Datetool(date,f){
            return Lunar.toLunar(date,f);
        },
        getMonthArr() {
            let list = {}, data = Data;
            for (let i = 0; i < data.length; i++) {
                let date = new Date(data[i].date);
                let year = date.getFullYear();
                let month = date.getMonth() + 1;
                let lunar = this.Datetool(data[i].date,"d");
                let item = data[i];
                
                item.lunar = lunar[0] + '<br>&nbsp;&nbsp;&nbsp;' + lunar[1];
                item.year = year;
                item.month = month;
                item.like_format = item.like < 10000 ? item.like : ( item.like / 1000 ).toFixed(1) + '万';
                
                if (!list[year]) {
                    list[year] = {}
                }
                if (!list[year][month]) {
                    list[year][month] = []
                }
                list[year][month].push(item);
            }
            // newlist逆序赋值
            let newlist = [];
            for (let k in list) {//2014-k
                let newMonth = [];
                for (let k2 in list[k]) {//3-k2
                    let item2 = {
                        month:k2,
                        content:list[k][k2]
                    };
                    newMonth.unshift(item2);
                }
                let item = {
                    year:k,
                    content:newMonth
                }
                newlist.unshift(item)
            }
            this.newlist = newlist;
            return list;
        },
        show_0_0(el){
            this.scroll_top(this.$refs[el].offsetTop+170)
        },
        get_class(className){
            return document.getElementsByClassName(className);
        },
        // 获得元素的高度
        get_top(el){
            return el.offsetTop+160;
        },
        // 滚动页面到to
        scroll_top(to){
            // let start = document.body.scrollTop || document.documentElement.scrollTop;
            // fx(function (now) {
            //     window.scroll(0, now);
            // },start,to)
            window.scroll(0, to);
        },
        // 年份、月份点击处理
        show_year(year){
            let clickdom = this.$refs['content-year-'+year][0];
            let top = this.get_top(clickdom);
            this.scroll_top(top);
            this.expand_year(year,this.$refs['scrubber-year-'+year][0]);

        },
        show_month(year,month){
            let clickdom = this.$refs['content-month-'+year+'-'+month][0];
            let top = this.get_top(clickdom);
            this.scroll_top(top);

            this.highlight_month(this.$refs['scrubber-month-'+year+'-'+month][0]);
        },
        // 高亮处理 - 月份
        highlight_month(el){
            let months = this.get_class('scrubber-month');   
            for (let i = 0; i < months.length; i++) {
                months[i].className = months[i].className.replace(/current/g,' ');
            }
            el.className = el.className + ' current';            
        },
        // 年份点击展开 高亮处理
        expand_year(year,el){
            let months = this.get_class('scrubber-month');
            let show_months = this.get_class('scrubber-month-in-'+year);
            for (let i = 0; i < months.length; i++) {
                months[i].style.display = 'none';
            }
            for (let i = 0; i < show_months.length; i++) {
                show_months[i].style.display = 'block';
            }
            // 高亮
            let years = this.get_class('scrubber-year');   
            for (let i = 0; i < years.length; i++) {
                years[i].className = years[i].className.replace(/current/g,'');
            }
            el.className = el.className + ' current'; 
        },
        // 页面滚动处理，固定时序菜单的位置、自动展开时序菜单
        scrollHandle(){
            let that = this;
            window.onscroll = function () {
                let top = document.body.scrollTop|| document.documentElement.scrollTop;
                if (top > 200) {
                    that.fixed = 1;
                } else {
                    that.fixed = 0;
                }
                // 自动高亮年月份            
                that.update_scrubber_year(top);
                that.update_scrubber_month(top);
            }
        },
        // 或 增加监听
        listener(){
            document.addEventListener('scroll',this.handleScroll,true);
        },
        handleScroll(){
            let that = this;
            let top = document.body.scrollTop|| document.documentElement.scrollTop;
            if (top > 200) {
                that.fixed = 1;
            } else {
                that.fixed = 0;
            } 
        },
        // 自动展开年份自动高亮月份
        update_scrubber_year(top){
            let years = this.$refs.content.getElementsByClassName('content-year');
            let tops = [];
            for (let i = 0; i < years.length; i++) {
                tops.push(years[i].offsetTop);
            }
            for (let i = 1; i < tops.length; i++) {
                if (top > tops[i-1] && top < tops[i]) {
                    let year = years[i-1].innerHTML;
                    let s_year = this.$refs['scrubber-year-'+year][0]
                    this.expand_year(year,s_year);
                }
                
            }
        },
        update_scrubber_month(top){
            let months = this.$refs.content.getElementsByClassName('content-month');
            let tops = [];
            for (let i = 0; i < months.length; i++) {
                tops.push(months[i].offsetTop);
            }
            for (let i = 1; i < tops.length; i++) {
                if (top > tops[i-1] && top < tops[i]) {
                    let id = months[i-1].id;
                    this.highlight_month(this.$refs[id.replace('content','scrubber')][0])
                }
                
            }
        },
    },
    watch: {
        fixed(newName,oldName){
            console.log('nfixed:'+newName+' ofixed:'+oldName);
        }
    },
    filters: {
        
    }
}
</script>
<style scoped>
.home {
    margin-left: 200px;
    min-height: 100%;
    background: url(../assets/images/body-bg.png) #1c0c0f center no-repeat fixed;
    text-align: left;
}
.top {
    width: 100%;height: 41px;
    position: fixed;top:0px;
    background: #001e3b;
    color: #fff;
    text-align: center;
    z-index: 99;
    box-shadow: 0 1px 0 rgba(0, 0, 0, .2);
}
.header {
    width: 960px;height: 200px;
    margin: 0 auto;
    background: rgba(255, 255, 255, .2);
}
.container {
    width: 960px;
    min-height: 100vh;
    margin: 0 auto;
    position: relative;
    padding-bottom: 20px;
}
.scrubber {
    width: 47px;min-height: 200px;
    position: absolute;
    top: 29px;left: 0px;
    z-index: 999;
    background: rgba(255, 255, 255, .2);
}
.scrubber .scrubber-month {
    display: none;
}
.scrubber a {
    display: block;
    height: 26px;line-height: 26px;font-size: 12px;
    border-right: 2px solid #c8c8c8;
    border-right-color: rgba(200, 200, 200, .5);
    padding-right: 5px;
    color: #a5a5a5;text-decoration: none;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
    text-align: right;
}
.scrubber a:hover, .scrubber a.current {
    border-right-color: #7ebad0;
    color: #7ebad0;
    font-weight: bold;
}
.scrubber a:hover {text-decoration: underline;}
.scrubber a.current:hover {text-decoration: none;}
.content {
    min-height: 1000px;
    background: url(../assets/images/line.png) repeat-y 121px 0;
    padding-top: 50px;padding-left: 160px;
    position: relative;
}

.content-year,.content-month{
    height: 30px;line-height: 30px;color: #a5a5a5;
    text-shadow: 0 1px 1px rgba(0, 0, 0, .3);
    font-weight: bold;font-size: 14px;
    position: relative;left: -90px;
    /* background-color: violet; */
}
.content-item{
    float: left;
    width: 370px;
    min-height: 300px;
    background: #fff;border-radius: 4px;
    margin: 20px 30px 0 0;
    position: relative;
    color: #888;
}
.content-item-icon-arrow{
    position: absolute;
    left: -10px;top: 20px;
    height: 0px;border-color: transparent #fff transparent transparent;
    border-width: 10px 10px 10px 0;
    border-style: dashed solid dashed dashed;
}
.content-item-icon-dot{
    width: 13px;height: 13px;
    border-radius: 13px;
    background: #fff;
    position: absolute;
    left: -43px;top: 25px;
}
.content-item-icon-dot-child{
    width: 7px;height: 7px;
    border-radius: 7px;
    background: #b3dae9;
    position: absolute;
    left: 3px;top: 3px;
}

.content-item-head{
    padding: 15px;
    padding-bottom: 0px;
}
.content-item-head-title{
    height: 46px;line-height: 46px;font-size: 28px;
    padding: 0px 0px 10px 56px;position: relative;
}
.content-item-head-title-lunar{
    width: 46px;height: 46px;background: #b3dae9;border-radius: 8px;
    position: absolute;left: 0px;top: 0px;overflow: hidden;
    color: #fff;font-size: 24px;line-height: 23px;
}
.content-item-head-intro{
    font-size: 14px;line-height: 22px;padding: 0px 15px;margin-bottom: 10px;
}
.content-item-media{}
.content-item-footer{
    padding: 10px 15px;margin: 0px 15px;border-top: 1px solid #d6d6d6;
    font-size: 12px;color: #b2b2b2;line-height: 20px;
}
.content-item-footer-info{}
.content-item-footer-like{
    padding-top: 5px;
}
.content-item-footer-info a {
    color: #b2b2b2;text-decoration: none;padding-right: 10px;display: inline-block;height: 20px;
}
.icon-zan{}
.icon-pin{}
.ui-icon {
    width: 15px;height: 17px;display: inline-block;
    background-repeat: no-repeat;font-size: 0px;overflow: hidden;
    background-image: url(../assets/images/span-bg.png);
    margin-right: 5px; vertical-align: bottom;
}
.qutoe-after{
    background-position: -70px -38px;
}
.qutoe-before{
    background-position: -5px -38px;
}
.hide {
    display: none;
}
</style>