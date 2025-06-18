import { PokemonCard } from '../types/pokemon';

export const mockPokemonCards: PokemonCard[] = [
  {
    id: '1',
    name: 'Charizard',
    set: 'Base Set',
    number: '4/102',
    type: 'Fire',
    rarity: 'Ultra Rare',
    condition: 'Near Mint',
    price: 350.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: true,
    isFeatured: true,
    description: 'Classic Base Set Charizard in excellent condition. One of the most iconic Pokémon cards ever printed.'
  },
  {
    id: '2',
    name: 'Pikachu',
    set: 'Yellow Cheeks Promo',
    number: 'PROMO',
    type: 'Electric',
    rarity: 'Rare',
    condition: 'Mint',
    price: 120.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: false,
    isFeatured: true,
    description: 'Rare promotional Pikachu with yellow cheeks variant in perfect condition.'
  },
  {
    id: '3',
    name: 'Blastoise',
    set: 'Base Set',
    number: '2/102',
    type: 'Water',
    rarity: 'Ultra Rare',
    condition: 'Near Mint',
    price: 280.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: true,
    isFeatured: true,
    description: 'Beautiful Base Set Blastoise in near mint condition with sharp corners and centering.'
  },
  {
    id: '4',
    name: 'Venusaur',
    set: 'Base Set',
    number: '15/102',
    type: 'Grass',
    rarity: 'Ultra Rare',
    condition: 'Lightly Played',
    price: 180.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: true,
    description: 'Base Set Venusaur with minor play wear but still displays beautifully.'
  },
  {
    id: '5',
    name: 'Gyarados',
    set: 'Team Rocket',
    number: '13/82',
    type: 'Water',
    rarity: 'Rare',
    condition: 'Near Mint',
    price: 45.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: true,
    description: 'Team Rocket Gyarados with beautiful artwork and great condition.'
  },
  {
    id: '6',
    name: 'Mewtwo',
    set: 'Base Set',
    number: '10/102',
    type: 'Psychic',
    rarity: 'Rare',
    condition: 'Mint',
    price: 85.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: false,
    isForTrade: true,
    description: 'Perfect condition Base Set Mewtwo, looking for specific trades only.'
  },
  {
    id: '7',
    name: 'Alakazam',
    set: 'Base Set',
    number: '1/102',
    type: 'Psychic',
    rarity: 'Rare',
    condition: 'Near Mint',
    price: 65.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: false,
    description: 'Clean Base Set Alakazam with minimal wear and great centering.'
  },
  {
    id: '8',
    name: 'Machamp',
    set: 'Base Set',
    number: '8/102',
    type: 'Fighting',
    rarity: 'Rare',
    condition: 'Moderately Played',
    price: 25.00,
    imageUrl: 'https://images.pexels.com/photos/1040160/pexels-photo-1040160.jpeg?auto=compress&cs=tinysrgb&w=400',
    isForSale: true,
    isForTrade: true,
    description: 'Base Set Machamp with moderate play wear, great for budget collectors.'
  }
];

export const pokemonTypes = [
  'All Types',
  'Fire',
  'Water', 
  'Electric',
  'Grass',
  'Psychic',
  'Fighting',
  'Dark',
  'Steel',
  'Fairy'
];

export const rarityLevels = [
  'All Rarities',
  'Common',
  'Uncommon', 
  'Rare',
  'Ultra Rare',
  'Secret Rare'
];

export const conditionLevels = [
  'All Conditions',
  'Mint',
  'Near Mint',
  'Lightly Played',
  'Moderately Played',
  'Heavily Played'
];