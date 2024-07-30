<div align="center">

![Language](https://img.shields.io/badge/language-typescript-yellow?logo=ts-node&logoColor=white)
[![Vercel Deploy](https://deploy-badge.vercel.app/vercel/planner-heldercosta)](https://plann-9zyysc409-heldercosta.vercel.app/)
[![GitHub Workflow Status (main branch)](https://img.shields.io/github/actions/workflow/status/heldercostaa/Plann.er/main.yml?branch=main&logo=dependabot&logoColor=white)](https://github.com/heldercostaa/Plann.er)
[![Last commit](https://img.shields.io/github/last-commit/heldercostaa/Plann.er.svg?logo=github&logoColor=white)](https://github.com/heldercostaa/Plann.er/commits/main)
[![Maintainer](https://img.shields.io/badge/maintainer-%40heldercostaa-teal?logo=superuser&logoColor=white)](https://github.com/heldercostaa)
[![Linkedin](https://img.shields.io/badge/linkedin-blue.svg?logo=linkedin)](https://linkedin.com/in/heldercostaa/)

  <br />
  <a href="https://github.com/heldercostaa/Plann.er">
    <img src="https://imgur.com/cYBdVNo.png" alt="Logo" width="80" height="80">
  </a>
  <h3 align="center" style="font-size: 3em;">Plann.er</h3>
  <p align="center">
    Manage your trips with guests, activities, links and more.
    <br />
    <a href="https://planner-heldercosta.vercel.app/"><strong>Explore the application live »</strong></a>
    <br />
    <br />
    <a href="https://github.com/heldercostaa/Plann.erAPI">API Repository</a>
    ·
    <a href="https://documenter.getpostman.com/view/8553383/2sA3kSm2ts">API Documentation</a>
  </p>
</div>

> [!NOTE]
> The application may not be live due to limitations of free deployment services. However, you can easily run the application locally by following the instructions in the [Local Setup Instructions](#local-setup-instructions) section.

<details>
  <summary>Table of Contents</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
      </ul>
    </li>
    <li>
      <a href="#features">Features</a>
      <ul>
        <li><a href="#1-create-trip">1. Create trip</a></li>
        <li><a href="#2-update-trip">2. Update trip</a></li>
        <li><a href="#3-create-and-delete-activity">3. Create (and delete) activity</a></li>
        <li><a href="#4-create-and-delete-link">4. Create (and delete) link</a></li>
        <li><a href="#5-confirm-and-invite-guest">5. Confirm (and invite) guest</a></li>
        <li><a href="#6-email-notifications">6. Email notifications</a></li>
      </ul>
    </li>
    <li>
      <a href="#local-setup-instructions">Local Setup Instructions</a>
    </li>
  </ol>
</details>

## About The Project

<div>
  <img src="./docs/1. Landing page.png" alt="Landing page" style="width: 49%; border-radius: 5px; margin-bottom: 20px;"/>
  <img src="./docs/2. Trip page.png" alt="Trip page" style="width: 49%; border-radius: 5px; margin-top: 20px;"/>
</div>
<br />

This is a personal project inspired by this [Figma design](<https://www.figma.com/design/8DfcJnIMg1sqhIbHqZVGsR/Plann.er-(Web)?node-id=3-376>). It includes several additional features such as animations, input validations, a deletion feature, email notifications, and more. The goal of this project is to explore and apply various technologies of interest in a practical, production-like application.

This project also includes a backend component, which you can find in the repository [here](https://github.com/heldercostaa/Plann.erAPI).

### Built With

[![React](https://img.shields.io/badge/React-222?logo=react)](https://reactjs.org)
[![TypeScript](https://img.shields.io/badge/TypeScript-222?logo=typescript)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-222?logo=vite&logoColor=646CFF)](https://vitejs.dev)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-222?logo=tailwindcss&logoColor=06B6D4)](https://tailwindcss.com)
[![Ant Design](https://img.shields.io/badge/Ant%20Design-222?logo=antdesign&logoColor=0170FE)](https://ant.design)
[![Axios](https://img.shields.io/badge/Axios-222?logo=axios&logoColor=5A29E4)](https://axios-http.com)
[![LocationIQ](https://img.shields.io/badge/LocationIQ-222?logo=mapbox)](https://locationiq.com)
[![commitlint](https://img.shields.io/badge/commitlint-222?logo=commitlint&logoColor=aaa)](https://commitlint.js.org/)

## Features

### 1. Create trip

<div align="center">
  <img src="./docs/1. Create trip.gif" alt="Create trip" style="width: 95%; border-radius: 5px;"/>
</div>

### 2. Update trip

<div align="center">
  <img src="./docs/2. Update trip.gif" alt="Update trip" style="width: 95%; border-radius: 5px;"/>
</div>

### 3. Create (and delete) activity

<div align="center">
  <img src="./docs/3. Create (and delete) activity.gif" alt="Create (and delete) activity" style="width: 95%; border-radius: 5px;"/>
</div>

### 4. Create (and delete) link

<div align="center">
  <img src="./docs/4. Create (and delete) link.gif" alt="Create (and delete) link" style="width: 95%; border-radius: 5px;"/>
</div>

### 5. Confirm (and invite) guest

<div align="center">
  <img src="./docs/5. Confirm (and invite) guest.gif" alt="Confirm (and invite) guest" style="width: 95%; border-radius: 5px;"/>
</div>

### 6. Email notifications

<table style="width: 100%;">
  <tr style="border: none;">
    <td style="width: 49%; border: none;">
      <img src="./docs/8. Confirm Trip Email.png" alt="Trip page" style="width: 100%; border-radius: 5px;"/>
    </td>
    <td style="width: 49%; padding-top: 25px; border: none;">
      <img src="./docs/7. Confirm Participant Email.png" alt="Landing page" style="width: 100%; border-radius: 5px;"/>
    </td>
  </tr>
</table>

## Local Setup Instructions

1. **Backend Endpoint**: Ensure you have a backend endpoint set up. Follow the [API Local Setup Instructions](https://github.com/heldercostaa/Plann.erAPI#local-setup-instructions) to get this running.

2. **Location Autocomplete (Optional)**: If you want to enable location autocomplete, obtain a [LocationIQ Geocoding API Key](https://locationiq.com/geocoding). LocationIQ offers a free tier that doesn’t require a credit card, making it easy to get started. This step is optional.

3. **Install Dependencies**: Navigate to the project directory and install the necessary dependencies:

   ```bash
   cd ../Plann.er
   npm install
   ```

4. **Environment Variables**: Create a `.env` file to store your environment variables. You can copy the example file and then edit it:

   ```bash
   cp .env.example .env    # Edit VITE_API_BASE_URL and VITE_LOCATIONIQ_KEY
   ```

5. **Run Development Server**: Execute the development command to start the server:

   ```bash
   npm run dev
   ```
