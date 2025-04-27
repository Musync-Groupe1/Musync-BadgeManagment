# Base image
FROM node:20

# Set working directory inside container
WORKDIR /usr/src/app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy all other project files
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the app
CMD [ "npm", "start" ]
