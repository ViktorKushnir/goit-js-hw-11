import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { PixabayAPI } from './pixabayAPI';

const api = new PixabayAPI()


console.log(api.getImages(1))