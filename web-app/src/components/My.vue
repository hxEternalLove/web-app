<template>
    <div class="home">
        我的
        <div @click="event" >
            <el-button @click="show = !show">Click Me</el-button>

            <div style="display: flex; margin-top: 20px; height: 100px;">
            <transition name="el-fade-in-linear">
                <div v-show="show" class="transition-box">.el-fade-in-linear</div>
            </transition>
            <transition name="el-fade-in">
                <div v-show="show" class="transition-box">.el-fade-in</div>
            </transition>
            </div>
        </div>
        <el-button @click="show2 = !show2">Click Me</el-button>

        <div style="display: flex; margin-top: 20px; height: 100px;">
        <transition name="el-zoom-in-center">
            <div v-show="show2" class="transition-box">.el-zoom-in-center</div>
        </transition>

        <transition name="el-zoom-in-top">
            <div v-show="show2" class="transition-box">.el-zoom-in-top</div>
        </transition>

        <transition name="el-zoom-in-bottom">
            <div v-show="show2" class="transition-box">.el-zoom-in-bottom</div>
        </transition>
        </div>
    </div>
</template>

<script>
export default {
    data: () => ({
      show: true,
      show2: true
    }),
    comments:{

    },
    computed: {
        sunAmt(){
            return this.show?1:0
        }
    },
    methods: {
        event(e){// `e` 是原生 DOM 事件  e.target.tagName
            console.log(`${e}\n${this.$el}\n${this.$data}`);
        }
    },
    
}
</script>

<style>
  .transition-box {
    margin-bottom: 10px;
    width: 200px;
    height: 100px;
    border-radius: 4px;
    background-color: #409EFF;
    text-align: center;
    color: #fff;
    padding: 40px 20px;
    box-sizing: border-box;
    margin-right: 20px;
  }
</style>