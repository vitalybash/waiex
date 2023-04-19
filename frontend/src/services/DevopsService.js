import $api from "../http";

export default class DevopsService {
  static async getById(id) {
    return await $api.get('/user/' + id);
  }
}