"use strict";
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();

const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
};

exports.getBooks = async event => {
  const { username, list } = event.queryStringParameters;
  const params = {
    TableName: "BookLists",
    KeyConditionExpression: "UserList = :hkey",
    ExpressionAttributeValues: {
      ":hkey": username + list
    }
  };
  const books = await dynamodb.query(params).promise();
  return {
    statusCode: 200,
    body: JSON.stringify(books),
    headers
  };
};

const blackListFilterObject = (object, ...args) => {
  let returnObject = {
    ...object
  };
  args.forEach(arg => {
    delete returnObject[arg];
  });
  return returnObject;
};
