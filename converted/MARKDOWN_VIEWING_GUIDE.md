# How to View Markdown Files Locally

This guide shows you several easy ways to view and format markdown (`.md`) files on your Mac.

---

## 🚀 Quick Options (Easiest)

### 1. **VS Code / Cursor Built-in Preview** ⭐ Recommended

**Already available in your editor!**

**How to use:**
1. Open any `.md` file in VS Code/Cursor
2. Press `Cmd+Shift+V` (or `Ctrl+Shift+V` on Windows/Linux)
3. Or click the preview icon (📄 with magnifying glass) in the top-right corner
4. Or right-click the file → "Open Preview"

**Split view:**
- Press `Cmd+K V` to open preview side-by-side with the editor
- Edit on left, preview on right - updates in real-time!

**Pros:**
- ✅ Already installed
- ✅ Real-time preview
- ✅ Side-by-side editing
- ✅ No additional setup needed

---

### 2. **macOS Quick Look** (Built-in)

**How to use:**
1. Select a `.md` file in Finder
2. Press `Space` (Quick Look)
3. Or right-click → "Quick Look"

**Note:** Basic markdown rendering, but works instantly without any setup.

**Pros:**
- ✅ Built into macOS
- ✅ Instant preview
- ✅ No installation needed

**Cons:**
- ❌ Basic formatting only
- ❌ No syntax highlighting

---

## 💻 Command Line Tools

### Option A: **Glow** (Beautiful Terminal Markdown Viewer)

**Install:**
```bash
brew install glow
```

**Use:**
```bash
# View a file
glow CONVERSION_GUIDE.md

# View with line numbers
glow -p CONVERSION_GUIDE.md

# View all markdown files in current directory
glow .
```

**Pros:**
- ✅ Beautiful formatting
- ✅ Works in terminal
- ✅ Syntax highlighting
- ✅ Table support

---

### Option B: **mdcat** (Another Terminal Viewer)

**Install:**
```bash
brew install mdcat
```

**Use:**
```bash
mdcat CONVERSION_GUIDE.md
```

---

### Option C: **Pandoc** (Convert to HTML/PDF)

**Install:**
```bash
brew install pandoc
```

**Convert to HTML:**
```bash
pandoc CONVERSION_GUIDE.md -o CONVERSION_GUIDE.html
open CONVERSION_GUIDE.html
```

**Convert to PDF:**
```bash
pandoc CONVERSION_GUIDE.md -o CONVERSION_GUIDE.pdf
open CONVERSION_GUIDE.pdf
```

---

## 🌐 Browser-Based Solutions

### Option A: **Marked 2** (Paid App)

**Install:**
- Download from: https://marked2app.com/
- Or: `brew install --cask marked`

**Pros:**
- ✅ Beautiful rendering
- ✅ Export to PDF/HTML
- ✅ Live preview
- ✅ Custom CSS themes

**Cons:**
- ❌ Paid ($14.99)

---

### Option B: **MacDown** (Free App)

**Install:**
```bash
brew install --cask macdown
```

**Pros:**
- ✅ Free
- ✅ Live preview
- ✅ Syntax highlighting
- ✅ Export options

---

### Option C: **Marked** (Free Alternative)

**Install:**
```bash
brew install --cask marked
```

---

## 🔧 VS Code Extensions (Enhance Preview)

### Recommended Extensions:

1. **Markdown Preview Enhanced**
   - Install: `Cmd+Shift+X` → search "Markdown Preview Enhanced"
   - Features: Math equations, code blocks, diagrams, export to PDF

2. **Markdown All in One**
   - Install: `Cmd+Shift+X` → search "Markdown All in One"
   - Features: Keyboard shortcuts, table formatting, auto-preview

3. **Markdown Preview Mermaid Support**
   - For diagram support in markdown

**How to install:**
1. Press `Cmd+Shift+X` to open Extensions
2. Search for the extension name
3. Click "Install"

---

## 📱 Quick Script Solution

Create a simple script to open markdown files in your browser:

**Create `view-md.sh`:**
```bash
#!/bin/bash
# Convert markdown to HTML and open in browser

if [ -z "$1" ]; then
    echo "Usage: view-md.sh <markdown-file.md>"
    exit 1
fi

# Create HTML file
pandoc "$1" -o "/tmp/markdown-preview.html" --standalone --css=https://cdn.jsdelivr.net/npm/github-markdown-css@5/github-markdown.min.css

# Open in browser
open "/tmp/markdown-preview.html"
```

**Make it executable:**
```bash
chmod +x view-md.sh
```

**Use it:**
```bash
./view-md.sh CONVERSION_GUIDE.md
```

---

## 🎯 Recommended Setup for You

Since you're already using Cursor/VS Code:

1. **For quick viewing:** Use `Cmd+Shift+V` (built-in preview)
2. **For terminal viewing:** Install `glow`:
   ```bash
   brew install glow
   glow CONVERSION_GUIDE.md
   ```
3. **For enhanced features:** Install "Markdown Preview Enhanced" extension

---

## 📋 Quick Reference

| Method | Command/Shortcut | Best For |
|--------|------------------|----------|
| VS Code Preview | `Cmd+Shift+V` | Quick viewing while coding |
| VS Code Split View | `Cmd+K V` | Editing + previewing |
| Glow | `glow file.md` | Terminal viewing |
| Quick Look | `Space` in Finder | Quick file preview |
| Browser | Convert with pandoc | Sharing/presenting |

---

## 🚀 One-Time Setup (Recommended)

**Install Glow for terminal viewing:**
```bash
brew install glow
```

**Then you can view any markdown file:**
```bash
cd converted
glow CONVERSION_GUIDE.md
glow TSCONFIG_REFERENCE.md
glow README.md
```

**Or view all markdown files:**
```bash
glow .
```

---

## 💡 Pro Tips

1. **VS Code Preview Shortcuts:**
   - `Cmd+Shift+V` - Open preview
   - `Cmd+K V` - Open preview side-by-side
   - `Cmd+Shift+P` → "Markdown: Open Preview" - Alternative way

2. **Auto-preview on save:**
   - Install "Markdown Preview Enhanced"
   - Enable auto-refresh in settings

3. **Export to PDF:**
   - Use "Markdown PDF" extension
   - Or use pandoc: `pandoc file.md -o file.pdf`

4. **View in GitHub-style:**
   - Use `glow` with `-s` flag: `glow -s dark file.md`
   - Or use GitHub's markdown CSS with pandoc

---

## ❓ Troubleshooting

**Problem:** Preview not showing properly
- **Solution:** Make sure you have a markdown file open (`.md` extension)

**Problem:** Glow not found
- **Solution:** Install Homebrew first: `/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"`

**Problem:** Want better formatting
- **Solution:** Install "Markdown Preview Enhanced" extension for advanced features

---

## 📚 Additional Resources

- [VS Code Markdown Guide](https://code.visualstudio.com/docs/languages/markdown)
- [Glow GitHub](https://github.com/charmbracelet/glow)
- [Markdown Guide](https://www.markdownguide.org/)

