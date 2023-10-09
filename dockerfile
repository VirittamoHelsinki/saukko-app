FROM node:14

# Set the working directory to /app
WORKDIR /app

# Copy both package.json and package-lock.json (if available)
COPY . .

# Install dependencies for the server and client
RUN npm run setup

# Expose the port the app runs on
EXPOSE 3459

# Run the server
CMD ["npm", "run", "start:prod" ]
