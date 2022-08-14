import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';

export default class apiService {
  constructor() {
    this.searchQuery = '';
  }

  getPictures() {
    return axios
      .get(
        'https://pixabay.com/api/?key=29264907-2ab68c5d7b62ca0acfac904a2&q=flowers'
      )
      .then(response => response.data.hits);
  }
}
