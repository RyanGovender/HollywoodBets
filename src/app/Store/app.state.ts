import { Sports } from '../Models/Sports';
import { Tournament } from '../Models/Tournament';

export interface AppState {
    readonly sportsTree : Tournament[];
}