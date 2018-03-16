
import { ILogEntryRepo } from "../db/ILogEntryRepo";
import { ILogEntry } from "../models/ILogEntry";

export class LogEntriesAPI {

    protected logEntryRepo: ILogEntryRepo;

    constructor(logEntryRepo: ILogEntryRepo) {
        this.logEntryRepo = logEntryRepo;
    }

    public getAllByDeviceId(deviceId: string, startDate?: number, endDate?: number): Promise<ILogEntry[]> {
        return this.logEntryRepo.getByDeviceId(deviceId, startDate, endDate);
    }

    public create(logEntry: ILogEntry): Promise<void> {
        return this.logEntryRepo.create(logEntry);
    }

    public delete(logEntry: ILogEntry) {
        return this.logEntryRepo.delete(logEntry);
    }
}
