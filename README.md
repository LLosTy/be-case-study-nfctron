# NFCTron Case Study

This project is a simple web server that simulates customer management using the NestJS framework. It serves as an introduction to the basic concepts of NestJS.

## Prerequisites

- Node.js
- pnpm (Package manager)
- Docker and Docker Compose

## Setup

1. Clone the repository:
   ```bash
   git clone git@github.com:LLosTy/be-case-study-nfctron.git
   cd be-case-study-nfctron
   ```

2. Create the environment file:
   ```bash
   cp .example.env .env
   ```

3. Install dependencies:
   ```bash
   pnpm install
   ```

4. Start the database:
   ```bash
   docker-compose up
   ```

## Running the Application

To start the application, run:

```bash
pnpm run start
```

The application will start running on `http://localhost:3000` by default, unless the port is specified otherwise in the configuration.

## API Documentation

This project uses Swagger for API documentation. Once the application is running, you can access the Swagger UI at:

```
http://localhost:3000/api#/data
```

Note: If you've configured a different port, replace 3000 with your specified port number.

This interactive documentation provides detailed information about all available endpoints, request/response schemas, and allows you to test the API directly from the browser.

## Testing

To run the tests, use:

```bash
pnpm run test
```

## Technologies Used

- NestJS
- Docker
- pnpm
- Swagger (for API documentation)
- Jest.js