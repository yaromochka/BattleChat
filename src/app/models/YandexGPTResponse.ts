type YandexGPTResponse = {
  "result": {
    "alternatives": [
      {
        "message": {
          "role": string,
          "text": string
        },
        "status": string
      }
    ],
    "usage": {
      "inputTextTokens": string,
      "completionTokens": string,
      "totalTokens": string
    },
    "modelVersion": string
  }
}