# Fillout API Server

This repository contains a server application designed to interact with the Fillout API, allowing custom filtering of responses.

## Overview

The server is built with Node.js and Express.js, providing endpoints to fetch and filter responses from the Fillout API based on specified criteria.

## Getting Started

### Prerequisites

Before running the server, ensure you have the following installed:

- Node.js
- npm (Node Package Manager)

### Installation

1. Clone the repository:

```bash
git clone https://github.com/iraveendra/fillout.git
```

2. Navigate to the project directory:

```bash
cd fillout-api-server
```

3. Install dependencies:

```bash
npm install
```

### Configuration

Before running the server, set up your environment variables. Create a `.env` file in the root directory of the project and add the following variables:

```plaintext
API_KEY=your_fillout_api_key
FORM_ID=your_fillout_form_id
BASE_URL=https://api.fillout.com/v1/api
PORT=3100
```

Replace `your_fillout_api_key` and `your_fillout_form_id` with your actual Fillout API key and form ID.

### Running the Server

To start the server, run:

```bash
npm start
```

The server will start listening on the port specified in your `.env` file.

## Endpoints

### GET /:formId/filteredResponses

This endpoint retrieves filtered responses for a specific form.

- **formId**: The ID of the form for which responses are requested.

- **Query Parameters**:
    - `filters`: Array of JSON objects defining filtering criteria.
    - `limit` (optional): Limits the number of responses returned per request (default is 150).
    - `offset` (optional): Offset for pagination (default is 0).
    - `status` (optional): Pass "in_progress" to get a list of in-progress (unfinished) submissions. By default, only finished submissions are returned.
    - `includeEditLink` (optional): Pass true to include a link to edit the submission as `editLink`.
    - `sort` (optional): Can be "asc" or "desc", defaults to "asc".
    - `afterDate` (optional): A date string to filter submissions submitted after this date (format: YYYY-MM-DDTHH:mm:ss.sssZ).
    - `beforeDate` (optional): A date string to filter submissions submitted before this date (format: YYYY-MM-DDTHH:mm:ss.sssZ).

### Response

The response will contain the filtered responses along with metadata such as total response count and pagination details.

## Built With

- Node.js
- Express.js

## Authors

Inchara Raveendra
