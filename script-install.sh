GREEN=$'\e[0;32m'
echo "${GREEN}Running install script${NC}"
echo ""
echo "${GREEN}removing node_modules and package-lock files${NC}"
rm -rf node_modules
rm -rf ./client/node_modules
rm -rf ./server/node_modules
rm package-lock.json
rm ./client/package-lock.json
rm ./server/package-lock.json
echo ""
echo "${GREEN}Installing concurrently in root directory${NC}"
npm install concurrently
echo ""
echo "${GREEN}Installing modules in client directory${NC}"
cd client
npm i
echo ""
echo "${GREEN}Installing modules in server directory${NC}"
cd ../server
npm i