# 📝 React Native To-Do App (Expo + Convex)

A beautiful and modern to-do list app built with **Expo (React Native)** and **Convex** as the backend.  
This app features drag-and-drop task reordering, real-time syncing, gradient-styled check buttons, and smooth theming (light/dark mode).

---

## 🚀 Features

- ✅ Add, toggle, and delete todos in real time
- 🔄 Drag and drop to reorder tasks
- 🌈 Gradient check icons using `expo-linear-gradient`
- ☁️ Backend powered by [Convex](https://convex.dev)
- 🎨 Light and dark theme support
- 💾 Persistent backend storage

---

## 🧩 Tech Stack

- **Frontend:** Expo + React Native + TypeScript
- **Styling:** Custom hooks + Tailwind-like global styles
- **Backend:** Convex (Realtime Database + Functions)
- **Icons:** Feather via `@expo/vector-icons`
- **Animations:** `react-native-reanimated` and `react-native-gesture-handler`

---

## 🛠️ Setup Instructions

### 1️⃣ Clone the Repository

```bash
git clone https://github.com/yourusername/your-todo-app.git
cd your-todo-app
```

### 2️⃣ Install Dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Configure Environment Variables

Create a .env file in your project root:

```bash
EXPO_PUBLIC_CONVEX_URL=https://your-convex-deployment.convex.cloud
```

⚠️ Note:

- If you have both .env and .env.local, Expo prioritizes .env.local.

- To use production Convex, remove or rename .env.local.

### 4️⃣ Convex Setup

```bash
npx convex dev
```

- It will open a dashboard link → sign in and set up your project.

```bash
npx convex init
```

This will:

- Create a convex/ folder with default schema and function files

- Generate an initial \_generated/api.d.ts

Then, deploy or run locally depending on your workflow 👇🏽

#### 🧪 Local Dev Server

```bash
npx convex dev
```

This runs Convex locally on a development endpoint.

#### 🚀 Deploy to Convex Cloud

```bash
npx convex deploy
```

After deployment, Convex will print a URL like:

```bash
https://your-project-name.convex.cloud
```

Copy that URL and update your .env:

```bash
EXPO_PUBLIC_CONVEX_URL=https://your-project-name.convex.cloud
```

### 📦 Build Commands

#### 🧑🏽‍💻 Run the App in Development

```bash
npx expo start -c
```

### 🧱 Build for Production

If you’re using EAS (Expo Application Services):

```bash
npx expo prebuild
eas build --platform android
# or
eas build --platform ios
```

### 💡 Common Issues

#### ❌ WebSocket closed with code 1006

This usually means:

- Your Convex URL is incorrect or not deployed.
- Your .env file is being overridden by .env.local.
- Run npx convex deploy again and update .env.

### 🧠 Developer Notes

- Always clear Expo’s cache after changing .env or dependencies:

```bash
npx expo start -c
```

- Convex functions live inside /convex and are automatically reloaded when you run:

```bash
npx convex dev
```

- To test API calls or database mutations, use:

```bash
npx convex dashboard
```

## 🚀 Demo

You can test the app using any of the links below:

- 📱 **Appetize Demo:** [Open in Appetize](https://appetize.io/app/your-app-id)
- 📦 **Download APK:** [Download from Google Drive](https://drive.google.com/your-apk-link)
