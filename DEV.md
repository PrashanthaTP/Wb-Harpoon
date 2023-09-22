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

