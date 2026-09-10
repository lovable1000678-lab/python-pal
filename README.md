# Python Pal

# Product Requirements Document (PRD)

## Project: Personal Python Question-Answering Chatbot

## 1) Product Goal

Build a responsive personal Python question-answering chatbot that helps users ask Python-related questions in natural language and receive accurate answers from a predefined Python knowledge base.

The app must be simple to use, fast, and polished, with a clean frontend, subtle animations, and no authentication required. The purpose of removing signup is to make the mentor able to open and review the application instantly on any device without friction.

## 2) Users & Roles

- Primary user: a student or learner asking Python programming questions.

- Reviewer/mentor: can open the app directly and test it immediately.

- No login, no signup, no user accounts, no role-based permissions.

## 3) Core Product Behavior

- The user enters a Python-related question in natural language.

- The chatbot searches a predefined Python knowledge base using its own NLP logic.

- The app returns the best matching answer along with optional topic and confidence information.

- If the system cannot confidently answer, it should show a helpful fallback response and suggest the kinds of Python questions it can handle.

## 4) Platform Requirements

- Must work on desktop, tablet, and mobile.

- Must be usable from any modern browser on any platform.

- Responsive layout with mobile-first behavior.

- No platform-specific dependency should block access.

- The app should run as a standard web application.

## 5) NLP and Data Requirements

- Use the app’s own NLP logic; do not use external AI APIs.

- Fetch answers from a predefined knowledge base stored in the app’s backend or database.

- Use similarity matching or retrieval-based NLP to map user questions to the closest stored question-answer pair.

- The chatbot should not hallucinate answers outside the knowledge base.

- If confidence is low, return a fallback message instead of guessing.

## 6) Page Structure

### Single-page app layout

- Header with app name and short tagline.

- Main chatbot area with conversation history.

- Input area for typing questions and sending them.

- Optional suggestion chips or sample questions.

- Optional info panel or sidebar for confidence/topic display.

## 7) Screens and Components

### Home / Chat Screen

- Chat history showing user and bot messages.

- Distinct message styles for user and bot.

- Typing/loading state while the answer is being generated.

- Enter-to-send support.

- Clear chat button.

- Sample question buttons.

### UI Components

- Chat window.

- Input bar.

- Message bubbles.

- Optional sample questions section.

- Optional confidence/topic display.

## 8) Design Direction

Create a modern, polished, friendly UI that feels professional but approachable.

- Clean card-based layout.

- Smooth but subtle animations for message appearance, hover states, and loading indicators.

- Gradient or soft accent styling is allowed.

- Use rounded corners, good spacing, and strong visual hierarchy.

- Avoid heavy animations, clutter, or excessive motion.

- Make the interface look impressive enough for a mentor demo.

## 9) Interaction Rules

- No signup or authentication flow at all.

- The chatbot must be instantly usable on open.

- Messages should appear in sequence like a real chat.

- Auto-scroll to the latest message.

- Show clear error handling if the backend is unavailable.

- Keep the experience lightweight and easy to understand.

## 10) Backend Requirements

- Build a backend that exposes an endpoint for asking questions.

- Backend should contain or fetch the Python knowledge base.

- Backend should run the NLP matching logic.

- Frontend should call the backend securely and display results.

- The backend must support deployment in a standard web hosting environment.

## 11) Knowledge Base Requirements

Include a starter Python Q&A knowledge base with beginner to intermediate topics such as:

- Python basics

- Variables

- Data types

- Lists

- Tuples

- Dictionaries

- Sets

- Conditionals

- Loops

- Functions

- OOP basics

- Modules and imports

- Exception handling

- File handling

- Comprehensions

- Common errors

## 12) Output Requirements

Each chatbot response should ideally include:

- Answer text.

- Optional topic name.

- Optional confidence score.

- Helpful fallback text when no match is found.

## 13) Non-Functional Requirements

- Fast response time.

- Clean code structure.

- Easy to deploy.

- Minimal dependencies.

- Maintainable and readable.

- No unnecessary complexity.

- Works reliably across modern browsers.

## 14) Out of Scope

Do not include:

- Login or signup.

- Paid subscriptions.

- External AI or third-party NLP APIs.

- Real-time collaboration.

- Notifications.

- Advanced admin dashboard.

- Over-engineered animations.

- Multi-user accounts.

## 15) Acceptance Criteria

- A user can open the app without signing in.

- A user can type a Python question and receive an answer.

- The chatbot uses its own NLP matching against a predefined knowledge base.

- The UI is responsive and works on mobile and desktop.

- The interface looks polished with subtle animations.

- The app is easy for a mentor to access and review immediately.

- The app gives a fallback response when no confident match exists.

## 16) Build Priority

Build in this order:

1. Create the polished responsive chatbot UI.

2. Add chat interactions and message state.

3. Add the backend question-answer API.

4. Add NLP similarity matching.

5. Connect frontend and backend.

6. Add sample questions, confidence display, and fallback handling.

7. Finalize animations and visual polish.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/ac7bfc56-c69e-4127-9d05-5ca0d186a525).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
