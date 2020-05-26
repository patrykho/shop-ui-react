import axios from 'axios';

import {
  prepareHeader,
  prepareHeaderWithFile,
} from '../services/prepare-header.service';

import { BASE_URL } from '../constants/app.constants';

import { ProductI, ProductCreateI } from '../interfaces/product-interfaces';
import { FileUploadI } from '../interfaces/file-upload-interface';

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
  async uploadFile(formData: FormData): Promise<FileUploadI> {
    const response = await axios.post(
      `${BASE_URL}products/upload`,
      formData,
      prepareHeaderWithFile()
    );
    return response.data;
  },
};

export default ProductApi;
