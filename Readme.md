// build with no cache
docker-compose build --no-cache
// start the services
docker-compose up
// list the services
docker-compose ps
// list the containers
docker ps
// stop services
docker-compose stop

Para inicializar el proyecto deben usar:

  docker-compose up -d

Esta dando un problema el docker con respecto a la asyncronia entre el inicio de mysql y el backend...