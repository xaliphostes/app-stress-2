import { FolderApi } from "tweakpane";

/**
 * Allows to let only one folder (from the gui) to be open.
 */
export class FolderSwitcher {
    private folders: FolderApi[] = []

    addFolder(folder: FolderApi) {
        this.folders.push(folder)
        // folder.on('click', (e) => {
        // }
        folder.element.addEventListener('click', e => {
            this.open(folder.title)
        })
    }

    open(name: string) {
        this.folders.forEach( folder => {
            if (folder.title === name) {
                folder.expanded = true
            }
            else {
                folder.expanded = false
            }
        })
    }

    openFirst() {
        this.folders.forEach( folder => {
            folder.expanded = false
        })
        this.folders[0].expanded = true
    }
}