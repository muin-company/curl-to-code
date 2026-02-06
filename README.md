# cURL to Code

Convert cURL commands to Python, JavaScript, Go, PHP, Ruby, Java, Rust, Node.js instantly.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://curl2code.com)
[![License: MIT](https://img.shields.io/badge/license-MIT-blue)](LICENSE)
[![GitHub stars](https://img.shields.io/github/stars/muinmomin/curl-to-code.svg?style=social)](https://github.com/muinmomin/curl-to-code)

## What is this?

Paste a cURL command, get working code in your language. That's it.

## Why use this?

**Before:**
```bash
# API docs give you this:
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token123' \
  -d '{"name":"John","email":"john@example.com"}'

# You need Python code
# You manually translate:
# - How do I set headers in requests?
# - Is it json= or data=?
# - Do I need to JSON.stringify the body?
# ...15 minutes of docs reading...
```

**After:**
```
1. Paste cURL command
2. Click "Python"
3. Copy working code
4. Run it
```

**Real pain points:**
- API documentation only provides cURL examples
- Each language has different HTTP client syntax
- Easy to mess up headers, auth, or body formatting
- Postman is too heavy for quick conversions
- Manual translation is error-prone

This tool does one thing: turn cURL into code, instantly.

## Features

- **8 Languages** - Python, JavaScript, Go, PHP, Ruby, Java, Rust, Node.js
- **Zero Dependencies** - Single HTML file, works offline
- **Full Parsing** - Headers, data, auth, cookies, methods, query params
- **One-Click Copy** - Clipboard integration
- **Live Conversion** - Real-time as you type
- **Mobile Responsive** - Works on phones/tablets
- **Clean UI** - Dark theme optimized for developers

## Usage

**Online:** Visit [curl2code.com](https://curl2code.com) (or your deployed URL)

**Local:**
```bash
git clone https://github.com/muinmomin/curl-to-code.git
cd curl-to-code
open index.html
```

No build process, no npm install. Just open and use.

## Examples

### Example 1: Simple GET request

**Input:**
```bash
curl https://api.example.com/users
```

**Python (requests):**
```python
import requests

url = 'https://api.example.com/users'
response = requests.get(url)

print(response.status_code)
print(response.json())
```

**JavaScript (fetch):**
```javascript
fetch('https://api.example.com/users')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

**Go:**
```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    resp, _ := http.Get("https://api.example.com/users")
    defer resp.Body.Close()
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

### Example 2: POST with JSON body

**Input:**
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","email":"john@example.com","age":30}'
```

**Python:**
```python
import requests

url = 'https://api.example.com/users'
headers = {'Content-Type': 'application/json'}
data = '{"name":"John Doe","email":"john@example.com","age":30}'

response = requests.post(url, headers=headers, data=data)
print(response.status_code)
print(response.json())
```

**Node.js (axios):**
```javascript
const axios = require('axios');

axios.post('https://api.example.com/users', 
  {"name":"John Doe","email":"john@example.com","age":30},
  {
    headers: {
      'Content-Type': 'application/json'
    }
  }
)
.then(response => console.log(response.data))
.catch(error => console.error(error));
```

### Example 3: Bearer token authentication

**Input:**
```bash
curl https://api.github.com/user/repos \
  -H 'Authorization: Bearer ghp_xxxxxxxxxxxxxxxxxxxx' \
  -H 'Accept: application/vnd.github.v3+json'
```

**Python:**
```python
import requests

url = 'https://api.github.com/user/repos'
headers = {
    'Authorization': 'Bearer ghp_xxxxxxxxxxxxxxxxxxxx',
    'Accept': 'application/vnd.github.v3+json'
}

response = requests.get(url, headers=headers)
print(response.json())
```

**PHP:**
```php
<?php
$ch = curl_init();

curl_setopt($ch, CURLOPT_URL, 'https://api.github.com/user/repos');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ghp_xxxxxxxxxxxxxxxxxxxx',
    'Accept: application/vnd.github.v3+json'
]);

$result = curl_exec($ch);
curl_close($ch);

echo $result;
?>
```

### Example 4: Form data with file upload

**Input:**
```bash
curl -X POST https://api.example.com/upload \
  -F 'file=@document.pdf' \
  -F 'title=My Document' \
  -F 'category=reports'
```

**Python:**
```python
import requests

url = 'https://api.example.com/upload'

files = {'file': open('document.pdf', 'rb')}
data = {
    'title': 'My Document',
    'category': 'reports'
}

response = requests.post(url, files=files, data=data)
print(response.status_code)
```

**JavaScript (using FormData):**
```javascript
const formData = new FormData();
formData.append('file', fileInput.files[0]); // from <input type="file">
formData.append('title', 'My Document');
formData.append('category', 'reports');

fetch('https://api.example.com/upload', {
  method: 'POST',
  body: formData
})
.then(response => response.json())
.then(data => console.log(data));
```

### Example 5: Query parameters and cookies

**Input:**
```bash
curl 'https://api.example.com/search?q=javascript&page=2&limit=50' \
  -H 'Cookie: session=abc123; user_id=456' \
  -H 'User-Agent: Mozilla/5.0'
```

**Python:**
```python
import requests

url = 'https://api.example.com/search'
params = {
    'q': 'javascript',
    'page': '2',
    'limit': '50'
}
headers = {
    'Cookie': 'session=abc123; user_id=456',
    'User-Agent': 'Mozilla/5.0'
}

response = requests.get(url, params=params, headers=headers)
print(response.json())
```

**Ruby:**
```ruby
require 'net/http'
require 'uri'

uri = URI.parse('https://api.example.com/search')
uri.query = URI.encode_www_form({
  'q' => 'javascript',
  'page' => '2',
  'limit' => '50'
})

http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri.request_uri)
request['Cookie'] = 'session=abc123; user_id=456'
request['User-Agent'] = 'Mozilla/5.0'

response = http.request(request)
puts response.body
```

### Example 6: PUT/PATCH/DELETE operations

**Input:**
```bash
curl -X PATCH https://api.example.com/users/123 \
  -H 'Content-Type: application/json' \
  -H 'Authorization: Bearer token123' \
  -d '{"status":"inactive"}'
```

**Python:**
```python
import requests

url = 'https://api.example.com/users/123'
headers = {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer token123'
}
data = '{"status":"inactive"}'

response = requests.patch(url, headers=headers, data=data)
print(response.status_code)
```

**Go:**
```go
package main

import (
    "bytes"
    "fmt"
    "net/http"
    "io"
)

func main() {
    url := "https://api.example.com/users/123"
    payload := []byte(`{"status":"inactive"}`)
    
    req, _ := http.NewRequest("PATCH", url, bytes.NewBuffer(payload))
    req.Header.Set("Content-Type", "application/json")
    req.Header.Set("Authorization", "Bearer token123")
    
    client := &http.Client{}
    resp, _ := client.Do(req)
    defer resp.Body.Close()
    
    body, _ := io.ReadAll(resp.Body)
    fmt.Println(string(body))
}
```

### Example 7: Complex real-world API call (Stripe)

**Input:**
```bash
curl https://api.stripe.com/v1/charges \
  -u sk_test_xxxxxxxxxxxx: \
  -d amount=2000 \
  -d currency=usd \
  -d source=tok_visa \
  -d description="Charge for customer@example.com"
```

**Python:**
```python
import requests

url = 'https://api.stripe.com/v1/charges'
auth = ('sk_test_xxxxxxxxxxxx', '')
data = {
    'amount': '2000',
    'currency': 'usd',
    'source': 'tok_visa',
    'description': 'Charge for customer@example.com'
}

response = requests.post(url, auth=auth, data=data)
print(response.json())
```

**Node.js:**
```javascript
const axios = require('axios');

const config = {
  method: 'post',
  url: 'https://api.stripe.com/v1/charges',
  auth: {
    username: 'sk_test_xxxxxxxxxxxx',
    password: ''
  },
  data: new URLSearchParams({
    amount: '2000',
    currency: 'usd',
    source: 'tok_visa',
    description: 'Charge for customer@example.com'
  })
};

axios(config)
  .then(response => console.log(response.data))
  .catch(error => console.error(error));
```

---

### Example 8: WebSocket connection (HTTP upgrade pattern)

**Input:**
```bash
curl -i -N \
  -H "Connection: Upgrade" \
  -H "Upgrade: websocket" \
  -H "Sec-WebSocket-Key: dGhlIHNhbXBsZSBub25jZQ==" \
  -H "Sec-WebSocket-Version: 13" \
  https://api.example.com/ws
```

**Python (using websockets library):**
```python
import asyncio
import websockets

async def connect():
    uri = "wss://api.example.com/ws"
    async with websockets.connect(uri) as websocket:
        # Send message
        await websocket.send("Hello server!")
        
        # Receive message
        response = await websocket.recv()
        print(response)

asyncio.run(connect())
```

**JavaScript (native WebSocket API):**
```javascript
const ws = new WebSocket('wss://api.example.com/ws');

ws.onopen = () => {
  console.log('Connected');
  ws.send('Hello server!');
};

ws.onmessage = (event) => {
  console.log('Received:', event.data);
};

ws.onerror = (error) => {
  console.error('WebSocket error:', error);
};

ws.onclose = () => {
  console.log('Disconnected');
};
```

**Node.js (using ws library):**
```javascript
const WebSocket = require('ws');

const ws = new WebSocket('wss://api.example.com/ws');

ws.on('open', function open() {
  console.log('Connected');
  ws.send('Hello server!');
});

ws.on('message', function message(data) {
  console.log('Received:', data.toString());
});

ws.on('error', function error(err) {
  console.error('Error:', err);
});
```

---

### Example 9: OAuth 2.0 token exchange

**Input:**
```bash
curl -X POST https://oauth.example.com/token \
  -H 'Content-Type: application/x-www-form-urlencoded' \
  -d 'grant_type=authorization_code' \
  -d 'code=AUTH_CODE_HERE' \
  -d 'redirect_uri=https://myapp.com/callback' \
  -d 'client_id=my_client_id' \
  -d 'client_secret=my_client_secret'
```

**Python (requests):**
```python
import requests

url = 'https://oauth.example.com/token'
headers = {'Content-Type': 'application/x-www-form-urlencoded'}
data = {
    'grant_type': 'authorization_code',
    'code': 'AUTH_CODE_HERE',
    'redirect_uri': 'https://myapp.com/callback',
    'client_id': 'my_client_id',
    'client_secret': 'my_client_secret'
}

response = requests.post(url, headers=headers, data=data)
tokens = response.json()

print(f"Access Token: {tokens['access_token']}")
print(f"Refresh Token: {tokens['refresh_token']}")
print(f"Expires in: {tokens['expires_in']} seconds")
```

**JavaScript (fetch with URLSearchParams):**
```javascript
const params = new URLSearchParams({
  grant_type: 'authorization_code',
  code: 'AUTH_CODE_HERE',
  redirect_uri: 'https://myapp.com/callback',
  client_id: 'my_client_id',
  client_secret: 'my_client_secret'
});

fetch('https://oauth.example.com/token', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  body: params
})
.then(response => response.json())
.then(tokens => {
  console.log('Access Token:', tokens.access_token);
  console.log('Refresh Token:', tokens.refresh_token);
  localStorage.setItem('access_token', tokens.access_token);
})
.catch(error => console.error('OAuth error:', error));
```

**Go (standard library):**
```go
package main

import (
    "encoding/json"
    "fmt"
    "net/http"
    "net/url"
)

type TokenResponse struct {
    AccessToken  string `json:"access_token"`
    RefreshToken string `json:"refresh_token"`
    ExpiresIn    int    `json:"expires_in"`
    TokenType    string `json:"token_type"`
}

func main() {
    data := url.Values{}
    data.Set("grant_type", "authorization_code")
    data.Set("code", "AUTH_CODE_HERE")
    data.Set("redirect_uri", "https://myapp.com/callback")
    data.Set("client_id", "my_client_id")
    data.Set("client_secret", "my_client_secret")

    resp, _ := http.PostForm("https://oauth.example.com/token", data)
    defer resp.Body.Close()

    var tokens TokenResponse
    json.NewDecoder(resp.Body).Decode(&tokens)
    
    fmt.Printf("Access Token: %s\n", tokens.AccessToken)
}
```

---

### Example 10: Retry logic with exponential backoff

**Input:**
```bash
curl --retry 5 \
  --retry-delay 2 \
  --retry-max-time 60 \
  -X GET https://api.example.com/unstable-endpoint \
  -H 'Authorization: Bearer token123'
```

**Python (with retry decorator):**
```python
import requests
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

def create_session_with_retries():
    session = requests.Session()
    
    # Retry strategy
    retry = Retry(
        total=5,
        backoff_factor=2,  # 1s, 2s, 4s, 8s, 16s
        status_forcelist=[429, 500, 502, 503, 504],
        allowed_methods=["GET", "POST"]
    )
    
    adapter = HTTPAdapter(max_retries=retry)
    session.mount("http://", adapter)
    session.mount("https://", adapter)
    
    return session

# Usage
session = create_session_with_retries()
headers = {'Authorization': 'Bearer token123'}

try:
    response = session.get(
        'https://api.example.com/unstable-endpoint',
        headers=headers,
        timeout=60
    )
    print(response.json())
except requests.exceptions.RetryError:
    print("Max retries exceeded")
except requests.exceptions.Timeout:
    print("Request timed out")
```

**JavaScript (with exponential backoff):**
```javascript
async function fetchWithRetry(url, options = {}, maxRetries = 5) {
  let lastError;
  
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const response = await fetch(url, options);
      
      if (response.ok) {
        return response;
      }
      
      // Retry on server errors (5xx) or rate limit (429)
      if (response.status >= 500 || response.status === 429) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      // Don't retry client errors (4xx)
      return response;
      
    } catch (error) {
      lastError = error;
      
      if (attempt < maxRetries) {
        // Exponential backoff: 2^attempt seconds
        const delay = Math.pow(2, attempt) * 1000;
        console.log(`Retry ${attempt + 1}/${maxRetries} after ${delay}ms`);
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
  }
  
  throw new Error(`Max retries (${maxRetries}) exceeded: ${lastError}`);
}

// Usage
fetchWithRetry('https://api.example.com/unstable-endpoint', {
  headers: {
    'Authorization': 'Bearer token123'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Failed after retries:', error));
```

**Node.js (using axios with interceptors):**
```javascript
const axios = require('axios');

// Create axios instance with retry logic
const api = axios.create({
  timeout: 60000,
  headers: {
    'Authorization': 'Bearer token123'
  }
});

// Retry interceptor
api.interceptors.response.use(undefined, async (error) => {
  const { config } = error;
  
  if (!config || !config.retry) {
    config.retry = { count: 0, limit: 5 };
  }
  
  // Check if we should retry
  const shouldRetry = 
    config.retry.count < config.retry.limit &&
    (!error.response || error.response.status >= 500 || error.response.status === 429);
  
  if (shouldRetry) {
    config.retry.count++;
    
    // Exponential backoff
    const delay = Math.pow(2, config.retry.count - 1) * 1000;
    console.log(`Retry ${config.retry.count}/${config.retry.limit} after ${delay}ms`);
    
    await new Promise(resolve => setTimeout(resolve, delay));
    return api(config);
  }
  
  return Promise.reject(error);
});

// Usage
api.get('https://api.example.com/unstable-endpoint')
  .then(response => console.log(response.data))
  .catch(error => console.error('Request failed:', error.message));
```

---

## Framework Integration Examples

### Postman Collection to Code Migration

**Scenario:** Your team uses Postman, but you need actual code for integration tests.

```bash
# 1. Export request as cURL from Postman
#    Right-click request → Code → cURL

curl --location 'https://api.stripe.com/v1/payment_intents' \
--header 'Authorization: Bearer sk_test_abc123' \
--header 'Content-Type: application/x-www-form-urlencoded' \
--data-urlencode 'amount=2000' \
--data-urlencode 'currency=usd' \
--data-urlencode 'payment_method_types[]=card'

# 2. Paste into curl-to-code, select Python → Get code:

import requests

url = 'https://api.stripe.com/v1/payment_intents'
headers = {
    'Authorization': 'Bearer sk_test_abc123',
    'Content-Type': 'application/x-www-form-urlencoded'
}
data = {
    'amount': '2000',
    'currency': 'usd',
    'payment_method_types[]': 'card'
}

response = requests.post(url, headers=headers, data=data)
print(response.json())

# 3. Turn into reusable test helper
# tests/helpers/stripe.py
import os
import requests
from typing import Dict, Any

class StripeTestHelper:
    BASE_URL = 'https://api.stripe.com/v1'
    
    def __init__(self, api_key: str = None):
        self.api_key = api_key or os.getenv('STRIPE_TEST_KEY')
        self.headers = {
            'Authorization': f'Bearer {self.api_key}',
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    
    def create_payment_intent(self, amount: int, currency: str = 'usd') -> Dict[str, Any]:
        """Create test payment intent"""
        data = {
            'amount': str(amount),
            'currency': currency,
            'payment_method_types[]': 'card'
        }
        
        response = requests.post(
            f'{self.BASE_URL}/payment_intents',
            headers=self.headers,
            data=data
        )
        response.raise_for_status()
        return response.json()

# 4. Use in pytest tests
# tests/test_payments.py
import pytest
from helpers.stripe import StripeTestHelper

@pytest.fixture
def stripe():
    return StripeTestHelper()

def test_create_payment_intent(stripe):
    intent = stripe.create_payment_intent(amount=5000, currency='usd')
    
    assert intent['amount'] == 5000
    assert intent['currency'] == 'usd'
    assert intent['status'] == 'requires_payment_method'
```

---

### API Documentation to SDK Generator

**Scenario:** API docs provide cURL examples, generate client SDK from them.

```bash
# Example from Twilio docs:
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACXXXXXXX/Messages.json" \
--data-urlencode "Body=Hello from Python" \
--data-urlencode "From=+15551234567" \
--data-urlencode "To=+15559876543" \
-u ACXXXXXXX:your_auth_token

# Convert to Python → Build SDK wrapper:

# twilio_client.py
import requests
from typing import Optional
from urllib.parse import urljoin

class TwilioClient:
    """
    Lightweight Twilio SDK generated from API docs.
    Alternative to official SDK when you need minimal dependencies.
    """
    
    BASE_URL = 'https://api.twilio.com/2010-04-01/'
    
    def __init__(self, account_sid: str, auth_token: str):
        self.account_sid = account_sid
        self.auth = (account_sid, auth_token)
        self.session = requests.Session()
    
    def send_sms(
        self, 
        to: str, 
        from_: str, 
        body: str,
        media_url: Optional[str] = None
    ) -> dict:
        """Send SMS message"""
        url = urljoin(
            self.BASE_URL, 
            f'Accounts/{self.account_sid}/Messages.json'
        )
        
        data = {
            'To': to,
            'From': from_,
            'Body': body,
        }
        
        if media_url:
            data['MediaUrl'] = media_url
        
        response = self.session.post(url, data=data, auth=self.auth)
        response.raise_for_status()
        return response.json()
    
    def get_message(self, message_sid: str) -> dict:
        """Get message details"""
        url = urljoin(
            self.BASE_URL,
            f'Accounts/{self.account_sid}/Messages/{message_sid}.json'
        )
        
        response = self.session.get(url, auth=self.auth)
        response.raise_for_status()
        return response.json()

# Usage:
client = TwilioClient(
    account_sid='ACXXXXXXX',
    auth_token='your_auth_token'
)

message = client.send_sms(
    to='+15559876543',
    from_='+15551234567',
    body='Hello from custom SDK!'
)

print(f"Message SID: {message['sid']}")
```

---

### Automated Integration Tests from API Specs

**Scenario:** Convert OpenAPI/Swagger cURL examples to test suite.

```javascript
// 1. API spec provides cURL examples for each endpoint
// 2. Convert each to JavaScript/TypeScript test

// tests/api/users.test.ts
import { describe, it, expect, beforeAll } from 'vitest';

describe('User API', () => {
  let authToken: string;
  let createdUserId: string;
  
  beforeAll(async () => {
    // Login to get auth token (converted from cURL)
    const response = await fetch('https://api.example.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email: 'test@example.com',
        password: 'test123'
      })
    });
    const data = await response.json();
    authToken = data.token;
  });
  
  it('creates a new user', async () => {
    // Converted from: curl -X POST .../users -H 'Authorization: Bearer ...' -d '{...}'
    const response = await fetch('https://api.example.com/users', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: 'Test User',
        email: 'newuser@example.com',
        role: 'user'
      })
    });
    
    expect(response.status).toBe(201);
    
    const user = await response.json();
    createdUserId = user.id;
    
    expect(user.name).toBe('Test User');
    expect(user.email).toBe('newuser@example.com');
  });
  
  it('retrieves user by ID', async () => {
    // Converted from: curl -H 'Authorization: Bearer ...' https://api.../users/123
    const response = await fetch(
      `https://api.example.com/users/${createdUserId}`,
      {
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    expect(response.status).toBe(200);
    
    const user = await response.json();
    expect(user.id).toBe(createdUserId);
  });
  
  it('updates user', async () => {
    // Converted from: curl -X PATCH .../users/123 -d '{"name":"Updated"}'
    const response = await fetch(
      `https://api.example.com/users/${createdUserId}`,
      {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: 'Updated Name'
        })
      }
    );
    
    expect(response.status).toBe(200);
    
    const user = await response.json();
    expect(user.name).toBe('Updated Name');
  });
  
  it('deletes user', async () => {
    // Converted from: curl -X DELETE .../users/123 -H 'Authorization: ...'
    const response = await fetch(
      `https://api.example.com/users/${createdUserId}`,
      {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${authToken}`
        }
      }
    );
    
    expect(response.status).toBe(204);
  });
});
```

---

### Serverless Function Local Testing

**Scenario:** Test AWS Lambda/Vercel/Netlify functions locally with curl-to-code.

```bash
# Test Vercel API endpoint locally
curl -X POST http://localhost:3000/api/webhook \
  -H 'Content-Type: application/json' \
  -H 'X-Signature: abc123' \
  -d '{"event":"user.created","data":{"id":123}}'

# Convert to Node.js test script:

// test-webhook-local.js
const http = require('http');

function testWebhook() {
  const data = JSON.stringify({
    event: 'user.created',
    data: { id: 123 }
  });

  const options = {
    hostname: 'localhost',
    port: 3000,
    path: '/api/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Signature': 'abc123',
      'Content-Length': data.length
    }
  };

  const req = http.request(options, (res) => {
    console.log(`Status: ${res.statusCode}`);
    
    let body = '';
    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('Response:', JSON.parse(body));
    });
  });

  req.on('error', (error) => {
    console.error('Error:', error);
  });

  req.write(data);
  req.end();
}

// Run test
console.log('Testing webhook locally...');
testWebhook();

// Enhanced version with multiple test cases:

const testCases = [
  {
    name: 'User Created Event',
    data: { event: 'user.created', data: { id: 123 } }
  },
  {
    name: 'User Deleted Event',
    data: { event: 'user.deleted', data: { id: 123 } }
  },
  {
    name: 'Invalid Signature',
    headers: { 'X-Signature': 'invalid' },
    data: { event: 'user.created', data: { id: 123 } },
    expectError: true
  }
];

async function runTests() {
  for (const test of testCases) {
    console.log(`\nTesting: ${test.name}`);
    await testWebhook(test.data, test.headers);
    await new Promise(resolve => setTimeout(resolve, 100));
  }
}

runTests();
```

---

### CI/CD Pipeline API Health Checks

**Scenario:** Generate health check scripts for deployment pipelines.

```yaml
# .github/workflows/deploy.yml
name: Deploy to Production

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy application
        run: ./deploy.sh
      
      - name: Health check - API endpoints
        run: |
          # Generated from curl-to-code for each critical endpoint
          
          # Check auth endpoint
          response=$(curl -s -o /dev/null -w "%{http_code}" \
            -X POST https://api.example.com/auth/login \
            -H 'Content-Type: application/json' \
            -d '{"email":"health@example.com","password":"check123"}')
          
          if [ $response -ne 200 ]; then
            echo "❌ Auth endpoint failed: $response"
            exit 1
          fi
          echo "✅ Auth endpoint healthy"
          
          # Check users endpoint
          response=$(curl -s -o /dev/null -w "%{http_code}" \
            https://api.example.com/users \
            -H 'Authorization: Bearer ${{ secrets.HEALTH_CHECK_TOKEN }}')
          
          if [ $response -ne 200 ]; then
            echo "❌ Users endpoint failed: $response"
            exit 1
          fi
          echo "✅ Users endpoint healthy"
          
          # Check database connectivity through API
          response=$(curl -s https://api.example.com/health/db \
            | jq -r '.status')
          
          if [ "$response" != "healthy" ]; then
            echo "❌ Database health check failed"
            exit 1
          fi
          echo "✅ Database connection healthy"
      
      - name: Notify on failure
        if: failure()
        run: |
          curl -X POST ${{ secrets.SLACK_WEBHOOK }} \
            -H 'Content-Type: application/json' \
            -d '{"text":"🚨 Production deployment health check failed!"}'
```

---

### Load Testing Script Generation

**Scenario:** Convert API calls to load testing scripts (k6, Artillery, Locust).

```bash
# Your production API call:
curl -X POST https://api.example.com/orders \
  -H 'Authorization: Bearer token123' \
  -H 'Content-Type: application/json' \
  -d '{"items":[{"id":1,"qty":2}],"total":59.99}'

# Convert to k6 load test:

// load-test.js
import http from 'k6/http';
import { check, sleep } from 'k6';

export const options = {
  stages: [
    { duration: '30s', target: 20 },  // Ramp up to 20 users
    { duration: '1m', target: 20 },   // Stay at 20 users
    { duration: '30s', target: 0 },   // Ramp down
  ],
  thresholds: {
    http_req_duration: ['p(95)<500'], // 95% of requests < 500ms
    http_req_failed: ['rate<0.01'],   // Error rate < 1%
  },
};

export default function () {
  const url = 'https://api.example.com/orders';
  const payload = JSON.stringify({
    items: [{ id: 1, qty: 2 }],
    total: 59.99
  });
  
  const params = {
    headers: {
      'Authorization': 'Bearer token123',
      'Content-Type': 'application/json',
    },
  };
  
  const response = http.post(url, payload, params);
  
  check(response, {
    'status is 201': (r) => r.status === 201,
    'order created': (r) => r.json('id') !== undefined,
    'response time < 500ms': (r) => r.timings.duration < 500,
  });
  
  sleep(1);
}

// Run: k6 run load-test.js

// Convert to Locust (Python):

from locust import HttpUser, task, between

class OrderUser(HttpUser):
    wait_time = between(1, 3)
    
    def on_start(self):
        """Login and get auth token"""
        response = self.client.post("/auth/login", json={
            "email": "loadtest@example.com",
            "password": "test123"
        })
        self.token = response.json()['token']
    
    @task
    def create_order(self):
        """Create order (from converted cURL)"""
        self.client.post(
            "/orders",
            json={
                "items": [{"id": 1, "qty": 2}],
                "total": 59.99
            },
            headers={
                "Authorization": f"Bearer {self.token}",
                "Content-Type": "application/json"
            }
        )

# Run: locust -f locustfile.py --host=https://api.example.com
```

---

### Browser DevTools Network Tab to Code

**Scenario:** Replay production API calls in development.

```bash
# 1. In Chrome DevTools → Network tab
# 2. Right-click request → Copy → Copy as cURL
# 3. Paste in curl-to-code, select your language

# Example: Copying a complex authenticated request
curl 'https://api.notion.com/v1/pages' \
  -H 'authorization: Bearer secret_xyz' \
  -H 'notion-version: 2022-06-28' \
  -H 'content-type: application/json' \
  --data-raw '{"parent":{"page_id":"abc"},"properties":{"title":[{"text":{"content":"New Page"}}]}}'

# Convert to TypeScript for integration:

// notion-integration.ts
import fetch from 'node-fetch';

interface NotionPage {
  parent: { page_id: string };
  properties: {
    title: Array<{ text: { content: string } }>;
  };
}

async function createNotionPage(
  parentPageId: string,
  title: string,
  apiKey: string
): Promise<any> {
  const response = await fetch('https://api.notion.com/v1/pages', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Notion-Version': '2022-06-28',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      parent: { page_id: parentPageId },
      properties: {
        title: [{
          text: { content: title }
        }]
      }
    })
  });

  return response.json();
}

// Usage:
const page = await createNotionPage(
  'parent-page-id',
  'My New Page',
  process.env.NOTION_API_KEY!
);
```

---

## Supported cURL Options

| Option | Description | Status |
|--------|-------------|--------|
| `-X, --request` | HTTP method (GET, POST, PUT, DELETE, etc.) | ✅ Supported |
| `-H, --header` | Custom headers | ✅ Supported |
| `-d, --data` | POST data (JSON, form data) | ✅ Supported |
| `-u, --user` | Basic authentication | ✅ Supported |
| `-b, --cookie` | Cookies | ✅ Supported |
| `-F, --form` | Multipart form data | ✅ Supported |
| URL with query params | Query strings | ✅ Supported |
| `--data-urlencode` | URL-encoded form data | ✅ Supported |
| `--data-raw` | Raw data body | ✅ Supported |
| `-L, --location` | Follow redirects | ⚠️ Documented in comments |
| `--retry` | Retry on failure | ⚠️ Documented in comments |
| `-o, --output` | Write to file | ⚠️ Documented in comments |

## Tech Stack

- Single HTML file
- Vanilla JavaScript
- Zero external dependencies
- No build process
- ~300 lines of code

Why? Because simple tools should be simple. No need for React/Vue/bundlers for a text converter.

## Development

Want to modify or self-host?

```bash
# Clone
git clone https://github.com/muinmomin/curl-to-code.git
cd curl-to-code

# Open in browser
open index.html

# Or serve locally
python -m http.server 8000
# Visit http://localhost:8000
```

All code is in `index.html`. Edit directly, no compilation needed.

## Deployment

### GitHub Pages
```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/curl-to-code.git
git push -u origin main

# Enable GitHub Pages in Settings > Pages
# Source: main branch, root directory
```

### Netlify / Vercel
Drag and drop the folder to their dashboard. Done.

### Any Static Host
Upload `index.html` - it's completely self-contained.

## Contributing

Want to improve curl-to-code? Here's how:

**Feature ideas:**
- Add more languages (Rust, C#, Swift, Kotlin)
- Support advanced cURL options (--proxy, --max-time, etc.)
- Add syntax highlighting
- Export as Postman collection
- Batch conversion (multiple cURLs)
- Generate tests (pytest, jest, etc.)

**How to contribute:**
1. Fork the repository
2. Create a feature branch
3. Make your changes to `index.html`
4. Test with multiple cURL examples
5. Submit a pull request

### Adding a New Language

Example for Rust:

1. Add button:
```html
<button class="lang-btn" data-lang="rust">Rust</button>
```

2. Add generator method:
```javascript
generateRust(parsed) {
    // Generate Rust code using parsed cURL data
    return rustCode;
}
```

3. Register in generator map:
```javascript
const generators = {
    rust: () => this.generateRust(parsed),
    // ... other generators
};
```

## Known Limitations

- Form file uploads (`-F 'file=@path'`) generate placeholder code
- Some advanced cURL flags not supported yet
- Cookie parsing is basic (no cookie jar file support)
- Doesn't validate generated code (assumes valid cURL input)

Pull requests to address these are welcome!

## Browser Support

Works in all modern browsers:
- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers

Uses ES6+ features but no build step required.

## Privacy

All processing happens client-side in your browser. No data is sent to any server. No analytics, no tracking.

## SEO

Optimized for:
- curl to python
- curl to javascript
- curl to code converter
- convert curl to requests
- curl command converter
- api request code generator

## License

MIT - Use it however you want.

---

Made by [muin](https://github.com/muinmomin)

*Stop manually translating cURL commands. Convert, copy, run.*
