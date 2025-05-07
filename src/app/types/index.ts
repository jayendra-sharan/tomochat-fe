export interface User {
  displayName: string;
  email: string;
  id: string;
}

export interface Member {
  user: Omit<User, "email" | "id">
}

export interface Group {
  id: string;
  name: string;
  groupType: string;
  topic: string;
  inviteLink: string;
  members: Member[];
  createdAt: string;
  updatedAt: string;
}

export interface UserDataState {
  id?: string;
  displayName?: string;
  email?: string;
  groups?: Group[];
  currentGroup?: Group;
}

type Sender = {
  id: string;
  displayName: string;
}

type Suggestion = {
  aiReply: string;
  english: string;
  issues?: [string];
  original: string;
  improved?: string;
}

export interface Message {
  id: string;
  createdAt: string;
  content: string;
  sender: Sender;
  suggestion?: Suggestion
}
