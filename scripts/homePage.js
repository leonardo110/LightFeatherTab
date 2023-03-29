// 全局变量
var curTime = ''
let musicName = ''
let musicAuther = ''
let musicIdList = []
let upMusicId = ''
let showDialog = false
let backgroundImgUrl = ''
let preBackgroundImgUrl = ''
const musicTypeList = ['热歌榜', '飙升榜', '热歌榜', '原创']
const typeList = [
    {
        key: 'baidu',
        url: '../icons/baidu.png',
        logo: '../icons/baidulogo.svg'
    },
    {
        key: 'bing',
        url: '../icons/bing.png',
        logo: '../icons/binglogo.png'
    },
    {
        key: 'google',
        url: '../icons/google.png',
        logo: '../icons/googlelogo.PNG'
    },
    {
        key: 'Yahoo',
        url: '../icons/yahoo.png',
        logo: '../icons/yahoologo.svg'
    },
    {
        key: '360',
        url: '../icons/360sousuo.png',
        logo: '../icons/360logo.png'
    },
    {
        key: 'sougou',
        url: '../icons/sougou.png',
        logo: '../icons/sougoulogo.png'
    },
    {
        key: 'kaifazhe',
        url: '../icons/kaifazhe.png',
        logo: '../icons/kaifazhelogo.PNG'
    }
]
const imgList = [
    {
        index: 0,
        src: '../icons/firstPhoto.jpeg',
        dis: 'firstPhoto.jpeg'
    },
    {
        index: 1,
        src: '../icons/secondPhoto.jpg',
        dis: 'secondPhoto.jpg'
    },
    {
        index: 2,
        src: '../icons/thirdPhoto.jpg',
        dis: 'thirdPhoto.jpg'
    },
    {
        index: 3,
        src: '../icons/fourPhoto.jpg',
        dis: 'fourPhoto.jpg'
    }
]
const cardUrlList = [
    'http://iqiyi.com',
    'https://taobao.com',
    'https://bilibili.com',
    'https://jd.com',
    'https://y.qq.com',
    'https://music.163.com',
    'https://v.qq.com',
    'https://douyin.com',
    'https://zhihu.com',
    'https://youtube.com'
]
// 动画效果
const animationList = ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'flip', 'hinge', 'jackInTheBox', 'rollIn']
// 时间实时展示、初始化计算星期数
showNameFunc()
// 初始化注册各种鼠标事件和监听事件
registFunc()
// 查天气
// getDataInfo('https://api.vvhan.com/api/weather', 'weather')
// 预加载一张背景图
loadPhoto()
// 查诗词
getDataInfo('https://v1.hitokoto.cn/?c=i&encode=json', 'poem')
// 加载樱花特效
loadSakuraScript();
// 背景毛玻璃效果
backgroundGlass()
// 加载音乐播放器
loadMusicScript()
// 是否显示诗词
showPoemFunc()
// 切换输入法更改图标
handlerInputMethod()
// 输入框圆角
borderRadiusChange()
// 本地图片上传
uploadImg()
// 初始化需要需要做的功能
createFunc()
// 卡片3D倾斜平滑
vanillaTiltFunc('.navBarCard')
// 注册主题点击事件
setTheme()

