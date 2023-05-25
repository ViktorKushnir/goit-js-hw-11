import axios from 'axios';

const URL = 'https://pixabay.com/api/';
const API_KEY = '36660019-c6df6bc1309e46eab5218ec9d';

export default class searchImages {
  constructor() {
    this.page = 1;
    this.values = '';
    this.totalHits = 0;
  }
  async getImages() {
    const { data } = await axios.get(
      `${URL}?key=${API_KEY}&q=${this.values}&image_type=photo&orientation=horizontal&safesearch=true&per_page=40&page=${this.page}`
    );
    this.incrementPage();
    this.totalHits = data.totalHits;
    return data.hits;
  }
  restPage() {
    this.page = 1;
  }
  incrementPage() {
    this.page += 1;
  }
}
