# CampCare+ : Medical Camp Management System (MCMS)
[Live Link for CampCare+](https://CampCare.netlify.app/)

## Project Overview
The Medical Camp Management System (MCMS) is a robust platform designed to streamline the management and coordination of medical camps. Built with the MERN stack, the platform offers seamless functionality for both organizers and participants.

## Key Features

### Home Page

**Navbar:**
- Logo + Website Name.
- Navigation links: Home, Available Camps.
- "Join Us" (when not logged in).
- Profile Picture with a dropdown (for logged-in users) containing:
  - User Name (not clickable).
  - Dashboard.
  - Logout Button.

**Banner:**
- A slider showcasing impactful moments and success stories from past medical camps.

**Popular Camps Section:**
- Highlights up to six popular medical camps with key details such as:
  - Camp Name, Image, Camp Fees, Date and Time, Location, Healthcare Professional, and Participant Count.
- Includes a “See All Camps” button to direct users to the Available Camps page.

### Camp Details Page

- Detailed information for each camp:
  - Camp Name, Image, Camp Fees, Date and Time, Location, Healthcare Professional Name, Participant Count, and Description.
- Join Camp Button: Opens a modal to collect participant registration details and save them to the database.

### Available Camps Page

- Lists all camps added by organizers with essential details:
  - Camp Name, Image, Date & Time, Location, Healthcare Professional Name, Participant Count, and Description.
- Search bar and sorting options:
  - By Most Registered, Camp Fees, or Alphabetical Order (Camp Name).
- Layout toggle (three-column or two-column display).
- “Details” button linking to the camp's details page.

### Organizer Dashboard

A private route accessible only to organizers with the following features:

**Organizer Profile:**
- Manage and update profile information like name, image, and contact details.

**Add a Camp:**
- Organizers can add camps using a form validated by Formik or React Hook Form.
- Fields: Camp Name, Image, Camp Fees, Date & Time, Location, Healthcare Professional Name, Participant Count (starts at 0), and Description.

**Manage Camps:**
- A table view showing all camps created by the organizer with options to edit or delete camps.

**Manage Registered Camps:**
- View a list of participants registered for camps.
- Fields: Participant Name, Camp Name, Camp Fees, Payment Status, Confirmation Status, and a Cancel Button.

### Participant Dashboard

A private route accessible to participants with the following features:

**Analytics:**
- Visual charts (using Recharts) displaying data about registered camps.

**Participant Profile:**
- Manage and update profile information.

**Registered Camps:**
- Table view displaying camps registered by the participant with fields like Payment Status, Confirmation Status, Feedback Button, and Cancel Button.

**Payment History:**
- View transaction history with details such as Camp Name, Fees, Payment Status, and Confirmation Status.

### Authentication and Authorization

**Join Us Page:**
- Login and Register forms with React Hook Form.
- Includes a social login option.

**Private Routes:**
- JWT (JSON Web Token) authentication for secure access to sensitive data.

### Additional Features

**Feedback and Ratings:**
- Participants can provide feedback and ratings for camps after successful payment and approval.
- Feedback is displayed on the home page.

**Pagination:**
- All tables feature pagination, displaying 10 rows per page.

**Search and Filter:**
- Search functionality for all tables to find camps based on keywords like Camp Name, Date, or Healthcare Professional Name.

## Technology Stack

- **Frontend:** React, Tailwind CSS, DaisyUI, Formik, Recharts.
- **Backend:** Node.js, Express.js, MongoDB, JSON Web Tokens (JWT).
- **Authentication:** JWT and social login integration.
- **Payment Integration:** Stripe API.