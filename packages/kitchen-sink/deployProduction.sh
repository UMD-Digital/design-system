rm -rf build && npx yarn build && rsync -azhn --delete ./build/* ec2-user@3.20.248.56:/srv/http/kitchen-sink/ 
