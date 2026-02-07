// cURL-to-Code Enhancements
// Add this code to the existing index.html <script> section

// ==================== ENHANCED EXAMPLES ====================
const enhancedExamples = {
    // Beginner Level
    simple: {
        level: 'beginner',
        label: '🟢 Simple GET',
        description: 'Basic API request - GitHub Zen',
        curl: `curl https://api.github.com/zen`
    },
    
    withHeaders: {
        level: 'beginner',
        label: '🟢 GET with Headers',
        description: 'Request with custom headers',
        curl: `curl https://httpbin.org/headers \\
  -H 'User-Agent: MyApp/1.0' \\
  -H 'Accept: application/json'`
    },
    
    // Intermediate Level
    postJson: {
        level: 'intermediate',
        label: '🟡 POST JSON',
        description: 'Create resource with JSON body',
        curl: `curl -X POST https://jsonplaceholder.typicode.com/posts \\
  -H 'Content-Type: application/json' \\
  -d '{"title":"Hello World","body":"This is a test post","userId":1}'`
    },
    
    bearerAuth: {
        level: 'intermediate',
        label: '🟡 Bearer Token',
        description: 'GitHub API with authentication',
        curl: `curl https://api.github.com/user/repos \\
  -H 'Authorization: Bearer ghp_xxxxxxxxxxxxxxxxxxxx' \\
  -H 'Accept: application/vnd.github.v3+json'`
    },
    
    basicAuth: {
        level: 'intermediate',
        label: '🟡 Basic Auth',
        description: 'Username/password authentication',
        curl: `curl -X GET https://httpbin.org/basic-auth/user/pass \\
  -u user:pass`
    },
    
    queryParams: {
        level: 'intermediate',
        label: '🟡 Query Parameters',
        description: 'GET with URL parameters',
        curl: `curl 'https://api.github.com/search/repositories?q=javascript&sort=stars&order=desc&per_page=5'`
    },
    
    // Advanced Level
    formData: {
        level: 'advanced',
        label: '🔴 Form Upload',
        description: 'Multipart form with file',
        curl: `curl -X POST https://httpbin.org/post \\
  -F 'file=@document.pdf' \\
  -F 'title=Important Document' \\
  -F 'category=reports' \\
  -F 'tags=urgent,reviewed'`
    },
    
    stripe: {
        level: 'advanced',
        label: '🔴 Stripe API',
        description: 'Real-world payment API',
        curl: `curl https://api.stripe.com/v1/charges \\
  -u sk_test_xxxxxxxxxxxx: \\
  -d amount=2000 \\
  -d currency=usd \\
  -d source=tok_visa \\
  -d description="Charge for user@example.com"`
    },
    
    complexPost: {
        level: 'advanced',
        label: '🔴 Complex POST',
        description: 'Nested JSON with arrays',
        curl: `curl -X POST https://api.example.com/orders \\
  -H 'Authorization: Bearer token123' \\
  -H 'Content-Type: application/json' \\
  -d '{
    "customer": {"name": "John Doe", "email": "john@example.com"},
    "items": [
      {"product_id": 1, "quantity": 2, "price": 29.99},
      {"product_id": 3, "quantity": 1, "price": 49.99}
    ],
    "shipping": {"method": "express", "address": "123 Main St"},
    "total": 109.97
  }'`
    },
    
    patchUpdate: {
        level: 'advanced',
        label: '🔴 PATCH Update',
        description: 'Partial resource update',
        curl: `curl -X PATCH https://api.example.com/users/123 \\
  -H 'Authorization: Bearer token123' \\
  -H 'Content-Type: application/json' \\
  -d '{"status":"inactive","last_login":"2024-02-08T10:30:00Z"}'`
    }
};

// ==================== TOAST NOTIFICATION SYSTEM ====================
class ToastManager {
    constructor() {
        this.container = this.createContainer();
        document.body.appendChild(this.container);
    }
    
    createContainer() {
        const container = document.createElement('div');
        container.id = 'toast-container';
        container.style.cssText = `
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            display: flex;
            flex-direction: column;
            gap: 10px;
            pointer-events: none;
        `;
        return container;
    }
    
    show(message, type = 'success', duration = 3000) {
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        
        const colors = {
            success: '#3fb950',
            error: '#f85149',
            warning: '#d29922',
            info: '#58a6ff'
        };
        
        toast.innerHTML = `
            <span class="toast-icon">${icons[type]}</span>
            <span class="toast-message">${message}</span>
        `;
        
        toast.style.cssText = `
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 20px;
            background: ${colors[type]};
            color: white;
            border-radius: 8px;
            box-shadow: 0 4px 12px rgba(0,0,0,0.3);
            font-size: 14px;
            font-weight: 500;
            transform: translateX(400px);
            opacity: 0;
            transition: all 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
            pointer-events: auto;
            max-width: 350px;
        `;
        
        this.container.appendChild(toast);
        
        // Animate in
        setTimeout(() => {
            toast.style.transform = 'translateX(0)';
            toast.style.opacity = '1';
        }, 10);
        
        // Animate out
        setTimeout(() => {
            toast.style.transform = 'translateX(400px)';
            toast.style.opacity = '0';
            setTimeout(() => toast.remove(), 300);
        }, duration);
        
        return toast;
    }
    
