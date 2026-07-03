# Nanee AI Canvas Coach API

## Overview

The Nanee AI Chat API provides an AI-powered conversational interface acting as **Canvas Coach**, an experienced startup mentor and Lean Canvas specialist. It evaluates a founder's lean canvas and helps them refine their ideas, validate assumptions, and uncover risks.

The API accepts a conversation history and returns the assistant's reply along with structured data including question options and conversation summaries.

**Base URL:**

```
https://nanee-ai-chat-backend.vercel.app
```

For local development:

```
http://localhost:3000
```

---

## Authentication

The API is currently **open** (no authentication required). 

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

Send a conversation and receive the Canvas Coach's response as JSON.

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
| `persona`  | string   | Yes      | User persona. (Must be `"nanee-user"` or `"internal_team"` to pass validation, though all use the unified Canvas Coach prompt). |

### Message Object

| Field     | Type     | Required | Description               |
| -----------| ----------| ----------| ---------------------------|
| `role`    | string   | Yes      | `"user"` or `"assistant"` |
| `content` | string \ | array    | Yes                       | Text string or array of content parts. |

The `content` field accepts either:

- **A plain string** (text-only message):

```json
{ "role": "user", "content": "I am building a scheduling tool for freelance tutors." }
```

- **An array of content parts** (for multimodal support):

```json
{
  "role": "user",
  "content": [
    { "type": "text", "text": "Here is my Lean Canvas draft." },
    { "type": "image", "image": "https://example.com/canvas.png" }
  ]
}
```

> **Note:** When images or PDFs are included, the API automatically uses a vision-capable model (Google Gemini 2.5 Flash). Text-only requests use DeepSeek V3.2 or OpenAI.

---

## Response

### Success (200)

| Field              | Type           | Always Present | Description                                                                 |
| ------------------ | -------------- | -------------- | --------------------------------------------------------------------------- |
| `reply`            | string         | Yes            | The assistant's text response.                                              |
| `answerType`       | string         | Yes            | Classification of the response type (see Answer Types).                     |
| `model`            | string         | Yes            | The model used for this request.                                            |
| `toolResults`      | array          | Yes            | Structured tool results triggered during the response (can be empty).       |
| `usage`            | object         | Yes            | Token usage for the request.                                                |
| `question`         | object \| null | No             | Structured question data. Present when `answerType` is a question type.     |
| `summary`          | string \| null | No             | Brief summary of the entire conversation so far.                            |

### Question Object

Present when `answerType` is `"open_ended_question"` or `"multiple_choice_question"`.

| Field     | Type     | Description                                                                  |
| --------- | -------- | ---------------------------------------------------------------------------- |
| `text`    | string   | The main question being asked.                                               |
| `options` | string[] | Options for multiple-choice. Empty array `[]` for open-ended questions.       |

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
| `summary`                  | The assistant is summarizing the conversation or the canvas.          |
| `recommendation`           | The assistant is recommending specific next steps or edits.           |

---

## Full Response Examples

### Question Response

```json
{
  "reply": "So this is a scheduling tool for freelance tutors, because they struggle with managing bookings – is that the core of it?",
  "answerType": "multiple_choice_question",
  "model": "openai/gpt-chat-latest",
  "toolResults": [],
  "usage": {
    "inputTokens": 2000,
    "outputTokens": 50,
    "totalTokens": 2050
  },
  "question": {
    "text": "What would help most right now?",
    "options": [
      "Full canvas review",
      "Help with one specific box",
      "Gut-check before I build this"
    ]
  },
  "summary": "Founder is building a scheduling tool for freelance tutors and wants feedback."
}
```

---

## Error Responses

### 400 Bad Request

```json
{ "error": "messages array is required and must not be empty" }
```

```json
{ "error": "persona is required and must be \"nanee-user\" or \"internal_team\"" }
```

### 500 Internal Server Error

```json
{ "error": "Internal server error" }
```

---

## Code Examples

### cURL — Text Only

```bash
curl -X POST https://nanee-ai-chat-backend.vercel.app/api/v1/chat \
  -H "Content-Type: application/json" \
  -d '{
    "messages": [
      { "role": "user", "content": "I want to build a scheduling tool for freelance tutors." }
    ],
    "persona": "nanee-user"
  }'
```

### JavaScript (fetch)

```javascript
const response = await fetch("https://nanee-ai-chat-backend.vercel.app/api/v1/chat", {
  method: "POST",
  headers: { "Content-Type": "application/json" },
  body: JSON.stringify({
    messages: [
      { role: "user", content: "I want to build a scheduling tool for freelance tutors." },
    ],
    persona: "nanee-user",
  }),
});

const data = await response.json();

console.log(data.reply);            // Assistant's text response
console.log(data.answerType);       // "open_ended_question", "multiple_choice_question", etc.
console.log(data.model);            // e.g. "openai/gpt-chat-latest"
console.log(data.question);         // { text, options } if asking a question
console.log(data.summary);          // Conversation summary
console.log(data.usage);            // Token usage
```

### Python (requests)

```python
import requests

response = requests.post(
    "https://nanee-ai-chat-backend.vercel.app/api/v1/chat",
    json={
        "messages": [
            {"role": "user", "content": "I want to build a scheduling tool for freelance tutors."}
        ],
        "persona": "nanee-user",
    },
)

data = response.json()

print(data["reply"])            # Assistant's text response
print(data["answerType"])       # Response classification
print(data["model"])            # Model used
print(data.get("question"))     # Question data (if present)
print(data.get("summary"))      # Conversation summary
```

---

## Multi-turn Conversation

To maintain conversation context, append both user and assistant messages to the `messages` array on each turn.

```javascript
const messages = [];

// Turn 1
messages.push({ role: "user", content: "I have an idea for a startup." });
const turn1 = await chat(messages);
messages.push({ role: "assistant", content: turn1.reply });
// turn1.summary = "User has a new startup idea..."

// Turn 2
messages.push({ role: "user", content: "It's a scheduling tool for tutors." });
const turn2 = await chat(messages);
messages.push({ role: "assistant", content: turn2.reply });

async function chat(messages) {
  const res = await fetch("https://nanee-ai-chat-backend.vercel.app/api/v1/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages, persona: "nanee-user" }),
  });
  return res.json();
}
```
