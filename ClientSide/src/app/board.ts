import { User } from './user';

export class Board {
    id: string;
    name: string;
    owner: User;
    creationTime: Date;
    desc: string;
    jsonBoard: string;
}