    success(message) { return this.show(message, 'success'); }
    error(message) { return this.show(message, 'error'); }
    warning(message) { return this.show(message, 'warning'); }
    info(message) { return this.show(message, 'info'); }
}

// Initialize toast manager
const toast = new ToastManager();

// ==================== ENHANCED ERROR HANDLING ====================
function displayEnhancedError(error) {
    const errorContainer = document.getElementById('error');
    
    let suggestions = [];
    const errorMsg = error.message || error;
    
    // Provide helpful suggestions based on error type
    if (errorMsg.includes('URL')) {
        suggestions = [
            'Ensure your cURL command includes a valid http:// or https:// URL',
            'Try one of the examples below to see the correct format',
            'Check if the URL is properly quoted if it contains special characters'
        ];
    } else if (errorMsg.includes('parse') || errorMsg.includes('syntax')) {
        suggestions = [
            'Check for unmatched quotes or brackets in your cURL command',
            'Remove line continuation characters (\\) if copying from documentation',
            'Make sure header values are properly quoted with single or double quotes'
        ];
    } else if (errorMsg.includes('header')) {
        suggestions = [
            'Headers should be in format: -H "Key: Value"',
            'Make sure each header has both a key and value separated by a colon',
            'Check for special characters that might need escaping'
        ];
    } else {
        suggestions = [
            'Try one of the example commands below',
            'Check the cURL documentation for correct syntax',
            'Make sure your command is properly formatted'
        ];
    }
    
    errorContainer.innerHTML = `
        <div style="margin-bottom: 8px; font-weight: 600;">
            <span style="color: var(--error-text);">⚠ Error:</span> ${errorMsg}
        </div>
        ${suggestions.length > 0 ? `
            <div style="margin-top: 12px;">
                <strong style="font-size: 13px; color: var(--text-secondary);">💡 Suggestions:</strong>
                <ul style="margin: 8px 0 0 0; padding-left: 20px; color: var(--text-secondary); font-size: 13px;">
                    ${suggestions.map(s => `<li style="margin: 4px 0;">${s}</li>`).join('')}
                </ul>
            </div>
        ` : ''}
    `;
    
    toast.error('Failed to convert cURL command');
}

// ==================== LOADING STATE ====================
function setLoadingState(isLoading) {
    const output = document.getElementById('output');
    const copyBtn = document.getElementById('copyBtn');
    const downloadBtn = document.getElementById('downloadBtn');
    
    if (isLoading) {
        output.style.opacity = '0.5';
        output.style.pointerEvents = 'none';
        copyBtn.disabled = true;
        downloadBtn.disabled = true;
        
        // Show subtle loading indicator
        const loader = document.createElement('div');
        loader.id = 'conversion-loader';
        loader.style.cssText = `
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            display: flex;
            align-items: center;
            gap: 10px;
            color: var(--text-secondary);
            font-size: 14px;
            pointer-events: none;
        `;
        loader.innerHTML = `
            <div style="
                width: 16px;
                height: 16px;
                border: 2px solid var(--accent);
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 0.8s linear infinite;
            "></div>
            <span>Converting...</span>
        `;
        
        output.parentElement.style.position = 'relative';
        output.parentElement.appendChild(loader);
    } else {
        output.style.opacity = '1';
        output.style.pointerEvents = 'auto';
        copyBtn.disabled = false;
        downloadBtn.disabled = false;
        
        const loader = document.getElementById('conversion-loader');
        if (loader) loader.remove();
    }
}

