console.log("Hello From Background Script")

let tabList = []
const readLocalStorage = async () => {
	await chrome.storage.local.get(['tabList']).then(res => {
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
	//console.log("tab listener")
	//console.log(tabList,changeInfo)
	if(changeInfo.tabStatus !== "complete"){
		return;
	}
	tabList = tabList.map(markedTab =>{
		if(markedTab.id === tabId){
			//tab need to updated
			//console.log("Updated")
			//console.log(markedTab)
			//console.table(tab)
			return tab;
		}else{
			return markedTab
		}
	})	
	await chrome.storage.local.set({ tabList })
}


const tabDetachListener = async(tabId, detachInfo) => {
	//console.log("tab detach listener")
	const tab = await chrome.tabs.get(tabId)
	tabList = tabList.map(markedTab =>{
		if(markedTab.id === tabId){
			//tab need to updated
			//console.log("Updated")
			//console.log(markedTab)
			//console.table(tab)
			return tab;
		}else{
			return markedTab
		}
	})	
	await chrome.storage.local.set({ tabList })
}

const recheckTabs = async()=>{
	console.log("Running 'recheckTabs'")
	
	const tabs = await chrome.tabs.query({})
	let newTabList = []
	console.log("Total tabs stored till now : ", tabList.length)
	console.log("Total tabs opened now : ", tabs.length)

	let updatedTabAvailable = false
	for(let tab of tabList){
		for(let currTab of tabs){
			updatedTabAvailable = false
			if(tab.url === currTab.url){
				console.log("url matched :", tab.url)
				console.log("index : ", tab.index , currTab.index)
				console.log("windowId : ", tab.windowId , currTab.windowId)

			}
			if(tab.url === currTab.url && tab.index === currTab.index){
				console.log("url and index both matched :", tab.url)
				console.log("index : ", tab.index , currTab.index)
				console.log("windowId : ", tab.windowId , currTab.windowId)
				newTabList.push(currTab)
				updatedTabAvailable = true
				break
			}else{
				//console.log("not matched :", tab.url)
				//console.log("index : ", tab.index , currTab.index)
				//newTabList.push(tab)
				//continue
			}
		}
		if(updatedTabAvailable){
		}else{
			newTabList.push(tab)
		}
	}
	console.log("new tablist length : " , newTabList.length);
	tabList = newTabList
	await chrome.storage.local.set({ tabList : newTabList})
}

const init = async () => {

	await chrome.storage.local.set({ allOk : false})
	console.log(tabList)
	await readLocalStorage()
	await recheckTabs()
	console.log(tabList)
	chrome.runtime.onMessage.addListener(messageListener)
	chrome.tabs.onUpdated.addListener(tabUpdateListener)
	chrome.tabs.onDetached.addListener(tabDetachListener)
	console.log("Total tabs stored till now : ", tabList.length)
	await chrome.storage.local.set({ allOk : true})
}


init()
