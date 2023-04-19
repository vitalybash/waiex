import $api from "../http";

export default class ReviewsService {
  static async getAll() {
    return await $api.get('/reviews/');
  }
}