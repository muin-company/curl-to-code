# Contributing to cURL to Code

Thanks for your interest in contributing! This guide will help you get started.

## 🎯 Ways to Contribute

1. **Report Bugs** - Found an issue? Open a GitHub issue
2. **Suggest Features** - Have an idea? We'd love to hear it
3. **Fix Bugs** - Check open issues and submit PRs
4. **Add Languages** - Support for more programming languages
5. **Improve Parsing** - Better cURL command parsing
6. **Documentation** - Improve guides and examples
7. **Testing** - Add test cases and edge cases

## 🚀 Getting Started

### Prerequisites
- A modern web browser
- Basic knowledge of HTML/CSS/JavaScript
- Git installed

### Setup
```bash
# Fork the repository on GitHub
# Clone your fork
git clone https://github.com/YOUR_USERNAME/curl-to-code.git
cd curl-to-code

# Open in browser
open index.html

# Or use a simple HTTP server
python -m http.server 8000
# Visit http://localhost:8000
```

That's it! No build process, no dependencies.

## 📝 Code Structure

The entire application is in `index.html`:

```
index.html
├── <head>
│   ├── Meta tags (SEO)
│   └── <style> (CSS)
└── <body>
    ├── HTML structure
    └── <script> (JavaScript)
        ├── CurlParser class
        ├── CodeGenerator class
        └── Event handlers
```

### Key Classes

**CurlParser** - Parses cURL commands
```javascript
class CurlParser {
    parse(curlCommand) {
        // Returns: { url, method, headers, data, auth, ... }
    }
}
```

**CodeGenerator** - Generates code for each language
```javascript
class CodeGenerator {
    generatePython(parsed) { /* ... */ }
    generateJavaScript(parsed) { /* ... */ }
    generateNodeJS(parsed) { /* ... */ }
    generateGo(parsed) { /* ... */ }
    generatePHP(parsed) { /* ... */ }
    generateRuby(parsed) { /* ... */ }
    generate(parsed, language) { /* ... */ }
}
```

## 🎨 Adding a New Language

### Step 1: Add Button
Find the language selector in the HTML:
```html
<div class="language-selector">
    <button class="lang-btn active" data-lang="python">Python</button>
    <!-- Add your language here -->
    <button class="lang-btn" data-lang="rust">Rust</button>
</div>
```

### Step 2: Create Generator Method
Add a new method to the `CodeGenerator` class:
```javascript
generateRust(parsed) {
    let code = 'use reqwest;\n\n';
    code += '#[tokio::main]\n';
    code += 'async fn main() -> Result<(), Box<dyn std::error::Error>> {\n';
    code += `    let url = "${parsed.url}";\n`;
    
    // Build the request
    code += '    let client = reqwest::Client::new();\n';
    code += `    let response = client.${parsed.method.toLowerCase()}(url)\n`;
    
    // Add headers
    for (const [key, value] of Object.entries(parsed.headers)) {
        code += `        .header("${key}", "${value}")\n`;
    }
    
    // Add body if exists
    if (parsed.data) {
        code += `        .body("${parsed.data}")\n`;
    }
    
    code += '        .send()\n';
    code += '        .await?;\n\n';
    code += '    println!("{}", response.text().await?);\n';
    code += '    Ok(())\n';
    code += '}';
    
    return code;
}
```

### Step 3: Register Generator
Update the `generate()` method:
```javascript
generate(parsed, language) {
    const generators = {
        python: () => this.generatePython(parsed),
        javascript: () => this.generateJavaScript(parsed),
        nodejs: () => this.generateNodeJS(parsed),
        go: () => this.generateGo(parsed),
        php: () => this.generatePHP(parsed),
        ruby: () => this.generateRuby(parsed),
        rust: () => this.generateRust(parsed)  // Add this line
    };

    return generators[language]?.() || '// Language not supported yet';
}
```

### Step 4: Test
1. Open `index.html` in browser
2. Click your new language button
3. Test with various cURL commands
4. Verify the output is correct

## 🐛 Improving cURL Parsing

The `CurlParser.parse()` method handles extracting information from cURL commands.

### Common Patterns

**Extract a flag:**
```javascript
// For -X POST or --request POST
const methodMatch = cmd.match(/-X\s+([A-Z]+)/);
if (methodMatch) {
    result.method = methodMatch[1];
}
```

**Extract quoted values:**
```javascript
// For -H "Header: Value" or -H 'Header: Value'
const headerRegex = /-H\s+(['"])([^'"]+)\1/g;
let headerMatch;
while ((headerMatch = headerRegex.exec(cmd)) !== null) {
    // Process header
}
```

**Handle both short and long flags:**
```javascript
// For -d or --data
const dataMatch = cmd.match(/(?:-d|--data)\s+(['"])(.+?)\1/);
```

### Example: Adding Cookie File Support

```javascript
// Current: Only inline cookies (-b "cookie=value")
const cookieMatch = cmd.match(/-b\s+(['"])([^'"]+)\1/);

// Improved: Also support file (-b cookies.txt)
const cookieMatch = cmd.match(/-b\s+(['"]?)([^'"\s]+)\1/);
if (cookieMatch) {
    const cookieValue = cookieMatch[2];
    if (cookieValue.includes('=')) {
        // Inline cookie
        cookieValue.split(';').forEach(cookie => {
            const [key, value] = cookie.split('=').map(s => s.trim());
            if (key && value) result.cookies[key] = value;
        });
    } else {
        // Cookie file reference
        result.cookieFile = cookieValue;
    }
}
```

