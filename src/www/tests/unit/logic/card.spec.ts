import { expect } from 'chai';
import { PlayingCard, cardFactory } from "@/logic/models/card";
import {  } from "@/logic/models/card";
import { CardSuit } from '@/logic/models/card';

describe("cardFactory", () => {
    it("should produce cards", () => {
        const aC = cardFactory("A", CardSuit.Club);
        const kC = cardFactory("K", CardSuit.Diamond);
    });

    it("should produce cards that have a reverse alphabetical suit trump", () => {
        const aC = cardFactory("A", CardSuit.Club);
        const aH = cardFactory("A", CardSuit.Heart);
        const kH = cardFactory("K", CardSuit.Heart);

        expect(aC.trumps(aH)).to.equal(false);
        expect(aH.trumps(aC)).to.equal(true);
        expect(aH.trumps(kH)).to.equal(true);
    });
});
