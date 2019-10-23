"use strict";
const AWS = require("aws-sdk");
const dynamodb = new AWS.DynamoDB.DocumentClient();
const jwt = require("jsonwebtoken");

exports.handler = async event => {
  const requestBody = JSON.parse(event.body);
  try {
    await jwt.verify(requestBody.token, "secret");
    const { bookId, username, list } = requestBody;
    const params = {
      TableName: "BookLists",
      Item: {
        ...blackListFilterObject(requestBody, "token", "username", "list"),
        UserList: username + list
      }
    };
    await dynamodb.put(params).promise();
    return {
      statusCode: 200,
      body: "Ok",
      headers
    };
  } catch (error) {
    return error.message === "jwt expired"
      ? {
          statusCode: 400,
          body: `We couldn't verify your credentials. Please log in and try again`,
          headers
        }
      : {
          statusCode: 400,
          body: `error: ${error.message}`,
          headers
        };
  }
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
