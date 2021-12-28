<template>
    <div class="home">
        <div class="top">
            <a href="#"><i class="iconfont icontuichu">退出</i></a>
            <div class="top-title">金渡教育欢迎你</div>
        </div>
        <div class="main-content">
            <div class="content-count">
                <ul>
                    <li class="count-list">
                        <i class="list-icon iconfont iconqiye"></i>
                        <span>企业管理</span>
                        <p>金渡教育企业管理说明</p>
                        <a href="#">【更多】</a>
                    </li>
                    <li class="count-list">
                        <i class="list-icon iconfont iconcaiwu"></i>
                        <span>财务管理</span>
                        <p>金渡教育企业管理说明</p>
                        <a href="#">【更多】</a>
                    </li>
                    <li class="count-list">
                        <i class="list-icon iconfont iconchanpin"></i>
                        <span>产品管理</span>
                        <p>金渡教育企业管理说明</p>
                        <a href="#">【更多】</a>
                    </li>
                    <li class="count-list">
                        <i class="list-icon iconfont iconorder-copy"></i>
                        <span>订单管理</span>
                        <p>金渡教育企业管理说明</p>
                        <a href="#">【更多】</a>
                    </li>
                </ul>
            </div>
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
    top: 20px;
}
/* content */
.main-content {
    margin: 20px 0;
}
.content-count {
    text-align: left;
}
.count-list {
    width: 35%;
    height: 140px;
    margin: 20px;
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
    box-shadow: 0 0 10px rgb(0 0 0 / 30%);
    display: inline-block;
    position: relative;
}
.main-content .count-list:nth-child(1) .list-icon {
    background: #e64d47;
}
.main-content .count-list:nth-child(2) .list-icon {
    background: #2b96d5;
}
.main-content .count-list:nth-child(3) .list-icon {
    background: #df89c5;
}
.main-content .count-list:nth-child(4) .list-icon {
    background: #ed890f;
}
.count-list .list-icon {
    color: #fff;
    border-radius: 8px;
    padding: 10px;
    text-align: center;
}
.count-list span {
    font-size: 20px;
    font-weight: 700;
    margin: 10px;
}
.count-list p {
    margin: 15px 50px;
}
.count-list a {
    position: absolute;
    bottom: 10px;
    right: 20px;
    text-decoration: none;
    color: #7f8fe8;
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