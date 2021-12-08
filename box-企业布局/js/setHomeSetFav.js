// 加入收藏
function AddFavorite(sURL,sTitle){
    try {
        window.external.addFavorite(sURL,sTitle);
    } catch (e) {
        alert("加入收藏失败！")
    }
}
// 设置首页
function SetHome(obj, url) {
    try {
        obj.style.behavior = 'url(#default#homepage)';
        obj.setHomePage(url);
    } catch (error) {
        alert('设置首页失败！')
    }
}