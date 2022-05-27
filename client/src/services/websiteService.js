import http from "./httpService";

const apiEndpoint = "http://192.168.1.4:3000" + "/api/websites";

export function getWebsites() {
  return http.get(apiEndpoint);
}

export function getWebsite(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveWebsite(website) {
  return http.post(apiEndpoint, website);
}
