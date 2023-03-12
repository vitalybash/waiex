import reviews from "../data/reviews.json";


export default class ReviewsService {
  static getAll() {
    return reviews.reviews;
  }

  static getByDevopId(id) {
    const result = [];
    const reviewsArr = reviews.reviews;
    for (let i = 0; i < reviewsArr.length; i++) {
      const review = reviewsArr[i];
      if (review["devop_id"] == id) {
        result.push(review);
      }
    }

    return result;
  }
}