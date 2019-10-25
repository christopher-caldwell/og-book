printf "\nBuilding latest template.."
printf "\n\n"
sam build \
  -b dist/ \
  -t template.yml \
	--use-container