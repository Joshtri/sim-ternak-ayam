# Routes Structure - TanStack Router (Vite)

Clean and organized routing structure for **Vite + TanStack Router**.

## 📁 Directory Structure

```
src/routes/
├── __root.new.tsx              # Root route (base)
│
├── _app.tsx                    # App layout route
├── _app/                       # App routes (with layout)
│   ├── index.tsx              # Home (/)
│   ├── dashboard.tsx          # Dashboard (/dashboard)
│   └── users/
│       ├── index.tsx          # Users list (/users)
│       ├── create.tsx         # Create user (/users/create)
│       ├── $userId.tsx        # User detail (/users/:userId)
│       └── $userId_.edit.tsx  # Edit user (/users/:userId/edit)
│
└── login.tsx                   # Login (/login) - no layout
```

## 🎯 Route Types

### Layout Routes (prefix: `_`)
Routes starting with `_` are layout routes (TanStack Router convention)

- **`_app.tsx`** - Layout route that wraps children with `DefaultLayout`
- **`_app/`** - Folder for routes using `_app` layout

### Regular Routes
Routes without `_` prefix are regular routes

- **`login.tsx`** - Standalone route without layout

## 🛣️ URL Mapping

| File Path | URL | Layout |
|-----------|-----|--------|
| `_app/index.tsx` | `/` | ✅ DefaultLayout |
| `_app/dashboard.tsx` | `/dashboard` | ✅ DefaultLayout |
| `_app/users/index.tsx` | `/users` | ✅ DefaultLayout |
| `_app/users/create.tsx` | `/users/create` | ✅ DefaultLayout |
| `_app/users/$userId.tsx` | `/users/:userId` | ✅ DefaultLayout |
| `_app/users/$userId_.edit.tsx` | `/users/:userId/edit` | ✅ DefaultLayout |
| `login.tsx` | `/login` | ❌ No Layout |

## 📝 Route Naming Convention

### Folder Names
- `(app)` - Route group (URL not affected by parentheses)
- `dashboard` - Regular route folder
- `$userId` - Dynamic parameter folder (`:userId` in URL)

### File Names
- `index.tsx` - Index route for the folder
- `create.tsx` - Named route
- `edit.tsx` - Named route
- `_layout.tsx` - Layout route (shared layout for children)

## 🔧 How It Works

### 1. Route Groups with Parentheses `(app)`
Folders wrapped in parentheses `()` are **route groups**. They organize routes without affecting the URL.

```
(app)/dashboard/index.tsx  →  /dashboard  (not /app/dashboard)
(auth)/login.tsx           →  /login      (not /auth/login)
```

### 2. Layout Routes `_layout.tsx`
Files starting with `_layout` provide a layout wrapper for all child routes.

```tsx
// (app)/_layout.tsx
export const Route = createFileRoute("/(app)/_layout")({
  component: () => (
    <DefaultLayout>
      <Outlet />  {/* Child routes render here */}
    </DefaultLayout>
  ),
});
```

All routes in `(app)/` folder will automatically use this layout!

### 3. Dynamic Parameters `$userId`
Folders starting with `$` become URL parameters.

```
users/$userId/index.tsx  →  /users/:userId

// Access in component:
const { userId } = Route.useParams();
```

### 4. Index Routes `index.tsx`
Files named `index.tsx` are the default route for that folder.

```
dashboard/index.tsx  →  /dashboard
users/index.tsx      →  /users
```

## ✨ Benefits of This Structure

### 1. **Clean Organization**
```
✅ Good (New Structure)
routes/
├── (app)/
│   ├── dashboard/
│   │   └── index.tsx
│   └── users/
│       ├── index.tsx
│       └── create.tsx

❌ Bad (Old Structure)
routes/
├── dashboard.tsx
├── users.index.tsx
├── users.create.tsx
├── users.$id.tsx
├── users.$id.edit.tsx
```

### 2. **Logical Grouping**
- App routes in `(app)/` folder
- Auth routes in `(auth)/` folder
- Easy to find related routes

### 3. **Scalability**
Add new feature? Just create a new folder!

```
routes/
└── (app)/
    ├── users/
    ├── products/        ← New feature
    │   ├── index.tsx
    │   ├── create.tsx
    │   └── $productId/
    └── orders/          ← Another feature
```

### 4. **Clear Hierarchy**
Nested folders = nested routes

```
users/
├── index.tsx           → /users
├── create.tsx          → /users/create
└── $userId/
    ├── index.tsx       → /users/:userId
    └── edit.tsx        → /users/:userId/edit
```

## 🚀 Adding New Routes

### Simple Route
1. Create file in appropriate folder:
   ```
   (app)/about/index.tsx
   ```

2. Add to `routeTree.gen.ts`:
   ```tsx
   import { Route as AboutRoute } from "./routes/(app)/about/index";

   const appLayoutRouteWithChildren = AppLayoutRoute.addChildren([
     // ... existing routes
     AboutRoute,
   ]);
   ```

### Nested Route
1. Create nested folder:
   ```
   (app)/products/
   ├── index.tsx
   └── $productId/
       └── index.tsx
   ```

2. Add both to route tree:
   ```tsx
   import { Route as ProductsIndexRoute } from "./routes/(app)/products/index";
   import { Route as ProductsDetailRoute } from "./routes/(app)/products/$productId/index";

   const appLayoutRouteWithChildren = AppLayoutRoute.addChildren([
     // ... existing routes
     ProductsIndexRoute,
     ProductsDetailRoute,
   ]);
   ```

## 📚 Examples

### Adding Blog Routes

```
routes/
└── (app)/
    └── blog/
        ├── index.tsx           → /blog
        ├── create.tsx          → /blog/create
        └── $slug/
            ├── index.tsx       → /blog/:slug
            └── edit.tsx        → /blog/:slug/edit
```

### Adding Settings Routes

```
routes/
└── (app)/
    └── settings/
        ├── index.tsx           → /settings
        ├── profile.tsx         → /settings/profile
        ├── security.tsx        → /settings/security
        └── notifications.tsx   → /settings/notifications
```

## 🎨 Layout Hierarchy

```
__root.tsx
└── (app)/_layout.tsx (DefaultLayout)
    ├── index.tsx (Home)
    ├── dashboard/index.tsx
    └── users/
        ├── index.tsx
        └── $userId/index.tsx

__root.tsx
└── (auth)/login.tsx (No layout, direct child of root)
```

## 📖 Key Concepts

1. **Route Groups `(name)`** - Organize without affecting URL
2. **Layout Routes `_layout`** - Shared layout for children
3. **Dynamic Routes `$param`** - URL parameters
4. **Index Routes `index.tsx`** - Default route for folder
5. **Nested Routes** - Folder hierarchy = URL hierarchy

## 💡 Pro Tips

1. ✅ **Group by feature** - Keep related routes together
2. ✅ **Use layouts** - Share UI across route groups
3. ✅ **Consistent naming** - Follow conventions
4. ✅ **Shallow folders** - Don't nest too deep (max 3-4 levels)
5. ✅ **Document routes** - Add comments explaining purpose

---

**Clean. Organized. Scalable.** 🚀
