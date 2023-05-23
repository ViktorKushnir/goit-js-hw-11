import axios from 'axios';


  export class PixabayAPI {
    #BASE_URL = 'https://pixabay.com/api/';
    #API_KEY = '36660019-c6df6bc1309e46eab5218ec9d';
  
      page = 1;
      q = null;
      per_page = 40;
  
      async fetchPhotos() { 
          return await axios.get(`${this.#BASE_URL}`, {
              params: {
                  q: this.q,
                  page: this.page,
                  per_page: this.per_page,
                  key: this.#API_KEY,
                  image_type: "photo",
                  orientation: "horizontal",
                  safesearch: true,
              },
          });
      } 
  }








  // getImages(page) {
  //   const url = `${this.#BASE_URL}?key=${
  //     this.#API_KEY
  //   }&q=${page}&image_type=photo&orientation=horizontal&safesearch=true`;
  //   return fetch(url).then(response => {
  //     if (!response.ok) {
  //       throw new Error(response.status);
  //     }
  //     return response.json();
  //   });
  // }

  // async getImages(q) {
  //   const {data} = await axios.get(
  //     `${this.#BASE_URL}?key=${
  //       this.#API_KEY
  //     }&q=${q}&image_type=photo&orientation=horizontal&safesearch=true`
  //   );

  //   return data
  // }

