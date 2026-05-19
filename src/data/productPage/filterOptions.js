// src/data/productsPage/filterOptions.js

export const CATEGORY_OPTIONS = [
  ['all',      'All garments'],
  ['thobes',   'Thobes'],
  ['kanduras', 'Kanduras'],
  ['bishts',   'Bishts'],
  ['jubbas',   'Jubbas'],
]

export const FABRIC_OPTIONS = [
  ['all',        'All fabrics'],
  ['cotton',     'Cotton'],
  ['linen',      'Linen'],
  ['wool',       'Wool'],
  ['wool-blend', 'Wool blend'],
  ['silk-blend', 'Silk blend'],
]

export const PRICE_OPTIONS = [
  ['all',       'Any'],
  ['u1000',     'Under $1,000'],
  ['1000-2000', '$1,000 – $2,000'],
  ['2000+',     '$2,000 and above'],
]

export const OCCASION_OPTIONS = [
  ['all',      'Any occasion'],
  ['everyday', 'Everyday'],
  ['festive',  'Festive · Eid'],
  ['wedding',  'Wedding'],
  ['business', 'Business · Diplomatic'],
]

export const SORT_OPTIONS = [
  { v: 'featured',   label: 'Featured' },
  { v: 'new',        label: 'Newest' },
  { v: 'price-asc',  label: 'Price: Low to High' },
  { v: 'price-desc', label: 'Price: High to Low' },
]

export const SEARCH_PLACEHOLDERS = [
  'Search "ivory thobe"…',
  'Try "bisht with gold"',
  'Search "linen kandura"',
  'Try "wedding"',
  'Search "Saudi thobe"',
]

export const DEFAULT_FILTERS = {
  category: 'all',
  fabric:   'all',
  price:    'all',
  occasion: 'all',
}