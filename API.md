# Ozone Shower Advisor 

## Overview



The Ozone Shower Advisor API provides an AI-powered conversational interface for recommending glass shower enclosures, fittings, and accessories from [Ozone India](https://www.ozone.in). The API accepts a conversation history (with optional image/PDF attachments) and returns the assistant's reply along with structured data including product recommendations, question options, and conversation summaries.

**Base URL:**

```
https://ozone-eosin.vercel.app
```

For local development:

```
http://localhost:3000
```

---

## Authentication

The API is currently **open** (no authentication required). API key-based auth may be added in a future version.

---

## CORS

The API supports cross-origin requests from any origin. The following headers are included in all responses:

```
Access-Control-Allow-Origin: *
Access-Control-Allow-Methods: POST, OPTIONS
Access-Control-Allow-Headers: Content-Type
```

---

## Endpoint

### `POST /api/v1/chat`

Send a conversation and receive the AI advisor's response as JSON.

---

## Request

**Headers:**

| Header         | Value              |
| -------------- | ------------------ |
| `Content-Type` | `application/json` |

**Body:**

| Field      | Type     | Required | Description                                                                 |
| ---------- | -------- | -------- | --------------------------------------------------------------------------- |
| `messages` | array    | Yes      | Conversation history as an array of message objects (see below).            |
| `persona`  | string   | Yes      | User persona. Must be `"homeowner"`, `"architect"`, or `"dealer"`.          |

### Message Object

| Field     | Type                | Required | Description                                          |
| --------- | ------------------- | -------- | ---------------------------------------------------- |
| `role`    | string              | Yes      | `"user"` or `"assistant"`                            |
| `content` | string \| array     | Yes      | Text string or array of content parts (see below).   |

The `content` field accepts either:

- **A plain string** (text-only message):

```json
{ "role": "user", "content": "Show me frameless shower options" }
```

- **An array of content parts** (for images/PDFs):

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "What enclosure suits this bathroom?" },
    { "type": "image", "image": "https://example.com/bathroom.jpg" }
  ]
}
```

### Content Part Types

| Type    | Fields                                  | Description                                  |
| ------- | --------------------------------------- | -------------------------------------------- |
| `text`  | `text` (string)                         | Plain text content.                          |
| `image` | `image` (string)                        | Image as a URL or base64 data URI.           |
| `file`  | `file.filename` (string), `file.data` (string) | PDF file as base64 data URI with filename. |

**Image formats:** JPEG, PNG, WebP, GIF. Provide as a public URL or base64 data URI (`data:image/jpeg;base64,...`).

**PDF format:** Provide as base64 data URI (`data:application/pdf;base64,...`) with a `filename`.

> **Note:** When images or PDFs are included, the API automatically uses a vision-capable model (Google Gemini 2.5 Flash). Text-only requests use DeepSeek V3.2.

---

## Response

### Success (200)

| Field              | Type           | Always Present | Description                                                                 |
| ------------------ | -------------- | -------------- | --------------------------------------------------------------------------- |
| `reply`            | string         | Yes            | The assistant's text response.                                              |
| `answerType`       | string         | Yes            | Classification of the response type (see Answer Types).                     |
| `model`            | string         | Yes            | The model used for this request (e.g., `"deepseek/deepseek-v3.2"`).        |
| `toolResults`      | array          | Yes            | Structured tool results triggered during the response (can be empty).       |
| `usage`            | object         | Yes            | Token usage for the request.                                                |
| `question`         | object \| null | No             | Structured question data. Present when `answerType` is a question type.     |
| `recommendations`  | array \| null  | No             | Full product objects. Present when product tools were invoked.              |
| `summary`          | string \| null | No             | Brief summary of the entire conversation so far.                            |

### Question Object

Present when `answerType` is `"open_ended_question"` or `"multiple_choice_question"`.

| Field     | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `text`    | string   | The main question being asked.                                               |
| `options` | string[] | Options for multiple-choice. Empty array `[]` for open-ended questions.       |

### Recommendations Array

Present when the AI invoked product tools (`show_enclosures`, `show_fittings`, `compare_products`, etc.). Each item is a full product object — either an **Enclosure** or a **Fitting**.

**Enclosure object:**

| Field               | Type              | Description                                      |
| ------------------- | ----------------- | ------------------------------------------------ |
| `id`                | string            | Unique product ID (e.g., `"eliza"`).             |
| `name`              | string            | Display name (e.g., `"Eliza"`).                  |
| `series`            | string            | Series name (e.g., `"Eliza Series"`).            |
| `frameType`         | string            | `"frameless"`, `"semi-framed"`, or `"framed"`.   |
| `doorMechanism`     | string            | `"swing"`, `"sliding"`, or `"slide-fold"`.       |
| `material`          | string            | Construction material.                           |
| `layouts`           | string[]          | Available layout configurations.                 |
| `colors`            | string[]          | Available color/finish options.                  |
| `sizes`             | string[]          | Available sizes.                                 |
| `features`          | string[]          | Key product features.                            |
| `specifications`    | object            | Technical specifications (key-value pairs).      |
| `usps`              | string[]          | Unique selling points.                           |
| `applications`      | string[]          | Recommended applications.                        |
| `priceTier`         | string            | `"budget"`, `"mid-range"`, `"premium"`, or `"luxury"`. |
| `idealFor`          | string[]          | Ideal use cases.                                 |
| `maintenanceLevel`  | string            | `"easy"` or `"moderate"`.                        |
| `spaceRequirement`  | string            | `"space-saving"`, `"needs-clearance"`, or `"flexible"`. |
| `description`       | string            | Full product description.                        |
| `ozoneUrl`          | string            | Product page URL.                                |
| `catalogUrl`        | string            | Catalog page URL.                                |

**Fitting object:**

| Field            | Type     | Description                              |
| ---------------- | -------- | ---------------------------------------- |
| `id`             | string   | Unique fitting ID.                       |
| `name`           | string   | Display name.                            |
| `category`       | string   | Category (e.g., `"hinges"`, `"handles"`).|
| `tier`           | string   | Price tier.                              |
| `compatibleWith` | string[] | Compatible enclosure IDs.                |
| `colors`         | string[] | Available colors/finishes.               |
| `description`    | string   | Product description.                     |
| `ozoneUrl`       | string   | Product page URL.                        |

### Usage Object

| Field          | Type           | Description                      |
| -------------- | -------------- | -------------------------------- |
| `inputTokens`  | number \| null | Tokens used for the prompt.      |
| `outputTokens` | number \| null | Tokens used for the completion.  |
| `totalTokens`  | number \| null | Total tokens consumed.           |

---

## Answer Types

| Value                      | Description                                                          |
| -------------------------- | -------------------------------------------------------------------- |
| `open_ended_question`      | The assistant is asking an open-ended question.                      |
| `multiple_choice_question` | The assistant is presenting specific options or choices to pick from. |
| `summary`                  | The assistant is summarizing information or specifications.           |
| `recommendation`           | The assistant is recommending specific products or solutions.         |

---

## Personas

| Persona   | Value         | Description                                                                                      |
| --------- | ------------- | ------------------------------------------------------------------------------------------------ |
| Homeowner | `"homeowner"` | Warm, jargon-free advisor for bathroom renovations. Guides through discovery and recommendations. |
| Architect | `"architect"` | Technical, specification-focused advisor for professional projects and bulk specifications.        |
| Dealer    | `"dealer"`    | Sales-focused assistant that helps dealers qualify customers and close sales.                      |

---

## Full Response Examples

### Question Response

```json
{
  "reply": "Great! To help you choose the perfect shower enclosure...",
  "answerType": "multiple_choice_question",
  "model": "deepseek/deepseek-v3.2",
  "toolResults": [],
  "usage": {
    "inputTokens": 23561,
    "outputTokens": 538,
    "totalTokens": 24099
  },
  "question": {
    "text": "What's your main reason for upgrading your shower?",
    "options": [
      "Completely renovating the bathroom",
      "Replacing an old shower enclosure",
      "Converting from a shower curtain/open shower",
      "Just exploring options for inspiration"
    ]
  },
  "summary": "User wants to upgrade their bathroom shower but hasn't provided specifics yet."
}
```

### Recommendation Response

```json
{
  "reply": "Based on your preferences, here are two excellent options...",
  "answerType": "recommendation",
  "model": "deepseek/deepseek-v3.2",
  "toolResults": [
    {
      "tool": "show_enclosures",
      "input": { "enclosureIds": ["eliza", "alura"] },
      "result": { "enclosureIds": ["eliza", "alura"], "count": 2 }
    }
  ],
  "usage": {
    "inputTokens": 15259,
    "outputTokens": 255,
    "totalTokens": 15514
  },
  "recommendations": [
    {
      "id": "eliza",
      "name": "Eliza",
      "series": "Eliza Series",
      "frameType": "frameless",
      "doorMechanism": "swing",
      "material": "SS 304 + Brass",
      "layouts": ["linear-180", "corner-90", "135-degree", "t-type"],
      "colors": ["Polished Stainless Steel"],
      "sizes": ["Custom"],
      "features": ["Premium frameless swing door", "SS 304 and Brass construction", "..."],
      "specifications": { "Frame Type": "Frameless", "Door Mechanism": "Swing", "...": "..." },
      "usps": ["Premium SS 304 + Brass build", "5 versatile layout configurations", "..."],
      "applications": ["Luxury residences", "Premium hotels", "High-end villas"],
      "priceTier": "luxury",
      "idealFor": ["Luxury bathrooms", "Master suites", "..."],
      "maintenanceLevel": "moderate",
      "spaceRequirement": "needs-clearance",
      "description": "The Eliza series is Ozone's flagship frameless swing shower enclosure...",
      "ozoneUrl": "https://www.ozone.in/eliza",
      "catalogUrl": "https://www.ozone.in/catalogue"
    }
  ],
  "summary": "User has a large 8x6 master bathroom, wants luxury frameless enclosure, budget around 2 lakh."
}
```

### Image Attachment Response

```json
{
  "reply": "That's a lovely, bright bathroom! Based on what I can see...",
  "answerType": "open_ended_question",
  "model": "google/gemini-2.5-flash",
  "toolResults": [],
  "usage": {
    "inputTokens": 18432,
    "outputTokens": 312,
    "totalTokens": 18744
  },
  "question": {
    "text": "Could you tell me more about what you're looking for?",
    "options": []
  },
  "summary": "User has a modern bathroom shown in an image and is looking for shower enclosure recommendations."
}
```

---

## Error Responses

### 400 Bad Request

```json
{ "error": "messages array is required and must not be empty" }
```

```json
{ "error": "persona is required and must be \"homeowner\", \"architect\", or \"dealer\"" }
```

### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## Code Examples

### cURL — Text Only

```bash
curl -X POST https://ozone-eosin.vercel.app/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "Show me frameless shower options" }
    ],
    "persona": "homeowner"
  }'
