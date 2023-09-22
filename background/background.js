console.log("Hello From Background Script")

let tabList = []
chrome.runtime.onMessage.addListener( (message, sender, sendResponse) => {
	//let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log(message)
	switch (message.type) {
		case "GET_ACTIVETAB":
			(async() => {
				const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
				tabList.push(tab)
				sendResponse({ tab })
			})()
			//sendResponse({tab:"hi"})
			return true
		default:
			break
	}
	//sendResponse({ message: "response from background script : message received ", received: message })
});

