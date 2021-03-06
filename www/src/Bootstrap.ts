import { ContainerModule } from "inversify";
import { ICommandHandler, ICommandHandler_IOC_Key, ICommand } from '@/logic/commanding';
import { ToggleDialogCommandHandler } from './logic/command-handlers/toggle-dialog.command-handler';
import { IGameState, GameState_IOC_Key, StaticGameState } from '@/logic/models/gamestate';
import { PlayCardCommandHandler } from './logic/command-handlers/play-card.command-handler';
import { StartGameCommandHandler } from '@/logic/command-handlers/start-game.command-handler';
import { ResetGameCommandHandler } from '@/logic/command-handlers/reset-game.command-handler';
import { NextTrickDecidedCommandHandler } from '@/logic/command-handlers/next-trick-decided.command-handler';
import { IGameService, IGameService_IOC_Key } from '@/logic/services/Interfaces';
import { GameService } from '@/logic/services/GameService';
import { RecordTrickScoreCommandHandler } from '@/logic/command-handlers/record-trick-score.command-handler';
import { PlayerDecidedCommandHandler } from '@/logic/command-handlers/player-decided.command-handler';
import { RevealHandCommandHandler } from './logic/command-handlers/reveal-hand.command-handler';
import { RevealWinnerCommandHandler } from './logic/command-handlers/reveal-winner.command-handler';
import { ChangeTutorialPopupPersistanceCommandHandler } from './logic/command-handlers/change-tutorial-popup-persistance.command-handler';
import { AdvanceTutorialCommandHandler } from './logic/command-handlers/advance-tutorial.command-handler';
import { StartTutorialCommandHandler } from './logic/command-handlers/start-tutorial.command-handler';
import { IAPIClient, IAPIClient_IOC_KEY, NetworkAPIClient } from './api-client';
import { RequestStartGameCommandHandler } from './logic/command-handlers/request-start-game.command-handler';
import { GlobalErrorCommandHandler } from './logic/command-handlers/global-error.command-handler';
import { EndGameCommandHandler } from './logic/command-handlers/end-game.command-handler';

export const UIModule: ContainerModule = new ContainerModule((bind) => {
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(AdvanceTutorialCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(ChangeTutorialPopupPersistanceCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(EndGameCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(NextTrickDecidedCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(GlobalErrorCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(PlayCardCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(PlayerDecidedCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(RecordTrickScoreCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(RequestStartGameCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(ResetGameCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(RevealHandCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(RevealWinnerCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(StartGameCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(StartTutorialCommandHandler)
        .inSingletonScope();
    bind<ICommandHandler>(ICommandHandler_IOC_Key)
        .to(ToggleDialogCommandHandler)
        .inSingletonScope();
    
    
    
    
    bind<IGameState>(GameState_IOC_Key)
        .toConstantValue(StaticGameState);
    bind<IGameService>(IGameService_IOC_Key)
        .to(GameService)
        .inSingletonScope();
    bind<IAPIClient>(IAPIClient_IOC_KEY)
        .to(NetworkAPIClient)
        .inSingletonScope();
});