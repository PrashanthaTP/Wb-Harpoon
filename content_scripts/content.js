const bodyNode = document.querySelector("html")
const toastNode = document.createElement("p");

document.body.style.position = "relative"

const createToast = () => {
    toastNode.classList.add("tab-toast")
    toastNode.innerText = "Tab Marked Succesfully!"
    document.body.appendChild(toastNode)

    const toastStyle = {
        "visibility": "hidden",
        "position": "fixed",
        "fontSize": "1rem",
        "textAlign": "center",
        "padding": "0.5rem",
        "background": "black",
        "color": "white",
        "minWidth": "16rem",
        "marginLeft": "-8rem",
        "bottom": "5rem",
        "left": "50%",
        "zIndex": "5",
        "opacity": "0",
        "borderRadius": "0.3rem"
    }

    Object.assign(toastNode.style, toastStyle)
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
    //console.log("(content script): Message Received : from <-" + senderInfo);
    sendResponse({
        message: "response from content script : message received ",
        received: message,
    });
});

const addTab = async () => {
    //const [tab] = await chrome.tabs.query({active:true,currentWindow:true})
    //tabs api not available in content script
    const response = await chrome.runtime.sendMessage({ 'type': 'GET_ACTIVETAB' })
    // console.log(response.tab)

}
let isValidPress = false
document.addEventListener('keydown', (e) => {
    //console.log(e.key)
    if (e.key === 'a' && isValidPress) {
        //console.log("A pressed")
        addTab()
        toastNode.style.visibility = "visible"
        toastNode.animate([{ opacity: 0, transform: `translateY(0)` },
        { opacity: 1, transform: `translateY(10px)` },
        { opacity: 0, offset: 0.8 }],
            { duration: 3000, iterations: 1 })
        isValidPress = false
    }
    if (e.shiftKey && e.key === 'E') {
        isValidPress = true;
        //console.log("Shift + E")
        setTimeout(() => {
            isValidPress = false
        }, 1000)
    }
})


const init = () => {
    createToast()
}

init()
