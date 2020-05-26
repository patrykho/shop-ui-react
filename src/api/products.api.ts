import axios from 'axios';

import { BASE_URL } from '../constants/app.constants';
import { ProductsI } from '../interfaces/products-interfaces';

const ProductApi = {
  async getAllProducts(): Promise<ProductsI[]> {
    const response = await axios.get(`${BASE_URL}products`);
    return response.data;
  },

  async getProduct(id: string): Promise<ProductsI> {
    const response = await axios.get(`${BASE_URL}products/${id}`);
    return response.data;
  },

  async createProduct(product: ProductsI): Promise<ProductsI> {
    const response = await axios.post(`${BASE_URL}products`, product);
    return response.data;
  },

  async deleteProduct(id: string): Promise<void> {
    const response = await axios.post(`${BASE_URL}products`, id);
    return response.data;
  },

  async updateProduct(id: string, product: ProductsI): Promise<ProductsI> {
    const response = await axios.put(`${BASE_URL}products/${id}`, product);
    return response.data;
  },
};

export default ProductApi;
