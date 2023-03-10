import services from "../data/services.json";

export default class ServicesService {
  static getAll() {
    return services;
  }

  static getByUserId(id) {
    const services = services.services;
    const result = [];
    for (let i = 0; i < services.length; i++) {
      const service = services[i];
      if (service.user_id == id) {
        result.push(service);
      }
    }

    return services;
  }
}