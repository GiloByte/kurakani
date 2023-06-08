export default interface IUserContext {
  username: string;
  uuid: string;
  setUsername: React.Dispatch<string>;
  setUuid: React.Dispatch<string>;
}
