pre-deploy:
	node_modules/.bin/webpack --config  webpack/app.js

pre-deploy-prod:
	node_modules/.bin/webpack --config  webpack/app.js -p
