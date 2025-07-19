# Contributing to Mawrid Reader NextGen

Thank you for your interest in contributing to Mawrid Reader NextGen! This document provides guidelines and instructions for contributing to the project.

## 🤝 Code of Conduct

By participating in this project, you agree to maintain a respectful and inclusive environment for all contributors.

## 🚀 Getting Started

1. Fork the repository
2. Clone your fork locally
3. Set up the development environment (see README.md)
4. Create a new branch for your feature/fix

## 📋 What Can I Contribute?

### Priority Areas

- **Search optimization** - Improve search algorithms and performance
- **UI/UX enhancements** - Better mobile experience, accessibility
- **Dictionary integration** - Help integrate more Arabic-English dictionaries
- **Documentation** - Improve docs, add examples, translations
- **Testing** - Add unit tests, integration tests, E2E tests

### Good First Issues

Look for issues labeled `good first issue` in our [issue tracker](https://github.com/sylergydigital/mawridreader-nextgen/issues).

## 💻 Development Process

### 1. Branch Naming

Use descriptive branch names:
- `feature/add-keyboard-shortcuts`
- `fix/search-arabic-normalization`
- `docs/update-api-guide`

### 2. Commit Messages

Follow conventional commits:
```
feat: add dark mode support
fix: correct Arabic text direction in search results
docs: update installation instructions
chore: upgrade dependencies
```

### 3. Code Style

- Use TypeScript for all new code
- Follow existing code patterns
- Run `npm run lint` before committing
- Add JSDoc comments for public APIs

### 4. Testing

- Add tests for new features
- Ensure existing tests pass
- Test on multiple browsers/devices

## 🔄 Pull Request Process

1. **Update documentation** if needed
2. **Add tests** for new functionality
3. **Ensure CI passes** all checks
4. **Request review** from maintainers
5. **Address feedback** promptly

### PR Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Performance improvement

## Testing
- [ ] Tested on Chrome
- [ ] Tested on Firefox
- [ ] Tested on Safari
- [ ] Tested on mobile

## Checklist
- [ ] Code follows project style
- [ ] Self-reviewed code
- [ ] Updated documentation
- [ ] Added tests
```

## 🏗️ Architecture Guidelines

### Component Structure
```typescript
// components/ComponentName.tsx
interface ComponentNameProps {
  // Props with JSDoc comments
}

export default function ComponentName({ prop }: ComponentNameProps) {
  // Implementation
}
```

### State Management
- Use React Context for global UI state
- Use Zustand for complex application state
- Keep component state local when possible

### API Design
- RESTful endpoints in `/app/api/`
- TypeScript interfaces for all data types
- Error handling with proper status codes

## 🧪 Testing Guidelines

### Unit Tests
```typescript
// __tests__/components/SearchBox.test.tsx
describe('SearchBox', () => {
  it('should handle Arabic input', () => {
    // Test implementation
  });
});
```

### Integration Tests
Test complete user flows, especially search functionality.

## 📚 Dictionary Integration

To add a new dictionary:

1. Create index file in `/data/dictionaries/`
2. Add configuration in `/lib/dictionaries/config.ts`
3. Update types in `/types/dictionary.ts`
4. Add tests for new dictionary

## 🐛 Reporting Issues

### Bug Reports
Include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots if applicable

### Feature Requests
Describe:
- Use case
- Proposed solution
- Alternative approaches
- Mockups/examples if available

## 📝 Documentation

- Keep README.md updated
- Document new features in `/docs/`
- Add inline code comments
- Update API documentation

## 🎉 Recognition

Contributors will be:
- Listed in CONTRIBUTORS.md
- Mentioned in release notes
- Given credit in commit messages

## ❓ Questions?

- Open a [discussion](https://github.com/sylergydigital/mawridreader-nextgen/discussions)
- Ask in issues
- Contact maintainers

Thank you for helping make Mawrid Reader NextGen better! 🙏