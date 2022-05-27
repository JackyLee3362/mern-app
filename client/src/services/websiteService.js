import http from "./httpService";
import _ from "lodash";

const apiEndpoint = "http://192.168.1.4:3000/api/websites";

export function getWebsites() {
  return http.get(apiEndpoint);
}

export function getWebsite(id) {
  return http.get(apiEndpoint + "/" + id);
}

export function saveWebsite(website) {
  if (website._id) {
    return http.put(
      apiEndpoint + "/" + website._id,
      _.pick(website, ["name", "url"])
    );
  }
  return http.post(apiEndpoint, _.pick(website, ["name", "url"]));
}

export function deleteWebsite(id) {
  return http.delete(apiEndpoint + "/" + id);
}
