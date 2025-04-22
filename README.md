# Course.ai

Course.ai is the ultimate learning tool designed to help users create, manage, and share courses effortlessly. It leverages modern web technologies and integrates with OpenAI to provide a seamless and interactive learning experience.

## Features

### 1. Course Management
- **Create Courses**: Add new courses by providing name and ai will create the course for you. The system automatically generates a unique sharable route for each course.
- **View Courses**: Fetch and display course data dynamically on the slug-based route.
- **Shareable Courses**: Courses are designed to be easily shareable with others.

### 2. Resource Management
- **Add Resources**: Attach additional resources to courses using the Prisma client.
- **Delete Resources**: Remove resources from courses as needed.

### 3. Notes Feature
- **Take Notes**: Users can take notes directly on the course pages.
- **Save Notes**: Notes are saved for future reference.

### 4. Theme Customization
- **Light/Dark Mode**: The site adapts to the user's theme preference, which is stored in their session.

### 5. OpenAI Integration
- **AI-Powered Features**: Leverage OpenAI to enhance the learning experience (e.g., generating course content or summaries).

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) for server-side rendering and routing.
 **AI Sdk**: Leveraging vercels ai sdk to generate courses.
- **Styling**: Tailwind CSS for responsive and modern UI design.
- **Database**: Prisma ORM for database management.
- **Authentication**: Custom authentication using session-based APIs(Better Auth).
- **Font**: Google Fonts (Geist and Geist Mono) for a clean and professional look.

## Folder Structure
```
/course-ai
│
├── app/                # Next.js app directory (pages, layouts, API routes)
│   ├── api/            # API route handlers (course, resource, notes)
│   ├── components/     # Reusable React components (UI, forms, etc.)
│   ├── styles/         # Global and component-specific styles
│   └── utils/          # Utility functions and helpers
│
├── prisma/             # Prisma schema and migrations
│
├── public/             # Static assets (images, fonts)
│
├── .env                # Environment variables
├── package.json        # Project metadata and dependencies
└── README.md           # Project documentation
```

## Getting Started

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/course-ai.git
    cd course-ai
    ```

2. **Install dependencies:**
    ```bash
    npm install
    ```

3. **Set up environment variables:**
    - Copy `.env.example` to `.env` and fill in required values (OpenAI API key, database URL, etc.).

4. **Run database migrations:**
    ```bash
    npx prisma migrate dev
    ```

5. **Start the development server:**
    ```bash
    npm run dev
    ```

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.

## License

This project is licensed under the MIT License.