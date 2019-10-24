printf "\nBuilding latest template.."
printf "\n\n"
sam build \
  -b build/ \
  -t template.yml \
	--use-container