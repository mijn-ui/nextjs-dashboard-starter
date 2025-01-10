const ADMIN_URL = "/dashboard"

const SIDEBAR_URLS = {
  CONTACTS_SUPPLIERS: "/contacts/suppliers",
  CONTACTS_SUPPLIERS_CREATE: "/contacts/suppliers/create",
  CONTACTS_CUSTOMERS: "/contacts/customers",
  CONTACTS_CUSTOMERS_CREATE: "/contacts/customers/create",
  PRODUCT: "/product",
  PRODUCT_ADD: "/product/add",
  SELL_CREATE_PAGE: "/sell/create/page",
  SELL_ALL_SALES: "/sell/allSales/sales",
  POS_SELECT: "/pos/select",
  OPENING_STOCK_LIST: "/openingStock/list",
  STOCK_TRANSFER: "/contacts/stock-transfer",
  STOCK_TRANSFER_CREATE: "/contacts/stock-transfer/create",
  STOCK_ADJUSTMENT: "/stock-adjustment",
  REPORTS_CURRENT_STOCK_BALANCE_PRODUCT: "/reports/current-stock-balance/product",
  REPORTS_SALES: "/reports/sales",
  REPORTS_SALES_DETAIL: "/reports/sales-detail",
  PROFIT_LOSS_REPORT: "/profit-loss/report",
  SALE_PURCHASE_REPORT: "/sale-purchase/report",
}

const URLS = {
  ...SIDEBAR_URLS,
  ADMIN_URL,
}

export { SIDEBAR_URLS, ADMIN_URL, URLS }
