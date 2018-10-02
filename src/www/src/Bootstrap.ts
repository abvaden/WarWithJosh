import { ContainerModule } from "inversify";
import { ICommandHandler, ICommandHandler_IOC_Key, ICommand } from '@/logic/commanding';
import { OpenDialogCommandHandler } from './logic/command-handlers/open-dialog.command-handler';
import { IGameState, GameState_IOC_Key, StaticGameState } from '@/logic/models/gamestate';
import { PlayCardCommandHandler } from './logic/command-handlers/play-card.command-handler';

export const UIModule: ContainerModule = new ContainerModule((bind) => {
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(OpenDialogCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(PlayCardCommandHandler)
        .inSingletonScope();
    
    
    bind<IGameState>(GameState_IOC_Key)
        .toConstantValue(StaticGameState);
});