// 初始化注册各种鼠标事件
function registFunc () {
    // 跳转至插件地址
    getEleById('addonsHref').onclick =() => {
        window.open('https://microsoftedge.microsoft.com/addons/detail/轻羽标签页/dcnpfefcbpeggaajgeffehpckpdjpckd', '_blank')
    }
    // 切换提示方式
    getEleById('noticeCss').onchange = (e) => {
        handlerStorage('tipMode', e.target.value)
        if (e.target.value === 'notice') {
            Notification.requestPermission();
            popTip('已切换为 浏览器通知 方式')
        } else {
            popTip('已切换为 弹窗提示 方式')
        }
    }
    // 下载壁纸
    getEleById('downloadPhoto').onclick = () => {
        const viewFlag = handlerStorage('viewFlag') || 'true'
        downloadIamge(viewFlag === 'true' ? '#preBackGroundImg' : '#backGroundImg')
    }
    // 清空聊天窗口内容
    getEleById('cleargptCss').onclick = () => {
        // 清空临时会话数据
        handlerStorage('clearGpt', true)
        // 获取iframe元素对象
        var iframe = document.getElementById("gptIframe");
        // 获取iframe的contentWindow对象
        var iframeWindow = iframe.contentWindow;
        // 获取iframe内部的文档对象
        var iframeDocument = iframeWindow.document;
        // 通过文档对象的getElementById()等方法获取子页面的元素dom
        var element = iframeDocument.getElementsByClassName("container")[0];
        // 清空聊天窗口内容
        element.innerHTML = ''
    }
    // 打开chatgpt窗口
    getEleById('chatgptBtn').onclick = () => {
        handlerStorage('clearGpt', false)
        getEleById('chatgptDialog').style.display = 'block'
        closeView()
        setTimeout(() => {
            changeGPT_height()
        }, 0)
    }
    window.addEventListener('resize', () => {
        changeGPT_height()
    });

    // 关闭chatgpt窗口
    getEleById('dialogDelete').onclick = () => {
        getEleById('chatgptDialog').style.display = 'none'
    }
    // 关闭日志弹框
    getEleById('logDialogDelete').onclick = () => {
        getEleById('appDialog').style.display = 'none'
        if (showDialog) {
            getEleById('mask').style.opacity = 0.3
        }
        showDialog = false
    }
    // 打开日志
    getEleById('updateLog').onclick = () => {
        getEleById('appDialog').style.display = 'block'
        getEleById('mask').style.opacity = 0.6
        showDialog = true
    }
    // 遮罩层点击事件
    getEleById('mask').onclick = () => {
        if (!showDialog) {
            closeView()
        }
    }
    // 输入框查询
    getEleById('sousuoDiv').onclick = () => {
        searchText()
    }
    // 输入框键盘enter事件
    getEleById('inputStr').onkeyup = (event) => {
        if (event.keyCode === 13) {
            searchText(event.target.value)
        }
    }
    // 选中查询类型时
    getEleById('searchTypeDiv').onclick = () => {
        const curVal = getEleById('typeSelect')
        curVal.style.display = 'block'
        const eventFunc = getEleByClass('selectCss')
        for (let b = 0; b < eventFunc.length; b++) {
            eventFunc[b].onclick = (e) => {
                getEleById('typeSelect').style.display = 'none'
                getEleByClass('typeIcon')[0].src = typeList[b].logo
                handlerStorage('searchType', typeList[b].key)
                // 切换输入法更改图标
                handlerInputMethod(handlerStorage('searchType'))
            }
        }
    }
    // 鼠标移入输入框时
    getEleById('inputStr').onmouseenter = () => {
        //判断是否展示删除图标
        let deleteIconDom = getEleById('deleteIcon')
        if (getEleById('inputStr').value) {
            deleteIconDom.style.display = 'block'
            deleteIconDom.onclick = () => {
                getEleById('inputStr').value = ''
            }
        }
    }
    // 鼠标移出输入框时
    getEleById('searchTab').onmouseleave = () => {
        getEleById('deleteIcon').style.display = 'none'
    }
    // 输入框聚焦时展示历史搜索记录、判断是否展示删除图标
    getEleById('inputStr').onfocus = (event) => {
        getEleById('typeSelect').style.display = 'none'
        getEleById('searchTab').style.opacity = 1
        setTimeout(() => {
            if (handlerStorage('historyCheck') === 'true') {
                let xx = getEleById('searchHistory')
                if (xx.style.display !== 'block') {
                    getEleById('searchHistory').style.display = 'block'
                    showHistory(event.target.value)
                }
            }
        }, 0);
    }
    // 输入框离焦时隐藏历史搜索记录下拉框
    getEleById('inputStr').onblur = (event) => {
        setTimeout(() => {
            getEleById('searchHistory').style.display = 'none'
            getEleById('deleteIcon').style.display = 'none'
        }, 100)
    }
    // 输入框改变事件
    getEleById('inputStr').oninput = (event) => {
        if (handlerStorage('historyCheck') === 'true') {
            showHistory(event.target.value)
        }
        let deleteIconDom = getEleById('deleteIcon')
        if (event.target.value) {
            // 展示删除图标
            deleteIconDom.style.display = 'block'
            deleteIconDom.onclick = () => {
                getEleById('inputStr').value = ''
            }
        } else {
            deleteIconDom.style.display = 'none'
        }
    }
    // 移入时展示诗词标题和作者
    getEleById('poemContent').onmouseenter = () => {
        getEleById('poemTitle').style.display = 'block'
        getEleById('author').style.display = 'block'
    }
    // 移出时隐藏诗词标题和作者
    getEleById('poemContent').onmouseleave = () => {
        getEleById('poemTitle').style.display = 'none'
        getEleById('author').style.display = 'none'
    }
    // 点击诗词标题查看该诗词全部内容
    getEleById('poemTitle').onclick = (event) => {
        let newStr = getEleById('jinrishici-sentence').innerText
        newStr = newStr.replaceAll('♫ ', '').replaceAll('♪', '')
        window.open('https://www.baidu.com/s?ie=UTF-8&wd=' + newStr, '_blank')
    }
    // 点击作者名称查询百度百科
    getEleById('author').onclick = (event) => {
        const newStr = event.target.textContent
        window.open('https://baike.baidu.com/item/' + newStr, '_blank')
    }
    // 移入时展示音乐播放器
    getEleById('gifDom').onmouseenter = () => {
        showMusicDom()
        // 展示暂停还是播放图标
        const audio = getEleByTag("audio")[0]
        if (!audio.paused) {
            getEleById('startIcon').style.display = 'block'
        } else {
            getEleById('pauseIcon').style.display = 'block'
            getEleById('pauseIcon').style.visibility = 'visible'
        }
        
    }
    // 移出音乐区域时，隐藏播放器
    getEleById('music').onmouseleave = () => {
        getEleById('audioDom').style.display = 'none'
        getEleById('randomMusic').style.display = 'none'
        // getEleById('startIcon').style.display = 'none'
        // getEleById('pauseIcon').style.display = 'none'
    }
    getEleById('musicDom').onmouseleave = () => {
        getEleById('startIcon').style.display = 'none'
        getEleById('pauseIcon').style.display = 'none'
        getEleById('pauseIcon').style.visibility = 'hidden'
    }
    // 点击上一首
    getEleById('musicSvgCssUp').onclick = () => {
        if (musicIdList.length === 0) {
            window.alert('没有历史听歌记录')
        } else {
            const str = 'https://api.vvhan.com/api/rand.music?type=json&sort=' + musicIdList[0]
            getDataInfo(str, 'music')
        }
    }
    // 点击下一首
    getEleById('musicSvgCssNext').onclick = () => {
        upMusicId && musicIdList.unshift(upMusicId)
        getRandomMusic()
    }
    // 播放 点击事件
    getEleById('startIcon').onclick = () => {
        const audio = getEleByTag("audio")[0]
        audio.pause()
        getEleById('startIcon').style.display = 'none'
        getEleById('pauseIcon').style.display = 'block'
        getEleById('pauseIcon').style.visibility = 'visible'
    }
    // 暂停 点击事件
    getEleById('pauseIcon').onclick = () => {
        const audio = getEleByTag("audio")[0]
        audio.play()
        getEleById('pauseIcon').style.display = 'none'
        getEleById('startIcon').style.display = 'block'
    }
    // 暂停图标移入事件
    getEleById('pauseIcon').onmouseenter = () => {
        showMusicDom()
    }
    // 播放图标移入事件
    getEleById('startIcon').onmouseenter = () => {
        showMusicDom()
    }
    // 设置图标点击事件
    getEleById('shezhiIcon').onclick = () => {
        getEleById('shezhiView').style.display = 'block'
        setTimeout(() => {
            const dom = getEleById('glassRange')
            dom.value = handlerStorage('glassCheck') || 10
            const rangeDom = getEleById('inputRange')
            rangeDom.value = handlerStorage('inputRangeVal') || 20
            const searchTab = getEleById('searchTab')
            searchTab.style.zIndex = -1
            const typeDom = getEleById('typeSelect')
            typeDom.style.zIndex = -1
            setTimeout(() => {
                const maskDom = getEleById('mask')
                maskDom.style.opacity = 0.3
            }, 350)
            const length = getEleByClass('jingtaiImg').length
            for (let v = 0; v < length; v++) {
                getEleByClass('jingtaiImg')[v].onclick = () => {
                    // const title = getItem(getEleByClass('jingtaiImg')[v].src).title
                    imgHandler(getEleByClass('jingtaiImg')[v].src, '')
                    getEleByClass('greenRight')[v].style.zIndex = 1
                    getEleByClass('imgBack')[v].style.filter = 'blur(1px)'
                    for (let y = 0; y < length; y++) {
                        if (y !== v) {
                            getEleByClass('greenRight')[y].style.zIndex = -1
                            getEleByClass('imgBack')[y].style.filter = ''
                        }
                    }
                    const imgObj = {
                        url: getEleByClass('jingtaiImg')[v].src,
                        title: ''
                    }
                    handlerStorage('imgObj', JSON.stringify(imgObj))
                    turnPhoto()
                }
            }
            // 是否弹出问候语
            let greetDom = getEleById('greetingCss')
            if (greetDom) {
                // 赋值给问候输入框
                greetDom.value = handlerStorage('greetContent')
                greetDom.onblur = (event) => {
                    handlerStorage('greetContent', event.target.value)
                }
            }
            getEleById('navBar').style.zIndex = -1
            initTheme()
        }, 0);
    }
    // 监听歌曲播放完的回调事件
    getEleByTag("audio")[0].addEventListener('ended', function () {
        getRandomMusic()
    }, false);
    // 监听歌曲暂停回调事件
    getEleByTag("audio")[0].addEventListener('pause', function () {
        getEleById('startIcon').style.display = 'none'
        getEleById('pauseIcon').style.display = 'block'
        getEleById('pauseIcon').style.visibility = 'visible'
    }, false);
    // 监听歌曲播放回调事件
    getEleByTag("audio")[0].addEventListener('play', function () {
        getEleById('pauseIcon').style.display = 'none'
        getEleById('startIcon').style.display = 'block'
    }, false);
    // 跳转个人主页
    getEleById('myself').onclick =()=> {
        window.open('./myself.html', '_blank')
    }
    // 显示快捷卡片
    let cardCheck = getEleById('checkCard')
    if (cardCheck) {
        cardCheck.onclick = () => {
            const cardDom = getEleById('navBar')
            if (getEleById('checkCard').checked) {
                handlerStorage('cardCheck', true)
                cardDom.style.visibility = 'visible'
                setCardUrl()
            } else {
                handlerStorage('cardCheck', false)
                cardDom.style.visibility = 'hidden'
            }
        }
        // check事件
        cardCheck.checked = handlerStorage('cardCheck') === 'true'
    }
    // 是否显示标题
    let titleDom = getEleById('checkTitle')
    if (titleDom) {
        titleDom.onclick = () => {
            if (getEleById('checkTitle').checked) {
                handlerStorage('titleCheck', true)
            } else {
                handlerStorage('titleCheck', false)
            }
            // 切换输入法更改图标
            handlerInputMethod()
            showNameFunc()
        }
        // check事件
        titleDom.checked = handlerStorage('titleCheck') === 'true'
    }
    // 樱花特效开关
    let sakuraDom = getEleById('checkSakura')
    if (sakuraDom) {
        sakuraDom.onclick = () => {
            if (getEleById('checkSakura').checked) {
                handlerStorage('sakuraCheck', true)
            } else {
                handlerStorage('sakuraCheck', false)
            }
            loadSakuraScript()
        }
        // check事件
        sakuraDom.checked = handlerStorage('sakuraCheck') === 'true'
    }
    // 是否显示诗词
    let poemDom = getEleById('checkPoem')
    if (poemDom) {
        poemDom.onclick = () => {
            if (getEleById('checkPoem').checked) {
                handlerStorage('poemCheck', true)
            } else {
                handlerStorage('poemCheck', false)
            }
            showPoemFunc()
        }
        // check事件
        poemDom.checked = handlerStorage('poemCheck') === 'true'
    }
    // 音乐开关
    let musicDom = getEleById('checkMusic')
    if (musicDom) {
        getEleById('checkMusic').onclick = () => {
            if (getEleById('checkMusic').checked) {
                handlerStorage('musicCheck', true)
            } else {
                handlerStorage('musicCheck', false)
            }
            loadMusicScript()
        }
        musicDom.checked = handlerStorage('musicCheck') === 'true'
    }
    // 毛玻璃效果开关
    let glassDom = getEleById('glassRange')
    if (glassDom) {
        getEleById('glassRange').oninput = (event) => {
            handlerStorage('glassCheck', getEleById('glassRange').value)
            backgroundGlass(event)
        }
    }
    // 圆角输入框改变事件
    let rangeInputDom = getEleById('inputRange')
    if (rangeInputDom) {
        getEleById('inputRange').oninput = (event) => {
            handlerStorage('inputRangeVal', getEleById('inputRange').value)
            borderRadiusChange(event)
        }
    }
    // 历史记录开关
    let historyDom = getEleById('checkHistory')
    if (historyDom) {
        getEleById('checkHistory').onclick = () => {
            if (getEleById('checkHistory').checked) {
                handlerStorage('historyCheck', true)
            } else {
                handlerStorage('historyCheck', false)
            }
        }
        historyDom.checked = handlerStorage('historyCheck') === 'true'
    }
    // 更换背景图
    let photoDom = getEleById('checkPhoto')
    if (photoDom) {
        getEleById('checkPhoto').onclick = () => {
            handlerStorage('imgObj', null)
            getEleById('downloadPhoto').style.display = 'inline-block'
            // 清除掉选中效果
            const length = getEleByClass('jingtaiImg').length
            for (let y = 0; y < length; y++) {
                getEleByClass('greenRight')[y].style.zIndex = -1
                getEleByClass('imgBack')[y].style.filter = ''
            }
            getDataInfo('https://api.vvhan.com/api/bing?type=json&rand=sj', 'img');
            // turnPhoto()
        }
    }
    // 是否新标签页打开
    let newTabDom = getEleById('checkNewTab')
    if (newTabDom) {
        getEleById('checkNewTab').onclick = () => {
            if (getEleById('checkNewTab').checked) {
                handlerStorage('newTabCheck', true)
            } else {
                handlerStorage('newTabCheck', false)
            }
        }
        newTabDom.checked = handlerStorage('newTabCheck') === 'true'
    }
    // 默认查询类型
    let searchDom = getEleById('selectCss')
    if (searchDom) {
        searchDom.onchange = () => {
            handlerStorage('searchType', searchDom.value)
        }
        searchDom.value = handlerStorage('searchType')
    }
    if (!handlerStorage('searchType')) {
        handlerStorage('searchType', 'baidu')
    }
}
function updateVersionTip () {
    const version = handlerStorage('version')
    const mode = handlerStorage('tipMode') || 'pop'
    if (!version) {
        popTip("插件已更新至" + (mode === 'pop' ? "<span class='versionNum'>v1.1.4</span>" : " v1.1.4") + "版本", 5000)
        handlerStorage('version', true)
    }
}
// 下载壁纸
function downloadIamge() {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    // crossorigin 是HTML5中新增的<img>标签属性
    //　crossorigin属性有两个值可选：
    //anonymous:如果使用这个值的话就会在请求中的header中的带上origin属性，但请求不会带上cookie和其他的一些认证信息。
    //use-credentials:这个同时会在跨域请求中带上cookie和其他的一些认证信息。在使用这两个值时都需要server端在response的header中带上Access-Control-Allow-Credentials属性。可以通过server的配置文件来开启这个属性：server开启Access-Control-Allow-Credentials
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = document.createElement('canvas')
        canvas.width = image.width
        canvas.height = image.height

        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        // 生成一个a元素
        var a = document.createElement('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = '壁纸'
        // 将生成的URL设置为a.href属性
        a.href = url

        // 触发a的单击事件
        a.dispatchEvent(event);
    }
    if (handlerStorage('viewFlag') === 'false') {
        if (!preBackgroundImgUrl) {
            image.src = backgroundImgUrl
        } else {
            image.src = preBackgroundImgUrl
        }
    } else {
        image.src = backgroundImgUrl
    }
    // image.src = handlerStorage('viewFlag') === 'false' ? preBackgroundImgUrl : backgroundImgUrl
}
/**
 * 主题设置
 */
