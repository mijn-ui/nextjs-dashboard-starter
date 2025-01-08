import { ReactNode } from "react"
import { AiFillProduct } from "react-icons/ai"
import { BsBarChartLineFill } from "react-icons/bs"
import {
  FaAddressBook,
  FaBalanceScale,
  FaCashRegister,
  FaCircle,
  FaDownload,
  FaGem,
  FaImage,
  FaList,
  FaPeopleCarry,
  FaShieldAlt,
  FaTags,
  FaTruck,
  FaUsers,
  FaWarehouse,
  FaWrench,
} from "react-icons/fa"
import {
  FaArrowTrendUp,
  FaCirclePlus,
  FaClockRotateLeft,
  FaShop,
  FaSquareMinus,
  FaSquarePlus,
  FaUserGroup,
} from "react-icons/fa6"
import { RxLoop } from "react-icons/rx"

/* -------------------------------------------------------------------------- */

const URLS = {
  CONTACTS_SUPPLIERS: "/contacts/suppliers",
  CONTACTS_SUPPLIERS_CREATE: "/contacts/suppliers/create",
  CONTACTS_CUSTOMERS: "/contacts/customers",
  CONTACTS_CUSTOMERS_CREATE: "/contacts/customers/create",
  CONTACTS_CUSTOMER_GROUP: "/contacts/customer-group",
  CONTACTS_IMPORT_CONTACTS: "/contacts/import-contacts",
  PRODUCT: "/product",
  PRODUCT_ADD: "/product/add",
  REPORTS_CURRENT_STOCK_BALANCE_PRODUCT:
    "/reports/current-stock-balance/product",
  VARIATION: "/variation",
  IMPORT_PRODUCT: "/import-product",
  PRODUCT_GALLERY: "/product/gallery",
  UNIT_CATEGORY: "/unit-category",
  CATEGORY: "/category",
  BRANDS: "/brands",
  WARRANTIES: "/warranties",
  MANUFACTURER: "/manufacturer",
  GENERIC: "/generic",
  PRICE_LIST_DETAIL: "/price-list-detail",
  IMPORT_PRICE_LIST: "/import/price-list",
  SELL_CREATE_PAGE: "/sell/create/page",
  SELL_ALL_SALES: "/sell/allSales/sales",
  SELL_SALES: "/sell/sales/sales",
  SELL_POS_SALES: "/sell/posSales/sales",
  POS_SELECT: "/pos/select",
  POS_REGISTER_LIST: "/pos/register/list",
  POS_SESSION_LIST: "/pos/session/list",
  OPENING_STOCK_LIST: "/openingStock/list",
  OPENING_STOCK: "/openingStock",
  IMPORT_OPENING_STOCK: "/import/openingStock",
  STOCK_TRANSFER: "/contacts/stock-transfer",
  STOCK_TRANSFER_CREATE: "/contacts/stock-transfer/create",
  STOCK_ADJUSTMENT: "/stock-adjustment",
  STOCK_ADJUSTMENT_CREATE: "/stock-adjustment/create",
  REPORTS_CURRENT_STOCK_BALANCE_INVENTORY:
    "/reports/current-stock-balance/inventory",
  STOCK_HISTORY_LIST: "/stock-history/list",
  PROFIT_LOSS_REPORT: "/profit-loss/report",
  SALE_PURCHASE_REPORT: "/sale-purchase/report",
  EXPENSE_REPORT: "/expense/report",
  ITEMS_REPORT: "/items/report",
  OPENING_STOCK_REPORT_SUMMARY: "/opening-stock/report/summary",
  OPENING_STOCK_REPORT_DETAIL: "/opening-stock/report/detail",
  REPORTS_SALES: "/reports/sales",
  REPORTS_SALES_DETAIL: "/reports/sales-detail",
  REPORTS_PURCHASE: "/reports/purchase",
  REPORTS_PURCHASE_DETAIL: "/reports/purchase-detail",
  REPORTS_STOCK_TRANSFER_REPORT: "/reports/stock-transfer-report",
  REPORTS_TRANSFER_DETAILS_REPORT: "/reports/transfer-details-report",
  REPORTS_STOCK_ADJUSTMENT_REPORT: "/reports/stock-adjustment-report",
  REPORTS_ADJUSTMENT_DETAILS_REPORT: "/reports/adjustment-details-report",
  REPORTS_CURRENT_STOCK_BALANCE_REPORT: "/reports/current-stock-balance/report",
  REPORTS_ALERT_QUANTITY: "/reports/alert-quantity",
  REPORTS_ALERT_EXPIRE: "/reports/alert-expire",
}

