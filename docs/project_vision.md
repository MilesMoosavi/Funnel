# LLM Funnel: Project Vision

## Overview

**LLM Funnel** is a meta-LLM interface designed to synthesize, compare, and validate responses from multiple top-tier AI models (ChatGPT, Gemini, Claude, etc.) simultaneously. It acts as a "consensus engine," helping users navigate the hallucinations and logical inconsistencies of individual models by aggregating their outputs into a single, unified group chat.

## Core Problem

LLMs frequently hallucinate or provide slightly different reasoning for complex tasks (math, coding, logic). Checking multiple models manually requires repetitive prompting, constant tab-switching, and manual comparison of text.

## Solution

A central web application coupled with a Chrome Extension that:

1. **Automates Prompting**: Sends a single prompt from the "Funnel" UI to all open LLM tabs.
2. **Aggregates Responses**: Scrapes the output from those tabs in real-time.
3. **Synthesizes Insights**: Displays responses side-by-side or in a threaded "group chat" style, highlighting consensus and discrepancies.

## MVP Focus: Deterministic MCQ Validation
The primary use case is the 'Consensus Tally' for closed-ended questions:
- **MCQ Accuracy**: Extracting A/B/C/D options to find majority agreement.
- **Math Verification**: Using LaTeX \boxed{} parsing to compare numeric results.
- **Confidence Scoring**: Assigning a 0-100% score based on model alignment.

## Naming Ideas

- **LLMFunnel** (Current Working Title)
- **Consensus**
- **Ensemble**
- **Funnel**
- **The Council**

## The "Mobile Group Chat" Concept

The interface is designed to emulate a standard mobile messaging app (iMessage/WhatsApp). Each LLM is a participant in a single group chat. This humanizes the AI interaction and makes multi-model responses feel like a collaborative discussion rather than disjointed research tabs.

- **User**: Right-aligned blue/green bubbles.
- **LLMs**: Left-aligned grey/glass bubbles with model avatars.
- **Synthesis**: A final "Funnel" participant provides the consensus summary.
