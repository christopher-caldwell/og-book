const simpleSave = require('./create')
const TableName = process.env.TABLE_NAME;
const SigningKeyID = process.env.SIGNING_KEY_NAME;
const secretsManagerParams = {
	SecretId: SigningKeyID
};

exports.handler = async event => {
	const { firstName, lastName, identifier, plainTextPassword } = JSON.parse(event.body);
	return simpleSave({
		plainTextPassword,
    TableName,
    itemParameters: { firstName, lastName, identifier, createdAt: Date.now(), isVerified: false },
		secretsManagerParams,
    numberOfSaltRounds,
	})
};