function setTheme () {
    const cardDomList = getEleByClass('cardSet')
    for(let v = 0;v < cardDomList.length; v++) {
        const temp = cardDomList[v]
        temp.onclick = () => {
            if (v === 0) {
                handlerStorage('theme', 'default')
            } else if (v === 1) {
                handlerStorage('theme', 'lucency')
            } else {
                handlerStorage('theme', 'gradient')
            }
            initTheme()
        }
    }
}

// 初始化主题选中
function initTheme () {
    const themeVal = handlerStorage('theme') || 'default'
    const iconDom = getEleById('selectIcon')
    let shezhiView = getEleById('shezhiView')
    const themeCardDiv = getEleByClass('themeCardDiv')[0]
    // const noticeCardDiv = getEleByClass('noticeCardDiv')[0]
    const shezhiCard = getEleByClass('shezhiCard')
    const btnHoverCss = getEleByClass('btnHoverCss')
    // tip图标
    getEleById('showTipIcon1').style.display = themeVal === 'default' ? 'none' : 'inline-block'
    getEleById('showTipIcon2').style.display = themeVal === 'default' ? 'inline-block' : 'none'
    getEleById('showTipIcon3').style.display = themeVal === 'default' ? 'none' : 'inline-block'
    getEleById('showTipIcon4').style.display = themeVal === 'default' ? 'inline-block' : 'none'
    // 切换字体颜色防止刺眼
    getEleById('myselfBlue').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    getEleById('updateLog').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    getEleById('addonsHref').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    if (themeVal === 'default') {
        themeCardDiv.style.backgroundColor = 'white'
        // noticeCardDiv.style.backgroundColor = 'white'
        for (let a = 0; a < shezhiCard.length; a++) {
            shezhiCard[a].style.backgroundColor = 'white'
        }
        for (let b = 0; b < btnHoverCss.length; b++) {
            btnHoverCss[b].style.border = '1px solid #409eff'
            btnHoverCss[b].style.color = '#409eff'
            btnHoverCss[b].style.background = 'white'
        }
        iconDom.style.left = '52px'
        iconDom.style.bottom = '35px'
        shezhiView.style['backdrop-filter'] = ''
        shezhiView.style.backgroundColor = 'rgb(239 245 252)'
        shezhiView.style.color = '#787878'
        shezhiView.removeAttribute('class', 'thirdTheme')
    } else {
        themeCardDiv.style.backgroundColor = ''
        // noticeCardDiv.style.backgroundColor = ''
        for (let a = 0; a < shezhiCard.length; a++) {
            shezhiCard[a].style.backgroundColor = ''
        }
        for (let b = 0; b < btnHoverCss.length; b++) {
            btnHoverCss[b].style.border = '1px solid white'
            btnHoverCss[b].style.color = 'white'
            btnHoverCss[b].style.background = 'rgba(0,0,0,0)'
        }
        shezhiView.style.backgroundColor = ''
        shezhiView.style.color = 'white'
        if (themeVal === 'lucency') {
            iconDom.style.left = '157px'
            iconDom.style.bottom = '34px'
            shezhiView.style['backdrop-filter'] = 'blur(25px)'
            shezhiView.removeAttribute('class', 'thirdTheme')
        } else {
            iconDom.style.left = '262px'
            iconDom.style.bottom = '36px'
            shezhiView.style['backdrop-filter'] = ''
            shezhiView.setAttribute('class', 'thirdTheme')
        }
    }
}
// 优化gpt聊天窗口高度自适应问题
function changeGPT_height () {
    const height = document.querySelector('#chatgptDialog').offsetHeight
    if (height !== 0) {
        const newHeight = height - 90
        // 获取iframe元素对象
        var iframe = document.getElementById("gptIframe");
        // 获取iframe的contentWindow对象
        var iframeWindow = iframe.contentWindow;
        // 获取iframe内部的文档对象
        var iframeDocument = iframeWindow.document;
        // 通过文档对象的getElementById()等方法获取子页面的元素dom
        var element = iframeDocument.getElementsByClassName("gptMain")[0];
        element.style.height = (0.96 * newHeight) + 'px'
    }
}
/**
 * 关闭遮罩和设置
 */
