import http from './http';

export function getAllProducts() {
  return http.get('/api/products');
}
