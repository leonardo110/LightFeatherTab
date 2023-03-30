const row = document.querySelector('.container')
const input = document.querySelector('.inputText')
const sk = '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'
let inputDataStr
let msgList = []
// 获取sk内容
function getFile() {
    const xhr = new XMLHttpRequest()
    xhr.open('GET', './sk', false)
    xhr.overrideMimeType('text/html;charset=utf-8')
    xhr.send(null)
    return xhr.responseText
}

// 获取数据
function linkChatGPT() {
    const xhr = new XMLHttpRequest()
    const url = 'https://api.openai.com/v1/chat/completions'

    xhr.open('POST', url, true)
    xhr.setRequestHeader('Authorization', `Bearer ${sk}`)
    xhr.setRequestHeader('Content-Type', 'application/json')
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const json = JSON.parse(xhr.responseText)
            let response = String(json.choices[0].message.content)
            msgList.push(response)
            let index = 0
            answer.innerHTML = ''
            const lre = /^[\r\n]+/gi
            response = response.replace(lre, '')
            // response = handlerStr(response)
            const timer = setInterval(() => {
                answer.innerHTML += response[index]
                index++
                
                if (index === response.length) {
                    clearInterval(timer)
                }
                // 持续滚动到当前最底部
                document.querySelector('.gptMain').scrollTop = document.querySelector('.gptMain').scrollHeight;
            }, 50)
        }
    }

    const data = JSON.stringify({
        messages: [{ role: 'user', content: inputDataStr }],
        max_tokens: 2048,
        temperature: 0.5,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
        model: 'gpt-3.5-turbo',
    })

    xhr.send(data)
}

//渲染页面
function render() {
    // inputDataStr = String(input.value)
    //判断输入内容是否为空
    if (inputDataStr != '') {
        //创建元素
        let request = document.createElement('div')
        request.className = 'request'

        let question = document.createElement('p')
        question.className = 'question'
        question.innerText = `${input.value}`

        // 创建头像
        avatar1 = document.createElement('img')
        avatar1.className = 'avatar1'
        avatar1.src = '../icons/suijitouxiang.svg'

        input.value = ''
        request.appendChild(avatar1)
        request.appendChild(question)
        row.appendChild(request)
        request.style.height = `${question.offsetHeight}px`

        response = document.createElement('div')
        response.className = 'response'
        // 创建头像
        avatar2 = document.createElement('img')
        avatar2.className = 'avatar2'
        avatar2.src = '../icons/chatgpt.jpg'

        answer = document.createElement('p')
        answer.className = 'answer'
        answer.innerText = '请稍等…'
        response.appendChild(avatar2)
        response.appendChild(answer)
        row.appendChild(response)
    }
}

// 处理数据，清除文中换行符
function parseData(data) {
    const reN = /^[\r\n]+/gi
    const reR = /[\r\n]+$/gi
    if (data.match(reN)) {
        data = data.replaceAll(reN, '')
    }
    if (data.match(reR)) {
        data = data.replaceAll(reR, '')
    }
    return data
}
// 清空内容
window.addEventListener("storage", function (e) {
    if (e.key === 'clearGpt' && handlerStorage('clearGpt') === 'true') {
        msgList = []
    }
})
// 缓存获取与塞值
function handlerStorage (key, value) {
    if (value === undefined) {
        return localStorage.getItem(key)
    }
    return localStorage.setItem(key, value)
}
// 功能事件
setTimeout(() => {
    if (input) {
        input.onkeyup = (event) => {
            if (event.keyCode === 13) {
                const temp = event.target.value
                render()
                if (temp != '') {
                    document.querySelector('.gptMain').scrollTop = document.querySelector('.gptMain').scrollHeight;
                    msgList.push(temp)
                    inputDataStr = msgList.join('\n\n')
                    linkChatGPT()
                }
            }
        }
    }
}, 0)
