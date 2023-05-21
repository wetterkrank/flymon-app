// TODO: possibly combine; see Kiwi Margarita
// Maybe get rid of user in the path? If needed, request via query param
const BASE_URL = "http://192.168.1.128:3000";
const USER_ID = "1";

export const fetcher = (path: string) => {
  console.log(`API GET started: ${path}...`);
  const result = fetch(`${BASE_URL}/users/${USER_ID}/${path}`).then((r) => r.json());
  console.log("API GET done.");
  return result;
}

export const stasher = async (path: string, method: string, body: string) => {
  console.log(`API ${method} started: ${path}...`)
  const url = `${BASE_URL}/users/${USER_ID}/${path}`;
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
};
