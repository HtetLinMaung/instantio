# InstantIO Microservice Documentation

## Overview

InstantIO is a microservice designed to facilitate real-time interactions within web applications. This service operates on the Node.js platform, utilizing Socket.IO for efficient and scalable WebSocket communication. InstantIO is packaged as a Docker container for rapid deployment and ease of use.

## Prerequisites

- Docker
- Docker Compose (for orchestrating multi-container Docker applications)

## Docker Deployment

The InstantIO service is distributed as a Docker image `htetlinmaung/instantio`. Deployment is straightforward using Docker Compose.

### Setting Up Docker Compose

Create a `docker-compose.yml` file in your project directory with the following configuration:

```yml
version: "3.9"

services:
  instantio:
    image: htetlinmaung/instantio
    restart: always
    ports:
      - "8002:3000" # Map the host port 8002 to the container port 3000
    environment:
      PORT: 3000
      TOKEN_VERIFICATION_WEB_HOOK: "http://web:8080/api/auth/verify-token"
      SOCKETIO_NAMESPACE: "/instantio"
      INSTANTIO_WEB_HOOK: "http://web:8080/api/instantio/hook"
      TZ: "Asia/Yangon"
```

Adjust the `environment` variables according to your setup. This includes the verification webhooks and the timezone setting.

### Starting the Service

To start InstantIO, navigate to the directory containing your `docker-compose.yml` file and run:

```bash
docker-compose up -d
```

This command pulls the Docker image (if it's not already local), creates a container, and starts the service in detached mode.

## API Endpoints

### Emit Event

POST `/instantio/emit`

This endpoint allows the server to emit an event to all clients in specified rooms.

### Request Body

```json
{
  "event": "chat",
  "rooms": [1],
  "payload": {
    "message_id": 1
  }
}
```

- `event`: The event type to emit.
- `rooms`: An array of room identifiers to which the event should be sent.
- `payload`: The data to be transmitted with the event.

### Usage Example

To emit a chat event to room 1 with a message payload, you would send a POST request to `/instantio/emit` with the above JSON body.

## Socket.IO Events

InstantIO listens for several events:

- `join`: When a client joins a specific room.
- `disconnect`: When a client disconnects from the service.
- `message`: For handling and broadcasting messages to clients within a room.
