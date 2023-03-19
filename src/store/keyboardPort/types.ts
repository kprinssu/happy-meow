export interface PortInfo {
  vendorId: string;
  productId: string;
  path: string;
  pnpId: string;
}

export interface KeyboardPortState {
  selectedPort: PortInfo;
  allPorts: PortInfo[];
}