```

### cURL — With Image

```bash
curl -X POST https://ozone-eosin.vercel.app/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "What enclosure would fit this bathroom?" },
          { "type": "image", "image": "https://example.com/bathroom.jpg" }
        ]
      }
    ],
    "persona": "homeowner"
  }'
```

### cURL — With PDF

```bash
curl -X POST https://ozone-eosin.vercel.app/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      {
        "role": "user",
        "content": [
          { "type": "text", "text": "Analyze this floor plan" },
          { "type": "file", "file": { "filename": "floorplan.pdf", "data": "data:application/pdf;base64,JVBERi0..." } }
        ]
      }
    ],
    "persona": "architect"
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://ozone-eosin.vercel.app/api/v1/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "user", content: "Show me frameless shower options" },
    ],
    persona: "homeowner",
  }),
});

const data = await response.json();

console.log(data.reply);            // Assistant's text response
console.log(data.answerType);       // "recommendation", "multiple_choice_question", etc.
console.log(data.model);            // "deepseek/deepseek-v3.2" or "google/gemini-2.5-flash"
console.log(data.question);         // { text, options } if asking a question
console.log(data.recommendations);  // Full product objects (if any)
console.log(data.summary);          // Conversation summary
console.log(data.toolResults);      // Raw tool results
console.log(data.usage);            // Token usage
```

### JavaScript — With Image

```javascript
const response = await fetch("https://ozone-eosin.vercel.app/api/v1/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      {
        role: "user",
        content: [
          { type: "text", text: "What enclosure suits this bathroom?" },
          { type: "image", image: "https://example.com/bathroom.jpg" },
        ],
      },
    ],
    persona: "homeowner",
  }),
});

