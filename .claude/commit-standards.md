# Commit Standards for Documentation Repository

## Commit Message Format

All commits must follow this format:
```
<type>(<scope>): <subject>

<body>

<footer>
```

### Types
- **docs**: Documentation additions or updates
- **fix**: Corrections to existing documentation (typos, technical errors)
- **structure**: Changes to repository organization or file structure
- **diagram**: Adding or updating Mermaid diagrams
- **chore**: Maintenance tasks (updating .claude files, README, etc.)
- **init**: Initial setup of new topic areas

### Scope
The scope should be the topic area or directory affected:
- `salesforce`, `aws`, `docker`, `python`, etc.
- `general` for cross-cutting changes
- `claude` for changes to .claude directory

### Subject
- Use imperative mood ("add" not "added" or "adds")
- Don't capitalize first letter
- No period at the end
- Maximum 50 characters

### Body (optional)
- Explain what and why, not how
- Wrap at 72 characters
- Separate from subject with blank line

### Footer (optional)
- Reference related issues or documents
- Note breaking changes

## Examples

### Simple documentation addition:
```
docs(kubernetes): add pod lifecycle documentation

Added comprehensive guide covering:
- Pod phases and conditions  
- Container states
- Restart policies
- Practical troubleshooting examples
```

### Fixing errors:
```
fix(salesforce): correct revenue attribution flow

Fixed incorrect relationship between Campaign and
Opportunity in the attribution diagram. The flow
now properly shows multi-touch attribution model.
```

### Structural changes:
```
structure: reorganize cloud platform documentation

Moved all cloud-related docs into dedicated directories:
- /aws/ for AWS-specific content
- /azure/ for Azure content  
- /gcp/ for Google Cloud content
```

### Adding diagrams:
```
diagram(docker): add container networking visualization

Created Mermaid diagram showing:
- Bridge network communication
- Host networking mode
- Container-to-container communication paths
```

## Commit Guidelines

### 1. Atomic Commits
- One logical change per commit
- If adding multiple documents, commit each separately
- Don't mix different types of changes

### 2. Commit Frequency
- Commit after completing each document or major section
- Don't leave uncommitted changes for extended periods
- Commit before switching context to different topics

### 3. Pre-commit Checklist
Before committing, verify:
- [ ] All Markdown links are working
- [ ] Mermaid diagrams render correctly
- [ ] No sensitive information included
- [ ] File naming follows conventions
- [ ] Content is spell-checked

### 4. Work-in-Progress Commits
For incomplete work, use WIP prefix:
```
WIP: docs(python): start async programming guide

Initial outline and first two sections complete.
TODO: Add examples and error handling section.
```

### 5. Amending Commits
- Amend commits only before pushing
- For significant changes, create new commits
- Keep commit history clean and meaningful

## Commit Workflow

1. **Stage changes**: Review all modifications carefully
2. **Write message**: Follow the format above
3. **Verify**: Ensure message accurately describes changes
4. **Commit**: Create the commit
5. **Review**: Check commit with `git log` before pushing

## Special Cases

### Large Documentation Projects
When adding extensive documentation spanning multiple files:
```
docs(topic): add comprehensive guide [1/3]
docs(topic): add practical examples [2/3]  
docs(topic): add troubleshooting section [3/3]
```

### Collaborative Documentation
When building on others' work:
```
docs(docker): expand security best practices

Building on initial security notes by adding:
- Container scanning practices
- Runtime security options
- Network isolation strategies

Co-authored-by: Name <email>
```