console.log("Hello From Popup");

const tabListNode = document.querySelector(".tab-list")
const templateNode = document.querySelector("#template-tab-list-item")
chrome.storage.local.get(["tabList"]).then((res)=>{
    for(let tab of res.tabList){
	let tabItem = templateNode.content.cloneNode(true)
	let img = tabItem.querySelector(".tab-favicon")
	let link = tabItem.querySelector(".tab-link")
	let desc = tabItem.querySelector(".tab-desc")
	img.src = tab.favIconUrl
	link.href = tab.url
	link.textContent = tab.url.split("/").pop()
	desc.textContent = tab.title
	tabListNode.appendChild(tabItem)
    }
})

