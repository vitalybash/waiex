import axios from "axios";

export default class DevopsService {
  static async getById(id) {
    return await axios.get('http://127.0.0.1:8000/user/' + id);
  }
}