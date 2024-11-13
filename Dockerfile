# Stage 1: Build the Angular application
FROM node:18-alpine AS build

# Set the working directory inside the container
WORKDIR /app

# Copy the package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install Angular CLI and dependencies
RUN npm install -g @angular/cli@18.x && npm install

# Copy the rest of the application code
COPY . .

# Build the Angular application for production (make sure to use the correct outputPath)
RUN ng build --configuration production

# Stage 2: Set up the final container for serving the application
FROM gcr.io/distroless/static:nonroot

# Set the working directory inside the container
WORKDIR /usr/share/nginx/html

# Copy the compiled app from the build stage to the final directory
COPY --from=build /app/dist/backoffice/browser/ .

# Expose the necessary port for Google Cloud or any server environment
EXPOSE 8080

# Run the application using a simple HTTP server (or you can use `http-server` from npm)
CMD ["npx", "http-server", "-p", "8080", "--cors"]
