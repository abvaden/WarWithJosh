import { injectable, inject } from "inversify";
import { ILogger, IResultsService, ILogger_IOC_Key, IConnectionService_IOC_Key, IConnectionService } from './Interfaces';
import { IAPIClient, IAPIClient_IOC_KEY } from '@/api-client';

@injectable()
export class ResultsService implements IResultsService {
    private readonly _logger: ILogger;
    private readonly _apiClient: IAPIClient;
    private readonly _connectionService: IConnectionService;
    
    constructor(@inject(ILogger_IOC_Key)logger: ILogger, 
    @inject(IAPIClient_IOC_KEY)apiClient: IAPIClient,
    @inject(IConnectionService_IOC_Key)connectionService: IConnectionService) {
        this._logger = logger;
        this._apiClient = apiClient;
        this._connectionService = connectionService;
    }
}