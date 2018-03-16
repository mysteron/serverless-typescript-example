export interface ILogEntry {
    deviceId: string;
    created: number;
    eventId: string;
    message: string;
    data: any;
}
