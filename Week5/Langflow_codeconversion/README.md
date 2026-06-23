# QA Bot

AI-powered file question-answering service built with Node.js, Express, TypeScript, and LangChain.

## Setup

1. Copy `.env.example` to `.env` and add your API key.
2. Run `npm install`.
3. Run `npm run dev`.

## Endpoints

- `GET /` - serves the frontend
- `GET /health` - health status plus model info
- `POST /search/upload` - file upload route
- `POST /search/document` - text/document path route
