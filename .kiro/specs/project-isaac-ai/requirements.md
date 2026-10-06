# Project Isaac AI - Requirements

## Overview

Project Isaac AI is a proof-of-concept AI toolkit demonstrating three distinct AI-powered
support and analytics tools. The system shall provide a unified website with modular AI agents,
each serving a specific use case with guardrailed knowledge boundaries.

## User Personas

### Primary: Hiring Manager / Technical Recruiter
- Evaluates candidate's technical capabilities
- Needs to quickly understand project scope and functionality
- Wants to see clean, professional implementation

### Secondary: Demo User
- Interacts with AI tools to test capabilities
- Needs clear guidance on what each tool does
- Expects intuitive, responsive interface

---

## Functional Requirements

### Website & Navigation

#### REQ-NAV-001: Top Navigation
WHEN a user visits any page
THE SYSTEM SHALL display a fixed top navigation bar with links to:
Home, Customer Support Chatbot, Internal Escalation Assistant, Gen BI Analytics

#### REQ-NAV-002: Active State Indication
WHEN a user is on a specific page
THE SYSTEM SHALL highlight the corresponding navigation item

#### REQ-NAV-003: Responsive Design
WHEN a user accesses the site on mobile or tablet
THE SYSTEM SHALL adapt the navigation to a hamburger menu

---

### Home Page

#### REQ-HOME-001: Hero Section
WHEN a user visits the home page
THE SYSTEM SHALL display a hero section with candidate background, skills overview, and project purpose

#### REQ-HOME-002: Tool Overview Cards
WHEN a user scrolls below the hero
THE SYSTEM SHALL display three cards summarizing each AI tool with icon, title, description, and link

#### REQ-HOME-003: Usage Instructions
WHEN a user views the home page
THE SYSTEM SHALL provide clear instructions on how to use each tool

---

### AI Chat Interface (Shared)

#### REQ-CHAT-001: Floating Chat Widget
WHEN a user is on any tool page
THE SYSTEM SHALL display a floating chat widget in the bottom-right corner

#### REQ-CHAT-002: Expand/Collapse
WHEN a user clicks the chat widget button
THE SYSTEM SHALL expand the chat interface

#### REQ-CHAT-003: Message Input
WHEN a user types a message and submits
THE SYSTEM SHALL send the message to the appropriate AI agent and stream the response

#### REQ-CHAT-004: Conversation History
WHEN a chat session is active
THE SYSTEM SHALL display the conversation history within the chat window

#### REQ-CHAT-005: Suggested Questions
WHEN a user opens a tool page
THE SYSTEM SHALL display contextual sample questions for that tool

---

### Customer Support Chatbot

#### REQ-SUPPORT-001: Knowledge Base Guardrails
WHEN a user asks a question
THE SYSTEM SHALL only answer using available help center knowledge base content

#### REQ-SUPPORT-002: Out-of-Scope Handling
WHEN a user asks a question outside the knowledge base
THE SYSTEM SHALL politely decline and suggest contacting human support

#### REQ-SUPPORT-003: Response Formatting
WHEN generating a response
THE SYSTEM SHALL format answers with bold headers and bullet points where appropriate

#### REQ-SUPPORT-004: Background Context
WHEN a user visits the support page
THE SYSTEM SHALL display a generic help center interface as the page background

---

### Internal Escalation Assistant

#### REQ-ESCALATION-001: Tier 1 Guidance
WHEN a support agent describes a scenario
THE SYSTEM SHALL provide troubleshooting steps and resolution guidance

#### REQ-ESCALATION-002: Escalation Criteria
WHEN a situation requires Tier 2/3 escalation
THE SYSTEM SHALL clearly indicate when and how to escalate, including required information

#### REQ-ESCALATION-003: Background Context
WHEN a user visits the escalation page
THE SYSTEM SHALL display a generic ticketing system interface as the page background

#### REQ-ESCALATION-004: Agent Empowerment Focus
WHEN providing guidance
THE SYSTEM SHALL prioritize solutions that enable Tier 1 agents to resolve issues independently

---

### Gen BI Analytics Bot

#### REQ-ANALYTICS-001: Conversational Queries
WHEN a user asks questions about data
THE SYSTEM SHALL interpret natural language and provide relevant data insights

#### REQ-ANALYTICS-002: Sample Dataset
WHEN generating responses
THE SYSTEM SHALL query from the tickets.json dataset in data/analytics/

#### REQ-ANALYTICS-003: Visualization Descriptions
WHEN discussing data trends
THE SYSTEM SHALL describe what visualizations would show (e.g., "This would display as a bar chart showing...")

#### REQ-ANALYTICS-004: Background Context
WHEN a user visits the analytics page
THE SYSTEM SHALL display a generic analytics dashboard as the page background

---

## Non-Functional Requirements

### Tone & Voice

#### REQ-TONE-001: Friendly Professional
WHEN generating responses
THE SYSTEM SHALL use a friendly but professional tone

#### REQ-TONE-002: Concise Communication
WHEN generating responses
THE SYSTEM SHALL prioritize brevity while maintaining completeness

### Modularity

#### REQ-MOD-001: Hot-Swappable KB
WHEN an administrator updates knowledge base files in data/support-kb/ or data/escalation-kb/
THE SYSTEM SHALL load new content after re-running the appropriate ingest script, without code changes

#### REQ-MOD-002: Configurable Company
WHEN config/company.json is updated
THE SYSTEM SHALL reflect the new company name, colors, and branding throughout the UI

#### REQ-MOD-003: Tool Isolation
WHEN one tool's knowledge base changes
THE SYSTEM SHALL not affect other tools' knowledge bases (separate Pinecone indexes)

---

## Edge Cases & Error Handling

#### REQ-ERR-001: Empty Knowledge Base
WHEN a Pinecone index returns no results above the similarity threshold
THE SYSTEM SHALL display a graceful fallback message directing the user to human support

#### REQ-ERR-002: API Failures
WHEN the OpenAI or Pinecone service is unavailable
THE SYSTEM SHALL display a user-friendly error message

#### REQ-ERR-003: Missing Analytics Data
WHEN tickets.json does not exist
THE SYSTEM SHALL inform the user that the dataset is not yet loaded

---

## Acceptance Criteria

### AC-001: Complete User Journey
GIVEN a new visitor
WHEN they navigate from Home → Customer Support → ask a question
THEN they receive a contextual, guardrailed streamed response

### AC-002: Knowledge Guardrails
GIVEN the Customer Support Chatbot
WHEN asked "What is the meaning of life?"
THEN it responds with a polite out-of-scope message directing to human support

### AC-003: Modular Swap
GIVEN the Escalation Assistant with Dataset A
WHEN Dataset B replaces Dataset A and ingest:escalation is re-run
THEN the chatbot uses Dataset B without code changes

### AC-004: Responsive Design
GIVEN a mobile device with 375px width
WHEN the site loads
THEN all elements are accessible and properly formatted
