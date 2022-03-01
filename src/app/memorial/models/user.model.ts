export interface User {
  birthDate: string;
  deathDate: string;
  firstName: string;
  lastName: string;
  photoUrl: string;
  deathCity: string;
  memorialPageCreated: boolean;
  flowerShopActivated: boolean;
  donationActivated: boolean;
  publishOnWebDate: string;
  hideDeathDate: boolean;
  memorialPage: {
    visible: boolean,
    url: string
  },
  donation: {
    visible: boolean,
    url: string
  },
  flowerShop: {
    visible: boolean,
    url: string
  },
  deathNotice: {
    visible: boolean,
    url: string
  },
}
