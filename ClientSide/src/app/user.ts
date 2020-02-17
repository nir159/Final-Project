import { Board } from './board';

export class User {
    id: string;
    first_name: string;
    last_name: string;
    email: string;
    pw: string;
    boards: Board[];
    // userImage: string;
}