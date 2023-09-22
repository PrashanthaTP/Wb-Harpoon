console.log(document.title + " : Hello From Content Script");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
    console.log("(content script): Message Received : from <-" + senderInfo);
    sendResponse({
        message: "response from content script : message received ",
        received: message,
    });
});

const addTab = async ()=>{
    //const [tab] = await chrome.tabs.query({active:true,currentWindow:true})
    //tabs api not available in content script
    const response = await chrome.runtime.sendMessage({'type': 'GET_ACTIVETAB'})
    console.log(response.tab)

}
let isValidPress = false
document.addEventListener('keydown', (e) => {
    console.log(e.key)
    if(e.key === 'a' && isValidPress){
        console.log("A pressed")
        addTab()
        isValidPress = false
    }
    if (e.shiftKey && e.key === 'E') {
        isValidPress = true;
        console.log("Shift + E")
        setTimeout(()=>{
            isValidPress = false
        },1000)
    }
})
