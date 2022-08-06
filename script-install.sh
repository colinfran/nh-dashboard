GREEN=$'\e[0;32m'
echo "${GREEN}Running install script${NC}"
echo ""
echo "${GREEN}Remving all existing package-lock.json files${NC}"
echo ""
rm ./package-lock.json
rm ./client/package-lock.json
rm ./server/package-lock.json
echo ""
echo ""
npm cache clear --force
echo ""
echo "${GREEN}Installing concurrently in root directory${NC}"
npm install concurrently
echo ""
echo "${GREEN}Installing modules in client directory${NC}"
cd client
npm install
echo ""
echo "${GREEN}Installing modules in server directory${NC}"
cd ../server
npm install