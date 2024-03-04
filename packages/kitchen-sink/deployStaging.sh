rm -rf build && npx yarn build && rsync -azhn --delete ./build/* ec2-user@3.131.127.17:/srv/http/kitchen-sink/ 
