import { User } from './user';

export class Board {
    id: number;
    name: string;
    owner: User;
    last_opened: Date;
    desc: string;
    creation_time: Date;
    json_board: string;
}