function closeView () {
    getEleById('shezhiView').style.display = 'none'
    getEleById('typeSelect').style.display = 'none'
    getEleById('mask').style.opacity = 0.3
    const maskDom = getEleById('mask')
    maskDom.style.opacity = 0
    const searchTab = getEleById('searchTab')
    searchTab.style.zIndex = 1
    const typeDom = getEleById('typeSelect')
    typeDom.style.zIndex = 1
    getEleById('navBar').style.zIndex = 0
}

/**
 * 初始化
 */
function createFunc () {
    // 默认查询类型
    if (handlerStorage('searchType')) {
        getEleByClass('typeIcon')[0].src = getValue(handlerStorage('searchType')).logo
    } else {
        getEleByClass('typeIcon')[0].src = '../icons/baidulogo.svg'
    }
    // 默认打开新标签页
    if (!handlerStorage('newTabCheck')) {
        handlerStorage('newTabCheck', true)
    }
    // 初始化是否显示问候语
    setTimeout(() => {
        const greetVal = handlerStorage('greetContent')
        if (greetVal) {
            popTip((new Date().getHours() < 12 ? '上午好, ' : new Date().getHours() < 20 ? '下午好，' : '晚上好，') + greetVal)
        }
        // 版本更新提醒
        updateVersionTip()
    }, 500)
    // 是否显示快捷卡片
    if (handlerStorage('cardCheck') === 'true') {
        getEleById('navBar').style.visibility = 'visible'
        setCardUrl()
    } else {
        getEleById('navBar').style.visibility = 'hidden'
    }
    // 初始化 提示方式
    const mode = handlerStorage('tipMode') || 'pop'
    getEleById('noticeCss').value = mode
}

