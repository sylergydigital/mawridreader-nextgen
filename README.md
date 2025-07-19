# Mawrid Reader (Next.js)

A modern web application for searching Arabic dictionaries including Hans Wehr, Lane's Lexicon, and Steingass. This is a Next.js modernization of the original jQuery-based Mawrid Reader.

## Features

- 🔍 Search Arabic dictionaries using Arabic text or transliteration
- 📚 Support for Hans Wehr, Lane's Lexicon, and Steingass dictionaries
- 🖼️ High-quality scanned dictionary pages hosted on Cloudflare R2
- ⌨️ Buckwalter transliteration support
- 🔍 Zoom, rotate, and navigate dictionary pages
- 📱 Responsive design for mobile and desktop

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- Cloudflare R2 account (for hosting dictionary images)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/mawrid-reader.git
cd mawrid-reader
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your Cloudflare R2 credentials.

4. Run the development server:
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## Deployment

### Cloudflare Pages (Recommended)

The app is designed to work perfectly with Cloudflare Pages:

```bash
npm run build
```

Then connect your GitHub repository to Cloudflare Pages for automatic deployments.

### Environment Variables

The following environment variables are required:

- `R2_ACCESS_KEY_ID` - Your Cloudflare R2 access key
- `R2_SECRET_ACCESS_KEY` - Your Cloudflare R2 secret key
- `NEXT_PUBLIC_R2_BUCKET_URL` - Your R2 bucket URL or custom domain
- `NEXT_PUBLIC_R2_PREFIX` - Prefix for dictionary images (default: "mawridreader")
- `NEXT_PUBLIC_USE_LOCAL_IMAGES` - Set to "true" for local development

## Project Structure

```
nextjs-app/
├── app/                    # Next.js app directory
│   ├── api/               # API routes (to be implemented)
│   ├── components/        # Page-specific components
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
├── components/            # Shared components
│   ├── SearchBox.tsx      # Search input component
│   └── DictionarySelector.tsx # Dictionary selection
├── lib/                   # Utility functions
│   └── transliteration.ts # Arabic transliteration
├── public/                # Static assets
├── types/                 # TypeScript types
└── data/                  # Dictionary data (to be added)
```

## Development

To add new features:

1. Create components in `components/` directory
2. Add utility functions in `lib/`
3. Define types in `types/`
4. Create API routes in `app/api/`

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## Next Steps

1. Implement search functionality with dictionary indexes
2. Create page viewer component for displaying results
3. Add API routes for fetching dictionary data
4. Implement keyboard shortcuts
5. Add PWA support for offline usage

## License

This project is licensed under the GNU General Public License v3.0 - see the [LICENSE](LICENSE) file for details.

**Code license: GNU GPL v3. © 2011-2015 by Abdurahman Erik Taal**  
**Dua-ware: You must make dua for everyone involved in this project at least once if you're using this software :)**

This project is a Next.js modernization of the original [Mawrid Reader](https://github.com/ejtaal/mr) by Abdurahman Erik Taal.

### License Summary

This is free software: you can redistribute it and/or modify it under the terms of the GNU General Public License as published by the Free Software Foundation, either version 3 of the License, or (at your option) any later version.

This program is distributed in the hope that it will be useful, but WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU General Public License for more details.

## Acknowledgments

- **Abdurahman Erik Taal** for creating the original [Mawrid Reader](https://github.com/ejtaal/mr) and all the contributors to that project
- Team Sylergy Digital for their contributions and support
- The original Mawrid Reader developers for their pioneering work
- Hans Wehr, Edward Lane, and Francis Joseph Steingass for their invaluable Arabic dictionaries
- Abdul Hafiz for the Lanes Lexicon index and suggestions
- Abd Shomad for Hans Wehr 4th print, Brill and Penrice indexes
- Malaysian students of Arabic for the Steingass index
- All the volunteers and contributors who helped improve the original project
- The Free Software Foundation for the GNU General Public License