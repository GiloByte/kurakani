export default interface IUserContext {
  username: string;
  uuid: string;
  setUsername: React.Dispatch<string>;
  setUuid: React.Dispatch<string>;
  setJoinedRooms: React.Dispatch<string[]>;
  joinedRooms: string[];
}
