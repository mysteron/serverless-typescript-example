import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import { DynamoDB } from "aws-sdk";
import { v4 } from "uuid";
import { LogEntriesAPI } from "../api/LogEntriesAPI";
import { DynamoDbLogEntryRepo } from "../db/dynamodb/DynamoDbLogEntryRepo";
import { ILogEntry } from "../models/ILogEntry";

const dynamoDb = new DynamoDB.DocumentClient();
const dbLogEntriesRepo = new DynamoDbLogEntryRepo(dynamoDb);
const logEntriesApi = new LogEntriesAPI(dbLogEntriesRepo);

export const create: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    const data = JSON.parse(event.body);
    const deviceId = data.deviceId;
    const message = data.message;

    const logEntry: ILogEntry = {
        created: new Date().getTime(),
        data: { info: "somedata" },
        deviceId,
        eventId: v4(),
        message,
    };

    const response = {
        body: JSON.stringify({
            action: "create",
        }),
        statusCode: 200,
    };

    try {
        await logEntriesApi.create(logEntry);
        cb(null, response);
    } catch (err) {
        cb(null, httpErrorStatus(err));
    }
};

export const get: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {

    const deviceId = event.queryStringParameters.deviceId;
    const startDate = parseInt(event.queryStringParameters.startDate, 10);
    const endDate = parseInt(event.queryStringParameters.endDate, 10);

    try {
        const data = await logEntriesApi.getAllByDeviceId(deviceId, startDate, endDate);
        const response = {
            body: JSON.stringify({
                action: "get",
                data,
            }),
            statusCode: 200,
        };
        cb(null, response);
    } catch (err) {
        cb(null, httpErrorStatus(err));
    }
};

export const hearthbeat: Handler = async (event: APIGatewayEvent, context: Context, cb: Callback) => {
    try {
        const response = {
            body: JSON.stringify({
                action: "get",
                status: "alive",
                timestamp: new Date().getTime(),
            }),
            statusCode: 200,
        };
        cb(null, response);
    } catch (err) {
        cb(null, httpErrorStatus(err));
    }
};

const httpErrorStatus = (message: string, statusCode: number = 500) => {
    return { statusCode, body: JSON.stringify({ message }) };
};
