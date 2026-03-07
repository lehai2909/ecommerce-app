# TypeScript Configuration Quick Reference

This document provides a quick reference for the key `tsconfig.json` options used in this project.

## 📋 Quick Reference Table

| Option | Value | Purpose | Documentation |
|-------|-------|---------|---------------|
| `target` | `ES2020` | JavaScript version to compile to | [docs](https://www.typescriptlang.org/tsconfig#target) |
| `jsx` | `react-jsx` | JSX transform mode | [docs](https://www.typescriptlang.org/tsconfig#jsx) |
| `strict` | `true` | Enable all strict checks | [docs](https://www.typescriptlang.org/tsconfig#strict) |
| `moduleResolution` | `bundler` | Module resolution strategy | [docs](https://www.typescriptlang.org/tsconfig#moduleResolution) |
| `noEmit` | `true` | Don't emit JS files | [docs](https://www.typescriptlang.org/tsconfig#noEmit) |

---

## 🔍 Detailed Explanations

### 1. `target: "ES2020"`

**What it means:**
- TypeScript compiles your code to ES2020 JavaScript syntax
- Determines which JavaScript features can be used in the output

**Common values:**
- `ES5` - Widest browser support (older browsers)
- `ES2015` (ES6) - Modern JavaScript features
- `ES2020` - Latest stable features (recommended for modern apps)
- `ESNext` - Latest proposed features (may change)

**Example:**
```typescript
// TypeScript source
const user = { name: "John" };
const email = user?.email ?? "no-email"; // Optional chaining (ES2020)

// Compiled to ES2020 (if target is ES2020)
const user = { name: "John" };
const email = user?.email ?? "no-email"; // Same syntax

// Compiled to ES5 (if target is ES5)
var user = { name: "John" };
var email = (user === null || user === void 0 ? void 0 : user.email) !== null && (user === null || user === void 0 ? void 0 : user.email) !== void 0 ? user.email : "no-email"; // Transpiled
```

**When to change:** If you need to support older browsers, use `ES5` or `ES2015`.

---

### 2. `jsx: "react-jsx"`

**What it means:**
- Uses React 17+ automatic JSX runtime
- No need to import React in files that use JSX

**Comparison:**

**With `"jsx": "react"` (old way):**
```typescript
import React from 'react'; // Required!

function Component() {
  return <div>Hello</div>;
}
```

**With `"jsx": "react-jsx"` (new way):**
```typescript
// No React import needed!

function Component() {
  return <div>Hello</div>;
}
```

**Options:**
- `"preserve"` - Keep JSX as-is (for other tools to transform)
- `"react"` - Transform to `React.createElement()` calls
- `"react-jsx"` - Use automatic JSX runtime (React 17+)
- `"react-jsxdev"` - Same as react-jsx but with dev info

**When to change:** Use `"react-jsx"` for React 17+, `"react"` for older versions.

---

### 3. `strict: true`

**What it means:**
- Enables all strict type-checking options
- Catches more potential bugs at compile time

**What it enables:**

| Option | What it checks |
|--------|----------------|
| `strictNullChecks` | Variables can't be null/undefined unless explicitly typed |
| `strictFunctionTypes` | Functions must match their types exactly |
| `strictBindCallApply` | `bind`, `call`, `apply` must match function signatures |
| `strictPropertyInitialization` | Class properties must be initialized |
| `noImplicitThis` | `this` must be explicitly typed |
| `alwaysStrict` | Parse code in strict mode |

**Example:**

**Without strict:**
```typescript
function greet(name) {
  return name.toUpperCase(); // No error if name is undefined
}
greet(null); // Runtime error!
```

**With strict:**
```typescript
function greet(name: string) {
  return name.toUpperCase(); // TypeScript knows name is string
}
greet(null); // TypeScript error: Argument of type 'null' is not assignable
```

**When to change:** Keep `true` for new projects. For migrating existing code, you might temporarily set to `false`.

---

### 4. `moduleResolution: "bundler"`

**What it means:**
- Uses bundler-aware module resolution
- Understands how modern bundlers (Vite, Webpack) resolve modules

**How it works:**

**With `"node"`:**
- Resolves modules like Node.js does
- Looks for `node_modules` and `package.json` fields
- Good for Node.js projects

**With `"bundler"`:**
- Understands bundler-specific features
- Works with `exports` field in `package.json`
- Better for frontend projects using Vite/Webpack

**Example:**
```typescript
// Both work, but "bundler" understands modern package.json exports
import { something } from 'my-package';
```

**When to change:** Use `"bundler"` for Vite/Webpack projects, `"node"` for Node.js projects.

---

### 5. `noEmit: true`

**What it means:**
- TypeScript only type-checks your code
- Doesn't generate JavaScript files
- Your bundler (Vite) handles compilation

**Why it's needed:**

**Without `noEmit`:**
```
src/
  App.tsx → App.js (TypeScript generates this)
  App.tsx → App.js (Vite also generates this) ❌ Duplicate!
```

**With `noEmit: true`:**
```
src/
  App.tsx → (TypeScript checks types only)
  App.tsx → App.js (Vite generates this) ✅ Single source
```

**When to change:** Keep `true` when using a bundler. Set to `false` if you want TypeScript to compile directly.

---

## 🎯 Recommended Settings for React + Vite

```json
{
  "compilerOptions": {
    "target": "ES2020",           // Modern JavaScript
    "jsx": "react-jsx",            // React 17+ JSX
    "strict": true,                // Maximum type safety
    "moduleResolution": "bundler", // For Vite
    "noEmit": true                 // Vite handles compilation
  }
}
```

---

## 📚 Official Documentation Links

- **Full tsconfig.json Reference:** https://www.typescriptlang.org/tsconfig
- **Compiler Options:** https://www.typescriptlang.org/tsconfig#compilerOptions
- **React + TypeScript:** https://react.dev/learn/typescript
- **React TypeScript Cheatsheet:** https://react-typescript-cheatsheet.netlify.app/

---

## 🔧 Common Modifications

### For Older Browser Support
```json
{
  "compilerOptions": {
    "target": "ES5"  // Instead of ES2020
  }
}
```

### For React < 17
```json
{
  "compilerOptions": {
    "jsx": "react"  // Instead of "react-jsx"
  }
}
```

### For Gradual Migration
```json
{
  "compilerOptions": {
    "strict": false,  // Temporarily disable strict mode
    "noImplicitAny": false  // Allow implicit any types
  }
}
```

---

## ❓ Quick Troubleshooting

**Problem:** "Cannot find module" errors
- **Solution:** Check `moduleResolution` matches your setup (use `"bundler"` for Vite)

**Problem:** JSX not working
- **Solution:** Ensure `jsx` is set to `"react-jsx"` or `"react"`

**Problem:** Too many type errors
- **Solution:** Temporarily set `strict: false` and enable options gradually

**Problem:** Code doesn't work in older browsers
- **Solution:** Lower `target` to `ES5` or `ES2015`



