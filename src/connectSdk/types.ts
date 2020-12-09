export interface AppSubmitRequest {
  workspace: Workspace;
  appUser: AppUser;
  context: { [key: string]: any };
  data: { [key: string]: any };
  componentId: string;
}

export interface UpdateAppUserRequest {
  givenName: string;
  surname: string;
  email: string;
  phoneNumber: string;
}

export interface GetAppUserResponse {
  appUser: AppUser;
}

export interface Workspace {
  id: string;
}

export interface AppUser {
  id: string;
  userId: string;
  givenName: string;
  surname: string;
  email: string;
  phoneNumber: string;
  createdTimeUtc: string;
  clients?: Client[] | null;
  conversations?: Conversation[] | null;
}
export interface Client {
  active: boolean;
  id: string;
  lastSeen: string;
  platform: string;
}
export interface Conversation {
  id: string;
  unreadCount: number;
  appOwnerLastRead: string;
  withHuman: boolean;
}
