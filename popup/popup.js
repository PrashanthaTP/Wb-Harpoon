console.log("Hello From Popup");

const tabListNode = document.querySelector(".tab-list")
const templateNode = document.querySelector("#template-tab-list-item")
const messageNode = document.querySelector("#message")

let mapNodeTab = {}
let tabList = []
const init = async () => {
	//await is here important
	await chrome.storage.local.get(["tabList"]).then((res) => {
		console.log(tabList)
		tabList = res.tabList;
		if(tabList.length===0){
			messageNode.style.display = "block"	
			messageNode.innerText = "No tabs to show. Start marking tabs by Shift + e , a"
		}else{
			messageNode.style.display = "none"	
		}
		for (let tab of res.tabList) {
			let tabItem = templateNode.content.cloneNode(true)
			let img = tabItem.querySelector(".tab-favicon")
			let link = tabItem.querySelector(".tab-link")
			let desc = tabItem.querySelector(".tab-desc")
			img.src = tab.favIconUrl
			link.href = tab.url
			link.textContent = tab.url.replace(/\/$/, "").split("/").pop().substring(0,25) + " ...";
			
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

	tabListNode.addEventListener('click',async(e)=>{
		let isDeleteButton = e.target.tagName==="BUTTON" && e.target.classList.contains("tab-delete")
		let isDeleteIcon = e.target.tagName==="I" && e.target.closest(".tab-delete")!==null
		if(isDeleteButton || isDeleteIcon){
			console.log("Clicked")
			const parent = e.target.closest("[data-id]")
			tabList = tabList.filter(tab=>{
				console.log(tab.id,parent.dataset.id)
				return tab.id !== Number.parseInt(parent.dataset.id)
			})
			console.log(tabList.length)
			await chrome.storage.local.set({tabList})
			tabListNode.innerHTML = ""
			init()
		}
	})

}
await init()
//setEventHandler requires tablist to be populated
//so init should be complete
setEventHandler()