// Add CSS for loader animation
const loaderStyles = document.createElement('style');
loaderStyles.textContent = `
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(loaderStyles);

// ==================== EXAMPLE CATEGORIES ====================
function renderEnhancedExamples() {
    const examplesSection = document.querySelector('.examples');
    if (!examplesSection) return;
    
    const categories = {
        beginner: [],
        intermediate: [],
        advanced: []
    };
    
    Object.entries(enhancedExamples).forEach(([key, example]) => {
        categories[example.level].push({ key, ...example });
    });
    
    const levelLabels = {
        beginner: '🟢 Beginner',
        intermediate: '🟡 Intermediate',
        advanced: '🔴 Advanced'
    };
    
    let html = '<h3>Quick Examples</h3>';
    
    Object.entries(categories).forEach(([level, examples]) => {
        if (examples.length === 0) return;
        
        html += `
            <div class="example-category" style="margin-top: 20px;">
                <h4 style="
                    font-size: 14px;
                    font-weight: 600;
                    color: var(--text-secondary);
                    margin-bottom: 10px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                ">${levelLabels[level]}</h4>
                <div class="example-grid">
                    ${examples.map(ex => `
                        <button class="example-btn" data-example="${ex.key}">
                            <strong>${ex.label}</strong>
                            <span style="font-size: 12px; color: var(--text-secondary);">
                                ${ex.description}
                            </span>
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    });
    
    examplesSection.innerHTML = html;
    
    // Attach event listeners
    document.querySelectorAll('.example-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const exampleKey = btn.dataset.example;
            const example = enhancedExamples[exampleKey];
            
            const curlInput = document.getElementById('curlInput');
            curlInput.value = example.curl;
            
            // Trigger conversion
            convertCurl();
            
            // Visual feedback
            toast.info(`Example loaded: ${example.label}`);
            
            // Scroll to top
            window.scrollTo({ top: 0, behavior: 'smooth' });
            
            // Flash the input to show it changed
            curlInput.style.boxShadow = '0 0 0 3px rgba(88, 166, 255, 0.3)';
            setTimeout(() => {
                curlInput.style.boxShadow = '';
            }, 600);
        });
    });
}

// ==================== ENHANCED COPY FUNCTIONALITY ====================
function enhancedCopyToClipboard() {
    const copyBtn = document.getElementById('copyBtn');
    const output = document.getElementById('output');
    
    copyBtn.addEventListener('click', async () => {
        try {
            const code = output.textContent;
            await navigator.clipboard.writeText(code);
            
            // Visual feedback
            const originalText = copyBtn.textContent;
            const originalBg = copyBtn.style.background;
            
            copyBtn.textContent = '✓ Copied!';
            copyBtn.style.background = 'var(--success)';
            copyBtn.style.borderColor = 'var(--success)';
            
            toast.success('Code copied to clipboard!');
            
            setTimeout(() => {
                copyBtn.textContent = originalText;
                copyBtn.style.background = originalBg;
                copyBtn.style.borderColor = '';
            }, 2000);
        } catch (error) {
            // Fallback for older browsers
            const range = document.createRange();
            range.selectNode(output);
            window.getSelection().removeAllRanges();
            window.getSelection().addRange(range);
            document.execCommand('copy');
            window.getSelection().removeAllRanges();
            
            toast.success('Code copied!');
        }
    });
}

// ==================== ENHANCED KEYBOARD SHORTCUTS ====================
function setupEnhancedKeyboardShortcuts() {
    const shortcutInfo = document.createElement('div');
    shortcutInfo.id = 'keyboard-shortcuts-hint';
    shortcutInfo.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 20px;
        padding: 8px 12px;
        background: var(--bg-tertiary);
        border: 1px solid var(--border-color);
        border-radius: 6px;
        font-size: 12px;
        color: var(--text-secondary);
        opacity: 0.7;
        transition: opacity 0.2s;
        z-index: 100;
    `;
    shortcutInfo.innerHTML = `
        💡 <kbd style="
            padding: 2px 6px;
            background: var(--bg-secondary);
            border: 1px solid var(--border-color);
            border-radius: 3px;
            font-family: monospace;
        ">Ctrl+Enter</kbd> to convert
    `;
    
    shortcutInfo.addEventListener('mouseenter', () => {
        shortcutInfo.style.opacity = '1';
    });
    
    shortcutInfo.addEventListener('mouseleave', () => {
        shortcutInfo.style.opacity = '0.7';
    });
    
    document.body.appendChild(shortcutInfo);
    
    // Enhanced keyboard shortcuts with feedback
    document.addEventListener('keydown', (e) => {
        // Ctrl/Cmd+Enter to convert
        if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
            e.preventDefault();
            const curlInput = document.getElementById('curlInput');
            
            // Visual feedback
            curlInput.style.boxShadow = 'inset 0 0 0 2px var(--success)';
            setTimeout(() => {
                curlInput.style.boxShadow = '';
            }, 300);
            
            convertCurl();
        }
        
        // Ctrl/Cmd+K to clear
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            document.getElementById('clearBtn').click();
        }
    });
}

// ==================== INITIALIZATION ====================
function initEnhancements() {
    // Render enhanced examples
    renderEnhancedExamples();
    
    // Setup enhanced copy
    enhancedCopyToClipboard();
    
    // Setup keyboard shortcuts
    setupEnhancedKeyboardShortcuts();
    
    console.log('✓ curl-to-code enhancements loaded');
}

// Run on DOM ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initEnhancements);
} else {
    initEnhancements();
}
