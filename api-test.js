// api-test.js - Comprehensive API Test Script for BizCore360

// Global variables for logging
let consoleOutput = [];
let originalConsoleLog = console.log;
let originalConsoleError = console.error;

// Override console methods to capture output
console.log = function(...args) {
    originalConsoleLog.apply(console, args);
    consoleOutput.push(`LOG: ${args.join(' ')}`);
    updateConsoleDisplay();
};

console.error = function(...args) {
    originalConsoleError.apply(console, args);
    consoleOutput.push(`ERROR: ${args.join(' ')}`);
    updateConsoleDisplay();
};

function updateConsoleDisplay() {
    const consoleDiv = document.getElementById('console-output');
    const consoleContent = document.getElementById('console-content');
    if (consoleContent) {
        consoleContent.innerHTML = consoleOutput.map(line => 
            `<div style="margin-bottom: 0.25rem;">${escapeHtml(line)}</div>`
        ).join('');
        if (consoleDiv) consoleDiv.style.display = 'block';
    } else {
        // If consoleContent is missing, skip UI update but keep logs in memory
        // so they can be inspected later.
        // This avoids errors when script runs on pages that don't include the test UI.
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    console.log('🔧 API Test page loaded');
    
    // Check if BASE_URL is available
    if (typeof BASE_URL !== 'undefined') {
        console.log('✅ BASE_URL loaded from config.js:', BASE_URL);
        updateEnvironmentInfo();
    } else {
        console.error('❌ BASE_URL not found - config.js may not be loaded');
        showError('Configuration Error: BASE_URL not available. Make sure config.js is loaded.');
    }
});

function updateEnvironmentInfo() {
    const currentEnvElement = document.getElementById('current-env');
    const apiEndpointElement = document.getElementById('api-endpoint');
    
    if (currentEnvElement && apiEndpointElement) {
        const isProduction = window.location.hostname.includes('vercel.app');
        const environment = isProduction ? 'Production (Vercel)' : 'Development (Local)';
        const apiEndpoint = `${BASE_URL}/api/openai`;
        
        currentEnvElement.textContent = environment;
        apiEndpointElement.textContent = apiEndpoint;
        
        console.log(`🌐 Environment: ${environment}`);
        console.log(`🔗 API Endpoint: ${apiEndpoint}`);
    }
}

async function runAPITest() {
    const testButton = document.getElementById('test-button');
    const resultDiv = document.getElementById('test-result');
    
    // Reset console output
    consoleOutput = [];
    
    // Disable button and show loading (if button exists)
    if (testButton) {
        testButton.disabled = true;
        testButton.textContent = '⏳ Testing...';
    }
    
    showLoading('Running API test...');
    
    console.log('🚀 Starting API test');
    console.log('📍 Current URL:', window.location.href);
    console.log('🔧 BASE_URL:', BASE_URL);
    
    try {
        // Prepare the test request
        const apiEndpoint = `${BASE_URL}/api/openai`;
        const testPayload = {
            prompt: "Write a short welcome message for BizCore360 AI."
        };
        
        console.log('📝 Test payload:', JSON.stringify(testPayload, null, 2));
        console.log('📡 Making POST request to:', apiEndpoint);
        
        // Make the API call
        const startTime = Date.now();
        const response = await fetch(apiEndpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(testPayload)
        });
        
        const endTime = Date.now();
        const responseTime = endTime - startTime;
        
        console.log(`⏱️ Response time: ${responseTime}ms`);
        console.log('📊 Response status:', response.status);
        console.log('📊 Response ok:', response.ok);
        console.log('📋 Response headers:', Object.fromEntries(response.headers.entries()));
        
        // Check if response is ok
        if (!response.ok) {
            let errorDetails;
            try {
                errorDetails = await response.json();
            } catch (e) {
                errorDetails = { error: `HTTP ${response.status}: ${response.statusText}` };
            }
            throw new Error(`API Error: ${JSON.stringify(errorDetails, null, 2)}`);
        }
        
        // Parse the response
        const data = await response.json();
        console.log('✅ API Response received:', data);
        
        // Show success result
        showSuccess(data, responseTime);
        
    } catch (error) {
        console.error('❌ API Test failed:', error.message);
        console.error('❌ Error stack:', error.stack);
        
        // Determine error type and show appropriate message
        if (error.message.includes('fetch')) {
            showError('Network Error: Failed to connect to API. Check your internet connection and CORS settings.', error);
        } else if (error.message.includes('CORS')) {
            showError('CORS Error: Cross-origin request blocked. Check CORS configuration in api/openai.js.', error);
        } else if (error.message.includes('HTTP 4')) {
            showError('Client Error: Bad request or authentication issue. Check API configuration.', error);
        } else if (error.message.includes('HTTP 5')) {
            showError('Server Error: API server error. Try again in a few moments.', error);
        } else {
            showError('Unknown Error: ' + error.message, error);
        }
    } finally {
        // Re-enable button if it exists
        if (testButton) {
            testButton.disabled = false;
            testButton.textContent = '🔄 Run Test Again';
        }
    }
}

function showLoading(message) {
    const resultDiv = document.getElementById('test-result');
    if (!resultDiv) {
        console.warn('⏩ showLoading(): #test-result not found; skipping UI update.');
        return;
    }
    resultDiv.innerHTML = `
        <div class="loading">
            ⏳ ${message}
        </div>
    `;
}

function showSuccess(data, responseTime) {
    const resultDiv = document.getElementById('test-result');
    if (!resultDiv) {
        console.warn('⏩ showSuccess(): #test-result not found; skipping UI update.');
        return;
    }
    const reply = data.reply || 'No reply content';
    
    resultDiv.innerHTML = `
        <div class="success">
            <h3>✅ API Test Successful!</h3>
            <p><strong>Response Time:</strong> ${responseTime}ms</p>
            <p><strong>Environment:</strong> ${window.location.hostname.includes('vercel.app') ? 'Production (Vercel)' : 'Development (Local)'}</p>
            <hr style="margin: 1rem 0;">
            <h4>API Response:</h4>
            <div style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 4px; margin-top: 0.5rem;">
                ${escapeHtml(reply)}
            </div>
            <details style="margin-top: 1rem;">
                <summary style="cursor: pointer; font-weight: bold;">📋 Full Response Data</summary>
                <pre style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;">${JSON.stringify(data, null, 2)}</pre>
            </details>
        </div>
    `;
}

function showError(message, error) {
    const resultDiv = document.getElementById('test-result');
    if (!resultDiv) {
        console.warn('⏩ showError(): #test-result not found; skipping UI update.');
        return;
    }
    resultDiv.innerHTML = `
        <div class="error">
            <h3>❌ API Test Failed</h3>
            <p><strong>Environment:</strong> ${window.location.hostname.includes('vercel.app') ? 'Production (Vercel)' : 'Development (Local)'}</p>
            <p><strong>Error:</strong> ${escapeHtml(message)}</p>
            ${error ? `
                <details style="margin-top: 1rem;">
                    <summary style="cursor: pointer; font-weight: bold;">🔍 Technical Details</summary>
                    <pre style="background: rgba(255,255,255,0.7); padding: 1rem; border-radius: 4px; margin-top: 0.5rem; overflow-x: auto;">${escapeHtml(error.stack || error.message)}</pre>
                </details>
            ` : ''}
        </div>
    `;
}

// Export functions for global access
window.runAPITest = runAPITest;

console.log('📝 api-test.js loaded successfully');