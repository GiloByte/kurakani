import IRoom from "./IRoom";

export default interface IRoomContext {
  rooms: IRoom[];
  myRooms: IRoom[];
  setMyRooms: React.Dispatch<IRoom[]>;
}
