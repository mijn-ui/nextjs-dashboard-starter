import { IconType } from "react-icons"
import { AiFillProduct } from "react-icons/ai"
import { BsBarChartLineFill, BsKanbanFill } from "react-icons/bs"
import { FaAddressBook, FaChartLine, FaList, FaPeopleCarry, FaWarehouse } from "react-icons/fa"
import { FaCashRegister, FaCirclePlus, FaShop, FaSquareMinus, FaSquarePlus, FaUserGroup } from "react-icons/fa6"
import { MdDashboard } from "react-icons/md"
import { SIDEBAR_URLS } from "./url-data"

/* -------------------------------------------------------------------------- */

export type SidebarListsType = {
  id: string
  icon?: IconType
  title: string
  list?: {
    id: string
    name: string
    link: string
  }[]
  link?: string
}

export type SidebarDataType = {
  id: string
  title: string
  icon?: IconType
  category: string
  lists: SidebarListsType[]
}

export const SidebarData: SidebarDataType[] = [
  {
    id: "dashboard",
    title: "Dashboard",
    icon: MdDashboard,
    category: "DASHBOARD",
    lists: [
      {
        id: "dashboard-overview",
        icon: FaChartLine,
        title: "Overview",
        link: SIDEBAR_URLS.DASHBOARD.OVERVIEW,
      },
      {
        id: "dashboard-products",
        icon: AiFillProduct,
        title: "Products",
        list: [
          {
            id: "products-list",
            name: "Products List",
            link: SIDEBAR_URLS.DASHBOARD.PRODUCTS,
          },
          {
            id: "add-products",
            name: "Add Products",
            link: SIDEBAR_URLS.DASHBOARD.PRODUCTS_NEW,
          },
        ],
      },
      {
        id: "dashboard-kanban",
        title: "Kanban",
        icon: BsKanbanFill,
        link: SIDEBAR_URLS.DASHBOARD.KANBAN,
      },
    ],
  },
  {
    id: "contacts",
    title: "Contacts",
    icon: FaAddressBook,
    category: "CONTACTS",
    lists: [
      {
        id: "suppliers",
        icon: FaPeopleCarry,
        title: "Suppliers",
        list: [
          { id: "suppliers-list", name: "Suppliers List", link: SIDEBAR_URLS.CONTACTS.SUPPLIERS },
          { id: "add-supplier", name: "Add Supplier", link: SIDEBAR_URLS.CONTACTS.SUPPLIERS_CREATE },
        ],
      },
      {
        id: "customers",
        icon: FaUserGroup,
        title: "Customers",
        list: [
          { id: "customers-list", name: "Customer List", link: SIDEBAR_URLS.CONTACTS.CUSTOMERS },
          { id: "add-customer", name: "Add Customer", link: SIDEBAR_URLS.CONTACTS.CUSTOMERS_CREATE },
        ],
      },
    ],
  },

  {
    id: "sell",
    title: "Sell",
    icon: FaShop,
    category: "SALES ORDER",
    lists: [
      { id: "add-sale", icon: FaSquarePlus, title: "Add Sale", link: SIDEBAR_URLS.SELL.CREATE_PAGE },
      { id: "all-sale", icon: FaList, title: "All Sale", link: SIDEBAR_URLS.SELL.ALL_SALES },
    ],
  },
  {
    id: "pos",
    title: "POS",
    icon: FaCashRegister,
    category: "POINT OF SALE",
    lists: [{ id: "pos-select", icon: FaCashRegister, title: "POS", link: SIDEBAR_URLS.POS.SELECT }],
  },
  {
    id: "inventory",
    title: "Inventory",
    icon: FaWarehouse,
    category: "INVENTORY",
    lists: [
      { id: "stock-in", icon: FaSquarePlus, title: "Stock In", list: [] },
      { id: "stock-out", icon: FaSquareMinus, title: "Stock Out", list: [] },
    ],
  },
  {
    id: "reports",
    title: "Reports",
    icon: BsBarChartLineFill,
    category: "REPORTS",
    lists: [
      { id: "profit-loss-report", title: "Profit/Loss Report", link: SIDEBAR_URLS.REPORTS.PROFIT_LOSS },
      { id: "purchase-sales-report", title: "Purchase & Sales Report", link: SIDEBAR_URLS.REPORTS.SALE_PURCHASE },
      {
        id: "sales-reports",
        title: "Sales Reports",
        list: [
          { id: "sales-summary", name: "Sales Summary", link: SIDEBAR_URLS.REPORTS.SALES },
          { id: "sales-detail", name: "Sales Detail", link: SIDEBAR_URLS.REPORTS.SALES_DETAIL },
        ],
      },
    ],
  },
]
