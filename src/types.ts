export interface BadgeInfo {
  text: string;
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  variant: 'gold' | 'verified' | 'amber' | 'crimson' | 'azure' | 'purple' | 'cinematic' | 'tamahagane' | 'inset';
}

export interface Sword {
  id: string;
  code: string;
  name: string;
  japaneseName?: string;
  subtitle: string;
  price: number;
  loyaltyPoints?: number;
  badge?: BadgeInfo;
  status: string;
  statusType: 'stock' | 'loyalty' | 'warning' | 'dispatch';
  imageUrl: string;
  category: 'katana' | 'wakizashi' | 'iaito' | 'antique' | 'custom' | 'authentication' | 'collectible';
  steel: string;
  bladeShape?: string;
  lockingMechanism?: string;
  handleMaterial?: string;
  nagasa: string;
  sori: string;
  hamon: string;
  tsuka: string;
  saya: string;
  tsuba: string;
  smith: string;
  origin: string;
  era: string;
  certificate: 'Nihonto Verified' | 'NBTHK Eligible' | 'Guild Certified' | 'Tamahagane Grade' | 'Collector Edition';
  brand: string;
  weight: string;
  balancePoint: string;
  fullDescription: string;
  inStock: boolean;
}

export interface CartItem {
  sword: Sword;
  quantity: number;
}

export type FilterCategory =
  | 'all'
  | 'katana'
  | 'wakizashi'
  | 'iaito'
  | 'antique'
  | 'custom'
  | 'authentication'
  | 'talk-to-us';