/* -------------------------------------------------------------------------- */

export type SidebarListsType = {
  icon?: ReactNode
  title: string
  list?: {
    name: string
    link: string
  }[]
  link?: string
}

export type SidebarDataType = {
  title: string
  icon?: ReactNode
  contentTitle: string
  lists: SidebarListsType[]
}

export const SidebarData: SidebarDataType[] = [
  {
    title: "Contacts",
    icon: <FaAddressBook />,
    contentTitle: "CONTACTS",
    lists: [
      {
        icon: <FaPeopleCarry />,
        title: "Suppliers",
        list: [
          { name: "Suppliers List", link: URLS.CONTACTS_SUPPLIERS },
          { name: "Add Supplier", link: URLS.CONTACTS_SUPPLIERS_CREATE },
        ],
      },
      {
        icon: <FaUserGroup />,
        title: "Customers",
        list: [
          { name: "Customer List", link: URLS.CONTACTS_CUSTOMERS },
          { name: "Add Customer", link: URLS.CONTACTS_CUSTOMERS_CREATE },
        ],
      },
      {
        icon: <FaUsers />,
        title: "Customer Groups",
        list: [
          { name: "Customer groups List", link: URLS.CONTACTS_CUSTOMER_GROUP },
        ],
      },
      {
        icon: <FaDownload />,
        title: "Import Contacts",
        link: URLS.CONTACTS_IMPORT_CONTACTS,
      },
    ],
  },
  {
    title: "Products",
    icon: <AiFillProduct />,
    contentTitle: "PRODUCTS",
    lists: [
      { icon: <FaList />, title: "List Products", link: URLS.PRODUCT },
      { icon: <FaCirclePlus />, title: "Add Products", link: URLS.PRODUCT_ADD },
      {
        icon: <FaArrowTrendUp />,
        title: "Current Stocks",
        link: URLS.REPORTS_CURRENT_STOCK_BALANCE_PRODUCT,
      },
      { icon: <FaCircle />, title: "Variation", link: URLS.VARIATION },
      {
        icon: <FaDownload />,
        title: "Import Product",
        link: URLS.IMPORT_PRODUCT,
      },
      {
        icon: <FaImage />,
        title: "Import Gallery",
        link: URLS.PRODUCT_GALLERY,
      },
      { icon: <FaBalanceScale />, title: "Unit", link: URLS.UNIT_CATEGORY },
      { icon: <FaTags />, title: "Category", link: URLS.CATEGORY },
      { icon: <FaGem />, title: "Brand", link: URLS.BRANDS },
      { icon: <FaShieldAlt />, title: "Warranties", link: URLS.WARRANTIES },
      { icon: <FaWrench />, title: "Manufacturer", link: URLS.MANUFACTURER },
      { icon: <FaTags />, title: "Generic", link: URLS.GENERIC },
      { icon: <FaCircle />, title: "Price List", link: URLS.PRICE_LIST_DETAIL },
      {
        icon: <FaDownload />,
        title: "Import Price List",
        link: URLS.IMPORT_PRICE_LIST,
      },
    ],
  },
  {
    title: "Sell",
    icon: <FaShop />,
    contentTitle: "SALES ORDER",
    lists: [
      {
        icon: <FaSquarePlus />,
        title: "Add Sale",
        link: URLS.SELL_CREATE_PAGE,
      },
      { icon: <FaList />, title: "All Sale", link: URLS.SELL_ALL_SALES },
      { icon: <FaList />, title: "Sale List", link: URLS.SELL_SALES },
      { icon: <FaList />, title: "POS Sale List", link: URLS.SELL_POS_SALES },
    ],
  },
  {
    title: "POS",
    icon: <FaCashRegister />,
    contentTitle: "POINT OF SALE",
    lists: [
      { icon: <FaCashRegister />, title: "POS", link: URLS.POS_SELECT },
      {
        icon: <FaList />,
        title: "POS Register List",
        link: URLS.POS_REGISTER_LIST,
      },
      { icon: <FaList />, title: "POS Sessions", link: URLS.POS_SESSION_LIST },
    ],
  },
  {
    title: "Inventory",
    icon: <FaWarehouse />,
    contentTitle: "INVENTORY",
    lists: [
      {
        icon: <FaDownload />,
        title: "Opening Stock",
        list: [
          { name: "List Opening Stocks", link: URLS.OPENING_STOCK_LIST },
          { name: "Add Opening Stock", link: URLS.OPENING_STOCK },
          { name: "Import Opening Stock", link: URLS.IMPORT_OPENING_STOCK },
        ],
      },
      { icon: <FaSquarePlus />, title: "Stock In", list: [] },
      { icon: <FaSquareMinus />, title: "Stock Out", list: [] },
      {
        icon: <FaTruck />,
        title: "Stock Transfer",
        list: [
          { name: "Stock Transfer List", link: URLS.STOCK_TRANSFER },
          { name: "Create Stock Transfer", link: URLS.STOCK_TRANSFER_CREATE },
        ],
      },
      {
        icon: <RxLoop />,
        title: "Stock Adjustment",
        list: [
          { name: "Adjustment List", link: URLS.STOCK_ADJUSTMENT },
          { name: "Create Adjustment", link: URLS.STOCK_ADJUSTMENT_CREATE },
        ],
      },
      {
        icon: <FaArrowTrendUp />,
        title: "Current Stocks",
        link: URLS.REPORTS_CURRENT_STOCK_BALANCE_INVENTORY,
      },
      {
        icon: <FaClockRotateLeft />,
        title: "Stocks History",
        link: URLS.STOCK_HISTORY_LIST,
      },
    ],
  },
  {
    title: "Reports",
    icon: <BsBarChartLineFill />,
    contentTitle: "REPORTS",
    lists: [
      { title: "Profit/Loss Report", link: URLS.PROFIT_LOSS_REPORT },
      { title: "Purchase & Sales Report", link: URLS.SALE_PURCHASE_REPORT },
      { title: "Expense Report", link: URLS.EXPENSE_REPORT },
      { title: "Item Report", link: URLS.ITEMS_REPORT },
      {
        title: "Opening Stock Report",
        list: [
          {
            name: "Opening Stock Summary",
            link: URLS.OPENING_STOCK_REPORT_SUMMARY,
          },
          {
            name: "Opening Stock Detail",
            link: URLS.OPENING_STOCK_REPORT_DETAIL,
          },
        ],
      },
      {
        title: "Sales Reports",
        list: [
          { name: "Sales Summary", link: URLS.REPORTS_SALES },
          { name: "Sales Detail", link: URLS.REPORTS_SALES_DETAIL },
        ],
      },
      {
        title: "Purchase Reports",
        list: [
          { name: "Purchase Summary", link: URLS.REPORTS_PURCHASE },
          { name: "Purchase Detail", link: URLS.REPORTS_PURCHASE_DETAIL },
        ],
      },
      {
        title: "Inventory Reports",
        list: [
          {
            name: "Stock Transfer Summary",
            link: URLS.REPORTS_STOCK_TRANSFER_REPORT,
          },
          {
            name: "Stock Transfer Details",
            link: URLS.REPORTS_TRANSFER_DETAILS_REPORT,
          },
          {
            name: "Stock Adjustment Summary",
            link: URLS.REPORTS_STOCK_ADJUSTMENT_REPORT,
          },
          {
            name: "Stock Adjustment Details",
            link: URLS.REPORTS_ADJUSTMENT_DETAILS_REPORT,
          },
          {
            name: "Current Stock Balance",
            link: URLS.REPORTS_CURRENT_STOCK_BALANCE_REPORT,
          },
          { name: "Stock History", link: URLS.STOCK_HISTORY_LIST },
        ],
      },
      {
        title: "Stock Alerts",
        list: [
          { name: "Quantity Alert", link: URLS.REPORTS_ALERT_QUANTITY },
          { name: "Expire Alert", link: URLS.REPORTS_ALERT_EXPIRE },
        ],
      },
    ],
  },
]

/* -------------------------------------------------------------------------- */

export const isExistingUrl = (url: string): boolean => {
  return SidebarData.some((data) =>
    data.lists.some(
      (list) =>
        list.link === url || list.list?.some((item) => item.link === url),
    ),
  )
}

/* -------------------------------------------------------------------------- */

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
