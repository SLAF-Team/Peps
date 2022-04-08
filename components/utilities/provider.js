// provider.js

import axios from 'axios';
import { handleResponse, handleError } from './response';

// Define your api url from any source.
// Pulling from your .env file when on the server or from localhost when locally
const BASE_URL = '/api';

/** @param {string} resource */
const getAll = async (resource) => {
  try {
    const response = await axios
      .get(`${BASE_URL}/${resource}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {string} id */
const getSingle = async (resource, id) => {
  try {
    const response = await axios
      .get(`${BASE_URL}/${resource}/${id}`);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const post = async (resource, model) => {
  try {
    const response = await axios
      .post(`${BASE_URL}/${resource}`, model);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {object} model */
const put = async (resource, model) => {
  try {
    const response = await axios
      .put(`${BASE_URL}/${resource}`, model);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};


/** @param {string} resource */
/** @param {object} model */
const patch = async (resource, model) => {
  try {
    const response = await axios
      .patch(`${BASE_URL}/${resource}`, model);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

/** @param {string} resource */
/** @param {string} id */
const remove = async (resource, id) => {
  try {
    const response = await axios
      .delete(`${BASE_URL}/${resource}`, id);
    return handleResponse(response);
  } catch (error) {
    return handleError(error);
  }
};

export const apiProvider = {
  getAll,
  getSingle,
  post,
  put,
  patch,
  remove,
};
