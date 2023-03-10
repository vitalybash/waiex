import axios from "axios";

export default class ServicesService {
  static async getAll() {
    return await axios.get('http://127.0.0.1:8000/skills/');
  }

  static async getById(id) {
    return await axios.get('http://127.0.0.1:8000/skills/' + id);
  }
}