# URL Shortener with Redis and Docker

A simple URL shortener application built with Node.js, Redis, and Docker. This application allows users to shorten long URLs, store them in Redis for fast retrieval, and access the shortened URLs via a web interface. The app uses Docker for easy deployment and scalability.

## Technologies

- **Node.js**: Backend of the application, handling server logic and URL shortening API.
- **Redis**: In-memory data store used for caching the shortened URLs to improve performance.
- **Docker**: Containerization tool that helps run the app and Redis in separate containers for easy deployment.
- **Express.js**: Web framework used to build the server and handle routing.
- **Shortid**: A library used to generate short, unique IDs for URL shortening.
- **Docker Compose**: Tool for defining and running multi-container Docker applications (used to orchestrate the app and Redis).

## Features

- Generate short URLs for long URLs.
- Redirect users from short URLs to their original long URLs.
- Cache URL mappings in Redis to improve performance.
- Simple web interface for generating short URLs.

## Getting Started

### Prerequisites

1. Docker installed on your machine. If not, download and install [Docker](https://www.docker.com/products/docker-desktop).
2. Basic knowledge of using the terminal and Docker commands.

### Installation

#### 1. Clone the repository and start with Docker:

```bash
git clone https://github.com/your-username/URL_Shortener.git
cd URL_Shortener
docker-compose up --build


