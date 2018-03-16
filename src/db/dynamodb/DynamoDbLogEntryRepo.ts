import { DynamoDB } from "aws-sdk";
import * as uuid from "uuid";
import { ILogEntry } from "../../models/ILogEntry";
import { ILogEntryRepo } from "../ILogEntryRepo";

export class DynamoDbLogEntryRepo implements ILogEntryRepo {
  public static objectToDynamoParams(logEntry: ILogEntry): any {
    return {
      Item: {
        created: logEntry.created,
        deviceId: logEntry.deviceId,
        logEntry,
      },
      TableName: process.env.DYNAMODB_TABLE,
    };
  }

  constructor(private dynamoDb: DynamoDB.DocumentClient) {
  }

  public async create(logEntry: ILogEntry): Promise<void> {
    const result = await this.dynamoDb.put(DynamoDbLogEntryRepo.objectToDynamoParams(logEntry)).promise();
  }

  public async getByDeviceId(deviceId: string, startDate: number, endDate: number): Promise<ILogEntry[]> {
    const params = {
      ExpressionAttributeValues: {
        ":e": endDate,
        ":s": startDate,
        ":u": deviceId,
      },
      KeyConditionExpression: "deviceId = :u AND created BETWEEN :s AND :e",
      TableName: process.env.DYNAMODB_TABLE,
    };
    return new Promise<ILogEntry[]>((resolve, reject) => {
      this.dynamoDb.query(params, (error, result) => {
        if (error) {
          reject(`Couldn't get log entries for deviceId: ${deviceId}. Error: ${error.message}`);
        } else {
          const items: ILogEntry[] = [];
          result.Items.forEach((item) => {
            items.push(item.logEntry as ILogEntry);
          });
          resolve(items);
        }
      });
    });
  }

  public async delete(logEntry: ILogEntry): Promise<void> {
    const params = {
      Key: {
        deviceId: logEntry.deviceId,
        timestamp: logEntry.created,
      },
      TableName: process.env.DYNAMODB_TABLE,
    };
    const result = this.dynamoDb.delete(params).promise();
  }
}
