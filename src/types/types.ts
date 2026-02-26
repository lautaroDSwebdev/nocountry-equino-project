export interface Data {
  data: string;
  id?: number | void;
}
export interface ChildrenType {
  children: React.ReactNode;
}

export interface namesFormulariRegister {
  dni: string;
  name: string;
  lastname: string;
  email: string;
  password: string;
  rol: string;
}
export interface namesFormulariLogin {
  email: string;
  password: string;
}


export interface FilterHorses {
  breed: string;
  moreSales: number;
  temperament: string;
  moreAgeThan3: string
  age: number;
  // ofertas
  installments: string;
  // velocidad de envios
  shipping: string;
}
export interface HorsesEntity {
  id: number
  name: string
  image: string
  breed: string;
  price: number;
  sales: number;
  moreAgeThan3: string
  temperament: string;
  age: string;
  // ofertas
  installments: string;
  // velocidad de envios
  shipping: string;
}


export interface LoginResponseType {
  access_token: string
  token_type: string
  expires_in: number
  user: User
}

export interface User {
  id: number
  dni: string
  name: string
  last_name: string
  email: string
  number: any
  address: any
  rol: string
  created_at: string
}
