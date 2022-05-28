import http from "./httpService";
import _ from "lodash";
import config from "../config.json";
const apiEndpoint = config.apiUrl + "/websites";

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
      _.pick(website, ["name", "url", "like"])
    );
  }
  return http.post(apiEndpoint, _.pick(website, ["name", "url"]));
}

export function deleteWebsite(id) {
  return http.delete(apiEndpoint + "/" + id);
}
