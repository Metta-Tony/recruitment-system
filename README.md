# Design and Implementation of a Web-Based Recruitment System

A web-based recruitment system and talent network centered in Enugu and South East Nigeria. It brings together job openings, candidate applications, recruitment stages, evaluations, interview scheduling, and a careers portal in one interface.

## Technologies and Syntax Used

These are the main languages and tools used to build the webpage, explained in simple terms:

- **HTML (`.html`) — the structure:** `index.html` provides the basic page shell and the place where the application is displayed. Think of it as the frame of a house.
- **CSS and Tailwind CSS — the appearance:** CSS controls how the webpage looks, including colors, spacing, and layout. Tailwind CSS provides ready-made styling classes used in the page components, so the design can be built without writing a separate rule for every small change.
- **TypeScript (`.ts`) — the application's logic and data definitions:** TypeScript is JavaScript with extra checks that help catch mistakes. It defines the kinds of information used for candidates, jobs, and interviews, and supports helper functions and project configuration.
- **TypeScript with JSX (`.tsx`) and React — the interface and its behavior:** JSX lets the project describe webpage elements using HTML-like syntax inside TypeScript. React uses these descriptions to build reusable parts of the interface, such as the header, candidate views, and job forms, and to update the page when users interact with it.
- **JSON (`.json`) — project settings:** JSON files store structured settings, such as the packages and commands listed in `package.json` and the compiler options in `tsconfig.json`.
- **Vite — the development and build tool:** Vite starts the project locally during development and prepares the files for publishing.

## Run Locally

**Prerequisite:** Node.js

1. Install dependencies:
   `npm install`
2. Start the development server:
   `npm run dev`

## Deploy to GitHub Pages

Push to the `main` branch. The GitHub Actions workflow builds and deploys the site automatically.

Published site: https://metta-tony.github.io/recruitment-system/
