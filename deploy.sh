#!/bin/bash
export PATH=$PATH:/root/.nvm/versions/node/v20.9.0/bin


POSTGRESS_DATABASE_PASSWORD="$1"
BACKEND_IMAGE_NAME="instagram_backend"
FRONTEND_IMAGE_NAME="instagram_frontend"
DATABASE_URL="postgres://postgres:$POSTGRESS_DATABASE_PASSWORD@postgres_database:5432"
DATABASE_NAME="instagram"
DATABASE_NETWORK="postgres_bridge"
IMAGE_TAG="latest"
FRONTEND_PORT=3002
BACKEND_PORTS=(8003 8004)

cd ~/instagram-clone
git pull origin main

if [ $? -eq 0 ]; then
    echo "Pulled latest code"
else
    echo "Pull latest failed."
    exit 1
fi

# backend
echo "Running backend build"
cd ~/instagam-clone/server

for PORT in "${PORTS[@]}"
do 
    docker stop $BACKEND_IMAGE_NAME-$PORT
    docker rm $BACKEND_IMAGE_NAME-$PORT
done

docker rmi atul24112001/$BACKEND_IMAGE_NAME:$IMAGE_TAG
docker build -t atul24112001/$BACKEND_IMAGE_NAME:$IMAGE_TAG .
 
if [ $? -eq 0 ]; then
  echo "Docker image atul24112001/$BACKEND_IMAGE_NAME:$IMAGE_TAG built successfully."
else
  echo "Docker image build failed."
  exit 1
fi


for PORT in "${PORTS[@]}"
do
  docker run -e DATABASE_URL=$DATABASE_URL/$DATABASE_NAME --name $BACKEND_IMAGE_NAME-$PORT --network $DATABASE_NETWORK -d -p $PORT:8000 atul24112001/$BACKEND_IMAGE_NAME:$IMAGE_TAG
done


# Front-end 
cd ~/instagram-clone/client
docker stop $FRONTEND_IMAGE_NAME
docker rm $FRONTEND_IMAGE_NAME
docker rmi atul24112001/$FRONTEND_IMAGE_NAME:$IMAGE_TAG
docker build -t atul24112001/$FRONTEND_IMAGE_NAME:$IMAGE_TAG .


if [ $? -eq 0 ]; then
  echo "Docker image atul24112001/$FRONTEND_IMAGE_NAME:$IMAGE_TAG built successfully."
else
  echo "Docker image build failed."
  exit 1
fi

docker run --name $FRONTEND_IMAGE_NAME -d -pa $FRONTEND_PORT:3000 atul24112001/$FRONTEND_IMAGE_NAME:$IMAGE_TAG

echo "Build Completed."
