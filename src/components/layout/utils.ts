import { SidebarData } from "./_data/sidebar-data"
import { URLS } from "./_data/url-data"

export const isExistingUrl = (url: string): boolean => {
  return Object.entries(URLS).some(([_, value]) => value === url)
}

/* -------------------------------------------------------------------------- */

/**
 * Retrieves the active sidebar information based on the provided URL.
 *
 * This function iterates through the `SidebarData` to find the matching URL
 * and returns the corresponding title, index, and collapsible index.
 *
 * @param url - The URL to match against the sidebar data.
 * @returns An object containing the title, index, and collapsible index
 *          if a match is found, otherwise `undefined`.
 * @returns title - The title of the matched item.
 * @returns index - The index of the matched item in the `SidebarData`.
 * @returns collapsibleIndex - The index of the collapsible list if applicable, otherwise `-1`.
 */

export const getSidebarActiveInfo = (url: string) => {
  for (const data of SidebarData) {
    for (const list of data.lists) {
      if (list.link === url) {
        return {
          title: list.title,
          index: SidebarData.indexOf(data),
          collapsibleIndex: -1,
        }
      }
      if (list.list) {
        for (const item of list.list) {
          if (item.link === url) {
            return {
              title: item.name,
              index: SidebarData.indexOf(data),
              collapsibleIndex: data.lists.indexOf(list),
            }
          }
        }
      }
    }
  }
  return undefined
}
