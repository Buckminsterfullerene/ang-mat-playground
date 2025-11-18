export interface NavItem {
  label: string;
  icon: string;
  link?: string;
  // Sub-items array for dropdowns
  subItems?: NavItem[];
}
