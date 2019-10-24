#!/bin/sh

source .env

printf "\n\nUploading Swagger file to S3.."
printf "\n\n"
aws s3 cp \
  src/swagger/api-template.json \
  s3://$S3_BUCKET/swagger-api-template.json