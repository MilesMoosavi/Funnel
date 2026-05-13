# Supported Models & Versions

This document captures the current state of LLM models supported by FunnelLM. It tracks tier-specific constraints and DOM selection targets for the Chrome Extension.

## Current Model Matrix

| Model Provider | Default (Free) Version     | Account Required? | Guest Session Constraints (Logged-Out)                                               |
| :------------- | :------------------------- | :---------------- | :----------------------------------------------------------------------------------- |
| **OpenAI**     | GPT-5.2 (Instant)          | No                | 3 image attachment limit; must close/reopen tab to reset session.                    |
| **Google**     | Gemini 3.1 Flash           | No (Partial)      | Initially allowed; login prompted after several messages. Image attachments blocked. |
| **Anthropic**  | Claude Sonnet 4.6          | Yes               | Guest access not supported.                                                          |
| **DeepSeek**   | DeepSeek-V3.2              | Yes               | Guest access not supported.                                                          |
| **Perplexity** | Sonar/Model Council (Auto) | No                | Full guest access allowed for default models.                                        |
| **Meta AI**    | Llama 4.1                  | Yes               | Login required (Guest mode triggers infinite loops).                                 |
| **Grok**       | Grok 4.1                   | No (Limited)      | Guest access allowed; limited conversation length per session.                       |

## Model Visibility & Versions

Since providers often hide specific version numbers in the UI:

- **Automatic Detection**: The extension will attempt to identify the model version from the page's `<title>` or meta tags.
- **Manual Overrides**: Users can manually tag a tab's version in the "Group Settings" if they know they are on a specific preview/pro tier.

## Incognito Usage Policy

- **Recommended**: Run FunnelLM searches in Incognito tabs to prevent search history pollution.
- **Limits**: Be aware that free-tier incognito usage may be throttled more aggressively than logged-in sessions.
