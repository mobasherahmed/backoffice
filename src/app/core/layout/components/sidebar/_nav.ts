
export const navItems: INavData[] = [
  { name: 'Overview', icon: 'house', url: '/overview' },
  { name: 'Upgrade Requests', icon: 'cloud-upload', url: '/upgrade-requests' },
  { name: 'Product Management', icon: 'box-seam', url: '/product-management' },
  { name: 'Cash Accounts', icon: 'cash-stack', url: '/cash-accounts' },
  { name: 'Portfolio Accounts', icon: 'people', url: '/portfolio-accounts' },
  { name: 'Price Control', icon: 'graph-up', url: '/price-control' },
  { name: 'Funds Activities', icon: 'activity', url: '/funds-activities' },
  { name: 'Clients', icon: 'person-circle', url: '/clients' },
  { name: 'Roles', icon: 'key', url: '/roles' },
  { name: 'KYC', icon: 'shield-lock', url: '/kyc' },
  { name: 'Transaction', icon: 'receipt', url: '/transaction' },
  { name: 'Fees & Market Setup', icon: 'currency-exchange', url: '/fees-market-setup' },
  { name: 'Cash Withdrawals', icon: 'cash', url: '/cash-withdrawals' },
  { name: 'Withdrawals Limits', icon: 'limit', url: '/withdrawals-limits' },
  { name: 'Bank Accounts', icon: 'bank', url: '/bank-accounts' },
  { name: 'Reports', icon: 'file-earmark-text', url: '/reports' },
  { name: 'Support', icon: 'headset', url: '/support' },
  { name: 'Notifications', icon: 'bell', url: '/notifications' },
  { name: 'Settings', icon: 'gear', url: '/settings' }
];

export interface INavData {
  name?: string;
  url?: string;
  iconComponent?: { name: string };
  badge?: { color: string; text: string };
  title?: boolean;
  linkProps?: { fragment: string };
  children?: INavData[];
  class?: string;
  icon?: string;
  attributes?: { target: string };
}