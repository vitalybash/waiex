import axios from "axios";

export default class ReviewsService {
  static async getAll() {
    return await axios.get('http://127.0.0.1:8000/reviews/');
  }

  static getByUserId(user_id) {
  }
}