import { IconType } from "react-icons"
import { AiFillProduct } from "react-icons/ai"
import { BsBarChartLineFill } from "react-icons/bs"
import {
  FaAddressBook,
  FaList,
  FaPeopleCarry,
  FaWarehouse,
} from "react-icons/fa"
import {
  FaCashRegister,
  FaCirclePlus,
  FaShop,
  FaSquareMinus,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6"
import { SIDEBAR_URLS } from "./url-data"

/* -------------------------------------------------------------------------- */

export type SidebarListsType = {
  icon?: IconType
  title: string
  list?: {
    name: string
    link: string
  }[]
  link?: string
}

export type SidebarDataType = {
  title: string
  icon?: IconType
  category: string
  lists: SidebarListsType[]
}

export const SidebarData: SidebarDataType[] = [
  {
    title: "Contacts",
    icon: FaAddressBook,
    category: "CONTACTS",
    lists: [
      {
        icon: FaPeopleCarry,
        title: "Suppliers",
        list: [
          { name: "Suppliers List", link: SIDEBAR_URLS.CONTACTS_SUPPLIERS },
          {
            name: "Add Supplier",
            link: SIDEBAR_URLS.CONTACTS_SUPPLIERS_CREATE,
          },
        ],
      },
      {
        icon: FaUserGroup,
        title: "Customers",
        list: [
          { name: "Customer List", link: SIDEBAR_URLS.CONTACTS_CUSTOMERS },
          {
            name: "Add Customer",
            link: SIDEBAR_URLS.CONTACTS_CUSTOMERS_CREATE,
          },
        ],
      },
    ],
  },
  {
    title: "Products",
    icon: AiFillProduct,
    category: "PRODUCTS",
    lists: [
      { icon: FaList, title: "List Products", link: SIDEBAR_URLS.PRODUCT },
      {
        icon: FaCirclePlus,
        title: "Add Products",
        link: SIDEBAR_URLS.PRODUCT_ADD,
      },
    ],
  },
  {
    title: "Sell",
    icon: FaShop,
    category: "SALES ORDER",
    lists: [
      {
        icon: FaSquarePlus,
        title: "Add Sale",
        link: SIDEBAR_URLS.SELL_CREATE_PAGE,
      },
      { icon: FaList, title: "All Sale", link: SIDEBAR_URLS.SELL_ALL_SALES },
    ],
  },
  {
    title: "POS",
    icon: FaCashRegister,
    category: "POINT OF SALE",
    lists: [
      { icon: FaCashRegister, title: "POS", link: SIDEBAR_URLS.POS_SELECT },
    ],
  },
  {
    title: "Inventory",
    icon: FaWarehouse,
    category: "INVENTORY",
    lists: [
      { icon: FaSquarePlus, title: "Stock In", list: [] },
      { icon: FaSquareMinus, title: "Stock Out", list: [] },
    ],
  },
  {
    title: "Reports",
    icon: BsBarChartLineFill,
    category: "REPORTS",
    lists: [
      { title: "Profit/Loss Report", link: SIDEBAR_URLS.PROFIT_LOSS_REPORT },
      {
        title: "Purchase & Sales Report",
        link: SIDEBAR_URLS.SALE_PURCHASE_REPORT,
      },
      {
        title: "Sales Reports",
        list: [
          { name: "Sales Summary", link: SIDEBAR_URLS.REPORTS_SALES },
          { name: "Sales Detail", link: SIDEBAR_URLS.REPORTS_SALES_DETAIL },
        ],
      },
    ],
  },
]
