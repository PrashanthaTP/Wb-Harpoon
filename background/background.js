console.log("Hello From Background Script")

let tabList = []
const readLocalStorage = () => {
	chrome.storage.local.get(['tabList']).then(res => {
		if (res.tabList) {
			tabList = res.tabList
		}
	})
}

const setLocalStorage = async (k,value) => {
	await chrome.storage.local.set({k,value})
}

const messageListener = (message, sender, sendResponse) => {
	//let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log(message)
	switch (message.type) {
		case "RELOAD_TABLIST_FROM_STORAGE":
			(async () => {
				await readLocalStorage()
				sendResponse({ "res": "DONE" });
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
				await chrome.storage.local.set({tabList})
				//await setLocalStorage("tabList", tabList )
				sendResponse({ currTab })
			})()
			//sendResponse({tab:"hi"})
			return true
		default:
			break
	}
	//sendResponse({ message: "response from background script : message received ", received: message })
}


const tabUpdateListener = async(tabId, changeInfo, tab) => {
	console.log("tab listener")
	console.log(tabList,changeInfo)
	if(changeInfo.tabStatus !== "complete"){
		return;
	}
	tabList = tabList.map(markedTab =>{
		if(markedTab.id === tabId){
			//tab need to updated
			console.log("Updated")
			console.log(markedTab)
			console.table(tab)
			return tab;
		}else{
			return markedTab
		}
	})	
	await chrome.storage.local.set({ tabList })
}


const tabDetachListener = async(tabId, detachInfo) => {
	console.log("tab detach listener")
	const tab = await chrome.tabs.get(tabId)
	tabList = tabList.map(markedTab =>{
		if(markedTab.id === tabId){
			//tab need to updated
			console.log("Updated")
			console.log(markedTab)
			console.table(tab)
			return tab;
		}else{
			return markedTab
		}
	})	
	await chrome.storage.local.set({ tabList })
}

const init = async () => {

	console.log(tabList)
	await readLocalStorage()
	console.log(tabList)
	chrome.runtime.onMessage.addListener(messageListener)
	chrome.tabs.onUpdated.addListener(tabUpdateListener)
	chrome.tabs.onDetached.addListener(tabDetachListener)
}


init()
