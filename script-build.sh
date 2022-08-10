GREEN=$'\e[0;32m'
echo ""
echo "${GREEN}Running build script${NC}"
rm -rf ./server/public/static
cd client
npm run build
echo ""
echo "${GREEN}Moving build files into node app${NC}"
cp -r ./build/* ../server/public/