// 初始化快捷卡片路径
function setCardUrl () {
    setTimeout(() => {
        const cardDom = getEleByClass('navBarCard')
        for (let x = 0; x < cardDom.length; x++) {
            cardDom[x].onclick = () => {
                window.open(cardUrlList[x], '_blank')
            }
        }
        // const addDom = getEleById('navBarCardAdd')
        // addDom.onclick = () => {
        //     getEleById('searchTab').style.zIndex = -1
        //     getEleById('typeSelect').style.zIndex = -1
        //     getEleById('navBar').style.zIndex = -1
        //     getEleById('mask').style.opacity = 0.3
        // }
    }, 0)
}

function vanillaTiltFunc (item, num) {
    VanillaTilt.init(document.querySelectorAll(item),{
        max:num || 25, //最大倾斜度数
        speed:300, //倾斜转换的速度
        glare:true,//是否开启眩光效果
        "max-glare":1//最大眩光的不透明度
    })
}

// 查询类型切换
function handlerInputMethod () {
    const flag = handlerStorage('titleCheck')
    if (flag === 'false' || flag === null) {
        let newVal = handlerStorage('searchType')
        if (!newVal) {
            newVal = 'baidu'
        }
        let temp = typeList.find(item => item.key === newVal || item.value === newVal)
        let index = Math.floor(Math.random() * animationList.length)
        animateCSS('#iconqingyu', animationList[index]);
        getEleById('iconqingyu').src = temp.url
    }
}

// 切换动画
function animateCSS (element, animation, prefix = 'animate__') {
  // We create a Promise and return it
  new Promise((resolve, reject) => {
    const animationName = `${prefix}${animation}`;
    const node = document.querySelector(element);

    node.classList.add(`${prefix}animated`, animationName);
    node.classList.add('animate__delay-0.3s');

    // When the animation ends, we clean the classes and resolve the Promise
    function handleAnimationEnd(event) {
      event.stopPropagation();
      node.classList.remove(`${prefix}animated`, animationName);
      resolve('Animation ended');
    }

    node.addEventListener('animationend', handleAnimationEnd, {once: true});
  });
}
// 初始化调用 注册监听
function uploadImg () {
    const fileReader = new FileReader();
    fileReader.addEventListener('loadend', function() {
        // 生成base64地址存储
        var newimgdata = fileReader.result;
        imgHandler(newimgdata, '')
        turnPhoto()
        // 生成blob地址
        // const blobUrl = dataURLtoBlob(newimgdata)
        localStorage.setItem('imgObj', JSON.stringify({
            url: newimgdata,
            title: ''
        }))
        // 清除选中效果
        const length = getEleByClass('jingtaiImg').length
        for (let y = 0; y < length; y++) {
            getEleByClass('greenRight')[y].style.zIndex = -1
            getEleByClass('imgBack')[y].style.filter = ''
        }
    })
    // 使用blob对象文件流(暂时弃用)
    // var eleFile = document.getElementById('inputFile');
    // eleFile.addEventListener('change', function() {
    //     var file = this.files[0];                
    //     // 确认选择的文件是图片                
    //     if(file.type.indexOf("image") == 0) {
    //         var newimgdata = createObjectURL(file);
    //         imgHandler(newimgdata, '')
    //         turnPhoto()
    //         // 生成blob地址
    //         // const blobUrl = dataURLtoBlob(newimgdata)
    //         localStorage.setItem('imgObj', JSON.stringify({
    //             url: newimgdata,
    //             title: ''
    //         }))
    //     }
    // });
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        var file = this.files[0];
        if (file.type.indexOf("image") === -1) {
            popTip('请上传图片类型')
            return
        }
        const num = file.size / 1024 / 1024
        if (num > 5) {
            popTip('请上传小于5M的图片')
            return
        }
        fileReader.readAsDataURL(file);
    });
}

function createObjectURL (blob){
    return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
};

function imgHandler(url, title) {
    const preBgImg = getEleById('preBackGroundImg');
    const prePhotoPos = getEleById('prePhotoPosition');
    const bgImg = getEleById('backGroundImg');
    const photoPos = getEleById('photoPosition');
    const viewFlag = handlerStorage('viewFlag') || 'true'

    const bgImgElem = viewFlag === 'true' ? preBgImg : bgImg;
    const photoPosElem = viewFlag === 'true' ? prePhotoPos : photoPos;
    
    bgImgElem.style.backgroundImage = `url(${url})`;
    photoPosElem.innerText = `拍摄于: ${title}`;
    bgImgElem.style.backgroundSize = 'cover';
}


