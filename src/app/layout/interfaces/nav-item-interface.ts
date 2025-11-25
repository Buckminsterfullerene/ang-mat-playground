export interface NavItem {
  label: string;
  icon: string;
  link?: string;
  external?: boolean;
  // Sub-items array for dropdowns
  subItems?: NavItem[];
}
