# TabStash

## What it does

Displays a button in the menu bar with three functions:
1. Left-clicking on the button causes a popup menu to open
2. Ctrl+Left-clicking on the button bookmarks the current tab in a bookmarks folder called TabStash and closes the tab
3. Ctrl+Shift+Left-clicking on the button opens a new tab, sets that tab's URL to the URL of the oldest bookmark in the TabStash folder, then deletes that bookmark

In effect, this creates a queue data structure which tabs can be added to and removed from.

The intent is to preserve any tab that I don't currently want to deal with in a way that guarentees that I will come back to it before revisiting any tab that was stashed afterwards.

## Plans
Currently the basic stashing and retrieving functionality works as desired.  Plans will be divided into tasks that need to be complete before releasing this extension, and tasks that can be completed after releasing the extension.
### Pre-Release
- Make the brower action's popup useful in some way, or remove it.
- Add error handling so that no unexpected behavior occurs when Promises fail, or if the bookmark folder is empty or removed, etc.
- Display the number of stashed tabs on the browser action.
### Post-Release
- Add a settings page
- Allow users to change the shortcuts used to stash and retrieve tabs
- Implement shortcuts to stash and retrieve tabs that rely only on the keyboard (no clicking on the browser action)
