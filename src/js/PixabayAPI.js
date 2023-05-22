export class PixabayAPI {
  #BASE_URL = 'https://pixabay.com/api/';
  #API_KEY = '36660019-c6df6bc1309e46eab5218ec9d';

  getImages(q) {
    const url = `${this.#BASE_URL}?key=${
      this.#API_KEY
    }&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`;

    return fetch(url).then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    });
  }
}