const data = await response.json();
// data.model will be "google/gemini-2.5-flash" (vision model)
```

### Python (requests)

```python
import requests

response = requests.post(
    "https://ozone-eosin.vercel.app/api/v1/chat",
    json={
        "messages": [
            {"role": "user", "content": "Show me frameless shower options"}
        ],
        "persona": "homeowner",
    },
)

data = response.json()

print(data["reply"])            # Assistant's text response
print(data["answerType"])       # Response classification
print(data["model"])            # Model used
print(data.get("question"))     # Question data (if present)
print(data.get("recommendations"))  # Product data (if present)
print(data.get("summary"))     # Conversation summary
```

---

## Multi-turn Conversation

To maintain conversation context, append both user and assistant messages to the `messages` array on each turn.

```javascript
const messages = [];

// Turn 1
messages.push({ role: "user", content: "I'm renovating my bathroom" });
const turn1 = await chat(messages);
messages.push({ role: "assistant", content: turn1.reply });
// turn1.summary = "User is renovating their bathroom..."

// Turn 2
messages.push({ role: "user", content: "It's about 8x6 feet, modern luxury style" });
const turn2 = await chat(messages);
messages.push({ role: "assistant", content: turn2.reply });
// turn2.summary = "User has an 8x6ft bathroom, wants modern luxury style..."

