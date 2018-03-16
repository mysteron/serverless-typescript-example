import { ILogEntry } from "../models/ILogEntry";

export interface ILogEntryRepo {
    create(logEntry: ILogEntry): Promise<void>;
    getByDeviceId(deviceId: string, startDate?: number, endDate?: number): Promise<ILogEntry[]>;
    delete(logEntry: ILogEntry): Promise<void>;
}
