import { IUser } from "../types/User.types";
import { BASE_URL } from "../utils/constants";

export async function fetchUsers(): Promise<IUser[]> {
  try {
    const res: Response = await fetch(`${BASE_URL}/users`);
    if (res.ok) {
      return res.json() as Promise<IUser[]>;
    } else {
      console.log("Users fetch error", res.status, res.statusText);
      throw new Error(
        `Failed to fetch users: ${res.status} ${res.statusText}`
      );
    }
  } catch (e) {
    console.log("Users fetch error", e);
    throw e;
  }
}

export async function fetchUser(userId: number): Promise<IUser> {
  try {
    const res: Response = await fetch(`${BASE_URL}/users/${userId}`);
    if (res.ok) {
      return res.json() as Promise<IUser>;
    } else {
      console.log("User fetch error", res.status, res.statusText);
      throw new Error(
        `Failed to fetch user: ${res.status} ${res.statusText}`
      );
    }
  } catch (e) {
    console.log("User fetch error", e);
    throw e;
  }
}