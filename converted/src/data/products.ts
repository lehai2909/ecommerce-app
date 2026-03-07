import { Product } from "../types";

// Sample ecommerce product data with images, prices, and descriptions
export const products: Product[] = [
  {
    id: 1,
    name: "Wireless Bluetooth Headphones",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop",
    description:
      "Premium noise-cancelling wireless headphones with 30-hour battery life",
    category: "Electronics",
    rating: 4.5,
    stock: 15,
  },
  {
    id: 2,
    name: "Smartphone Pro Max",
    price: 999.99,
    image:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=500&h=500&fit=crop",
    description:
      "Latest flagship smartphone with 256GB storage, triple camera system, and 5G connectivity",
    category: "Electronics",
    rating: 4.8,
    stock: 8,
  },
  {
    id: 3,
    name: 'Laptop Ultra 15"',
    price: 1299.99,
    image:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=500&h=500&fit=crop",
    description:
      "High-performance laptop with Intel i7 processor, 16GB RAM, 512GB SSD, and dedicated graphics",
    category: "Computers",
    rating: 4.7,
    stock: 12,
  },
  {
    id: 4,
    name: "Smart Watch Series 8",
    price: 349.99,
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=500&h=500&fit=crop",
    description:
      "Advanced fitness tracking smartwatch with heart rate monitor, GPS, and 7-day battery life",
    category: "Wearables",
    rating: 4.6,
    stock: 20,
  },
  {
    id: 5,
    name: "Wireless Earbuds Pro",
    price: 199.99,
    image:
      "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=500&h=500&fit=crop",
    description:
      "True wireless earbuds with active noise cancellation and spatial audio",
    category: "Electronics",
    rating: 4.4,
    stock: 25,
  },
  {
    id: 6,
    name: '4K Ultra HD TV 55"',
    price: 699.99,
    image:
      "https://images.unsplash.com/photo-1517077304055-6e89abbf09b0?w=500&h=500&fit=crop",
    description:
      "55-inch 4K Smart TV with HDR, Dolby Vision, and built-in streaming apps",
    category: "Electronics",
    rating: 4.5,
    stock: 6,
  },
  {
    id: 7,
    name: "Gaming Mechanical Keyboard",
    price: 129.99,
    image:
      "https://images.unsplash.com/photo-1541140532154-b024d705b90a?w=500&h=500&fit=crop",
    description:
      "RGB backlit mechanical keyboard with Cherry MX switches and programmable keys",
    category: "Computers",
    rating: 4.6,
    stock: 18,
  },
  {
    id: 8,
    name: "Wireless Gaming Mouse",
    price: 79.99,
    image:
      "https://images.unsplash.com/photo-1527814050087-3793815479db?w=500&h=500&fit=crop",
    description:
      "Ergonomic wireless gaming mouse with 16000 DPI sensor and customizable RGB lighting",
    category: "Computers",
    rating: 4.5,
    stock: 22,
  },
  {
    id: 9,
    name: "Portable Bluetooth Speaker",
    price: 89.99,
    image:
      "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=500&h=500&fit=crop",
    description:
      "Waterproof portable speaker with 360-degree sound and 20-hour battery",
    category: "Electronics",
    rating: 4.3,
    stock: 30,
  },
  {
    id: 10,
    name: "Digital Camera Pro",
    price: 899.99,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
    description:
      "24MP mirrorless camera with 4K video recording and interchangeable lens system",
    category: "Electronics",
    rating: 4.7,
    stock: 10,
  },
  {
    id: 11,
    name: 'Tablet 10.5"',
    price: 449.99,
    image:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=500&h=500&fit=crop",
    description:
      "10.5-inch tablet with 128GB storage, stylus support, and all-day battery life",
    category: "Computers",
    rating: 4.4,
    stock: 14,
  },
  {
    id: 12,
    name: 'Monitor 27" 4K',
    price: 399.99,
    image:
      "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=500&h=500&fit=crop",
    description:
      "27-inch 4K UHD monitor with HDR, USB-C connectivity, and adjustable stand",
    category: "Computers",
    rating: 4.6,
    stock: 9,
  },
  {
    id: 13,
    name: "Wireless Charging Pad",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=500&h=500&fit=crop",
    description:
      "Fast wireless charging pad compatible with all Qi-enabled devices",
    category: "Accessories",
    rating: 4.2,
    stock: 35,
  },
  {
    id: 14,
    name: "USB-C Hub Multiport",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1625842268584-8f3296236761?w=500&h=500&fit=crop",
    description:
      "7-in-1 USB-C hub with HDMI, USB 3.0, SD card reader, and power delivery",
    category: "Accessories",
    rating: 4.3,
    stock: 28,
  },
  {
    id: 15,
    name: "Laptop Stand Aluminum",
    price: 39.99,
    image:
      "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=500&h=500&fit=crop",
    description:
      "Ergonomic aluminum laptop stand with adjustable height and ventilation",
    category: "Accessories",
    rating: 4.4,
    stock: 32,
  },
  {
    id: 16,
    name: "Webcam HD 1080p",
    price: 69.99,
    image:
      "https://images.unsplash.com/photo-1587825140708-dfaf72ae4b04?w=500&h=500&fit=crop",
    description:
      "Full HD 1080p webcam with auto-focus, built-in microphone, and privacy shutter",
    category: "Accessories",
    rating: 4.3,
    stock: 19,
  },
  {
    id: 17,
    name: "External SSD 1TB",
    price: 119.99,
    image:
      "https://images.unsplash.com/photo-1591488320449-011701bb6704?w=500&h=500&fit=crop",
    description:
      "Portable 1TB external SSD with USB-C connectivity and 1050MB/s read speed",
    category: "Storage",
    rating: 4.6,
    stock: 16,
  },
  {
    id: 18,
    name: "Action Camera 4K",
    price: 299.99,
    image:
      "https://images.unsplash.com/photo-1606983340126-99ab4feaa64a?w=500&h=500&fit=crop",
    description:
      "Waterproof 4K action camera with image stabilization and 2-hour battery",
    category: "Electronics",
    rating: 4.5,
    stock: 11,
  },
  {
    id: 19,
    name: "Desk Lamp LED",
    price: 49.99,
    image:
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=500&h=500&fit=crop",
    description:
      "Adjustable LED desk lamp with touch control, USB charging port, and eye-care technology",
    category: "Accessories",
    rating: 4.4,
    stock: 27,
  },
  {
    id: 20,
    name: "Smart Home Hub",
    price: 99.99,
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=500&h=500&fit=crop",
    description:
      "Central smart home hub compatible with Alexa, Google Home, and Apple HomeKit",
    category: "Smart Home",
    rating: 4.3,
    stock: 13,
  },
];



