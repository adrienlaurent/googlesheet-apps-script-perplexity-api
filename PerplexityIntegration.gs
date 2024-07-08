/**
 * Calls the Perplexity AI API with concatenated arguments as the prompt.
 * Caches the result to avoid unnecessary API calls.
 *
 * @param {...string} args The arguments to concatenate into a prompt.
 * @return The API response content, cached result, or error message.
 * @customfunction
 */
function PERPLEXITY() {
  try {
    const apiKey = 'YOUR_PPLX_API_KEY'; // Replace with your actual API key
    const url = 'https://api.perplexity.ai/chat/completions';
    
    // Concatenate all arguments into a single prompt
    const userContent = Array.prototype.slice.call(arguments)
      .map(arg => arg === undefined ? '' : arg.toString().trim())  // Handle undefined values
      .join(' ');  // Join with spaces
    
    if (!userContent) {
      throw new Error("No input provided");
    }
    
    // Create a unique key for this input
    const cacheKey = Utilities.base64Encode(userContent);
    
    // Check if we have a cached result
    const cachedResult = getCachedResult(cacheKey);
    if (cachedResult) {
      return cachedResult;
    }
    
    const payload = {
      "model": "llama-3-sonar-small-32k-online",
      "messages": [
        {
          "role": "system",
          "content": "Be precise and concise."
        },
        {
          "role": "user",
          "content": userContent
        }
      ]
    };

    const options = {
      'method': 'post',
      'contentType': 'application/json',
      'headers': {
        'Authorization': 'Bearer ' + apiKey
      },
      'payload': JSON.stringify(payload),
      'muteHttpExceptions': true
    };

    const response = UrlFetchApp.fetch(url, options);
    const responseCode = response.getResponseCode();
    const responseText = response.getContentText();
    
    if (responseCode !== 200) {
      throw new Error(`API returned status ${responseCode}: ${responseText}`);
    }
    
    const result = JSON.parse(responseText);
    if (!result.choices || !result.choices[0] || !result.choices[0].message) {
      throw new Error(`Unexpected API response structure: ${JSON.stringify(result)}`);
    }
    
    const content = result.choices[0].message.content;
    
    // Cache the result
    cacheResult(cacheKey, content);
    
    return content;
  } catch (error) {
    // Return a more detailed error message
    return `Error in PERPLEXITY function: ${error.message}`;
  }
}

/**
 * Retrieves a cached result for a given key.
 *
 * @param {string} key The cache key.
 * @return {string|null} The cached result or null if not found.
 */
function getCachedResult(key) {
  const userProperties = PropertiesService.getUserProperties();
  return userProperties.getProperty(key);
}

/**
 * Caches a result for a given key.
 *
 * @param {string} key The cache key.
 * @param {string} value The value to cache.
 */
function cacheResult(key, value) {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.setProperty(key, value);
}

/**
 * Clears all cached results.
 * Can be run manually to reset the cache.
 */
function clearCache() {
  const userProperties = PropertiesService.getUserProperties();
  userProperties.deleteAllProperties();
}
