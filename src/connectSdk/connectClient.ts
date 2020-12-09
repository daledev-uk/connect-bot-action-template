import axios from "axios";
import { AppUser, UpdateAppUserRequest } from "./types";

export class ConnectClient {
  private readonly apiKey: string;
  private readonly baseUrl: string;

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  public async getAppUser(appUserId: string): Promise<AppUser> {
    const url = `${this.baseUrl}/appUsers/${appUserId}`;
    const config = {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    };

    const response = await axios.get(url, config);
    return response.data.appUser;
  }

  public async updateAppUser(
    appUserId: string,
    request: UpdateAppUserRequest
  ): Promise<AppUser> {
    const url = `${this.baseUrl}/appUsers/${appUserId}`;
    const config = {
      headers: { Authorization: `Bearer ${this.apiKey}` }
    };

    try {
      console.log("Calling ", url, "Updating appUser ", appUserId);
      console.log("Using ApiKey ", this.apiKey);
      const response = await axios.put(url, request, config);
      return response.data;
    } catch (ex) {
      console.log("Failed to update appUser", ex);
    }
    return null;
  }
}
