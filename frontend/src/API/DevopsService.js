import devops from "../data/devops.json";

export default class DevopsService {
  static getAll() {
    return devops;
  }

  static getById(id) {
    const users = devops.users;
    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      if (user.id == id) {
        return user;
      }
    }

    return {};
  }
}