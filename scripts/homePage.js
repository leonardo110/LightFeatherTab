// 是否第一次使用
isShowWelcomPage()
// 全局变量
var curTime = ''
let musicName = ''
let musicAuther = ''
let musicIdList = []
let upMusicId = ''
let showLogDialog = false
let showGallery = false
let showAddons = false
let curPage = 1
let galleryList = []
let photoTypeId = 10
let totalPage = 0
let placeholderText = ''
const musicTypeList = ['热歌榜', '飙升榜', '热歌榜', '原创']
const typeList = [
    {
        key: 'baidu',
        url: '../icons/baidu.png',
        logo: '../icons/baidulogo.svg',
        uppercase: 'Baidu'
    },
    {
        key: 'bing',
        url: '../icons/bing.png',
        logo: '../icons/binglogo.png',
        uppercase: 'Bing'
    },
    {
        key: 'google',
        url: '../icons/google.png',
        logo: '../icons/googlelogo.PNG',
        uppercase: 'Google'
    },
    {
        key: 'Yahoo',
        url: '../icons/yahoo.png',
        logo: '../icons/yahoologo.svg',
        uppercase: 'Yahoo'
    },
    {
        key: '360',
        url: '../icons/360sousuo.png',
        logo: '../icons/360logo.png',
        uppercase: '360'
    },
    {
        key: 'sougou',
        url: '../icons/sougou.png',
        logo: '../icons/sougoulogo.png',
        uppercase: 'Sougou'
    }
]
const imgList = [
    {
        index: 0,
        src: '../icons/firstPhoto.png',
        dis: 'firstPhoto'
    },
    {
        index: 1,
        src: '../icons/secondPhoto.png',
        dis: 'secondPhoto'
    },
    {
        index: 2,
        src: '../icons/thirdPhoto.png',
        dis: 'thirdPhoto'
    },
    {
        index: 3,
        src: '../icons/fourPhoto.png',
        dis: 'fourPhoto'
    },
    {
        index: 4,
        src: '../icons/fengche.mp4',
        dis: 'fengche'
    },
    {
        index: 5,
        src: '../icons/cat.mp4',
        dis: 'cat'
    },
    {
        index: 6,
        src: '../icons/window.mp4',
        dis: 'window'
    },
    {
        index: 7,
        src: '../icons/caoyuan.mp4',
        dis: 'caoyuan'
    }
]
const cardUrlList = [
    'http://iqiyi.com',
    'https://bilibili.com',
    'https://taobao.com',
    'https://jd.com',
    'https://y.qq.com',
    'https://music.163.com',
    'https://v.qq.com',
    'https://douyin.com',
    'https://zhihu.com',
    'https://youtube.com'
]
let imgTypeMap = new Map([
    ['10', '炫酷时尚'],
    ['36', '4K专区'],
    ['9', '风景大片'],
    ['15', '清新淡雅'],
    ['26', '动漫卡通'],
    ['11', '明星风尚'],
    ['14', '萌宠动物'],
    ['5', '游戏壁纸'],
    ['12', '汽车天下'],
    ['29', '月历壁纸'],
    ['7', '影视剧照'],
    ['13', '节日美图'],
    ['22', '军事天地'],
    ['16', '劲爆体育'],
    ['35', '文字控'],
])
// let gameHref = new Map([
//     ['网上冲浪', 'edge://surf/'],
//     ['植物大战僵尸', 'https://pvz.heheda.top/'],
//     ['弹力球', 'https://bouncyballs.org/'],
//     ['水果忍者', 'https://fn.heheda.top/'],
//     ['Web魔方','https://tools.bqrdh.com/rubiks-cube/'],
//     ['微博热搜榜  https://weibo.com/ajax/statuses/hot_band']
// ])
// 动画效果
const animationList = ['bounce', 'flash', 'pulse', 'rubberBand', 'shakeX', 'shakeY', 'headShake', 'swing', 'tada', 'wobble', 'jello', 'heartBeat', 'flip', 'hinge', 'jackInTheBox', 'rollIn']
// 时间实时展示、初始化计算星期数
showNameFunc()
// 初始化注册各种鼠标事件和监听事件
registFunc()
// 查天气
getDataInfo('https://api.vvhan.com/api/weather', 'weather')
// 预加载一张背景图
loadPhoto()
// 查诗词
getDataInfo('https://v1.hitokoto.cn/?c=i&encode=json', 'poem')
// 加载樱花特效
// loadSakuraScript();
// 背景毛玻璃效果
backgroundGlass()
// 加载音乐播放器
// loadMusicScript()
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
// 切换极简模式
switchSimple()

