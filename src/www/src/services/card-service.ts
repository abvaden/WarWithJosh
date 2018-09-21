import { injectable } from "inversify";
import { ICardService } from "@/services/interfaces";
import { PlayingCard } from "@/models/card";

@injectable()
export class CardsService implements ICardService {

    constructor() {

    }

    public GetNextCard(): PlayingCard {
        throw new Error("Method not implemented.");
    }
}