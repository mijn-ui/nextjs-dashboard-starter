import { SidebarData } from "./_data/sidebar-data"
import { URLS } from "./_data/url-data"

export const isExistingUrl = (url: string): boolean => {
  return Object.values(URLS).includes(url)
}

/* -------------------------------------------------------------------------- */

/**
 * Retrieves the active sidebar information based on the provided URL.
 *
 * This function iterates through the `SidebarData` to find the matching URL
 * and returns the corresponding title, id, and collapsibleId.
 *
 * @param url - The URL to match against the sidebar data.
 * @returns An object containing the title, id, and collapsibleId
 *          if a match is found, otherwise `undefined`.
 * @returns title - The title of the matched item.
 * @returns id - The id of the matched item in the `SidebarData`.
 * @returns collapsibleId - The id of the collapsible list if applicable, otherwise `null`.
 */

export const getSidebarActiveInfo = (url: string) => {
  for (const data of SidebarData) {
    for (const list of data.lists) {
      if (list.link === url) {
        return {
          title: list.title,
          id: data.id,
          collapsibleId: null,
        }
      }
      if (list.list) {
        for (const item of list.list) {
          if (item.link === url) {
            return {
              title: item.name,
              id: data.id,
              collapsibleId: list.id,
            }
          }
        }
      }
    }
  }
  return undefined
}
