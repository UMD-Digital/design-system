rm -rf build && npx yarn build && rsync -azP --delete ./build/* ec2-user@3.20.248.56:/srv/http/kitchen-sink/ 