// 更换图片
function turnPhoto() {
    const img1 = getEleById('backGroundImg');
    const img2 = getEleById('preBackGroundImg');
    const footer1 = getEleById('photoPosition');
    const footer2 = getEleById('prePhotoPosition');
    const brief = getEleByClass('brief')[0];
    const viewFlag = handlerStorage('viewFlag') || 'true'
    if (viewFlag === 'true') {
        img1.style.width = 0;
        img1.style.height = 0;
        img2.style.width = '100%';
        img2.style.height = '100%';
        img2.style.backgroundSize = 'cover';
        footer1.style.display = 'none';
        footer2.style.display = 'inline-block';
        brief.style.display = footer2.innerText.endsWith(')') ? 'inline-block' : 'none';
        handlerStorage('viewFlag', false)
    } else {
        img1.style.width = '100%';
        img1.style.height = '100%';
        img2.style.width = 0;
        img2.style.height = 0;
        img1.style.backgroundSize = 'cover';
        footer1.style.display = 'inline-block';
        footer2.style.display = 'none';
        brief.style.display = footer1.innerText.endsWith(')') ? 'inline-block' : 'none';
        handlerStorage('viewFlag', true)
    }
}


// Base64 转 Blob
function dataURLtoBlob(dataurl) {
    var arr = dataurl.split(','); //分割为数组，分割到第一个逗号
    let mime = arr[0].match(/:(.*?);/)[1];//获取分割后的base64前缀中的类型
    let bstr = window.atob(arr[1]);
    let n = bstr.length;
    let u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    /** 
     *  第二种转换方法
     * 
     *  var binary = atob(url.split(',')[1]);
        var bytes = new Uint8Array(binary.length);
        for (var i = 0; i < binary.length; i++) {
            bytes[i] = binary.charCodeAt(i);
        }
        var arrayBufferWithPNG = bytes.slice().buffer;
     */
    return new Blob([u8arr], { type: mime });
}

// 旧Blob地址 转 新blob地址
function blobToDataURL(blobUrl, callback) {
    const blobObj = new Blob([blobUrl], {type: "image/*"});
    let a = new FileReader();
    a.onload = function (e) {
        const blobObj = dataURLtoBlob(e.target.result)
        const newBlobUrl = createObjectURL(blobObj)
        return newBlobUrl
    }
    a.readAsDataURL(blobObj);
}

// 弹出提示
function popTip (tip, time=3000) {
    const tipMode = handlerStorage('tipMode') || 'pop'
    if (tipMode === 'pop') {
        const tempDom = getEleById('alertTip')
        tempDom.style.display = 'block'
        tempDom.innerHTML = tip
        setTimeout(() => {
            tempDom.style.display = 'none'
        }, time)
    } else {
        Notification.requestPermission();
        new Notification('', {
            // image: "../icons/binglogo.png",
            body: tip,
            // body：通知的内容。
            // tag：代表通知的一个识别标签，相同tag时只会打开同一个通知窗口。
            // icon：要在通知中显示的图标的URL。
            // image：要在通知中显示的图像的URL。
            // data：想要和通知关联的任务类型的数据。
            // requireInteraction：通知保持有效不自动关闭，默认为false。
        });
    }
}

// 根据查询类型去搜索
function searchText (e) {
    const type = handlerStorage('searchType') || 'baidu'
    const newTab = handlerStorage('newTabCheck') === 'true' ? '_blank' : '_self'
    const curVal = e?.target?.value || getEleById('inputStr').value
    if (type === 'baidu') {
        window.open('http://www.baidu.com/s?wd=' + curVal, newTab)
    } else if (type === 'bing') {
        window.open('https://cn.bing.com/search?q=' + curVal, newTab)
    } else if (type === 'google') {
        window.open('https://www.google.com/search?q=' + curVal, newTab)
    } else if (type === 'Yahoo') {
        window.open('https://hk.search.yahoo.com/search?q=' + curVal, newTab)
    } else if (type === '360') {
        window.open('https://www.so.com/s?ie=utf-8&q=' + curVal, newTab)
    } else if (type === 'sougou') {
        window.open('https://www.sogou.com/web?query=' + curVal, newTab)
    } else if (type === 'kaifazhe') {
        window.open('https://kaifa.baidu.com/searchPage?module=SEARCH&wd=' + curVal, newTab)
    }
    let historyList = JSON.parse(handlerStorage('historyList')) || []
    if (curVal && !historyList.includes(curVal)) {
        historyList.unshift(curVal)
        handlerStorage('historyList', JSON.stringify(historyList))
    }
}

// 根据对应查询类型获取对应数据
function getValue (curVal) {
    // 查找符合条件的元素
    let temp = typeList.find(item => item.key === curVal)
    // 如果没有找到，返回undefined
    if (!temp) return undefined
    // 根据flag返回对应的属性值
    return temp
}

// 控制显示诗词
function showPoemFunc () {
    const showPoem = handlerStorage('poemCheck')
    const poemDom = getEleById('poemContent')
    if (showPoem === 'true') {
        poemDom.style.display = 'block'
    } else {
        poemDom.style.display = 'none'
    }
}

// 判断显示哪一种标题
function showNameFunc () {
    const timeStyle = getEleById('showTime').style
    const tabStyle = getEleById('showTabName').style
    const searchStyle = getEleById('searchHistory').style
    const showTabName = getEleById('showTabName').style
    if (handlerStorage('titleCheck') === 'true') {
        calcTime()
        timeStyle.display = 'block'
        tabStyle.display = 'none'
        searchStyle.top = '70px'
    } else {
        timeStyle.display = 'none'
        tabStyle.display = 'block'
        searchStyle.top = '80px'
        showTabName.paddingTop = '20px'
    }
}

// 展示右侧播放栏
function showMusicDom () {
    getEleById('audioDom').style.display = 'block'
    getEleById('audioDom').style.zIndex = 1;
    getEleById('randomMusic').style.display = 'block'
    getEleById('randomMusic').style.zIndex = 2;
    getEleById('musicName').innerText = musicName + ' - ' + musicAuther
}

