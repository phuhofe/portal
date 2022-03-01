export interface Sort {
  label: string;
  param: string;
  value: string;
  key: string;
}

export interface Filter {
  label: string;
  param: string;
  value: string;
  key: string;
}

export const sortItems: Array<Sort> = [
  {label: 'Sort by', param: null, value: null, key: 'sortBy'},
  {label: 'Date of birth', param: 'birth_date', value: 'desc', key: 'dateOfBirth'},
  {label: 'Date of death', param: 'death_date', value: 'desc', key: 'dateOfDeath'},
];

export const filterItems: Array<Filter> = [
  {label: 'Filter by', param: null, value: null, key: 'filterBy'},
  {label: 'Memorial page', param: 'memorial_page', value: 'desc', key: 'memorialPage'},
  {label: 'Have donations', param: 'having_donation', value: 'true', key: 'haveDonation'},
  {label: 'Has death notice', param: 'having_death_notice', value: 'true', key: 'hasDeathNotice'},
  {label: 'Has flower shop', param: 'having_flower_shop', value: 'Home', key: 'hasFlowerShop'},
];
