import axios from "axios";

export default class UsersService {
  static async registration(user) {
    return await axios.post('http://127.0.0.1:8000/registration/registration/', { "user": user });
  }
}