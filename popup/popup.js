console.log("Hello From Popup");

const tabListNode = document.querySelector(".tab-list")
const templateNode = document.querySelector("#template-tab-list-item")

let mapNodeTab = {}
const init = async () => {
	//await is here important
	await chrome.storage.local.get(["tabList"]).then((res) => {
		for (let tab of res.tabList) {
			let tabItem = templateNode.content.cloneNode(true)
			let img = tabItem.querySelector(".tab-favicon")
			let link = tabItem.querySelector(".tab-link")
			let desc = tabItem.querySelector(".tab-desc")
			img.src = tab.favIconUrl
			link.href = tab.url
			link.textContent = tab.url.replace(/\/$/, "").split("/").pop()
			desc.textContent = tab.title
			tabItem.querySelector("li[data-id]").dataset.id = tab.id
			tabListNode.appendChild(tabItem)
			mapNodeTab[tab.id] = tab
		}
	})
}

const setEventHandler = () => {
	//console.log(tabListNode)
	//console.log(tabListNode.querySelectorAll(".tab-desc"))
	tabListNode.querySelectorAll(".tab-desc").forEach(elem => {
		//console.log(elem)

		elem.addEventListener('click', async (e) => {
			//if (e.target.tagName === 'P') {
			//const link = e.target.querySelector(".tab-link")
			const parent = e.target.closest("[data-id]")
			//console.log(parent.dataset.id)
			await chrome.tabs.update(Number.parseInt(parent.dataset.id), { active: true })
			await chrome.windows.update(mapNodeTab[parent.dataset.id].windowId, { focused: true })
			//}
		})
	})

}
await init()
//setEventHandler requires tablist to be populated
//so init should be complete
setEventHandler()