// Turn 3
messages.push({ role: "user", content: "Show me frameless options under 2 lakh" });
const turn3 = await chat(messages);
// turn3.recommendations = [{ id: "eliza", ... }, { id: "alura", ... }]
// turn3.summary = "User wants frameless enclosure for 8x6ft master bath, budget under 2 lakh..."

async function chat(messages) {
  const res = await fetch("https://ozone-eosin.vercel.app/api/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, persona: "homeowner" }),
  });
  return res.json();
}
```

---

## Tool Results Reference

The AI may invoke one or more tools during a response. Tool results are returned in the `toolResults` array. When product tools are invoked, the full product objects are also returned in the `recommendations` array.

### `show_enclosures`

Recommends specific shower enclosure series.

**Input:** `{ "enclosureIds": ["eliza", "cascade"] }`
**Result:** `{ "enclosureIds": ["eliza", "cascade"], "count": 2 }`

### `show_fittings`

Recommends specific fittings and accessories.

**Input:** `{ "fittingIds": ["premium-shower-hinges", "towel-bar-handles"] }`
**Result:** `{ "fittingIds": ["premium-shower-hinges", "towel-bar-handles"], "count": 2 }`

### `show_complete_solution`

Presents a complete shower package (enclosure + fittings).

**Input:** `{ "enclosureId": "eliza", "fittingIds": ["premium-shower-hinges"], "notes": "For master bathroom" }`
**Result:** `{ "enclosureId": "eliza", "fittingIds": ["premium-shower-hinges"], "notes": "For master bathroom" }`

### `compare_products`

Side-by-side comparison of 2-3 enclosure series.

**Input:** `{ "enclosureIds": ["eliza", "cascade"] }`
**Result:** `{ "enclosureIds": ["eliza", "cascade"], "count": 2 }`

### `budget_estimate`

Budget estimate breakdown for an enclosure and fittings.

**Input:** `{ "enclosureId": "eliza", "fittingIds": ["premium-shower-hinges"], "bathroomSize": "8x6 feet" }`
**Result:** `{ "enclosureId": "eliza", "fittingIds": ["premium-shower-hinges"], "bathroomSize": "8x6 feet" }`

### `book_consultation`

Triggers a consultation booking CTA.

**Input:** `{ "productInterest": "Eliza frameless enclosure", "persona": "homeowner" }`
**Result:** `{ "productInterest": "Eliza frameless enclosure", "persona": "homeowner" }`

### `download_catalog`

Provides a catalog download link.

**Input:** `{ "catalogType": "shower-enclosures" }`
**Result:** `{ "catalogType": "shower-enclosures" }`

Possible values: `"shower-enclosures"`, `"complete-shower-solutions"`, `"glass-fittings"`.

---

## Notes

- **Models:** Text-only requests use `deepseek/deepseek-v3.2`. Requests with images or PDFs automatically use `google/gemini-2.5-flash` (vision-capable). The `model` field in the response indicates which model was used.
- **Response time:** Expect 5-20 seconds per request depending on conversation length, model, and whether tools are invoked.
- **Token usage:** The full product catalog (~6K tokens) is included in every request as system context. Keep conversation history concise to manage costs.
- **Attachments:** Images can be sent as URLs or base64 data URIs. PDFs must be base64-encoded. Max request body size depends on your Vercel plan (4.5MB hobby, 20MB pro).
- **Backward compatible:** Plain string `content` continues to work exactly as before. The multimodal array format is optional.
- **Stateless:** The API is stateless. Send the full conversation history with each request.
- **Rate limits:** Subject to your OpenRouter plan limits. Monitor the `usage` field to track token consumption.
