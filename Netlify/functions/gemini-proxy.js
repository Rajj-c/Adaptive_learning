    {
      "name": "gemini-proxy-functions",
      "version": "1.0.0",
      "description": "Netlify functions for proxying Gemini API requests",
      "main": "gemini-proxy.js",
      "scripts": {
        "start": "netlify-lambda serve",
        "build": "netlify-lambda build"
      },
      "dependencies": {
        "@google/generative-ai": "^0.1.3"
      }
    }
    
