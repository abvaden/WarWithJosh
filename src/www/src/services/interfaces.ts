import { PlayingCard } from "../models/card";

export interface ICardService {
    GetNextCard(): PlayingCard;
}
