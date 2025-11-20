# 1. Start MySQL
docker run --name mysql-taskmanager -e MYSQL_ROOT_PASSWORD=Root@123 -e MYSQL_DATABASE=TaskManagerDB -p 3306:3306 -d mysql:8.0

# 2. Backend
cd taskAPI
dotnet ef database update
dotnet run
# API: http://localhost:5004

# 3. Frontend
cd TaskClient
npm install
npm run dev
# UI: http://localhost:5173