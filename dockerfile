# Build Stage
FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy both package.json and package-lock.json (if available)
COPY . .

# Install dependencies on main directory
RUN npm install

# Install client dependencies on client directory
WORKDIR /app/client

RUN npm install
RUN npm run build

# Install server dependencies on server directory
WORKDIR /app/server

RUN npm install

WORKDIR /app

EXPOSE 5000
# Run the server
CMD ["npm", "run", "start:prod" ]
