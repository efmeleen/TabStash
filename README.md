# TabStash

## Overview
Have you ever kept a tab open because you were worried that you might never come back to it if you saved it to your bookmarks?

The goal of this extension is to allow you to close those tabs with the confidence that you will eventually come back to them. It accomplishes this by allowing you to "stash" tabs in a queue (stored in your bookmarks). You can retrieve tabs from this queue later.

## What it does
TabStash displays a button in the menu bar with three functions:
1. Left-clicking on the button causes a popup menu to open (no functionality currently)
2. Ctrl+Left-clicking on the button puts saves the tab to the back of the queue and closes the tab
3. Ctrl+Shift+Left-clicking on the button opens a new tab, navigates to the URL of the tab at the front of the queue, and then removes that tab from the queue

The extension stores its queue in the browsers bookmarks to prevent any issues that could arise if the extension stops working or is removed. This also allows your queue to be synchronized between browsers by the same means the rest of your bookmarks are synchronized.

The intended use of this extension is to stash any tab that you don't want to deal with immediately in a way that guarantees that you will revisit it before revisiting any tab that was stashed afterwards.

## Plans
Currently the basic stashing and retrieving functionality works as desired.  Plans will be divided into tasks that need to be completed before releasing this extension, and tasks that can be completed after releasing the extension.
### Pre-Release
- Make the brower action's popup useful in some way, or remove it.
- Add error handling so that no unexpected behavior occurs when Promises fail, or if the bookmark folder is empty or removed, etc.
- New Icons
### Post-Release
- Add a settings page
- Allow users to change the shortcuts used to stash and retrieve tabs
- Allow shortcuts that rely only on the keyboard (no clicking on the browser action needed)
