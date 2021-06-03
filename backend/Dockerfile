# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:8.11.4

# Set the working directory to /api
WORKDIR /backend

# copy package.json into the container at /api
COPY package*.json /backend/

ENV DATA_IP=database

# install dependencies
RUN npm install

# Copy the current directory contents into the container at /api
COPY . /backend/

# Make port 80 available to the world outside this container
EXPOSE 80

# Run the app when the container launches
CMD ["npm", "start"]