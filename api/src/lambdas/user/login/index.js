const AWS = require("aws-sdk");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt-nodejs");
const headers = {
  "Access-Control-Allow-Headers": "*",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "*"
};
const dynamodb = new AWS.DynamoDB.DocumentClient();

exports.handler = async event => {
  // allows for local testing inside the lambda console
  const requestBody =
    typeof event.body === "string" ? JSON.parse(event.body) : event.body;
  const { username, password } = requestBody;

  const params = {
    Key: {
      Username: username
    },
    TableName: "Users"
  };

  try {
    const user = await dynamodb.get(params).promise();
    if (user.Item) {
      const token = {
        S: jwt.sign({ data: "foobar" }, "secret", { expiresIn: "5 days" })
      };
      return validatePassword(password, user.Item.Password)
        ? {
            statusCode: 200,
            headers,
            body: JSON.stringify({ ...user, token })
          }
        : {
            statusCode: 400,
            headers,
            body: `Invalid combination`
          };
    } else {
      throw new Error(`It doesn't look like ${username} has an account`);
    }
  } catch (error) {
    return {
      statusCode: 400,
      headers,
      body: error.message
    };
  }
};

const validatePassword = (givenPassword, dbPassword) => {
  return bcrypt.compareSync(givenPassword, dbPassword);
};
