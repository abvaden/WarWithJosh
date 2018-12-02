import { ContainerModule } from "inversify";
import { GameService } from '@/logic/services/GameService';
import { IGameService, IGameService_IOC_Key } from '@/logic/services/Interfaces';
import { IAPIClient, IAPIClient_IOC_KEY, NetworkAPIClient } from './api-client';


export const UIModule: ContainerModule = new ContainerModule((bind) => {
    bind<IGameService>(IGameService_IOC_Key)
        .to(GameService)
        .inSingletonScope();
    bind<IAPIClient>(IAPIClient_IOC_KEY)
        .to(NetworkAPIClient)
        .inSingletonScope();
});