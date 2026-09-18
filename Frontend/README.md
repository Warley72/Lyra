# Lyra

> Financial management system built with Next.js, TypeScript, Node.js, and PostgreSQL.

## About

Lyra is a full-stack financial management application developed as a personal project to practice and apply modern web development concepts.

The project uses a separate frontend and REST API architecture, with PostgreSQL as the database.

## Technologies

* Next.js
* TypeScript
* Node.js
* Fastify
* Prisma
* PostgreSQL
* Docker
* Sass

## Features

* User management
* Financial data management
* REST API
* CRUD operations
* PostgreSQL database integration
* Docker development environment

## Project Structure

```text
lyra/
├── api/
│   └── src/
│
├── web/
│   └── src/
│
├── docker-compose.yml
└── README.md
```

## Getting Started

### Requirements

* Node.js
* Docker
* Git

### Clone the repository

```bash
git clone https://github.com/Warley72/lyra.git
cd lyra
```

### Environment Variables

Create the environment files based on the provided `.env.example` files.

### Run the database

```bash
docker compose up -d
```

### Install dependencies

```bash
npm install
```

### Run the application

Start the API and web application according to their respective development scripts.

## Development

This project is continuously evolving as new features and improvements are implemented.

## Author

**Carlos Warley**

* Portfolio: https://portfolio-v2-gray-xi-82.vercel.app
* GitHub: https://github.com/Warley72
