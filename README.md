# cURL to Code 🔄

Convert cURL commands to code in **Python, JavaScript, Go, PHP, Ruby, and Node.js** instantly.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://curl2code.com)
[![License](https://img.shields.io/badge/license-MIT-blue)](LICENSE)

## 🚀 Features

- **6 Programming Languages** - Python, JavaScript, Node.js, Go, PHP, Ruby
- **Zero Dependencies** - Single HTML file, works offline
- **Full cURL Parsing** - Handles headers, data, auth, cookies, methods
- **One-Click Copy** - Copy generated code to clipboard instantly
- **Live Conversion** - Real-time code generation as you type
- **Mobile Responsive** - Works on any device
- **SEO Optimized** - Built for discoverability
- **Developer-Friendly UI** - Clean, dark theme optimized for developers

## 📖 Usage

### Online
Visit [curl2code.com](https://curl2code.com) (or your deployed URL)

### Local
```bash
# Clone the repo
git clone https://github.com/yourusername/curl-to-code.git
cd curl-to-code

# Open in browser
open index.html
```

That's it! No build process, no dependencies.

## 🎯 Examples

### Simple GET Request
```bash
curl https://api.example.com/users
```

**→ Python:**
```python
import requests

url = 'https://api.example.com/users'

response = requests.get(url)

print(response.status_code)
print(response.text)
```

### POST with JSON
```bash
curl -X POST https://api.example.com/users \
  -H 'Content-Type: application/json' \
  -d '{"name":"John Doe","email":"john@example.com"}'
```

**→ JavaScript:**
```javascript
const url = 'https://api.example.com/users';

const options = {
  method: "POST",
  headers: {
    "Content-Type": "application/json"
  },
  body: '{"name":"John Doe","email":"john@example.com"}'
};

fetch(url, options)
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(error => console.error('Error:', error));
```

### With Authentication
```bash
curl -X GET https://api.example.com/protected \
  -u username:password
```

**→ Node.js:**
```javascript
const axios = require('axios');

const config = {
  method: "get",
  url: "https://api.example.com/protected",
  auth: {
    username: "username",
    password: "password"
  }
};

axios(config)
  .then(response => {
    console.log(JSON.stringify(response.data));
  })
  .catch(error => {
    console.log(error);
  });
```

### Custom Headers
```bash
curl https://api.example.com/data \
  -H 'User-Agent: MyApp/1.0' \
  -H 'Accept: application/json' \
  -H 'X-API-Key: secret123'
```

**→ Go:**
```go
package main

import (
    "fmt"
    "io"
    "net/http"
)

func main() {
    url := "https://api.example.com/data"
    req, _ := http.NewRequest("GET", url, nil)

    req.Header.Add("User-Agent", "MyApp/1.0")
    req.Header.Add("Accept", "application/json")
    req.Header.Add("X-API-Key", "secret123")

    res, _ := http.DefaultClient.Do(req)
    defer res.Body.Close()
    body, _ := io.ReadAll(res.Body)

    fmt.Println(res)
    fmt.Println(string(body))
}
```

## 🔧 Supported cURL Options

| Option | Description | Status |
|--------|-------------|--------|
| `-X, --request` | HTTP method | ✅ |
| `-H, --header` | Custom headers | ✅ |
| `-d, --data` | POST data | ✅ |
| `-u, --user` | Basic authentication | ✅ |
| `-b, --cookie` | Cookies | ✅ |
| `-F, --form` | Form data | ✅ |
| URL with query params | Query strings | ✅ |

## 🎨 Tech Stack

- **HTML5** - Semantic, SEO-optimized structure
- **Vanilla JavaScript** - Zero dependencies, fast and lightweight
- **CSS3** - Modern, responsive design with dark theme
- **No Build Process** - Works immediately, no npm/webpack/bundlers

## 📂 Project Structure

```
curl-to-code/
├── index.html          # Complete single-file application
├── README.md          # This file
└── LICENSE            # MIT License
```

## 🚢 Deployment

### GitHub Pages
```bash
# Push to GitHub
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/curl-to-code.git
git push -u origin main

# Enable GitHub Pages in repository settings
# Point to main branch, root directory
```

### Netlify
```bash
# Drag and drop the folder to Netlify dashboard
# Or connect GitHub repo for automatic deployments
```

### Vercel
```bash
vercel --prod
```

### Any Static Host
Just upload `index.html` - it's completely self-contained!

## 🎯 SEO Features

- Semantic HTML5 structure
- Complete meta tags (description, keywords, author)
- Open Graph tags for social sharing
- Twitter Card support
- Mobile-responsive viewport
- Fast loading (single file, no external dependencies)
- Clean URLs (no hash routing)

## 🤝 Contributing

Contributions are welcome! Here's how:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Adding a New Language

To add support for a new language:

1. Add a button in the language selector:
```html
<button class="lang-btn" data-lang="rust">Rust</button>
```

2. Add a generator method in the `CodeGenerator` class:
```javascript
generateRust(parsed) {
    // Your Rust code generation logic
    return rustCode;
}
```

3. Register it in the `generate()` method:
```javascript
const generators = {
    // ... existing generators
    rust: () => this.generateRust(parsed)
};
```

## 📝 License

MIT License - feel free to use this project for anything!

## 🙏 Acknowledgments

- Built with ❤️ for the developer community
- Inspired by the need for a simple, fast cURL converter
- No external libraries = maximum simplicity

## 🐛 Known Issues

- Form file uploads (`-F 'file=@path'`) generate placeholder code
- Some advanced cURL flags not yet supported
- Cookie parsing is basic (no file support yet)

Pull requests to fix these are welcome!

## 📮 Contact

- Website: [curl2code.com](https://curl2code.com)
- GitHub: [@yourusername](https://github.com/yourusername)
- Twitter: [@yourhandle](https://twitter.com/yourhandle)

---

**Star ⭐ this repo if you find it useful!**