## ✅ Testing Your Changes

### Manual Testing
1. Test with example cURL commands (see TESTING.md)
2. Try edge cases (empty input, invalid syntax, special characters)
3. Test all language outputs
4. Verify copy-to-clipboard works
5. Check mobile responsiveness

### Browser Console Tests
```javascript
// Open browser console
const parser = new CurlParser();

// Test basic parsing
const result = parser.parse('curl -X POST https://example.com -H "Content-Type: application/json"');
console.log(result);
// Should show: { url: "https://example.com", method: "POST", headers: {...}, ... }

// Test your changes
// Add specific test cases for the feature you're working on
```

## 📋 Pull Request Process

1. **Create a Branch**
   ```bash
   git checkout -b feature/add-rust-support
   ```

2. **Make Your Changes**
   - Edit `index.html`
   - Test thoroughly
   - Update README if needed

3. **Commit**
   ```bash
   git add index.html
   git commit -m "feat: Add Rust code generation support"
   ```

   **Commit Message Format:**
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation only
   - `style:` Code style (formatting, no logic change)
   - `refactor:` Code restructuring
   - `test:` Adding tests
   - `chore:` Maintenance tasks

4. **Push to Your Fork**
   ```bash
   git push origin feature/add-rust-support
   ```

5. **Open Pull Request**
   - Go to GitHub
   - Click "New Pull Request"
   - Fill in the template
   - Wait for review

### PR Checklist
- [ ] Code works in Chrome, Firefox, Safari
- [ ] Mobile responsive (test on small screen)
- [ ] No console errors
- [ ] Follows existing code style
- [ ] Added test cases (in PR description)
- [ ] Updated README if adding new language

## 🎨 Code Style Guidelines

### HTML
- Use semantic HTML5 elements
- Maintain existing indentation (4 spaces)
- Keep structure clean and readable

### CSS
- Use CSS variables for colors
- Keep selectors simple and specific
- Maintain dark theme aesthetic
- Mobile-first responsive design

### JavaScript
- Use ES6+ features
- Clear, descriptive variable names
- Add comments for complex logic
- Keep functions focused and small
- Use `const` over `let` when possible

**Good:**
```javascript
const extractHeaders = (command) => {
    const headerRegex = /-H\s+(['"])([^'"]+)\1/g;
    const headers = {};
    let match;
    
    while ((match = headerRegex.exec(command)) !== null) {
        const [key, value] = match[2].split(':').map(s => s.trim());
        if (key && value) {
            headers[key] = value;
        }
    }
    
    return headers;
};
```

**Avoid:**
```javascript
function f(c){let r={};let h=/-H\s+(['"])([^'"]+)\1/g;let m;while(m=h.exec(c)){let p=m[2].split(':');r[p[0].trim()]=p[1].trim()}return r}
```

## 🐛 Reporting Bugs

### Before Reporting
1. Check existing issues
2. Test in different browsers
3. Clear browser cache and retry

### Bug Report Template
```markdown
**Describe the bug**
A clear description of what the bug is.

**To Reproduce**
Steps to reproduce:
1. Go to '...'
2. Paste this cURL command: '...'
3. Click on '...'
4. See error

**Expected behavior**
What you expected to happen.

**Actual behavior**
What actually happened.

**Screenshots**
If applicable, add screenshots.

**Browser:**
 - Browser: [e.g. Chrome, Safari]
 - Version: [e.g. 120]
 - OS: [e.g. macOS, Windows]

**cURL command:**
```bash
curl ...
```

**Additional context**
Any other context about the problem.
```

## 💡 Feature Requests

We love new ideas! When suggesting a feature:

1. **Check existing requests** - Someone might have suggested it already
2. **Explain the use case** - Why is this useful?
3. **Provide examples** - Show what it would look like
4. **Keep it focused** - One feature per request

### Feature Request Template
```markdown
**Feature description**
Clear description of the feature.

**Use case**
Why would this be useful? Who would benefit?

**Example**
Show an example of how it would work.

**Additional context**
Any other relevant information.
```

## 📖 Documentation

### Where to Document
- **README.md** - Main documentation, features, examples
- **DEPLOYMENT.md** - Deployment guides and hosting
- **TESTING.md** - Testing procedures and checklists
- **CONTRIBUTING.md** - This file
- **Code comments** - Complex logic, edge cases

### Documentation Style
- Clear and concise
- Use examples
- Keep it up-to-date
- Link related sections

## 🏆 Recognition

Contributors will be:
- Listed in README acknowledgments
- Credited in release notes
- Given shout-outs on social media

## 📬 Questions?

- **GitHub Issues** - For bugs and features
- **GitHub Discussions** - For questions and ideas
- **Twitter** - [@yourhandle](https://twitter.com/yourhandle)

## 📜 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**Thank you for contributing to cURL to Code! 🎉**
