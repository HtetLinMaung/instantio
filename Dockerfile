# Use the official Node.js 16 image.
# If you need a different Node version, replace '16' with your desired version.
FROM node:alpine3.17

# Create a directory to hold the application code inside the image
# This will be the working directory for your application
WORKDIR /usr/src/app

# Copy package.json and package-lock.json (or yarn.lock if you use yarn)
# This is done before copying your application to cache your dependencies
COPY package*.json ./

# Install app dependencies
RUN npm install

# Bundle app source inside Docker image
COPY . .

# Your app binds to port 3000 so you'll use the EXPOSE instruction to have it mapped by the docker daemon
EXPOSE 3000

# Define the command to run your app using CMD which defines your runtime
# Here we will use node to run the index.js file of your application
CMD [ "node", "index.js" ]