// 背景图加载
function loadPhoto () {
    const img = handlerStorage('imgObj')
    if (img && img !== 'null') {
        const imgObj = JSON.parse(img)
        const url = imgObj.url
        // base64转新的blob地址(当前为本地上传的图片处理)
        if (url.indexOf('data:image') !== -1) {
            var newBlob = dataURLtoBlob(url)
            var blob = new Blob([newBlob], {type: "image/*"});
            var newUrl = URL.createObjectURL(blob);
            imgHandler(newUrl, '')
            turnPhoto()
        } else {
            // 选中静态的 或者 随机图片 加载的处理
            getEleById('backGroundImg').style.background = "url(" + imgObj.url +")";
            getEleById('backGroundImg').style.backgroundSize = "cover";
            if (!imgObj.title) {
                getEleById('prePhotoPosition').innerText = ''
                getEleById('downloadPhoto').style.display = 'none'
            } else {
                getEleById('photoPosition').innerText = '拍摄于: ' + imgObj.title
            }
            // 如果是静态，则选中(效果)
            if (imgObj.url.indexOf('chrome-extension') !== -1) {
                const index = getItem(imgObj.url).index
                getEleByClass('greenRight')[index].style.zIndex = 1
                getEleByClass('imgBack')[index].style.filter = 'blur(1px)'
            } else {
                setTimeout(() => {
                    handlerStorage('viewFlag', false)
                    getDataInfo('https://api.vvhan.com/api/bing?type=json&rand=sj', 'img');
                },1500)
            }
        }
    } else {
        // 如果没有缓存图片，则默认第一张静态图
        getEleById('backGroundImg').style.background = "url('../icons/firstPhoto.jpeg')";
        getEleById('backGroundImg').style.backgroundSize = "cover";
        getEleById('downloadPhoto').style.display = 'none'
        getEleByClass('greenRight')[0].style.zIndex = 1
        getEleByClass('imgBack')[0].style.filter = 'blur(1px)'
    }
}

// 展示历史搜索记录
function showHistory (curVal) {
    let historyList = JSON.parse(handlerStorage('historyList'))
    const hisDiv = getEleById('historyText')
    const childs = hisDiv.childNodes;
    for(var i = childs.length - 1; i >= 0; i--) { 
        hisDiv.removeChild(childs[i]); 
    }
    let flag = false
    if (historyList?.length > 0) {
        for (let a = 0; a < historyList.length; a++) {
            curItem = historyList[a]
            if (curItem.indexOf(curVal) !== -1) {
                flag = true
                const textDiv = createEle("div");
                textDiv.setAttribute('class', 'textCss')
                textDiv.setAttribute('id', 'text' + a)
                textDiv.innerText = curItem
                getEleById('historyText').appendChild(textDiv)
                setTimeout(() => {
                    getEleByClass('textCss')[a].onclick = (event) => {
                        getEleById('inputStr').value = event.target.innerText
                    }
                }, 100);
            }
        }
    }
    if (!flag) {
        hisDiv.style.height = '25px'
        hisDiv.innerText = '暂无搜索记录'
        hisDiv.style.textAlign = 'center'
        hisDiv.style.color = 'gray'
        hisDiv.style.fontSize = '14px'
        hisDiv.style.lineHeight = '25px'
    } else {
        getEleById('historyText').style.height = '200px'
        getEleById('historyText').style.zIndex = 1
    }
}

// 调用相关接口进行查询
function getDataInfo(urlStr, flag) {
    //第一步：建立所需的对象
    let httpRequest = new XMLHttpRequest();
    //第二步：打开连接  将请求参数写在url中
    httpRequest.open('GET', urlStr, true);
    httpRequest.onreadystatechange = function () {
      if (httpRequest.readyState === 4) {
        if (httpRequest.status === 200) {
            var json = httpRequest.responseText; //获取到json字符串，还需解析
            var parseJson = JSON.parse(json)
            if (flag === 'ip') {
                // ip信息  --  运营商: parseJson.info.lsp
                var testHtml = '<span>'+ parseJson.info.country + ' - ' + parseJson.info.prov + ' - ' + parseJson.info.city +'</span><br/>IP: ' + parseJson.ip + '<br/>'
                getEleById('ipInfo').innerHTML = testHtml
            } else if (flag === 'img') {
                // 背景图信息
                imgHandler(parseJson.data.url, parseJson.data.title)
                if (handlerStorage('viewFlag') === 'false') {
                    backgroundImgUrl = parseJson.data.url
                } else {
                    preBackgroundImgUrl = parseJson.data.url
                }
                turnPhoto()
            } else if (flag === 'poem') {
                // 诗词信息
                getEleById('jinrishici-sentence').innerText = parseJson.hitokoto
                getEleById('poemTitle').innerText = '《' + parseJson.from +'》'
                getEleById('author').innerText = parseJson.from_who
            } else if (flag === 'music') {
                if (parseJson.info.mp3url.indexOf('/404') === -1) {
                    getEleById('gifDom').src = parseJson.info.picUrl + '?param=50y50'
                    musicFunc(parseJson)
                } else {
                    getRandomMusic()
                }
            }
        }
      }
    };
    //第三步：发送请求
    httpRequest.send(null);
}

// 加载樱花特效
function loadSakuraScript () {
    if (handlerStorage('sakuraCheck') === 'true') {
        let scriptNode = createEle("script");
        scriptNode.setAttribute("type", "text/javascript");
        scriptNode.setAttribute("charset", "utf-8");
        scriptNode.setAttribute("id", 'sakuraScript');
        scriptNode.setAttribute("src", '../scripts/sakura.js');
        getEleById('allPage').appendChild(scriptNode);
        setTimeout(() => {
            getEleById('canvas_sakura').style.display = 'block'
        }, 200);
    } else {
        var sakuraJs = getEleById('sakuraScript');
        if (sakuraJs) {
            var otherJs = getEleByTag('script')[0];
            otherJs.parentNode.removeChild(sakuraJs);
        }
        if (getEleById('canvas_sakura')) {
            getEleById('canvas_sakura').style.display = 'none'
        }
    }
}

