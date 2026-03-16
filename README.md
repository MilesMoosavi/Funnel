# Funnel

A lightweight web dashboard for comparing responses from multiple LLM tabs in a single “group chat” view.

This project is built to support a companion Chrome extension that automatically orchestrates LLM tabs, scrapes their output, and feeds it into the UI.

## Current UI (placeholders)


### Empty / new chat state
Main area with Funnel logo and prompt input.
![Empty state](./docs/screenshots/empty.png)


### Sidebar open
Sidebar with "New chat", sign-in prompt, and guest session indicator.
![Sidebar / disconnected state](./docs/screenshots/sidebar.png)


### Chat in progress
User message ("hello") and bot typing indicator.
![Input + footer state](./docs/screenshots/input.png)

## What’s next

- Extension-driven tab orchestration + scraping
- Majority-vote consensus scoring
- Live “LLMs active” tab count and status indicators
