import services from "../data/services.json";

export default class ServicesService {
  static getAll() {
    return services.services;
  }

  static getByUserId(id) {
    const servicesArr = services.services;
    const result = [];
    for (let i = 0; i < servicesArr.length; i++) {
      const service = servicesArr[i];
      if (service["user_id"] == id) {
        result.push(service);
      }
    }

    return result;
  }
}