// 初始化注册各种鼠标事件
function registFunc () {
    //禁止F12
    // document.onkeydown = function () {
    //     if (window.event && window.event.keyCode == 123) {
    //         event.keyCode = 0;
    //         event.returnValue = false;
    //         return false;
    //     }
    // };

    // 监听tab键盘事件
    document.addEventListener('keydown', function (event) {
        tabKeyUpFunc(event)
    })
    document.body.addEventListener('click', function(e) {
        const menuDom = getEleById('rightMenu')
        menuDom.style.display = 'none'
    })
    document.body.addEventListener('change', function(e) {
        const menuDom = getEleById('rightMenu')
        menuDom.style.display = 'none'
    })
    // 鼠标中键打开新标签页
    document.onmousedown = (e) => {
        if (e.button === 1) {
            chrome.tabs.create({url: '../popup/homePage.html', active: true})
        }
    }
    getEleById('welcomeBtn').onclick = () => {
        const welcomePageDom = getEleById('welcomePage')
        animateCSS('#welcomePage', 'fadeOut')
        const searchTab = getEleById('searchTab')
        searchTab.style.display = 'block'
        setTimeout(() => {
            welcomePageDom.style.display = 'none'
            // 版本更新提醒
            updateVersionTip()
            handlerStorage('welcome', true)
        }, 980);
    }
    // 注意 取消默认行为 我们鼠标右键的时候 一般是弹出 浏览器的 属性 刷新等等的那个菜单
    getEleById('mask').addEventListener('contextmenu',function(e){
        e.preventDefault();
        const menuDom = getEleById('rightMenu')
        menuDom.style.display = 'block'
        const offsetWidth = document.body.offsetWidth
        const offsetHeight = document.body.offsetHeight
        if (e.clientX + 130 > offsetWidth && e.clientY + 132 > offsetHeight) {
            menuDom.style.left = e.clientX - 130
            menuDom.style.top = e.clientY - 132
        } else if (e.clientX + 130 > offsetWidth) {
            menuDom.style.left = e.clientX - 130
            menuDom.style.top = e.clientY
        } else if (e.clientY + 132 > offsetHeight) {
            menuDom.style.left = e.clientX
            menuDom.style.top = e.clientY - 132
        } else {
            menuDom.style.left = e.clientX
            menuDom.style.top = e.clientY
        }
        const menuItemList = getEleByClass('menuDiv')
        for (let m = 0; m < menuItemList.length; m++) {
            const item = menuItemList[m]
            item.onclick = () => {
                if (m === 0) {
                    // 设置
                    openSettingView()
                } else if (m === 1) {
                    // 壁纸广场
                    openGalleryDialog()
                } else if (m === 2) {
                    // 刷新
                    location.reload()
                } else if (m === 3) {
                    // 下一张壁纸
                    randomPhoto()
                } else if (m === 4) {
                    // 下载壁纸
                    downloadImage()
                } else if (m === 5) {
                    // 好评
                    toInstallHref()
                }
                menuDom.style.display = 'none'
            }
        }
    })
    // 隐私政策
    getEleById('privacy').onclick = () => {
        closeView()
        const privacyDom = getEleById('privacyDialog')
        setTimeout(() => {
            animateCSS('#privacyDialog', 'fadeIn')
            privacyDom.style.display = 'block'
        }, 5);
        const maskDom = getEleById('mask')
        maskDom.style.opacity = 0.6
        maskDom.style.zIndex = 1
        setPrivacy()
        showAddons = true
    }
    // 极简模式输入框
    getEleById('simpleInput').onfocus = () => {
        getEleById('mask').style.opacity = 0
        const inputDom = getEleById('simpleInput')
        inputDom.style.width = '40%'
        inputDom.setAttribute('class', 'donghua')
        placeholderText = inputDom.getAttribute("placeholder") || placeholderText
        placeholderText && inputDom.setAttribute("placeholder", '')
    }
    getEleById('simpleInput').onkeyup = (event) => {
        if (event.keyCode === 13) {
            searchText(event.target.value)
        }
    }
    getEleById('simpleInput').onblur = (event) => {
        const inputDom = getEleById('simpleInput')
        if (!inputDom.value) {
            getEleById('simpleInput').style.width = '30%'
            getEleById('simpleInput').removeAttribute('class', 'donghua')
            inputDom.setAttribute("placeholder", placeholderText)
        }
    }
    // 联系我
    getEleById('linkMe').onclick = () => {
        window.open('https://support.qq.com/products/595677', '_blank')
    }
    // 壁纸广场
    getEleById('galleryBtn').onclick = () => {
        openGalleryDialog()
    }
    getEleById('gallerysSelectCss').onchange = (e) => {
        photoTypeId = e.target.value
        getDataInfo(`http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${photoTypeId}&pageno=${curPage}&count=16`, 'gallery')
    }
    // 跳转至插件地址
    getEleById('addonsHref').onclick =() => {
        const addonsAddress = getEleById('addonsAddress')
        setTimeout(() => {
            animateCSS('#addonsAddress', 'fadeIn')
            addonsAddress.style.display = 'block'
        }, 5);
        const searchTab = getEleById('searchTab')
        searchTab.style.zIndex = -1
        const typeDom = getEleById('typeSelect')
        typeDom.style.zIndex = -1
        getEleById('mask').style.opacity = 0.6
        const addonsLogoList = getEleByClass('addonsLogo')
        setAddonsTheme()
        if (showLogDialog) {
            getEleById('appDialog').style.display = 'none'
            showLogDialog = false
        }
        if (showGallery) {
            getEleById('tukuDialog').style.display = 'none'
            showGallery = false
        }
        showAddons = true
        for (let x = 0; x < addonsLogoList.length; x++) {
            const item = addonsLogoList[x]
            item.onclick = () => {
                if (x === 0) {
                    // Edge
                    window.open('https://microsoftedge.microsoft.com/addons/detail/dcnpfefcbpeggaajgeffehpckpdjpckd', '_blank')
                } else if (x === 1) {
                    // 谷歌
                    window.open('https://chrome.google.com/webstore/detail/dbjnimhhecichpmcimfhkcfjiladefci', '_blank')
                } else if (x === 2) {
                    // 火狐
                    window.open('https://addons.mozilla.org/zh-CN/firefox/addon/轻羽标签页/', '_blank')
                } else {
                    // Crx跳转云盘地址
                    window.open('https://pan.baidu.com/s/1VL9YcV-dNL1iA5sZbAT84g?pwd=5tr4', '_blank')
                }
            }
        }
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
    // 清空聊天窗口内容
    // getEleById('cleargptCss').onclick = () => {
    //     // 清空临时会话数据
    //     handlerStorage('clearGpt', true)
    //     // 获取iframe元素对象
    //     var iframe = getEleById("gptIframe");
    //     // 获取iframe的contentWindow对象
    //     var iframeWindow = iframe.contentWindow;
    //     // 获取iframe内部的文档对象
    //     var iframeDocument = iframeWindow.document;
    //     // 通过文档对象的getElementById()等方法获取子页面的元素dom
    //     var element = iframeDocument.getElementsByClassName("container")[0];
    //     // 清空聊天窗口内容
    //     element.innerHTML = ''
    // }
    // 打开chatgpt窗口
    // getEleById('chatgptBtn').onclick = () => {
    //     handlerStorage('clearGpt', false)
    //     getEleById('chatgptDialog').style.display = 'block'
    //     closeView()
    //     setTimeout(() => {
    //         changeGPT_height()
    //     }, 0)
    // }
    // window.addEventListener('resize', () => {
    //     changeGPT_height()
    // });

    // 关闭chatgpt窗口
    // getEleById('dialogDelete').onclick = () => {
    //     getEleById('chatgptDialog').style.display = 'none'
    // }
    // 关闭日志弹框
    getEleById('logDialogDelete').onclick = () => {
        getEleById('appDialog').style.display = 'none'
        if (showLogDialog) {
            getEleById('mask').style.opacity = 0.3
        }
        showLogDialog = false
    }
    getEleById('logDialogDeleteWhite').onclick = () => {
        getEleById('appDialog').style.display = 'none'
        if (showLogDialog) {
            getEleById('mask').style.opacity = 0.3
        }
        showLogDialog = false
    }
    // 打开日志
    getEleById('updateLog').onclick = () => {
        setTimeout(() => {
            animateCSS('#appDialog', 'fadeIn')
            getEleById('appDialog').style.display = 'block'
        }, 5);
        getEleById('mask').style.opacity = 0.6
        showLogDialog = true
        setDialogTheme()
        if (showGallery) {
            getEleById('tukuDialog').style.display = 'none'
            showGallery = false
        }
        if (showAddons) {
            getEleById('addonsAddress').style.display = 'none'
            showAddons = false
        }
    }
    // 遮罩层点击事件
    getEleById('mask').onclick = () => {
        if ((!showLogDialog && !showGallery) || (showAddons)) {
            closeView()
        }
        showAddons = false
        const val =  getEleById('inputStr').value
        if (!val) {
            getEleById('searchTypeDiv').style.display = 'none'
            getEleById('sousuoDiv').style.display = 'none'
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
        switchSearchTypeFunc()
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
        // getEleById('searchTab').style.width = '40%'
        getEleById('inputStr').style.padding = '0px 70px 0px 45px'
        getEleById('deleteIcon').style.right = '45px'
        getEleById('searchTypeDiv').style.display = 'inline-block'
        getEleById('sousuoDiv').style.display = 'inline-block'
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
            if (!event.target.value) {
                getEleById('inputStr').style.padding = '0px 15px'
                getEleById('deleteIcon').style.right = '15px'
            }
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
    // 设置图标点击事件
    getEleById('shezhiIcon').onclick = () => {
        openSettingView()
    }
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
    // 毛玻璃效果开关
    let glassDom = getEleById('glassRange')
    if (glassDom) {
        getEleById('glassRange').oninput = (event) => {
            // handlerStorage('glassCheck', getEleById('glassRange').value)
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
            randomPhoto()
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
    // 极简模式开关
    let simpleDom = getEleById('checkSimple')
    if (simpleDom) {
        simpleDom.onclick = () => {
            if (simpleDom.checked) {
                handlerStorage('simpleCheck', true)
            } else {
                handlerStorage('simpleCheck', false)
            }
            switchSimple()
        }
        simpleDom.checked = handlerStorage('simpleCheck') === 'true'
    }
}

// 隐藏设置面板
function hiddenSettingView() {
    animateCSS('#settingView', 'fadeOutRight')
    setTimeout(() => {
        getEleById('settingView').style.display = 'none'
    }, 900);
}

// Tab键功能
function tabKeyUpFunc (event) {
    if (event.keyCode === 9) {
        event.preventDefault()
        const serchType = handlerStorage('simpleCheck')
        const type = handlerStorage('searchType')
        let index = typeList.findIndex(temp => {
            return temp.key === type
        })
        let setIdx = index === 5 ? 0 : ++index
        getEleByClass('typeIcon')[0].src = typeList[setIdx].logo
        handlerStorage('searchType', typeList[setIdx].key)
        if (serchType === 'true') {
            getEleById('simpleInput').setAttribute("placeholder", `Search With ${typeList[setIdx].uppercase}`);
        } else {
            getEleById('inputStr').focus()
        }
        // 切换输入法更改图标
        handlerInputMethod(handlerStorage('searchType'))
    }
}

// 手动切换搜索引擎
function switchSearchTypeFunc () {
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

// 好评
function toInstallHref () {
    const userAgent = window.navigator.userAgent
    if (userAgent.indexOf('Edg') !== -1) {
        // Edge
        window.open('https://microsoftedge.microsoft.com/addons/detail/dcnpfefcbpeggaajgeffehpckpdjpckd', '_blank')
    } else if (userAgent.indexOf('Firefox') !== -1) {
        // 火狐
        window.open('https://addons.mozilla.org/zh-CN/firefox/addon/轻羽标签页/', '_blank')
    } else if (userAgent.indexOf('Chrome') !== -1) {
        // 谷歌
        window.open('https://chrome.google.com/webstore/detail/dbjnimhhecichpmcimfhkcfjiladefci', '_blank')
    } else {
        // 统一跳转到Edge
        window.open('https://microsoftedge.microsoft.com/addons/detail/dcnpfefcbpeggaajgeffehpckpdjpckd', '_blank')
    }
}

// 打开壁纸广场
function openGalleryDialog () {
    if (showLogDialog) {
        getEleById('appDialog').style.display = 'none'
        showLogDialog = false
    }
    if (showAddons) {
        getEleById('addonsAddress').style.display = 'none'
        showAddons = false
    }
    setTimeout(() => {
        animateCSS('#tukuDialog', 'fadeIn')
        getEleById('tukuDialog').style.display = 'block'
    }, 5);
    getEleById('mask').style.opacity = 0.6
    getEleById('mask').style.zIndex = 1
    hiddenSettingView()
    showGallery = true
    getGalleryPhoto()
    setGalleryTheme()
    galleryIconFunc()
}

// 随机一张壁纸
function randomPhoto () {
    // 清除掉选中效果
    const length = getEleByClass('jingtaiImg').length
    getEleById('greenRight').style.visibility = 'hidden'
    getDataInfo('https://api.vvhan.com/api/bing?type=json&rand=sj', 'img');
}

// 打开设置面板
function openSettingView () {
    if (showGallery) {
        return
    }
    setTimeout(() => {
        animateCSS('#settingView', 'fadeInRight')
        getEleById('settingView').style.display = 'block'
    }, 3);
        const dom = getEleById('glassRange')
        dom.value = handlerStorage('glassCheck') || 0
        const rangeDom = getEleById('inputRange')
        rangeDom.value = handlerStorage('inputRangeVal') || 20
        const searchTab = getEleById('searchTab')
        searchTab.style.zIndex = -1
        const typeDom = getEleById('typeSelect')
        typeDom.style.zIndex = -1
        const maskDom = getEleById('mask')
        maskDom.style.opacity = 0.3
        const greenRightDom = getEleById('greenRight').style
        const length = getEleByClass('jingtaiImg').length
        for (let v = 0; v < length; v++) {
            getEleByClass('jingtaiImg')[v].onclick = () => {
                greenRightDom.visibility = 'visible'
                handlerPhotoNumber(v)
                imgHandlerPhoto(getEleByClass('jingtaiImg')[v].src)
                const imgObj = {
                    url: getEleByClass('jingtaiImg')[v].src,
                    title: ''
                }
                handlerStorage('imgObj', JSON.stringify(imgObj))
            }
        }
        // 是否弹出问候语
        let greetDom = getEleById('greetingCss')
        if (greetDom) {
            // 赋值给问候输入框
            greetDom.value = handlerStorage('greetContent')
            greetDom.onblur = (event) => {
                handlerStorage('greetContent', event.target.value.trim())
            }
        }
        getEleById('navBar').style.zIndex = -1
        initTheme()
}

// 切换极简模式
function switchSimple () {
    const simpleCheck = handlerStorage('simpleCheck') || false
    const centerDom = getEleById('centerDiv')
    const navBarDom = getEleById('navBar')
    const timeContentDom = getEleById('timeContent')
    const simpleMode = getEleById('simpleMode')
    const poemDom = getEleById('poemContent')
    const handlerSimpleDom = getEleById('handlerSimple')
    const myselfDivDom = getEleById('myselfDiv')
    const simpleInputDom = getEleById('simpleInput')
    const historySearchDom = getEleById('historySearch')
    const radiusDivDom = getEleById('radiusDiv')
    const weatherDom = getEleByClass('weather')[0]
    if (simpleCheck === 'true') {
        const searchType = handlerStorage('searchType') || 'baidu'
        centerDom.style.visibility = 'hidden'
        navBarDom.style.visibility = 'hidden'
        timeContentDom.style.visibility = 'hidden'
        poemDom.style.visibility = 'hidden'
        historySearchDom.style.display = 'none'
        simpleMode.style.visibility = 'visible'
        handlerStorage('sakuraCheck', false)
        handlerStorage('musicCheck', false)
        handlerSimpleDom.style.display = 'none'
        myselfDivDom.style.display = 'none'
        radiusDivDom.style.display = 'none'
        const typeObj = typeList.find(cur => cur.key === searchType)
        simpleInputDom.setAttribute("placeholder", `Search With ${typeObj.uppercase}`);
        weatherDom.style.display = 'none'
    } else {
        const navBar = handlerStorage('cardCheck')
        centerDom.style.visibility = 'visible'
        navBarDom.style.visibility = navBar === 'true' ? 'visible' : 'hidden'
        timeContentDom.style.visibility = 'visible'
        simpleMode.style.visibility = 'hidden'
        poemDom.style.visibility = 'visible'
        historySearchDom.style.display = 'inline-block'
        handlerSimpleDom.style.display = 'inline-block'
        myselfDivDom.style.display = 'inline-block'
        radiusDivDom.style.display = 'inline-block'
        weatherDom.style.display = 'inline-block'
        showPoemFunc()
    }
}

// 查询新一页或者新类型的图片数据
function getGalleryPhoto () {
    const galleryBtnList = getEleByClass('galleryBtnCss')
    const pageNo = getEleById('pageNum')
    for (let v = 0; v < galleryBtnList.length; v++) {
        // 只给前两个btn做点击事件
        if (v === 0 || v === 1) {
            const cur = galleryBtnList[v]
            cur.onclick = () => {
                const xy = curPage
                if (v === 1) {
                    curPage++
                } else {
                    if (curPage === 1) {
                        popTip('当前页已是第一页')
                        return
                    }
                    curPage > 1 && curPage--
                }
                pageNo.innerText = `第 ${curPage} 页`
                xy !== curPage &&
                getDataInfo(`http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${photoTypeId}&pageno=${curPage}&count=16`, 'gallery')
            }
        }
    }
    getEleById('pageInput').onkeydown = (e) =>{
        if (e.keyCode === 13) {
            if (Number(e.target.value) > Number(totalPage)) {
                popTip('跳转页没有数据')
                getEleById('pageInput').value = ''
                return
            }
            curPage = e.target.value
            pageNo.innerText = `第 ${curPage} 页`
            getDataInfo(`http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${photoTypeId}&pageno=${curPage}&count=16`, 'gallery')
        }
    }
    pageNo.innerText = `第 ${curPage} 页`
    getDataInfo(`http://wp.birdpaper.com.cn/intf/GetListByCategory?cids=${photoTypeId}&pageno=${curPage}&count=16`, 'gallery')
}
// 图标功能
function galleryIconFunc () {
    const dialogIconsList = getEleByClass('dialogIcons')
    const tukuDialogDom = getEleById('tukuDialog')
    const tukuDialogCenterDom = getEleById('tukuDialogCenter')
    tukuDialogDom.style.top = '52%'
    tukuDialogDom.style.height = '495px'
    tukuDialogCenterDom.style.display = 'block'
    for (let s = 0; s < dialogIconsList.length; s++) {
        const dom = dialogIconsList[s]
        dom.style.display = 'inline-block'
        if (s === 1 || s === 4) {
            dom.style.display = 'none'
        }
        dom.onclick = () => {
            if (s === 0 || s === 3) {
                // 缩小
                tukuDialogDom.style.height = '25px'
                tukuDialogCenterDom.style.display = 'none'
                tukuDialogDom.style.top = ''
                tukuDialogDom.style.bottom = '10px'
                dom.style.display = 'none'
                s === 0 ? dialogIconsList[1].style.display = 'inline-block' : dialogIconsList[4].style.display = 'inline-block'
                getEleById('mask').style.opacity = 0.3
            } else if (s === 1 || s === 4) {
                // 放大
                tukuDialogDom.style.height = '495px'
                tukuDialogCenterDom.style.display = 'block'
                tukuDialogDom.style.top = '52%'
                tukuDialogDom.style.bottom = ''
                dom.style.display = 'none'
                s === 1 ? dialogIconsList[0].style.display = 'inline-block' : dialogIconsList[3].style.display = 'inline-block'
                getEleById('mask').style.opacity = 0.6
            } else {
                // 关闭
                tukuDialogDom.style.display = 'none'
                closeView()
                getEleById('mask').style.opacity = 0
                getEleById('mask').style.zIndex = 0
                showGallery = false
            }
        }
    }
}

// 进度条
function progressFunc () {
    const widthDom = getEleById('progress').style
    let num = 500
    let progress = setInterval(() => {
        widthDom.width = num++ + 'px'
        if (num === 663) {
            clearInterval(progress)
            widthDom.width = '0px'
            let content = getEleById('insideContent')
            const gujiaScreen = getEleById('gujiaScreen')
            gujiaScreen.style.display = 'none'
            content.style.display = 'block'
        }
    }, 1)
}

// 更新版本提示
function updateVersionTip () {
    const version = handlerStorage('version')
    const mode = handlerStorage('tipMode') || 'pop'
    if (version !== '1.1.9') {
        // popTip("插件已更新至" + (mode === 'pop' ? "<span class='versionNum'>&nbsp;v1.1.9&nbsp;</span>" : " v1.1.9") + "版本，快试试新功能吧~", 5000)
        const versionDom = getEleById('updateDiv')
        versionDom.style.display = 'block'
        setTimeout(() => {
            versionDom.style.display = 'none'
        }, 10000);
        handlerStorage('version', '1.1.9')
    }
}
// 下载壁纸
function downloadImage() {
    const img = handlerStorage('imgObj')
    if (img && img !== 'null') {
        const imgObj = JSON.parse(img)
        const url = imgObj.url
        // base64转新的blob地址(当前为本地上传的图片处理)
        if (url.indexOf('data:image') !== -1) {
            popTip('本地上传的图片无需下载')
            return
        }
    }
    const obj = JSON.parse(handlerStorage('imgObj'))
    const photoUrl = obj.url
    if (photoUrl.indexOf('mp4') === -1) {
        // 下载非视频壁纸
        downloadPhoto(photoUrl)
    } else {
        // 下载视频
        downloadMp4(photoUrl)
    }
}

// 下载非视频壁纸
function downloadPhoto (photoUrl) {
    var image = new Image()
    // 解决跨域 Canvas 污染问题
    // crossorigin 是HTML5中新增的<img>标签属性
    //　crossorigin属性有两个值可选：
    //anonymous:如果使用这个值的话就会在请求中的header中的带上origin属性，但请求不会带上cookie和其他的一些认证信息。
    //use-credentials:这个同时会在跨域请求中带上cookie和其他的一些认证信息。在使用这两个值时都需要server端在response的header中带上Access-Control-Allow-Credentials属性。可以通过server的配置文件来开启这个属性：server开启Access-Control-Allow-Credentials
    image.setAttribute('crossOrigin', 'anonymous')
    image.onload = function () {
        var canvas = createEle('canvas')
        canvas.width = image.width
        canvas.height = image.height

        var context = canvas.getContext('2d')
        context.drawImage(image, 0, 0, image.width, image.height)
        var url = canvas.toDataURL('image/png')
        // 生成一个a元素
        var a = createEle('a')
        // 创建一个单击事件
        var event = new MouseEvent('click')

        // 将a的download属性设置为我们想要下载的图片名称，若name不存在则使用‘下载图片名称’作为默认名称
        a.download = 'image' + Date.now()
        // 将生成的URL设置为a.href属性
        a.href = url
        // 触发a的单击事件
        a.dispatchEvent(event);
    }
    image.src = photoUrl
}

// 下载函数
function downloadMp4(mp4Url){
    fetch(mp4Url)
    .then(res => res.blob())
    .then(blob => {
        const a = document.createElement("a");
        const objectUrl = window.URL.createObjectURL(blob);
        a.download = 'video' + Date.now();
        a.href = objectUrl;
        a.click();
        window.URL.revokeObjectURL(objectUrl);
        a.remove();
    })
}

/**
 * 主题设置
 */
function setTheme () {
    const cardDomList = getEleByClass('cardSet')
    if (handlerStorage('theme') === 'dark') {
        cardDomList[3].style.border = '1px solid white'
    }
    for(let v = 0;v < cardDomList.length; v++) {
        const temp = cardDomList[v]
        temp.onclick = () => {
            if (v === 0) {
                handlerStorage('theme', 'default')
            } else if (v === 1) {
                handlerStorage('theme', 'lucency')
            } else if (v === 2) {
                handlerStorage('theme', 'gradient')
            } else {
                temp.style.border = '1px solid white'
                handlerStorage('theme', 'dark')
            }
            if (showLogDialog) {
                setDialogTheme()
            }
            if (showGallery) {
                setGalleryTheme()
            }
            if (showAddons) {
                setAddonsTheme()
            }
            setPrivacy()
            if ([0,1,2].includes(v)) {
                cardDomList[3].style.border = '0px'
            }
            initTheme()
        }
    }
}

// 初始化主题选中
function initTheme () {
    const themeVal = handlerStorage('theme') || 'default'
    const iconDom = getEleById('selectIcon')
    let settingView = getEleById('settingView')
    const themeCardDiv = getEleByClass('themeCardDiv')[0]
    const shezhiCard = getEleByClass('shezhiCard')
    const btnHoverCss = getEleByClass('btnHoverCss')
    const uploadBlue = getEleById('uploadBlue').style
    const uploadWhite = getEleById('uploadWhite').style
    const tukuBlue = getEleById('tukuBlue').style
    const tukuWhite = getEleById('tukuWhite').style
    const greetDom = getEleById('greetingCss').style
    const noticeDom = getEleById('noticeCss').style
    // tip图标
    getEleById('showTipIcon1').style.display = themeVal === 'default' ? 'none' : 'inline-block'
    getEleById('showTipIcon2').style.display = themeVal === 'default' ? 'inline-block' : 'none'
    // 切换字体颜色防止刺眼
    getEleById('myselfBlue').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    getEleById('updateLog').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    getEleById('addonsHref').style.color = themeVal === 'default' ? '#409eff' : '#ffe643'
    if (themeVal === 'default') {
        themeCardDiv.style.backgroundColor = 'white'
        for (let a = 0; a < shezhiCard.length; a++) {
            shezhiCard[a].style.backgroundColor = 'white'
        }
        for (let b = 0; b < btnHoverCss.length; b++) {
            btnHoverCss[b].style.border = '1px solid #409eff'
            btnHoverCss[b].style.color = '#409eff'
            btnHoverCss[b].style.background = 'white'
        }
        iconDom.style.left = '39px'
        iconDom.style.bottom = '35px'
        settingView.style['backdrop-filter'] = ''
        settingView.style.backgroundColor = 'rgb(239 245 252)'
        settingView.style.color = '#787878'
        settingView.removeAttribute('class', 'thirdTheme')
        uploadBlue.display = 'inline-block'
        uploadWhite.display = 'none'
        tukuBlue.display = 'inline-block'
        tukuWhite.display = 'none'
        greetDom.color = '#5a5858'
        noticeDom.color = '#5a5858'
    } else {
        themeCardDiv.style.backgroundColor = ''
        for (let a = 0; a < shezhiCard.length; a++) {
            shezhiCard[a].style.backgroundColor = ''
        }
        for (let b = 0; b < btnHoverCss.length; b++) {
            btnHoverCss[b].style.border = '1px solid white'
            btnHoverCss[b].style.color = 'white'
            btnHoverCss[b].style.background = 'rgba(0,0,0,0)'
        }
        settingView.style.backgroundColor = ''
        settingView.style.color = 'white'
        uploadBlue.display = 'none'
        uploadWhite.display = 'inline-block'
        tukuBlue.display = 'none'
        tukuWhite.display = 'inline-block'
        greetDom.color = 'white'
        noticeDom.color = 'white'
        if (themeVal === 'lucency') {
            iconDom.style.left = '120px'
            iconDom.style.bottom = '34px'
            settingView.style['backdrop-filter'] = 'blur(25px)'
            settingView.removeAttribute('class', 'thirdTheme')
        } else if (themeVal === 'gradient') {
            iconDom.style.left = '199px'
            iconDom.style.bottom = '35px'
            settingView.style['backdrop-filter'] = ''
            settingView.setAttribute('class', 'thirdTheme')
        } else {
            iconDom.style.left = '279px'
            iconDom.style.bottom = '34px'
            settingView.style['backdrop-filter'] = ''
            settingView.style.backgroundColor = '#363636'
            settingView.removeAttribute('class', 'thirdTheme')
        }
    }
}

// 隐私弹框切换主题
function setPrivacy () {
    const privacyDialogDom = getEleById('privacyDialog')
    const themeVal = handlerStorage('theme') || 'default'
    const rightNameDom = getEleByClass('rightName')[0]
    const addonsCssDom = getEleByClass('addonsCss')[0]
    if (themeVal === 'default') {
        privacyDialogDom.style.background = 'white'
        privacyDialogDom.style.color = '#3a3a3a'
        privacyDialogDom.removeAttribute('class', 'thirdTheme')
        privacyDialogDom.style['backdrop-filter'] = ''
        rightNameDom.style.color = '#449aff'
        addonsCssDom.style.color = '#449aff'
    } else {
        privacyDialogDom.style.color = 'white'
        rightNameDom.style.color = 'white'
        addonsCssDom.style.color = '#ffa400'
        assembleCode(themeVal, privacyDialogDom)
    }
}

// 日志弹框切换主题样式
function setDialogTheme () {
    // 日志弹框
    const logTitle = getEleByClass('logTitle')[0].style
    const versionTimeList = getEleByClass('versionTime')
    const textStyle = getEleByClass('textStyle')
    const appDialog = getEleById('appDialog')
    const versionDiv = getEleByClass('versionDiv')
    const logDialogDelete = getEleById('logDialogDelete').style
    const logDialogDeleteWhite = getEleById('logDialogDeleteWhite').style
    const themeVal = handlerStorage('theme') || 'default'
    if (themeVal === 'default') {
        // 日志
        logTitle.color = '#1c1b1b'
        for (let a = 0; a < versionTimeList.length; a++) {
            versionTimeList[a].style.color = '#898989'
            versionDiv[a].style.color = 'black'
        }
        for (let b = 0; b < textStyle.length; b++) {
            textStyle[b].style.color = '#535151'
        }
        appDialog.style.border = ''
        appDialog.style.background = 'white'
        appDialog.removeAttribute('class', 'thirdTheme')
        logDialogDelete.display = 'inline-block'
        logDialogDeleteWhite.display = 'none'
    } else {
        logDialogDelete.display = 'none'
        logDialogDeleteWhite.display = 'inline-block'
        // 日志
        logTitle.color = 'white'
        for (let a = 0; a < versionTimeList.length; a++) {
            versionTimeList[a].style.color = 'white'
            versionDiv[a].style.color = 'white'
        }
        for (let b = 0; b < textStyle.length; b++) {
            textStyle[b].style.color = 'white'
        }
        assembleCode(themeVal, appDialog)
    }
}

// 切换图库背景主题样式
function setGalleryTheme () {
    const tukuDialog = getEleById('tukuDialog')
    const themeVal = handlerStorage('theme') || 'default'
    const iconGray = getEleById('iconGray').style
    const iconWhite = getEleById('iconWhite').style
    const gallerysSelectCss = getEleById('gallerysSelectCss').style
    const galleryBtnCss = getEleByClass('galleryBtnCss')
    const pageInput = getEleById('pageInput')
    for (let a = 0; a < galleryBtnCss.length; a++) {
        galleryBtnCss[a].style.border = themeVal === 'default' ? '1px solid #409eff' : '1px solid white'
        galleryBtnCss[a].style.color = themeVal === 'default' ? '#409eff': 'white'
    }
    if (themeVal === 'default') {
        tukuDialog.style.background = 'white'
        tukuDialog.style.color = '#1c1b1b'
        tukuDialog.removeAttribute('class', 'thirdTheme')
        iconGray.display = 'inline-block'
        iconWhite.display = 'none'
        gallerysSelectCss.color = '#5a5858'
        pageInput.style.border = '1px solid #409eff'
        pageInput.style.color = '#6e6d6d'
    } else {
        tukuDialog.style.color = 'white'
        iconGray.display = 'none'
        iconWhite.display = 'inline-block'
        gallerysSelectCss.color = 'white'
        pageInput.style.border = '1px solid white'
        pageInput.style.color = 'white'
        assembleCode(themeVal, tukuDialog)
    }
}

// 插件商店地址
function setAddonsTheme () {
    const addonsAddress = getEleById('addonsAddress')
    const themeVal = handlerStorage('theme') || 'default'
    if (themeVal === 'default') {
        addonsAddress.style.background = 'white'
        addonsAddress.style.color = '#3a3a3a'
        addonsAddress.removeAttribute('class', 'thirdTheme')
        addonsAddress.style['backdrop-filter'] = ''
    } else {
        addonsAddress.style.color = 'white'
        assembleCode(themeVal, addonsAddress)
    }
}

// 合并代码
function assembleCode (themeVal, dialog) {
    if (themeVal === 'lucency') {
        dialog.style.background = 'transparent'
        dialog.removeAttribute('class', 'thirdTheme')
        dialog.style.border = '1px solid white'
        dialog.style['backdrop-filter'] = 'blur(35px)'
    } else if (themeVal === 'gradient') {
        dialog.style.background = ''
        dialog.setAttribute('class', 'thirdTheme')
        dialog.style.border = ''
        dialog.style['backdrop-filter'] = ''
    } else {
        dialog.style.background = '#363636'
        dialog.style.border = ''
        dialog.style['backdrop-filter'] = ''
        dialog.removeAttribute('class', 'thirdTheme')
    }
}

// 优化gpt聊天窗口高度自适应问题
function changeGPT_height () {
    const height = document.querySelector('#chatgptDialog').offsetHeight
    if (height !== 0) {
        const newHeight = height - 90
        // 获取iframe元素对象
        var iframe = getEleById("gptIframe");
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
    getEleById('typeSelect').style.display = 'none'
    getEleById('mask').style.opacity = 0.3
    getEleById('mask').style.zIndex = 0
    const addonsAddress = getEleById('addonsAddress')
    addonsAddress.style.display = 'none'
    const maskDom = getEleById('mask')
    maskDom.style.opacity = 0
    const searchTab = getEleById('searchTab')
    searchTab.style.zIndex = 1
    const typeDom = getEleById('typeSelect')
    typeDom.style.zIndex = 1
    getEleById('privacyDialog').style.display = 'none'
    getEleById('navBar').style.zIndex = 0
    const menuDom = getEleById('rightMenu')
    menuDom.style.display = 'none'
    hiddenSettingView()
}

/**
 * 初始化
 */
function createFunc () {
    // 初始化是否显示问候语
    setTimeout(() => {
        const greetVal = handlerStorage('greetContent')
        if (greetVal && greetVal.trim()) {
            popTip((new Date().getHours() < 12 ? '上午好, ' : new Date().getHours() < 20 ? '下午好，' : '晚上好，') + greetVal)
        }
    }, 500)
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

// 是否第一次使用
function isShowWelcomPage () {
    const curVal = handlerStorage('welcome')
    const dom = getEleById('welcomePage')
    const welcomeFirst = getEleById('welcomeFirst')
    const welcomeSecond = getEleById('welcomeSecond')
    const welcomeBtn = getEleById('welcomeBtn')
    if (!curVal) {
        dom.style.display = 'block'
        setTimeout(() => {
            animateCSS('#welcomeFirst', 'fadeOut')
            welcomeFirst.style.display = 'none'
            setTimeout(() => {
                animateCSS('#welcomeSecond', 'fadeIn')
                animateCSS('#welcomeBtn', 'fadeIn')
                welcomeSecond.style.display = 'block'
                welcomeBtn.style.display = 'block'
            }, 5);
        }, 4000);
    } else {
        // 版本更新提醒
        updateVersionTip()
        getEleById('searchTab').style.display = 'block'
    }
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
        if (!newVal || newVal === 'kaifazhe') {
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
        imgHandlerPhoto(newimgdata)
        const obj = {
            url: newimgdata
        }
        handlerStorage('imgObj', JSON.stringify(obj))
        // 清除选中效果
        const length = getEleByClass('jingtaiImg').length
        getEleById('greenRight').style.visibility = 'hidden'
    })
    document.querySelector('input[type="file"]').addEventListener('change', function() {
        var file = this.files[0];
        if (file.type.indexOf("image") === -1) {
            popTip('请上传图片类型', 3000, '#d52a2a')
            return
        }
        const num = file.size / 1024 / 1024
        if (num > 5) {
            popTip('请上传小于5M的图片', 3000, '#d52a2a')
            return
        }
        fileReader.readAsDataURL(file);
    });
}

function createObjectURL (blob){
    return window[window.webkitURL ? 'webkitURL' : 'URL']['createObjectURL'](blob);
};

function imgHandlerPhoto(url) {
    const backGroundVedio = getEleById('backGroundVedio')
    const bgImg = getEleById('backGroundImg');
    const fuzzinessDom = getEleById('fuzziness').style
    if (url.indexOf('mp4') === -1 || url.indexOf('base64') !== -1) {
        backGroundVedio.style.display = 'none'
        bgImg.style.display = 'block'
        bgImg.style.backgroundImage = `url(${url})`;
        animateCSS('#backGroundImg', 'fadeIn')
        bgImg.style.backgroundSize = 'cover';
        bgImg.style.width = '100%';
        bgImg.style.height = '100%';
        fuzzinessDom.display = 'block'
    } else {
        backGroundVedio.style.display = 'block'
        bgImg.style.display = 'none'
        backGroundVedio.src = url
        fuzzinessDom.display = 'none'
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
function popTip (tip, time=3000, color) {
    const tipMode = handlerStorage('tipMode') || 'pop'
    if (tipMode === 'pop') {
        const tempDom = getEleById('alertTip')
        tempDom.style.display = 'block'
        if (color) {
            tempDom.style.color = color
        } else {
            tempDom.style.color = 'rgb(58, 58, 58)'
        }
        tempDom.innerHTML = tip
        setTimeout(() => {
            tempDom.style.display = 'none'
        }, time)
    } else {
        Notification.requestPermission();
        new Notification('', {
            // image: "../icons/logo16.png",
            body: tip,
            // tag：代表通知的一个识别标签，相同tag时只会打开同一个通知窗口。
            icon: '../icons/logo128.png', //要在通知中显示的图标的URL。
            // image：要在通知中显示的图像的URL。
            //data: '轻羽标签页'//想要和通知关联的任务类型的数据。
            // requireInteraction：通知保持有效不自动关闭，默认为false。
        });
    }
}

// 根据查询类型去搜索
function searchText (e) {
    const type = handlerStorage('searchType') || 'baidu'
    const newTab = handlerStorage('newTabCheck') === 'true' ? '_blank' : '_self'
    const mode = handlerStorage('simpleCheck')
    let curVal = ''
    if (mode === 'true') {
        curVal = e?.target?.value || getEleById('simpleInput').value
    } else {
        curVal = e?.target?.value || getEleById('inputStr').value
    }
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
        const greenDom = getEleById('greenRight')
        // base64转新的blob地址(当前为本地上传的图片处理)
        if (url.indexOf('data:image') !== -1) {
            var newBlob = dataURLtoBlob(url)
            var blob = new Blob([newBlob], {type: "image/*"});
            var newUrl = URL.createObjectURL(blob);
            imgHandlerPhoto(newUrl)
            greenDom.style.visibility = 'hidden'
        } else {
            // 选中静态的 或者 随机图片 加载的处理
            imgHandlerPhoto(url)
            // 如果是静态，则选中(效果)
            if (url.indexOf('chrome-extension') !== -1) {
                const index = getItem(url).index
                greenDom.style.visibility = 'visible'
                handlerPhotoNumber(index)
            }
        }
    } else {
        // 如果没有缓存图片，则默认第一张静态图
        getEleById('backGroundImg').style.background = "url('../icons/firstPhoto.png')";
        getEleById('backGroundImg').style.backgroundSize = "cover";
        getEleById('greenRight').style.visibility = 'visible'
        handlerPhotoNumber(0)
        const imgObj = {
            url: getEleByClass('jingtaiImg')[0].src,
        }
        handlerStorage('imgObj', JSON.stringify(imgObj))
    }
}

function handlerPhotoNumber(index) {
    const dom = getEleById('greenRight').style
    if (index === 0) {
        dom.bottom = '150px'
        dom.left = '63px'
    } else if (index === 1) {
        dom.bottom = '150px'
        dom.left = '224px'
    } else if (index === 2) {
        dom.bottom = '60px'
        dom.left = '64px'
    } else if (index === 3) {
        dom.bottom = '60px'
        dom.left = '224px'
    } else if (index === 4) {
        dom.bottom = '-60px'
        dom.left = '64px'
    } else if (index === 5) {
        dom.bottom = '-60px'
        dom.left = '224px'
    } else if (index === 6) {
        dom.bottom = '-150px'
        dom.left = '64px'
    } else if (index === 7) {
        dom.bottom = '-150px'
        dom.left = '224px'
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
    const hr = new Date().getHours()
    const week = weekList[new Date().getDay()]
    const lunar_month_day = Draw()
    getEleById('dateStr').innerHTML = (hr < 12 ? '上午好' : hr < 20 ? '下午好' : '晚上好') + '，今天是农历' + lunar_month_day + '，' + week + '哦~'
}

// 解决时间显示时迟钝的问题
function littleTimeFunc () {
    var minutes = new Date().getMinutes() + ''
    minutes = minutes.length < 2 ? '0' + minutes : minutes
    curTime = new Date().getHours() + '<span id="seconds">:</span>' + minutes
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
    let curVal = handlerStorage('glassCheck')
    const num = curVal ? curVal : '3'
    curVal = event ? event.target.value : num
    if (Number(curVal) > 0) {
        curBack1.style.transform = 'scale(1.1) translateX(0)';
        curBack1.style.filter = 'blur(' + curVal + 'px) brightness(0.8)';
    } else {
        curBack1.style.transform = '';
        curBack1.style.filter = '';
    }
    handlerStorage('glassCheck', curVal)
    getEleById('glassRange').value = curVal
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

/**
 * 缓存获取与塞值
 * @param {*} key 
 * @param {*} value 
 * @returns 
 */
function handlerStorage (key, value) {
    if (value === undefined) {
        return localStorage.getItem(key)
    }
    return localStorage.setItem(key, value)
}

/**
 * 获取静态图片对象
 * @param {*} data 
 * @returns 
 */
function getItem (data) {
    const obj = imgList.find((item) => {
        return data.indexOf(item.dis) !== -1
    })
    return obj
}

/**
 * 组装图片库dom
 * @param {} rsp 
 */
function setGalleryContent (rsp) {
    if (rsp.count === 0) {
        popTip('此分类下当前页没有数据')
        return
    }
    progressFunc()
    if (rsp && rsp.list) {
        totalPage = rsp.total_page
        galleryList = [...rsp.list]
        let content = getEleById('insideContent')
        const gujiaScreen = getEleById('gujiaScreen')
        const childs = content.childNodes;
        for(var i = childs.length - 1; i >= 0; i--) { 
            content.removeChild(childs[i]); 
        }
        gujiaScreen.style.display = 'inline-block'
        rsp.list.forEach((item, index) => {
            const contentDiv = createEle('div')
            contentDiv.setAttribute('class', 'galleryPhotoCss')
            const grlleryCard = createEle('img')
            grlleryCard.setAttribute('class', 'grlleryCard')
            grlleryCard.src = item.url
            contentDiv.appendChild(grlleryCard)
            content.appendChild(contentDiv)
            grlleryCard.onclick = () => {
                // 背景图信息
                handlerStorage('viewFlag', false)
                const type = getEleById('gallerysSelectCss').value
                const temp = imgTypeMap.get(type)
                const obj = {
                    url: item.url,
                    title: item.tag + ` (${temp})`
                }
                handlerStorage('imgObj', JSON.stringify(obj))
                imgHandlerPhoto(item.url)
                // 清除掉选中效果
                getEleById('greenRight').style.visibility = 'hidden'
            }
        })
        content.style.display = 'none'
    }

}

/**
 * 调用相关接口进行查询
 * @param {*} urlStr 
 * @param {*} flag 
 */
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
                const obj = {
                    url: parseJson.data.url,
                    title: parseJson.data.title
                }
                handlerStorage('imgObj', JSON.stringify(obj))
                imgHandlerPhoto(parseJson.data.url)
            } else if (flag === 'poem') {
                // 诗词信息
                getEleById('jinrishici-sentence').innerText = parseJson.hitokoto
                getEleById('poemTitle').innerText = '《' + parseJson.from +'》'
                getEleById('author').innerText = parseJson.from_who
            } else if (flag === 'gallery') {
                setGalleryContent(parseJson.data)
            } else if (flag === 'weather') {
                const weatherText = getEleById('weatherText')
                const {type, high, low, tip, fengxiang} = parseJson.info
                const num = (new Date().getHours() < 20 && new Date().getHours() > 8) ? high : low
                const text = `${type}，${num}，${fengxiang} | ${parseJson.city}`
                weatherText.innerText = text
                weatherText.title = tip
            }
        }
      }
    };
    //第三步：发送请求
    httpRequest.send(null);
}
