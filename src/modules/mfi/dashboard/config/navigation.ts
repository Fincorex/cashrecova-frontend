export interface NavItem {
  id: string;
  label: string;
  icon: string;
  path: string;
  children?: { id: string; label: string; path: string }[];
}

export const navigation: NavItem[] = [
  {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'solar:home-2-bold-duotone',
      path: '/dashboard'
  },
  {
    id: 'loans',
    label: 'Loans',
    icon: 'solar:hand-money-bold-duotone',
    path: '/dashboard/loans',
    children: [                                             
      { id: 'all-loans',        label: 'All Loans',          path: '/dashboard/loans' },
      { id: 'create-loan',      label: 'Create Loan',        path: '/dashboard/loans/create' },
      { id: 'loan-applications',label: 'Loan Applications',  path: '/dashboard/loans/applications' },
      { id: 'products',         label: 'Products',           path: '/dashboard/loans/products' },
    ]
  },
  {
      id: 'disbursements',
      label: 'Disbursements',
      icon: 'solar:card-send-bold-duotone',
      path: '/dashboard/disbursements'
  },
  {
      id: 'repayments',
      label: 'Repayments',
      icon: 'solar:refresh-bold-duotone',
      path: '/dashboard/repayments'
  },
  {
      id: 'recovery',
      label: 'Recovery',
      icon: 'solar:shield-warning-bold-duotone',
      path: '/dashboard/recovery'
  },
  {
      id: 'wallet',
      label: 'Wallet',
      icon: 'solar:wallet-bold-duotone',
      path: '/dashboard/wallet'
  },
  {
      id: 'transactions',
      label: 'Transactions',
      icon: 'solar:transfer-horizontal-bold-duotone',
      path: '/dashboard/transactions'
  },
  {
      id: 'mandates',
      label: 'Mandates',
      icon: 'solar:document-add-bold-duotone',
      path: '/dashboard/mandates'
  },
  {
      id: 'credit-insights',
      label: 'Credit Insights',
      icon: 'solar:chart-square-bold-duotone',
      path: '/dashboard/credit-insights'
  },
  {
      id: 'billing',
      label: 'Billing',
      icon: 'solar:bill-list-bold-duotone',
      path: '/dashboard/billing'
  },
  {
      id: 'organizations',
      label: 'Organizations',
      icon: 'solar:users-group-rounded-bold-duotone',
      path: '/dashboard/organizations'
  },
  {
      id: 'api-integrations',
      label: 'API & Integrations',
      icon: 'solar:code-bold-duotone',
      path: '/dashboard/api-integrations'
  },
  {
      id: 'settings',
      label: 'Settings',
      icon: 'solar:settings-bold-duotone',
      path: '/dashboard/settings'
  }
];
