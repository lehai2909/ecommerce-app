// Type definitions for the ecommerce app

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  description: string;
  category: string;
  rating: number;
  stock: number;
}

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export interface HeaderProps {
  showBackButton?: boolean;
}



