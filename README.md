# LETA-log Installation

## Manual installation (For development)

First you need to clone this repository

```sh
# Clone repository
git clone https://github.com/Skrazzo/leta-log
```

Then in the root of the project install dependecies, and set up database

```sh
# Front end
bun i
# Back end
composer install
# Set up database / migrations / seed the database
cp .env.example .env
php artisan key:generate
php artisan migrate --seed
```

Now you can run the application inside of the root project directory

```sh
# Run front end
bun run dev

# Run back end
php artisan serve
```

## Docker installation (For production/testing)

Inside of root project directory run docker compose command

```sh
docker compose up -d --build
```

# Log in credentials for testing

After seeding the database, or running `docker compose up -d --build` you can log into test account with these credentials:

- E-mail: `test@example.com`
- Password: `labdien123`

Or you can go ahead and create your own account.

# Info

## The Vision: More Than Just a Blog

The goal was to build more than just a static blog. We aimed for a dynamic platform where users can:

- Create, read, update, and delete blog posts.

- Categorize posts using a flexible many-to-many system.

- Engage with content through comments.

- Experience a smooth, app-like interface without full page reloads.

## Our Tech Stack Powerhouse 🚀

Choosing the right tools is crucial, and for this project, we landed on a combination that offers robustness, developer productivity, and a great end-user experience:

- Backend: Laravel (PHP) - For its elegant syntax, powerful ORM (Eloquent), built-in features like authentication, and overall developer-friendliness.

- Frontend: React (TypeScript) - For building interactive and reusable UI components with the benefits of static typing.

- The Bridge: Inertia.js - The magic that connects our Laravel backend to our React frontend, allowing us to build a modern SPA (Single Page Application) without building a separate API in the traditional sense.

- Styling: Tailwind CSS (v4) - For utility-first CSS that enables rapid UI development and customization.

- Icons: Lucide React - For a clean and comprehensive set of SVG icons.

## Conclusion

Building this blogging platform has been a rewarding experience, showcasing how Laravel, React, and Inertia.js can come together to create modern, efficient, and enjoyable web applications. The focus on clean backend logic, reusable frontend components, and efficient data handling has resulted in a project that's both powerful and maintainable.

Thanks for reading, and I hope this gives you some insight into the development process!
