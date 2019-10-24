const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
const DynamoDB = require("aws-sdk/clients/dynamodb");
const secretsManagerSDK = require("aws-sdk/clients/secretsmanager");

let options = {
	region: "us-east-1"
};
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = "http://host.docker.internal:8000";
}
const docClient = new DynamoDB.DocumentClient(options);
const secretsManager = new secretsManagerSDK();

const headers = {
  "Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Content-Type": "application/json"
}

exports.create = async config => {
  const {
    plainTextPassword,
    secretsManagerParams,
    TableName,
    itemParameters,
    numberOfSaltRounds = 10,
    tokenLife = '24h',
    returnValue = 'ALL_NEW'
  } = config || {}

  const hashedPassword = await bcyrpt.hash(plainTextPassword, numberOfSaltRounds);
  const params = {
    TableName,
    Item: {
      ...itemParameters,
      password: hashedPassword
    },
    ReturnValues: returnValue
  };

  try {
    const storedUser = await docClient.put(params).promise();
    const token = await generateToken(secretsParams, IndividualId, tokenLife);
    return responseHandler(200, { user: storedUser, token });
  } catch (error) {
    console.error("error: ", error);
    return responseHandler(500, error);
  }
}

const defineErrorMap = body => ({
  '200': JSON.stringify({...body}),
  '403': {standard: 'Unauthorized', custom: body},
  '404': JSON.stringify({standard: 'Item not found', custom: body}),
})

const responseHandler = (errorCode, body) => {
  const errorMap = defineErrorMap(body)
  return {
    headers,
    statusCode: errorCode,
    body: errorMap[errorCode]
  }
}

const getSigningKey = async secretsParams => {
	const secretsManagerResponse = await secretsManager
		.getSecretValue(secretsParams)
		.promise();
	return JSON.parse(secretsManagerResponse.SecretString).signingKey;
};
const generateToken = async (secretsParams, Identifier, expiresIn) => {
	const signingKey = await getSigningKey(secretsParams);
	return jwt.sign({ Identifier }, signingKey, { expiresIn });
};