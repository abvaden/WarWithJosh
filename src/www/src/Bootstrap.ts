import { ContainerModule } from "inversify";
import { ICommandHandler, ICommandHandler_IOC_Key } from '@/logic/commanding';
import { OpenDialogCommandHandler } from '@/logic/command-handlers/open-dialog.command-handler';
import { IGameState, GameState_IOC_Key, StaticGameState } from '@/logic/models/gamestate';

export const UIModule: ContainerModule = new ContainerModule((bind) => {
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(OpenDialogCommandHandler)
        .inSingletonScope();
    
    
    bind<IGameState>(GameState_IOC_Key)
        .toConstantValue(StaticGameState);
});