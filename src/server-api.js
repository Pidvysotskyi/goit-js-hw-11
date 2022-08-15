import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29264907-2ab68c5d7b62ca0acfac904a2';

export default class apiService {
  constructor() {
    this.searchQuery = 'cat';
    this.page = 1;
  }

  getPictures() {
    return axios
      .get(
        `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      )
      .then(({ data }) => data);
  }
}
