import $api from "../http";

export default class SkillsService {
  static async getAll() {
    return await $api.get('/skills/');
  }

  static async getById(id) {
    return await $api.get('/skills/' + id);
  }

  static async getByUserId(user_id) {
    return await $api.get('/skills/' + user_id + '/user_skill/');
  }
}