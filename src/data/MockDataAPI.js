
import {categories} from './dataArrays';

export function getCategoryUrl(categoryName) {
  let url;
  categories.map(data => {
    if (data.name == categoryName) {
      url = data.photo_url;
    }
  });
  return url;
}















