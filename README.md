# cURL to Code

Convert cURL commands to Python, JavaScript, Go, PHP, Ruby, Node.js instantly.

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

- **6 Languages** - Python, JavaScript, Go, PHP, Ruby, Node.js
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

## Supported cURL Options

| Option | Description | Status |
|--------|-------------|--------|
| `-X, --request` | HTTP method (GET, POST, PUT, DELETE, etc.) | Supported |
| `-H, --header` | Custom headers | Supported |
| `-d, --data` | POST data (JSON, form data) | Supported |
| `-u, --user` | Basic authentication | Supported |
| `-b, --cookie` | Cookies | Supported |
| `-F, --form` | Multipart form data | Supported |
| URL with query params | Query strings | Supported |

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
