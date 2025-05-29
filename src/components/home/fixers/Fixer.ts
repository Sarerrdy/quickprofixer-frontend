export interface Address {
  id: number;
  addressLine: string;
  landmark: string | null;
  town: string;
  lga: string;
  state: string;
  zipCode: string | null;
  country: string;
}

export interface Fixer {
  id: string;
  firstName: string;
  middleName?: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  addressId: number;
  address: Address;
  imgUrl?: string;
  specializationId: number;
  specializationName: string;
  certifications: string;
  verificationDocument: string;
  isVerified: boolean;
  rating: number;
  location: string;
  isAvailable: boolean;
  reviews: string;
  experienceYears: number;
  portfolio: string;
  rateType: string;
  rate: number;
}