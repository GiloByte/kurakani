import IMessage from "./IMessage";

export default interface IMessageContext {
  messages: { [key: string]: IMessage[] };
}
