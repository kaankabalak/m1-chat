import Fingerprint2 from "fingerprintjs2";
import request from "superagent";

export class API {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }
  getAuthToken(username) {
    return new Promise((resolve, reject) => {
      new Fingerprint2().get(result => {
        request
          .get(this.baseUrl + "/getToken")
          .query({ identity: username, endpointId: result })
          .then(res => {
            resolve("eyJhbGciOiJIUzI1NiIsImN0eSI6InR3aWxpby1mcGE7dj0xIiwidHlwIjoiSldUIn0.eyJzdWIiOiJBQ2NjYTQzM2Y4YWI2NjEwM2U4ZWY3ZGU2ODdlOTYzMWUyIiwianRpIjoiU0tjNjgwNjA2YTM1MWRjZWY4ZTE3YTAxZWZiZTg0M2QyNyIsImV4cCI6MS41MzAxMTAxNTk4NTIwNjkzODJlOSwiZ3JhbnRzIjp7ImNoYXQiOnsic2VydmljZV9zaWQiOiJJUzBmYWEwMjVlYTA5ZTQ3YmY4MjgwZWM2MzVkYzVjYjdkIiwiZW5kcG9pbnRfaWQiOiJJUzBmYWEwMjVlYTA5ZTQ3YmY4MjgwZWM2MzVkYzVjYjdkY3VzdG9tZXIxYThlMjgwMjM5YTYzZTMyNDMzYTEyODBkNTdjOTc3MmQifSwiaWRlbnRpdHkiOiJjdXN0b21lcjEifSwiaXNzIjoiU0tjNjgwNjA2YTM1MWRjZWY4ZTE3YTAxZWZiZTg0M2QyNyIsImlhdCI6MS41MzAwMjM3NTk4NTIwNjkzODJlOX0.tqRSYiUGx6P6QW3toGNmqK6daYZRPd8bmRb5QykX_HM");
          })
          .catch(err => {
            reject(err);
          });
      });
    });
  }
  reset() {
    return request.post(this.baseUrl + "/reset").then(res => res.body);
  }
  createUser(username, fullname, isAdmin) {
    return request
      .post(this.baseUrl + "/users")
      .send({ username: username, fullname: fullname, isAdmin: isAdmin })
      .then(res => res.body);
  }
  getUsers() {
    return request.get(this.baseUrl + "/users").then(res => {
      return res.body;
    });
  }
  getUserByUsername(username) {
    return request
      .get(this.baseUrl + "/userByUsername/" + username)
      .then(res => {
        return res.body;
      });
  }
  getUser(sid) {
    return request.get(this.baseUrl + "/users/" + sid).then(res => {
      return res.body;
    });
  }
}

const api = new API("http://localhost:8080");
export default api;
