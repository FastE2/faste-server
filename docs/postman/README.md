# FastE-Ecommerce Postman Documentation

This directory contains the auto-generated Postman Collection and the default Postman Environment configurations for the **FastE-Ecommerce** NestJS backend.

---

## Files Included

1. **[faste-ecommerce.postman_collection.json](file:///home/kiet/projects/FastE-Ecommerce/faste-server/docs/postman/faste-ecommerce.postman_collection.json)**: The Postman collection containing all REST endpoints defined in the NestJS controllers.
2. **[faste-ecommerce.postman_environment.json](file:///home/kiet/projects/FastE-Ecommerce/faste-server/docs/postman/faste-ecommerce.postman_environment.json)**: The local development environment configuration.
3. **[openapi.json](file:///home/kiet/projects/FastE-Ecommerce/faste-server/docs/postman/openapi.json)**: The intermediate OpenAPI v3 spec exported from the NestJS swagger definition.

---

## Getting Started

### 1. Import Files into Postman

1. Open Postman.
2. Click **Import** in the top-left corner.
3. Select and import both files:
   - `faste-ecommerce.postman_collection.json`
   - `faste-ecommerce.postman_environment.json`

### 2. Configure the Environment

Select the imported environment named **FastE Local** from the environment dropdown in the top-right corner. It defines the following variables:

| Variable        | Default Value                  | Description                                                          |
| :-------------- | :----------------------------- | :------------------------------------------------------------------- |
| `baseUrl`       | `http://localhost:8080/api/v1` | The base URL pointing to the NestJS server.                          |
| `jwtToken`      | _(Empty)_                      | Used for authenticated routes. Copy your JWT token here after login. |
| `paymentApiKey` | `your_payment_api_key`         | API Key used for verifying payments.                                 |

---

## Authentication Flow

For endpoints that require authentication (marked with Bearer Auth):

1. Execute the **Login** request under the Auth folder.
2. Extract the `accessToken` from the response.
3. Edit the **FastE Local** environment and set the `jwtToken` variable to your extracted access token.
4. The collection is configured to automatically use the `{{jwtToken}}` variable under its parent authorization settings.

---

## How to Regenerate

If you add or update routes/controllers in NestJS, you can regenerate the Postman collection using the following command:

```bash
npm run generate:postman
```

This script will:

1. Boot the NestJS application context (without starting listener or connections).
2. Write the updated schema to `docs/postman/openapi.json`.
3. Convert the OpenAPI schema to a Postman collection JSON file (`docs/postman/faste-ecommerce.postman_collection.json`).
