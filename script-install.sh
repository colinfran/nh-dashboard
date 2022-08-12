GREEN=$'\e[0;32m'
echo "${GREEN}Running install script${NC}"
echo ""
echo "${GREEN}removing node_modules and package-lock files${NC}"
npm cache clean -force
rm -rf ./node_modules
rm -rf ./client/node_modules
rm -rf ./server/node_modules
echo ""
echo "${GREEN}Installing modules in client directory${NC}"
cd client && npm i
# npm install --prefix ./client
echo ""
echo "${GREEN}Installing modules in server directory${NC}"
# npm install --prefix ./server
cd ..
cd server && npm i
echo ""
cd ..
echo "${GREEN}Installing concurrently in root directory${NC}"
npm install concurrently