export interface PokemonCard {
  id: string;
  name: string;
  set: string;
  number: string;
  type: string;
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Ultra Rare' | 'Secret Rare';
  condition: 'Mint' | 'Near Mint' | 'Lightly Played' | 'Moderately Played' | 'Heavily Played';
  price: number;
  imageUrl: string;
  backImageUrl?: string;
  description?: string;
  isForSale: boolean;
  isForTrade: boolean;
  isFeatured?: boolean;
}

export interface TradeRequest {
  id: string;
  userCard: string;
  wantedCard: string;
  message: string;
  userEmail: string;
  status: 'pending' | 'accepted' | 'declined';
}

export interface ContactMessage {
  name: string;
  email: string;
  message: string;
}

export interface SellTradeForm {
  cardName: string;
  set: string;
  condition: string;
  price?: number;
  wantedTrade?: string;
  description: string;
  images: File[];
}