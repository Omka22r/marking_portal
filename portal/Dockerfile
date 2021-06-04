# Use a lighter version of Node as a parent image
FROM mhart/alpine-node:12


ENV REACT_APP_BACK_END=localhost:8000

# Set the working directory to /portal
WORKDIR /portal

# copy package.json into the container at /portal
COPY package*.json /portal/

# install dependencies
RUN npm install


# Copy the current directory contents into the container at /portal
COPY . /portal/

# Make port 3000 available to the world outside this container
EXPOSE 3000
# Run the app when the container launches
CMD ["npm", "start"]
