let bookmarkFolderId = undefined;

// Get the extension's bookmark folder id. If it doesn't exist, create it
browser.bookmarks.search({title: "TabStash", url: undefined}).then((results) => {
    if(results.length == 0){
        // create it, then assign its ID to bookmarkFolderId
        browser.bookmarks.create({title: "TabStash", url: undefined}).then((node) => {bookmarkFolderId = node.id}).then(updateBrowserActionStashSize)
    }else if(results.length == 1){
        // assign it to bookmarkFolder for easy access
        console.log("FOUND FOLDER")
        bookmarkFolderId = results[0].id
        console.log(bookmarkFolderId)
        updateBrowserActionStashSize()
    }else{
        //something has gone wrong
        console.log("THERE ARE MULTIPLE FOLDERS")
    }
}) //TODO: maybe a failure in this can appear in the extension's popup "failed to find or create bookmark folder"

// TODO: call this after the folder is created/found to initialize the badge
// TODO: Maybe display the actual number in the popup? In the case of 99+ this could be useful
// Sets the badge text of the browser action to the size of the stash
function updateBrowserActionStashSize(){
    if(bookmarkFolderId != undefined){
        browser.bookmarks.getSubTree(bookmarkFolderId).then((tree) => {
            if(tree.length == 1){
                if(tree[0].children.length == 0){
                    browser.browserAction.setBadgeText({text: ""})
                }else if(tree.length > 99){
                    browser.browserAction.setBadgeText({text: "99+"})
                }else{
                    browser.browserAction.setBadgeText({text: String(tree[0].children.length)})
                }
            }
        })
    }
}

/* 
 * Bookmark the current tab
 * If the bookmarking was successful, close the tab
 */
function stashCurrentTab(){
    // Get the current tab
    const querying = browser.tabs.query({currentWindow: true, active: true});
    
    // Bookmark the current tab, then close it if the bookmark was created successfully
    querying.then((tabs) => {
        if(tabs.length > 0){
            browser.bookmarks.create({
                parentId: bookmarkFolderId,
                title: tabs[0].title,
                url: tabs[0].url
            }).then(() => 
                {
                    browser.tabs.remove(tabs[0].id).then(updateBrowserActionStashSize)
                }
            );
            //TODO: Add fail condition here in case extension's folder has been deleted
            //TODO: figure out whether "index" parameter in create can be modified by the user sorting the folder
        }
    });

}

/* Identify the oldest bookmark in the stash
 * Create a new tab with that bookmark's URL
 * If tab creation was successful, delete the bookmark
 */
//TODO: what if the stash is empty?
function retrieveOldestTab(){
    browser.bookmarks.getSubTree(bookmarkFolderId).then((result) => 
    {
        if(result.length == 1){
            const oldestBookmark = result[0].children.reduce((oldestChildFound, currentChild) => {
                return currentChild.dateAdded < oldestChildFound.dateAdded ? currentChild : oldestChildFound;
            })
            // console.log(result[0])
            // console.log(oldestBookmark)
            //TODO: Handle if there are no bookmarks in the folder

            browser.tabs.create({
                active: true,
                url: oldestBookmark.url
            }).then(() => {
                browser.bookmarks.remove(oldestBookmark.id).then(updateBrowserActionStashSize)
            })
        }else{
            //TODO: something has gone wrong, the folder is gone?
        }
    })
}

/* 
 * If browser action is Shift+Ctrl+clicked, retrieve the oldest tab in the stash 
 */
 function browserActionClickHandler(tab, data){
    if(data.modifiers.includes("Shift") && data.modifiers.includes("Ctrl")){
        retrieveOldestTab()
    }else if(data.modifiers.includes("Ctrl")){
        stashCurrentTab()
    }else{
        // Need to do it this way because the browserActionClick event won't fire if the browser action has a popup
        browser.browserAction.setPopup({ popup: "popup/popup.html" });
        browser.browserAction.openPopup();
        browser.browserAction.setPopup({ popup: null });
    }
}

browser.browserAction.onClicked.addListener(browserActionClickHandler);
