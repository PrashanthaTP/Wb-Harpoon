console.log("Hello From Background Script")

let tabList = []
const readLocalStorage = () => {
	chrome.storage.local.get(['tabList']).then(res => {
		if (res.tabList) {
			tabList = res.tabList
		}
	})
}
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	//let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log(message)
	switch (message.type) {
		case "RELOAD_TABLIST_FROM_STORAGE":
			(async ()=>{
				await readLocalStorage()
				sendResponse({"res":"DONE"});
			})()	
			break
		case "GET_ACTIVETAB":
			(async () => {
				const [currTab] = await chrome.tabs.query({ active: true, currentWindow: true })

				console.log(tabList)
				for (let tab of tabList) {
					if (tab.id === currTab.id) {
						console.log("Duplicate tab")
						sendResponse({ currTab })
						return true;
					}
				}
				tabList.push(currTab)
				//await chrome.storage.local.set({tabList})
				chrome.storage.local.set({ tabList })
				sendResponse({ currTab })
			})()
			//sendResponse({tab:"hi"})
			return true
		default:
			break
	}
	//sendResponse({ message: "response from background script : message received ", received: message })
});

const init = async()=>{
	await readLocalStorage()
}

init()
