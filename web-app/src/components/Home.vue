<template>
    <div class="home">
        <div class="top">
            <a href="#"><i class="iconfont icontuichu">退出</i></a>
            <div class="top-title">金渡教育欢迎你</div>
        </div>
        <div class="content">
            <div>内容</div>
            <div class="footer">
                <div>2020年11月26号</div>
            </div>
        </div>
    </div>
</template>
<style scoped>
.home{
    width: 100%;
    height: 100%;
    background-color: #f7f7f7;
    margin-left: 200px;
    position: relative;
}
.top{
    background-color: #fff;
    padding: 12px;
}
.top-title {
    font-size: 20px;
    margin-right: 200px;
}
.top i{
    /* float: right; */
    color: #7f8fe8;
    position: absolute;/**绝对定位 */
    right: 200px;
    top: 12px;
}
/* content */
.content {
    margin: 20px 0;
}
/* footer */
.footer {
    width: 100%;
    padding: 20px 0;
    position: absolute;/**绝对定位 */
    bottom: 0;
    left: 0;
    background-color: #fff;
    text-align: center;
}
.footer div {
    margin-right: 200px;
}
</style>