console.log("Hello From Background Script")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log( "(background script): Message Received : from <-" + senderInfo );
	sendResponse({message:"response from background script : message received ",received:message})
});
