# PortfolioApp
To manage stock portfolio

Run MySQL
docker run --name some-mysql -v /my/custom:/etc/mysql/conf.d -p <host_PORT>:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql:tag

For example:
docker run --name portfolio-app-db -v /mysql-backup:/etc/mysql/conf.d -p 3307:3306 -e MYSQL_ROOT_PASSWORD=my-secret-pw -d mysql

** Error when connecting mysql from server:
Problem: ER_NOT_SUPPORTED_AUTH_MODE: Client does not support authentication protocol requested by server; consider upgrading MySQL client
=> ALTER USER '<your_user>'@'<host>' IDENTIFIED WITH mysql_native_password BY '<your_password>';
=> flush privileges;;
ref: https://stackoverflow.com/questions/50093144/mysql-8-0-client-does-not-support-authentication-protocol-requested-by-server

PUSH TO HEROKU STEPS:
1. Add to .gitignore, "client/" "package-lock.json" "nodemon.json"
2. Move all env variables to another file (env added directly to Heroku)
3. Create an .env file with 1 line: GENERATE_SOURCEMAP=false
4. Create Procfile with 1 line: "node ./bin/www"
5. Add "engines" with current working node version
6. Add build scripts in server package.json
- Build scripts for Windows: npm run --prefix client && Xcopy .\\client\\build\\* .\\public /Y /I /S
7. Comment out connection to db in app.js