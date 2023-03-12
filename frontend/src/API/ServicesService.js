import axios from "axios";

export default class ServicesService {
  static async getAll() {
    return await axios.get('http://127.0.0.1:8000/skills/');
  }

  // static getByUserId(id) {
  //   const servicesArr = services.services;
  //   const result = [];
  //   for (let i = 0; i < servicesArr.length; i++) {
  //     const service = servicesArr[i];
  //     if (service["user_id"] == id) {
  //       result.push(service);
  //     }
  //   }
  //
  //   return result;
  // }
}