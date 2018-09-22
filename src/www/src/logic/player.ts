
export interface IPlayer {

}


export async function playerFactory(): Promise<IPlayer> {
    throw new Error("Not implemented");
}

class LocalPlayer implements IPlayer {
    constructor() {

    }
}

class RemotePlayer implements IPlayer {
    constructor() {
        
    }
}

class JoshPlayer implements IPlayer {
    constructor() {
        
    }
}
