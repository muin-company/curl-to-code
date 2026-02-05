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

### Simple GET Request

**Input:**
```bash
curl https://api.example.com/users
```

**Python:**
```python
import requests

url = 'https://api.example.com/users'

response = requests.get(url)

print(response.status_code)
print(response.text)
```

**JavaScript (fetch):**
```javascript
const url = 'https://api.example.com/users';

fetch(url)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### POST with JSON Body

**Input:**
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**Python:**
```python
import requests

url = 'https://api.example.com/users'

headers = {
    'Content-Type': 'application/json'
}

data = '{"name":"John Doe","email":"john@example.com"}'

response = requests.post(url, headers=headers, data=data)

print(response.status_code)
print(response.json())
```

**Node.js (axios):**
```javascript
const axios = require('axios');

const config = {
  method: "post",
  url: "https://api.example.com/users",
  headers: {
    "Content-Type": "application/json"
  },
  data: '{"name":"John Doe","email":"john@example.com"}'
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data));
  })
  .catch(error => {
    console.log(error);
  });
```

### Authentication

**Input:**
```bash
curl -X GET https://api.example.com/protected \
  -u username:password
```

**Python:**
```python
import requests

url = 'https://api.example.com/protected'

response = requests.get(url, auth=('username', 'password'))

print(response.status_code)
print(response.text)
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
    url := "https://api.example.com/protected"
    req, _ := http.NewRequest("GET", url, nil)

    req.SetBasicAuth("username", "password")

    res, _ := http.DefaultClient.Do(req)
    defer res.Body.Close()
    body, _ := io.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))
}
```

### Custom Headers

**Input:**
```bash
curl https://api.example.com/data \
  -H 'User-Agent: MyApp/1.0' \
  -H 'Accept: application/json' \
  -H 'X-API-Key: secret123'
```

**PHP:**
```php
<?php

$url = 'https://api.example.com/data';

$options = [
    'http' => [
        'method' => 'GET',
        'header' => [
            'User-Agent: MyApp/1.0',
            'Accept: application/json',
            'X-API-Key: secret123'
        ]
    ]
];

$context = stream_context_create($options);
$response = file_get_contents($url, false, $context);

echo $response;
?>
```

**Ruby:**
```ruby
require 'net/http'
require 'uri'

uri = URI.parse('https://api.example.com/data')
http = Net::HTTP.new(uri.host, uri.port)
http.use_ssl = true

request = Net::HTTP::Get.new(uri.request_uri)
request['User-Agent'] = 'MyApp/1.0'
request['Accept'] = 'application/json'
request['X-API-Key'] = 'secret123'

response = http.request(request)

puts response.code
puts response.body
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
