import imageProdcut1 from './assets/1.png';
import imageProdcut2 from './assets/2.png';
import imageProdcut3 from './assets/3.png';
import imageProdcut4 from './assets/4.png';
import imageProdcut5 from './assets/5.png';
import imageProdcut6 from './assets/6.png';
import imageProdcut7 from './assets/7.png';
import imageProdcut8 from './assets/8.png';

export const products = [
  {
    id: 1,
    name: 'Product 1',
    price: 100,
    category: 'fashion',
    stock: 100,
    description: 'This is a description of Product 1.',
    interfaceImage: imageProdcut1,
    productImages: [imageProdcut1, imageProdcut2],
    slug: 'product-1',
  },
  {
    id: 2,
    name: 'Product 2',
    price: 200,
    category: 'shoes-bags',
    description: 'This is a description of Product 2.',
    interfaceImage: imageProdcut2,
    productImages: [imageProdcut2, imageProdcut3],
    slug: 'product-2',
  },
  {
    id: 3,
    name: 'Product 3',
    price: 300,
    category: 'electronics',
    description: 'This is a description of Product 3.',
    interfaceImage: imageProdcut3,
    productImages: [imageProdcut3, imageProdcut4],
    slug: 'product-3',
  },
  {
    id: 4,
    name: 'Product 4',
    price: 400,
    category: 'health-beauty',
    description: 'This is a description of Product 4.',
    interfaceImage: imageProdcut4,
    productImages: [imageProdcut4, imageProdcut5],
    slug: 'product-4',
  },
  {
    id: 5,
    name: 'Product 5',
    price: 500,
    category: 'home-goods',
    description: 'This is a description of Product 5.',
    interfaceImage: imageProdcut5,
    productImages: [imageProdcut5, imageProdcut6],
    slug: 'product-5',
  },
  {
    id: 6,
    name: 'Product 6',
    price: 600,
    category: 'decor',
    description: 'This is a description of Product 6.',
    interfaceImage: imageProdcut6,
    productImages: [imageProdcut6, imageProdcut7],
    slug: 'product-6',
  },
  {
    id: 7,
    name: 'Product 7',
    price: 700,
    category: 'mother-baby',
    description: 'This is a description of Product 7.',
    interfaceImage: imageProdcut7,
    productImages: [imageProdcut7, imageProdcut8],
    slug: 'product-7',
  },
  {
    id: 8,
    name: 'Product 8',
    price: 800,
    category: 'books-stationery',
    description: 'This is a description of Product 8.',
    interfaceImage: imageProdcut8,
    productImages: [imageProdcut8, imageProdcut1],
    slug: 'product-8',
  },
];
