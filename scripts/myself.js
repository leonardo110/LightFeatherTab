document.getElementById('homePage').onclick = () => {
    document.body.scrollTop = 0;
}
document.getElementById('scrollDownIcon').onclick = () => {
    document.body.scrollTop = document.getElementById('welcome').offsetTop;
}
document.getElementById('aboutText').onclick = () => {
    document.body.scrollTop = document.getElementById('tagContent').offsetTop;
}
document.getElementById('moreBtn').onclick = () => {
    document.body.scrollTop = document.getElementById('tagContent').offsetTop;
}
// 卡片3D倾斜平滑
vanillaTiltFunc()

function vanillaTiltFunc () {
    VanillaTilt.init(document.querySelectorAll(".divAll"),{
        max:25, //最大倾斜度数
        speed:300, //倾斜转换的速度
        glare:true,//是否开启眩光效果
        "max-glare":5//最大眩光的不透明度
    })
}