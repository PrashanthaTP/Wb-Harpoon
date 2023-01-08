console.log(document.title + " : Hello From Content Script");

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
	let senderInfo = sender.tab ? "content script : " + sender.tab.url : "extension"
	console.log( "(content script): Message Received : from <-" + senderInfo );
    sendResponse({
        message: "response from content script : message received ",
        received: message,
    });
});
