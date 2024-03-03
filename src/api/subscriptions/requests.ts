// TODO: possibly combine; see Kiwi Margarita
// Maybe get rid of user in the path? If needed, request via query param

import { SERVER_URL } from "..";

const USER_ID = "0";
const HEADERS = {
  "Content-Type": "application/json",
  "X-Api-Key": "temporary-key",
};

export const fetcher = async (path: string) => {
  console.log(`API GET started: ${path}`);
  const response = await fetch(`${SERVER_URL}/users/${USER_ID}/${path}`, {
    headers: HEADERS,
  });

  if (!response.ok) {
    const error = new Error("An error occurred while fetching the data.");
    throw error;
  }

  return response.json();
};

export const poster = async (path: string, method: string, body: string) => {
  console.log(`API ${method} started: ${path}...`);
  const url = `${SERVER_URL}/users/${USER_ID}/${path}`;
  return fetch(url, {
    method: method,
    headers: HEADERS,
    body,
  });
};
