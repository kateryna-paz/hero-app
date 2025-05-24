# hero-app

This full-stack application allows you to manage a list of superheroes — create, view, edit, and delete heroes along with their images. Built with React (frontend) and Node.js (Express.js) + Supabase (backend).

## How to Run the Solution

### 1. Clone the Repository

```bash
git clone https://github.com/kateryna-paz/hero-app.git
cd hero-app
```

### 2. Set Up the Supabase Database

1. Create a Supabase Account
2. Create a New Project
3. Create the Required Tables

   In the Table Editor, add the following tables and columns:

   Table: superhero
   | Column Name | Type | Notes |
   | ------------------ | ---- | ----------------------------------------- |
   | id | UUID | Primary Key, default `uuid_generate_v4()` |
   | nickname | Text | Required |
   | real_name | Text | Optional |
   | origin_description | Text | Optional |
   | superpowers | Text | Optional |
   | catch_phrase | Text | Optional |

   Table: images
   | Column Name | Type | Notes |
   | ----------- | ---- | ----------------------------------------- |
   | id | UUID | Primary Key, default `uuid_generate_v4()` |
   | hero_id | UUID | Foreign Key → `superhero.id` |
   | url | Text | Public image URL |

4. Enable Storage for Image Uploads

   - Go to Storage → Create a new Bucket (e.g. images)
   - Set the bucket to public
   - Files uploaded from the frontend will be stored here

5. Enable Row Level Security

   - Go to Policies and create new policy to allow Select, Insert and Delete images to/from bucket
   - Go back to Table Editor and create auth policies for both tables too. Example for table "superhero":

   ```bash
    alter policy "allow all"
    on "public"."superhero"
    to public
    using (true);

   ```

6. Final Step: Get Your API Keys
   - Go to Project Settings → Data API
   - Copy the SUPABASE_URL and anon public key — you'll need them for the backend .env file

### 3. Set Up the Backend

Navigate to the backend directory:

```bash
cd backend
```

Install dependencies:

```bash
npm install
```

Create a .env file with the following variables:

```bash
SUPABASE_URL=your_supabase_url
SUPABASE_KEY=your_supabase_anon_public_key
PORT=5000
```

Start the backend:

```bash
node index
```

### 4. Set Up the Backend

Navigate to the frontend directory:

```bash
cd frontend
```

Install dependencies:

```bash
npm install
```

Create a .env file with the following variable:

```bash
VITE_API_BASE=http://localhost:5000/api
```

Start the frontend:

```bash
npm run dev
```

### Congratulations, you have successfully set up the project!
