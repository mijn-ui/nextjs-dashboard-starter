const SIDEBAR_URLS = {
  DASHBOARD: {
    DASHBOARD: "/dashboard",
    OVERVIEW: "/dashboard/overview",
    PRODUCTS: "/dashboard/product",
    PRODUCTS_NEW: "/dashboard/product/new",
    KANBAN: "/dashboard/kanban",
  },
  CONTACTS: {
    SUPPLIERS: "/contact/suppliers",
    SUPPLIERS_CREATE: "/contact/suppliers/create",
    CUSTOMERS: "/contact/customers",
    CUSTOMERS_CREATE: "/contact/customers/create",
  },
  SELL: {
    CREATE_PAGE: "/sell/create/page",
    ALL_SALES: "/sell/allSales/sales",
  },
  POS: {
    SELECT: "/pos/select",
    TRANSACTIONS: "/pos/transactions",
    REPORTS: "/pos/reports",
  },
  STOCK: {
    OPENING_LIST: "/openingStock/list",
    TRANSFER: "/contacts/stock-transfer",
    TRANSFER_CREATE: "/contacts/stock-transfer/create",
    ADJUSTMENT: "/stock-adjustment",
  },
  REPORTS: {
    CURRENT_STOCK_BALANCE_PRODUCT: "/reports/current-stock-balance/product",
    SALES: "/reports/sales",
    SALES_DETAIL: "/reports/sales-detail",
    PROFIT_LOSS: "/profit-loss/report",
    SALE_PURCHASE: "/sale-purchase/report",
  },
}

const URLS = {
  ...SIDEBAR_URLS.DASHBOARD,
  ...SIDEBAR_URLS.CONTACTS,
  ...SIDEBAR_URLS.SELL,
  ...SIDEBAR_URLS.POS,
  ...SIDEBAR_URLS.STOCK,
  ...SIDEBAR_URLS.REPORTS,
}

export { SIDEBAR_URLS, URLS }
