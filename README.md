# Mawrid Reader NextGen

A modern, high-performance web application for searching classical Arabic-English dictionaries. This is a complete rewrite of the [original Mawrid Reader](https://github.com/ejtaal/mr) using Next.js, TypeScript, and modern web technologies.

> 📚 **Note**: The original documentation has been preserved in [`docs/legacy-readme.html`](docs/legacy-readme.html)

## 🎯 Project Focus

This modernization focuses exclusively on **Arabic-English dictionaries**, providing researchers, students, and Arabic language enthusiasts with fast, searchable access to the most authoritative classical Arabic lexicons.

## 📖 Featured Dictionaries

### Primary Sources
- **Hans Wehr** - The standard modern Arabic-English dictionary
- **Lane's Lexicon** - Edward William Lane's comprehensive 19th-century Arabic-English lexicon
- **Steingass** - F. Steingass's Persian, Arabic, and English dictionary focusing on classical usage

### Supplementary Resources
- **Hava** - Arabic-English dictionary with classical focus
- **Penrice** - A Dictionary and Glossary of the Koran
- **Brill** - Quranic Arabic corpus and dictionary

## 🚀 Key Features

- **Lightning-fast search** - Binary search through pre-indexed content
- **No OCR required** - Clever indexing system maps words directly to scanned pages
- **Smart transliteration** - Type in English (ktb) or Arabic (كتب)
- **Multiple search modes** - Root-based and alphabetical search
- **Offline capable** - Progressive Web App for use without internet
- **Mobile-first design** - Responsive interface for all devices

## 🛠️ Technology Stack

- **Frontend**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: React Context + Zustand
- **Search**: Custom binary search implementation
- **Deployment**: Vercel/Netlify ready

## 🏃 Getting Started

### Prerequisites
- Node.js 18+ and npm/yarn/pnpm
- Git

### Installation

```bash
# Clone the repository
git clone https://github.com/sylergydigital/mawridreader-nextgen.git
cd mawridreader-nextgen

# Switch to modernization branch
git checkout nextjs-modernization

# Install dependencies
cd nextjs-app
npm install

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 🏗️ Project Structure

```
mawridreader-nextgen/
├── nextjs-app/            # Next.js application
│   ├── app/              # App router pages and API routes
│   ├── components/       # React components
│   ├── lib/             # Utilities and helpers
│   ├── public/          # Static assets
│   └── data/            # Dictionary indexes and metadata
├── docs/                # Documentation
│   ├── architecture.md  # System design
│   ├── search-system.md # Search implementation
│   └── ...             # Additional docs
└── legacy/             # Original jQuery implementation
```

## 🔍 How It Works

The genius of Mawrid Reader lies in its approach to making scanned dictionaries searchable:

1. **Pre-built indexes** map Arabic roots to page numbers
2. **Binary search** quickly locates entries (searches 1000s of pages in milliseconds)
3. **Smart transliteration** converts Latin input to Arabic
4. **Direct page display** shows the actual scanned dictionary page

No OCR or text extraction needed - just clever data structures!

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development Workflow

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📈 Roadmap

- [x] Initial Next.js setup
- [x] Basic search interface
- [ ] Dictionary data integration
- [ ] Search implementation
- [ ] Page viewer component
- [ ] Keyboard shortcuts
- [ ] PWA features
- [ ] Performance optimizations
- [ ] User preferences
- [ ] Advanced search filters

## 📜 License

This project is licensed under the GNU GPL v3 - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- Original Mawrid Reader by Erik Taal
- Dictionary digitization efforts by various contributors
- Arabic language scholars and lexicographers

## 📞 Contact

- **Issues**: [GitHub Issues](https://github.com/sylergydigital/mawridreader-nextgen/issues)
- **Discussions**: [GitHub Discussions](https://github.com/sylergydigital/mawridreader-nextgen/discussions)

---

<div align="center">
  Made with ❤️ for Arabic language learners and researchers
</div>