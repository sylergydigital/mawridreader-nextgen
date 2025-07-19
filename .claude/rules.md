# Claude Rules for Documentation Repository

## General Documentation Guidelines

### 1. Content Quality
- Ensure all documentation is accurate, clear, and concise
- Use simple language; avoid unnecessary jargon
- Include practical examples wherever possible
- Verify technical accuracy before documenting

### 2. File Organization
- Create new directories for major topic areas (e.g., `/kubernetes/`, `/python/`, `/aws/`)
- Use descriptive, lowercase filenames with hyphens (e.g., `docker-compose-basics.md`)
- Keep related content together in the same directory
- Avoid deeply nested directory structures

### 3. Markdown Standards
- Use consistent heading hierarchy (# for title, ## for main sections, ### for subsections)
- Include a table of contents for documents longer than 500 words
- Use code blocks with appropriate language syntax highlighting
- Prefer bullet points over long paragraphs for lists

### 4. Mermaid Diagrams
- Use Mermaid diagrams to visualize complex concepts
- Keep diagrams simple and focused on one concept
- Include descriptive labels and clear relationships
- Test diagram rendering before committing

### 5. Content Structure
Every documentation file should include:
1. Clear title and one-line description
2. Overview or introduction section
3. Main content with logical sections
4. Examples or use cases (where applicable)
5. References or further reading (if relevant)

### 6. Writing Style
- Write in present tense
- Use active voice
- Be direct and avoid filler words
- Define acronyms on first use
- Include context for why something matters

### 7. Code Examples
- Keep code examples minimal and focused
- Include comments explaining non-obvious parts
- Ensure examples are complete and runnable
- Test all code snippets before including them

### 8. Updates and Maintenance
- Date stamp significant updates in documentation
- Mark deprecated content clearly
- Update related documents when making changes
- Review and refresh content periodically

### 9. Cross-References
- Link to related documents within the repository
- Use relative paths for internal links
- Verify all links work before committing
- Avoid external links that may break

### 10. Documentation Types
Acceptable documentation types for this repository:
- Concept explanations and overviews
- How-to guides and tutorials
- Best practices and patterns
- Architecture and design documents
- Learning notes and summaries
- Cheat sheets and quick references