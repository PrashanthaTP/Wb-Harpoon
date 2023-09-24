console.log("Hello From Background Script")

let tabList = []
chrome.storage.local.get(['tabList']).then(res=>{
	if(res.tabList){
		tabList = res.tabList
	}
})
chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
	//let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log(message)
	switch (message.type) {
		case "GET_ACTIVETAB":
			(async() => {
				const [currTab] = await chrome.tabs.query({ active: true, currentWindow: true })

				for(let tab of tabList){
					if(tab.id===currTab.id){
						sendResponse({ currTab })
						return true;
					}
				}
				tabList.push(currTab)
				chrome.storage.local.set({tabList})
				sendResponse({ currTab })
			})()
			//sendResponse({tab:"hi"})
			return true
		default:
			break
	}
	//sendResponse({ message: "response from background script : message received ", received: message })
});