// 时间实时展示、初始化计算星期数
function calcTime () {
    littleTimeFunc()
    setInterval(() => {
        littleTimeFunc()
    }, 1000)
    // 初始化计算星期数
    const weekList = ['周日', '周一', '周二', '周三', '周四', '周五', '周六']
    getEleById('dateStr').innerHTML = (new Date().getHours() < 12 ? '上午好' : new Date().getHours() < 20 ? '下午好' : '晚上好') + '，今天是' + weekList[new Date().getDay()] + '哦~'
}

// 解决时间显示时迟钝的问题
function littleTimeFunc () {
    var minutes = new Date().getMinutes() + ''
    minutes = minutes.length < 2 ? '0' + minutes : minutes
    curTime = new Date().getHours() + ':' + minutes
    getEleById('timeStr').innerHTML = curTime
    return curTime
}

// 音乐播放脚本
function loadMusicScript () {
    if (handlerStorage('musicCheck') === 'true') {
        // 获取随机歌曲
        getEleById('music').style.display = 'block'
        getRandomMusic()
    } else {
        var musicJs = getEleByTag('audio')[0];
        if (musicJs) {
            // musicJs.parentNode.removeChild(musicJs);
            musicJs.pause()
        }
        setTimeout(() => {
            getEleById('music').style.display = 'none'
            getEleById('startIcon').style.display = 'none'
            getEleById('pauseIcon').style.display = 'none'
            getEleById('pauseIcon').style.visibility = 'hidden'
        }, 100);
    }
}

// 音乐加载时
function musicFunc (parseJson) {
    // 歌曲信息
    const musicDom = getEleById('musicDom')
    let audioDom = getEleById('audioDom')
    if (!audioDom) {
        audioDom = createEle('audio')
        audioDom.setAttribute('id', 'audioDom')
        audioDom.setAttribute('controls', true)
        audioDom.setAttribute('autoplay', 'autoplay')
    }
    let sourceDom = getEleByTag("source")[0]
    if (!sourceDom) {
        sourceDom = createEle('source')
        sourceDom.setAttribute('id', 'musicDiv')
        // 添加子节点
        audioDom.appendChild(sourceDom)
    }
    sourceDom.setAttribute('src', parseJson.info.mp3url)
    let randomMusic = getEleByTag('span')[0]
    if (!randomMusic) {
        randomMusic = createEle('span')
        randomMusic.setAttribute('id', 'randomMusic')
        const iconDom1 = createEle('img')
        const musicName = createEle('span')
        const iconDom2 = createEle('img')
        iconDom1.setAttribute('id', 'musicSvgCss')
        iconDom2.setAttribute('id', 'musicSvgCss')
        iconDom1.setAttribute('src', "../icons/up.svg")
        iconDom2.setAttribute('src', "../icons/next.svg")
        randomMusic.appendChild(iconDom1)
        randomMusic.appendChild(musicName)
        randomMusic.appendChild(iconDom2)
        musicDom.appendChild(randomMusic)
    }
    musicDom.appendChild(audioDom)
    // 赋值全局变量
    musicName = parseJson.info.name
    musicAuther = parseJson.info.auther
    // 鼠标hover上去展示歌名、作者
    setTimeout(() => {
        const audio = getEleByTag("audio")[0]
        // 重新监听
        audio.addEventListener('ended', function () {
            getRandomMusic()
        }, false);
        getEleById('music').style.display = 'block'
        getEleById('musicName').innerText = musicName + ' - ' + musicAuther
        // 自动切换歌曲
        if(audio && audio.tagName == "AUDIO"){
            audio.load()
            audio.play();
            getEleById('startIcon').style.display = 'block'
            getEleById('pauseIcon').style.display = 'none'
            upMusicId = parseJson.info.id
        }
    }, 0);
}

// 背景毛玻璃效果
function backgroundGlass (event) {
    let curBack1 = getEleById('backGroundImg')
    let curBack2 = getEleById('preBackGroundImg')
    let curVal
    const num = Number(handlerStorage('glassCheck'))
    if (num === NaN) {
        curVal = 10
    }
    curVal = event?.target?.value || num || 10
    if (curVal > 0) {
        curBack1.style.transform = 'scale(1.1) translateX(0)';
        curBack1.style.filter = 'blur(' + curVal + 'px) brightness(0.8)';
        curBack2.style.transform = 'scale(1.1) translateX(0)';
        curBack2.style.filter = 'blur(' + curVal + 'px) brightness(0.8)';
    } else {
        curBack1.style.transform = '';
        curBack1.style.filter = '';
        curBack2.style.transform = '';
        curBack2.style.filter = '';
    }
}

// 输入框圆角
function borderRadiusChange (event) {
    const tabDom = getEleById('searchTab')
    const typeDom = getEleById('typeSelect')
    const historyDom = getEleById('searchHistory')
    const storageVal = handlerStorage('inputRangeVal')
    const curVal = event?.target?.value || storageVal || 20
    tabDom.style.borderRadius = curVal + 'px'
    typeDom.style.borderRadius = curVal / 2 + 'px'
    historyDom.style.borderRadius = curVal / 2 + 'px'
}

// 获取一首随机歌曲
function getRandomMusic () {
    let index = Math.floor(Math.random() * musicTypeList.length)
    // const str = 'https://zj.v.api.aa1.cn/api/qqmusic/?singerName=周杰伦&pageNum=1&pageSize=1&type=qq&songName=' + JayChouMusicName[index]
    const str = 'https://api.vvhan.com/api/rand.music?type=json&sort=' + musicTypeList[index]
    getDataInfo(str, 'music')
}

// 根据获取对应ele节点
function getEleById (id) {
    return document.getElementById(id)
}

// 根据元素获取对应节点
function getEleByTag (tag) {
    return document.getElementsByTagName(tag)
}

// 根据class类名获取元素节点
function getEleByClass (cls) {
    return document.getElementsByClassName(cls)
}

// 创建相应节点
function createEle (ele) {
    return document.createElement(ele)
}

// 缓存获取与塞值
function handlerStorage (key, value) {
    if (value === undefined) {
        return localStorage.getItem(key)
    }
    return localStorage.setItem(key, value)
}

// 获取静态图片对象
function getItem (data) {
    const obj = imgList.find((item) => {
        return data.indexOf(item.dis) !== -1
    })
    return obj
}
