# Prompt & Parsing Strategy

## Overview

To ensure the "Funnel" can effectively synthesize data, we must inject a standard "System Context" into every LLM tab at the start of a session. This forces the models to behave predictably and format their output for easy machine parsing.

## 1. System Prompt Injection

When the first prompt of a session is sent, the extension will prepend a hidden instruction block.

### Example System Instructions:

> 'You are a member of a consensus panel. For the following question, you MUST: 
> 1. Briefly state your reasoning. 
> 2. End your response with the string 'Answer: [X]' where X is the letter of the choice. 
> 3. If the answer is numeric, wrap the final result in \boxed{}.'

## 2. Parsing Strategy

Because we are scraping the DOM of various LLM sites, the format might be messy.

- **Label-Based Extraction**: Immediate parsing of text following the `Answer:` label. This allows the Funnel to react as soon as the first line is generated.
- **Regex Extraction**: Look for `\boxed{...}` or `\fbox{...}` patterns for high-confidence math/MCQ matching.
- **Reasoning Hash**: Perform standard keyword extraction against different models' Chain of Thought. If models agree on the final letter but diverge in logic, the consensus is flagged as "Weak Consensus".
- **CoT Tracking**: Monitor for step-based headers (`Step 1:`, `Step 2:`) across all active models to build a "Live Thinking" summary.
- **Markdown Cleanup**: Strip out proprietary LLM UI artifacts (e.g., Gemini's 'Thinking' blocks) to ensure only the core reasoning is funneled.

## 3. Inline LaTeX Support

The Funnel Web UI must render math naturally to match the professional feel of the models.

- **Library**: `KaTeX` or `MathJax`.
- **Implementation**: The message bubbles will use a Markdown renderer that supports math delimiters (e.g., `$ ... $` for inline and `$$ ... $$` for block).

## 4. Response Truncation Logic

- **Short Messages**: If a message is under 100 characters (or a specific threshold), display it in full immediately.
- **Long Messages**: Truncate at ~30 characters and show the "Read more..." button.
- **Parsing Priority**: The "Funnel" participant will always parse the _entire_ message (once generation is complete) even if the UI is currently displaying a condensed version.
