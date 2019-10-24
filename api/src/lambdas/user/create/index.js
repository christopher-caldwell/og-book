const DynamoDB = require("aws-sdk/clients/dynamodb");
const secretsManagerSDK = require("aws-sdk/clients/secretsmanager");
const bcyrpt = require("bcrypt");
const jwt = require("jsonwebtoken");
let options = {
	region: "us-east-1"
};
if (process.env.AWS_SAM_LOCAL) {
	options.endpoint = "http://host.docker.internal:8000";
}
const numberOfSaltRounds = 10
const durationOfToken = "24h"
const docClient = new DynamoDB.DocumentClient(options);
const secretsManager = new secretsManagerSDK();
const headers = {
	"Access-Control-Allow-Headers": "*",
	"Access-Control-Allow-Origin": "*",
	"Access-Control-Allow-Methods": "*",
	"Content-Type": "application/json"
};
const TableName = process.env.TABLE_NAME;
const SigningKeyID = process.env.SIGNING_KEY_NAME;
const errorResponse = {
	headers,
	statusCode: 402,
	body: "Something went wrong"
};
const secretsParams = {
	SecretId: SigningKeyID
};

exports.handler = async event => {
	const { firstName, lastName, identifier, plainTextPassword } = JSON.parse(event.body);
	// add validation
	const hashedPassword = await bcyrpt.hash(plainTextPassword, numberOfSaltRounds);
	const params = {
		TableName,
		Item: {
      firstName,
      lastName,
      identifier,
      password: hashedPassword,
      createdAt: Date.now(),
      isVerified: false
		}
	};

	try {
		await docClient.put(params).promise();
		const token = await generateToken(secretsParams, IndividualId, durationOfToken);
		return formatPositiveResponse(
			{ email: IndividualId, FirstName, LastName },
			token
		);
	} catch (error) {
		console.error("error: ", error);
		return errorResponse;
	}
};

const getSigningKey = async secretsParams => {
	const secretsManagerResponse = await secretsManager
		.getSecretValue(secretsParams)
		.promise();
	return JSON.parse(secretsManagerResponse.SecretString).signingKey;
};

const generateToken = async (secretsParams, Identifier, expiresIn) => {
	const signingKey = await getSigningKey(secretsParams);
	return jwt.sign({ Identifier }, signingKey, {
		expiresIn
	});
};
const formatPositiveResponse = (user, token) => ({
	headers,
	statusCode: 200,
	body: JSON.stringify({
		...user,
		token,
		role: "user"
	})
});
