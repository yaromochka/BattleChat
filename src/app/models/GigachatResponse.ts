type GigachatResponse = {
  "choices": [
    {
      "message": {
        "content": string,
        "role": string
      },
      "index": number,
      "finish_reason": string
    }
  ],
  "created": number,
  "model": string,
  "object": string,
  "usage": {
    "prompt_tokens": number,
    "completion_tokens": number,
    "total_tokens": number,
    "precached_prompt_tokens": number
  }
}
