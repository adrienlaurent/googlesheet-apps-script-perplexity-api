# Perplexity AI Integration for Google Sheets

This project integrates the Perplexity AI API into Google Sheets, allowing users to leverage AI-powered internet browsing capabilities directly from their spreadsheets. This integration is particularly useful for validating information and getting up-to-date answers to queries.

## Features

- Easy-to-use custom function in Google Sheets
- Ability to concatenate multiple arguments into a single prompt
- Result caching to optimize API usage and improve performance
- Detailed error handling for easier troubleshooting

## Setup

1. Open your Google Sheet
2. Go to Tools > Script editor
3. Create a new script file named `PerplexityIntegration.gs`
4. Copy the provided script into the editor
5. Replace 'YOUR_PPLX_API_KEY' with your actual Perplexity API key
6. Save the script and refresh your Google Sheet

## Getting a Perplexity API Key

To use this integration, you'll need a Perplexity API key. Here's how to get one:

1. Go to the [Perplexity AI website](https://www.perplexity.ai/)
2. Sign up for an account or log in if you already have one
3. Navigate to the API section (usually found in account settings or developer tools)
4. Follow the instructions to generate a new API key
5. Copy your API key and keep it secure - you'll need it for the script

Note: Perplexity may change their process for obtaining API keys. If these instructions are outdated, please check their official documentation for the most up-to-date information.

## Usage

Use the custom function in your cells like this:

```
=PERPLEXITY("Your prompt here")
```

or with multiple arguments:

```
=PERPLEXITY("First part of prompt", A1, "More prompt", B2)
```

## Important Notes

1. **Always verify results**: It's recommended to manually check a sample of answers to ensure accuracy.
2. **Be mindful of API usage**: Each call to the API incurs a cost. Use judiciously to manage expenses.
3. **Troubleshooting errors**: If you encounter a "type error", try modifying your prompt and running it again.
4. **Caching**: Results are cached. To force a new API call, slightly modify your prompt.
5. **Prompts matter**: Experiment with different prompt structures for optimal results. Here are some examples:
   - `=PERPLEXITY("Verify if this specific company provides VoIP services: ", A1)`
   - `=PERPLEXITY("List the VoIP services offered by this company: ", A1)`

## Limitations

- API usage may be subject to rate limiting or monthly caps. Monitor your usage to stay within desired limits.
- The function is designed for text-based queries and responses. It may not be suitable for complex data processing tasks.

## Disclaimer

This tool is provided as-is, without any warranties. Users are responsible for managing their own API usage and associated costs.
