import axios from 'axios';
import apiService from './server-api';

const newService = new apiService();

newService.getPictures().then(data => {
  console.log(data);
});

function createPhotoMarkup(array) {}
