import 'regenerator-runtime';
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

const key = '14950911-bbc5df412008123c8c9940cf8';

export default {
  page: 1,
  async axiosImages(query) {
    try {
      const params = `https://pixabay.com/api/?image_type=photo&orientation=horizontal&q=${query}&page=${this.page}&per_page=12`;
      const response = await axios.get(`?key=${key}&${params}`);
      const data = response.data;

      return data;
    } catch (error) {
      console.error(error);
    }
  },
  incrementPages() {
    this.page += 1;
  },
};
