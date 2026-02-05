# Testing Guide

## Manual Testing Checklist

### ✅ Core Functionality

1. **Basic GET Request**
   ```bash
   curl https://api.example.com/users
   ```
   - Should generate code in all 6 languages
   - URL should be extracted correctly
   - Method should default to GET

2. **POST with JSON**
   ```bash
   curl -X POST https://api.example.com/users \
     -H 'Content-Type: application/json' \
     -d '{"name":"John"}'
   ```
   - Method should be POST
   - Headers should be parsed
   - JSON data should be handled properly
   - Python should use `json=` parameter
   - JavaScript should include body

3. **Basic Authentication**
   ```bash
   curl -u username:password https://api.example.com/protected
   ```
   - Auth credentials should be extracted
   - Python should use `auth=` tuple
   - Go should use `SetBasicAuth`
   - PHP should use `CURLOPT_USERPWD`

4. **Multiple Headers**
   ```bash
   curl https://api.example.com/data \
     -H 'User-Agent: MyApp/1.0' \
     -H 'Accept: application/json' \
     -H 'X-API-Key: secret'
   ```
   - All headers should be extracted
   - Headers should be formatted correctly for each language

5. **Query Parameters**
   ```bash
   curl 'https://api.example.com/search?q=test&limit=10'
   ```
   - URL with query params should work
   - Parameters should be preserved

### 🎨 UI/UX Testing

1. **Language Switching**
   - Click each language button
   - Verify active state changes
   - Code output should update immediately

2. **Copy to Clipboard**
   - Click "Copy" button
   - Button should show "Copied!" feedback
   - Code should be in clipboard
   - Button should reset after 2 seconds

3. **Example Buttons**
   - Click each example button
   - Input should populate with example
   - Code should generate automatically
   - Page should scroll to top

4. **Live Conversion**
   - Type in the cURL input
   - Code should update in real-time
   - No lag or freezing

5. **Mobile Responsive**
   - Resize browser to mobile width
   - Layout should stack vertically
   - All buttons should remain accessible
   - Text should be readable

### 🐛 Edge Cases

1. **Empty Input**
   - Clear all text
   - Should show placeholder message
   - No errors in console

2. **Invalid cURL**
   ```bash
   this is not a curl command
   ```
   - Should show error message
   - Should not crash

3. **Malformed JSON**
   ```bash
   curl -d '{bad json' https://api.example.com
   ```
   - Should handle gracefully
   - Treat as plain data string

4. **Special Characters**
   ```bash
   curl -H "X-Custom: value with spaces" https://api.example.com
   ```
   - Should parse correctly
   - Quotes should be handled

5. **Very Long Input**
   - Paste a very long cURL command
   - Should not freeze
   - Should handle large outputs

### 📱 Browser Testing

Test in:
- ✅ Chrome/Edge (Chromium)
- ✅ Firefox
- ✅ Safari
- ✅ Mobile Safari (iOS)
- ✅ Mobile Chrome (Android)

### 🚀 Performance

1. **Load Time**
   - Page should load instantly (&lt;100ms)
   - No external dependencies to fetch

2. **Conversion Speed**
   - Code generation should be instant
   - No noticeable delay when typing

3. **Memory Usage**
   - Should not leak memory
   - Test by converting many different commands

## Automated Testing

While this is a single-file tool, you can add basic tests:

```javascript
// Add to console to test parser
const parser = new CurlParser();

// Test 1: Basic GET
console.assert(
    parser.parse('curl https://example.com').url === 'https://example.com',
    'Basic URL parsing failed'
);

// Test 2: Method extraction
console.assert(
    parser.parse('curl -X POST https://example.com').method === 'POST',
    'Method parsing failed'
);

// Test 3: Header parsing
const result = parser.parse('curl -H "Content-Type: application/json" https://example.com');
console.assert(
    result.headers['Content-Type'] === 'application/json',
    'Header parsing failed'
);

// Test 4: Auth parsing
const authResult = parser.parse('curl -u user:pass https://example.com');
console.assert(
    authResult.auth.username === 'user' && authResult.auth.password === 'pass',
    'Auth parsing failed'
);

console.log('All tests passed! ✅');
```

## Known Issues to Test

1. **Form File Uploads**
   ```bash
   curl -F 'file=@/path/to/file' https://example.com
   ```
   - Currently generates placeholder code
   - Should document this limitation

2. **Cookie Files**
   ```bash
   curl -b cookies.txt https://example.com
   ```
   - Only inline cookies supported
   - File references not parsed

3. **Complex Quotes**
   ```bash
   curl -d '{"key":"value with \"nested\" quotes"}' https://example.com
   ```
   - May have issues with nested quotes
   - Test thoroughly

## SEO Testing

1. **Meta Tags**
   - View page source
   - Verify all meta tags present
   - Check Open Graph tags
   - Verify Twitter Card tags

2. **Structured Data**
   - Use Google's Rich Results Test
   - Ensure page is crawlable

3. **Performance**
   - Run Lighthouse audit
   - Should score 95+ on all metrics
   - No external blocking resources

4. **Mobile Friendliness**
   - Use Google Mobile-Friendly Test
   - Should pass all checks

## Deployment Verification

After deploying:

1. ✅ Site loads on production URL
2. ✅ All functionality works
3. ✅ Copy to clipboard works (requires HTTPS)
4. ✅ Meta tags have correct production URLs
5. ✅ No console errors
6. ✅ Analytics tracking works (if added)
7. ✅ SSL certificate valid
8. ✅ Mobile responsive on real devices

---

**Testing Frequency:**
- Before every commit: Core functionality
- Before deployment: Full checklist
- After deployment: Deployment verification
- Weekly: Browser compatibility check
