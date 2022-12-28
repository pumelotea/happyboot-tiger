importScripts('https://cdnjs.cloudflare.com/ajax/libs/highlight.js/11.7.0/highlight.min.js')


onmessage = (data) => {
    const result = hljs.highlightAuto(data.data)
    const rData = {
        language:result.language,
        value:result.value
    }
    self.postMessage(JSON.stringify(rData))
}

onerror = (err) => {}

// // 在 worker 中关闭自己
// self.close()