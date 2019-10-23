const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
};
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  const requestBody =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const { username, password } = requestBody;
  const params = {
    Item: requestBody,
    TableName: "Users"
  };
  try {
    // assign to const after put item
    const user = await dynamodb.put(params).promise();
    const token = {
      S: jwt.sign({ data: "foobar" }, "secret", { expiresIn: "5 days" })
    };
    return {
      statusCode: 200,
      headers,
      body: JSON.stringify({ ...user, token })
    };
  } catch (error) {
    return {
      statusCode: 400,
      error: `Error saving item in database ${error.stack}`
    };
  }
};
