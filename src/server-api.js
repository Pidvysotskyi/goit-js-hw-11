import axios from 'axios';

const BASE_URL = 'https://pixabay.com/api/';
const KEY = '29264907-2ab68c5d7b62ca0acfac904a2';

export default class apiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  getPictures() {
    return axios
      .get(
        `${BASE_URL}?key=${KEY}&q=${this.searchQuery}&image_type=photo&orientation=horizontal&safesearch=true&page=${this.page}&per_page=40`
      )
      .then(({ data }) => {
        this.incrementPage();
        return data;
      });
  }
  incrementPage() {
    this.page += 1;
  }
  resetPage() {
    this.page = 1;
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }
}
