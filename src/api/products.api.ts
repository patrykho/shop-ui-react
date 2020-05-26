import axios from 'axios';

import { BASE_URL } from '../constants/app.constants';
import { ProductI, ProductCreateI } from '../interfaces/product-interfaces';
import { prepareHeader } from '../services/prepare-header.service';

const ProductApi = {
  async getAllProducts(): Promise<ProductI[]> {
    const response = await axios.get(`${BASE_URL}products`);
    return response.data;
  },

  async getProduct(id: string): Promise<ProductI> {
    const response = await axios.get(
      `${BASE_URL}products/${id}`,
      prepareHeader()
    );
    return response.data;
  },

  async createProduct(product: ProductCreateI): Promise<ProductI> {
    const response = await axios.post(
      `${BASE_URL}products`,
      product,
      prepareHeader()
    );
    return response.data;
  },

  async deleteProduct(id: number): Promise<void> {
    const response = await axios.delete(
      `${BASE_URL}products/${id}`,
      prepareHeader()
    );
    return response.data;
  },

  async updateProduct(id: string, product: ProductI): Promise<ProductI> {
    const response = await axios.put(
      `${BASE_URL}products/${id}`,
      product,
      prepareHeader()
    );
    return response.data;
  },
};

export default ProductApi;
