import $api from "../http";

export default class FileService {
  static async uploadFile(filename, file) {
    return await $api.post(`/file/`, {
      file_name: filename,
      file: file,
    },
      {
        headers: {
              "Content-Type": "multipart/form-data"
            }
      });
  }
}