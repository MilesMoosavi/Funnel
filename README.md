# FunnelLM

FunnelLM is a tool for orchestrating multiple Large Language Models into a single consensus-driven interface. In its initial release, it specializes in solving **Multiple-Choice and Math-based problems** by leveraging parallel browser-based LLM sessions (ChatGPT, Claude, Gemini).

[Link to Live Website / Chrome Web Store]

## Overview

FunnelLM eliminates the work of manually comparing answers across tabs. By handling simultaneous prompt dispatch, the system uses real-time pattern matching (detecting `Answer:` or `\fbox{}` labels) to establish a majority vote before the models even finish their explanations.

![Screenshot: FunneLLM Dashboard showing parallel streaming responses]

![GIF: The 'Groupthink Pulse' aggregating reasoning steps in real-time]

## Architecture

The project consists of three main components:

1. **Chrome Extension**: Injected content scripts that automate the prompts and scrape streaming DOM updates from LLM provider sites.
2. **Web Application**: A Next.js dashboard that acts as the "Group Chat" UI and stores conversation history.
3. **Consensus Engine**: A backend logic layer that semantically aggregates the different model outputs into a unified consensus.

Detailed technical specifications, prompt strategies, and UI benchmarks are located in the [`/docs`](./docs) directory.

![Diagram: High-level data flow between the browser extension and web UI]

## Features

- **Parallel Dispatch**: One prompt sent to all selected models simultaneously.
- **Proactive Consensus**: Real-time detection of majority answers using pattern matching (`Answer:`, `\fbox{}`).
- **Semantic Aggregation**: Summarizing the "Chain of Thought" steps from multiple models into a single progress indicator.
- **Zero Configuration**: Uses existing browser cookies; no API keys required for the end user.
