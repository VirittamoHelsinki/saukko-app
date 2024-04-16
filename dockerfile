# Build Stage
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy both package.json and package-lock.json (if available)
COPY . .

# Install server dependencies
RUN npm install

WORKDIR /app/client

RUN npm install
RUN npm run build

WORKDIR /app/server

RUN npm install
RUN npm run build

WORKDIR /app
# Install server dependencies
EXPOSE 5000
# Run the server
CMD ["npm", "run", "start:prod" ]
