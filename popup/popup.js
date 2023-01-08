console.log("Hello From Popup");

const updateBtn = document.querySelector("#update-btn");
const updateCurrentTab = async () => {
    const [tab] = await chrome.tabs.query({
        active: true,
        lastFocusedWindow: true,
	} );

	if ( !tab ) {
		console.error("Tab not found...")
		return;
	}
    const responseFromContenScript = await chrome.tabs.sendMessage(tab.id, {
        message: "hello world",
    });
    console.log(responseFromContenScript);
    const responseFromBackgroundScript = await chrome.runtime.sendMessage({
        message: "hello world",
    });
    console.log(responseFromBackgroundScript);
};
updateBtn.addEventListener("click", () => updateCurrentTab());
