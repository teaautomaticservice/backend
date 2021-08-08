Build docker-compose for dev.
```
docker compose -p backend_dev -f docker-compose.yml -f docker-compose.dev.yml build
```
Run docker-compose.
```
docker compose -p backend_dev -f docker-compose.yml -f docker-compose.dev.yml up
```

For prod build run the same, but you have to change dev prefix on prod.