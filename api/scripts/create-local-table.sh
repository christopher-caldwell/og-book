#!/bin/sh

source .env

aws dynamodb create-table \
  --table-name $TABLE_NAME \
  --attribute-definitions \
      AttributeName=identifier,AttributeType=S \
      AttributeName=resourceDescription,AttributeType=S \
  --endpoint-url http://localhost:8000 \
  --key-schema AttributeName=IndividualId,KeyType=HASH AttributeName=BusinessDescription,KeyType=RANGE \
  --provisioned-throughput ReadCapacityUnits=5,WriteCapacityUnits=5 \