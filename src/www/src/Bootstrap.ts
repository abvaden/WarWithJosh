import { ContainerModule } from "inversify";
import { ICommandHandler, ICommandHandler_IOC_Key, ICommand } from '@/logic/commanding';
import { OpenDialogCommandHandler } from './logic/command-handlers/open-dialog.command-handler';
import { IGameState, GameState_IOC_Key, StaticGameState } from '@/logic/models/gamestate';
import { PlayCardCommandHandler } from './logic/command-handlers/play-card.command-handler';
import { StartGameCommandHandler } from '@/logic/command-handlers/start-game.command-handler';
import { ResetGameCommandHandler } from '@/logic/command-handlers/reset-game.command-handler';
import { NextTrickCommandHandler } from '@/logic/command-handlers/next-trick.command-handler';
import { IGameService, IGameService_IOC_Key } from '@/logic/services/Interfaces';
import { GameService } from '@/logic/services/GameService';
import { RecordTrickScoreCommandHandler } from '@/logic/command-handlers/record-trick-score.command-handler';

export const UIModule: ContainerModule = new ContainerModule((bind) => {
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(NextTrickCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(OpenDialogCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(PlayCardCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(RecordTrickScoreCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(ResetGameCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(StartGameCommandHandler)
        .inSingletonScope();
    
    
    
    bind<IGameState>(GameState_IOC_Key)
        .toConstantValue(StaticGameState);
    bind<IGameService>(IGameService_IOC_Key)
        .to(GameService)
        .inSingletonScope();
});