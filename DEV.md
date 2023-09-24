# Dev

## Keypress event
+ [Stackoverflow: Capturing key combinations in JS]( https://stackoverflow.com/questions/16006583/capturing-ctrlz-key-combination-in-javascript)


## Message Passing

### Asynchronous sendResponse

+ [Chrome : docs/extensions/mv3/messaging](https://developer.chrome.com/docs/extensions/mv3/messaging/#simple)

> If you want to asynchronously use sendResponse(),
> add return true; to the onMessage event handler.
+ [Mozilla: API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse](https://developer.mozilla.org/en-US/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage#sending_an_asynchronous_response_using_sendresponse)

> Note return true; in the listener: this tells the browser that 
> you intend to use the sendResponse argument after the listener has returned.

> Warning: Do not prepend async to the function. That changes the meaning to
> sending an asynchronous response using a promise, which is effectively the
> same as sendResponse(true).

+ [Stackoverflow: Response not send](https://stackoverflow.com/questions/20077487/chrome-extension-message-passing-response-not-sent)

> So you just need to add return true; after the call to getUrls 
> to indicate that you'll call the 
> response function asynchronously.



## Template Element

+ [Mozilla : Docs on template](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/template)


## Nodes

+ [Stackoverflow: Closest selector](https://stackoverflow.com/questions/70195994/event-target-dataset-returning-undefined-javascript)


## Popup

+ [Stackoverflow: Links in Popup](https://stackoverflow.com/questions/34734175/pure-html-chrome-extension-link-not-working#:~:text=Why%20aren't%20the%20links%20working%3F&text=Any%20link%20in%20the%20popup,click%20listener%20that%20executes%20chrome.)
+ [Stackoverflow: New tab without closing popup](https://stackoverflow.com/questions/29542742/chrome-extension-open-new-tab-without-losing-popup-focus/)

## Context Invalidated
+ [Stackoverflow: avoid extension context invalidation](https://stackoverflow.com/questions/53939205/how-to-avoid-extension-context-invalidated-errors-when-messaging-after-an-exte)
  * Refresh web page


## Styling in JS

+ [Stackoverflow: Change css property in JS](https://stackoverflow.com/questions/15241915/how-to-change-css-property-using-javascript)

## Animations in JS

+ [Mozilla Docs on Web Animations Api](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API/Using_the_Web_Animations_API)
+ [Stackoverflow: how-to-dynamically-create-keyframe-css-animations](https://stackoverflow.com/a/67586908)

## Tabs

+ [Stackoverflow : Check if tab with given id exists](https://stackoverflow.com/questions/16571393/the-best-way-to-check-if-tab-with-exact-id-exists-in-chrome#:~:text=tabs.,')%3B%20%7D%20%7D)%3B)
