GREEN=$'\e[0;32m'
echo "${GREEN}Running install script${NC}"
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