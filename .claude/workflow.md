# Documentation Workflow and Commit Rules

## Mandatory Commit Workflow

### IMPORTANT: Every File Change Must Be Committed

**Claude must follow this workflow for EVERY documentation change:**

1. **Make changes** to documentation files
2. **Review changes** using `git status` and `git diff`
3. **Commit changes** immediately after completion
4. **Never leave uncommitted changes** in the repository

### Automated Commit Triggers

Claude should automatically create commits when:
- Adding a new documentation file
- Updating existing documentation
- Creating or modifying diagrams
- Reorganizing file structure
- Fixing errors or typos

## Step-by-Step Workflow

### 1. Before Making Changes
```bash
# Check current status
git status

# Ensure working directory is clean
# If not, commit or stash existing changes first
```

### 2. During Documentation Work
- Focus on one topic or document at a time
- Save work incrementally
- Test all Mermaid diagrams
- Verify all internal links

### 3. After Making Changes

**REQUIRED: Claude must execute these steps after any file modification:**

```bash
# 1. Check what has changed
git status
git diff

# 2. Stage the changes
git add <specific-files>
# or for all documentation changes:
git add *.md

# 3. Create descriptive commit
git commit -m "type(scope): description"

# 4. Verify commit was created
git log -1
```

### 4. Commit Decision Tree

```mermaid
graph TD
    A[File Changed] --> B{Type of Change?}
    B -->|New Document| C[docs(topic): add description]
    B -->|Fix Error| D[fix(topic): correct description]
    B -->|Update Content| E[docs(topic): update description]
    B -->|Add Diagram| F[diagram(topic): add description]
    B -->|Reorganize| G[structure: reorganize description]
    
    C --> H[Commit Immediately]
    D --> H
    E --> H
    F --> H
    G --> H
```

## Workflow Examples

### Example 1: Adding New Documentation
```bash
# After creating /kubernetes/pod-basics.md
git add kubernetes/pod-basics.md
git commit -m "docs(kubernetes): add pod basics guide

Created comprehensive guide covering:
- Pod definition and structure
- Basic pod manifests
- Common pod patterns"
```

### Example 2: Fixing Documentation Error
```bash
# After fixing error in salesforce documentation
git add salesforce/salesforce-concepts-revenue-attribution.md
git commit -m "fix(salesforce): correct campaign attribution logic

Fixed incorrect description of how campaigns relate
to opportunities in multi-touch attribution model"
```

### Example 3: Multiple Related Changes
```bash
# When adding related documents, commit each separately
git add docker/docker-basics.md
git commit -m "docs(docker): add container basics"

git add docker/docker-networking.md
git commit -m "docs(docker): add networking guide"

git add docker/docker-security.md
git commit -m "docs(docker): add security best practices"
```

## Commit Checkpoints

Claude should create commits at these checkpoints:
- ✅ After completing each new document
- ✅ After significant updates to existing documents
- ✅ After fixing errors or typos
- ✅ After adding or updating diagrams
- ✅ Before switching to a different topic
- ✅ At the end of each work session

## Error Prevention

### Common Mistakes to Avoid
1. ❌ Making multiple unrelated changes in one commit
2. ❌ Leaving changes uncommitted for extended periods
3. ❌ Creating commits with vague messages
4. ❌ Forgetting to stage new files before committing
5. ❌ Mixing documentation changes with other file types

### Pre-commit Validation
Before each commit, Claude should verify:
- All changed files are intentional
- Commit message follows standards
- No temporary or backup files included
- All new directories have content

## Git Command Reference

### Essential Commands for Documentation Work
```bash
# View changes
git status                      # See what's changed
git diff                        # See detailed changes
git diff --staged              # See staged changes

# Stage changes
git add <file>                 # Stage specific file
git add *.md                   # Stage all markdown files
git add -p                     # Stage changes interactively

# Commit changes
git commit -m "message"        # Create commit
git commit --amend            # Amend last commit (before push)

# Review history
git log --oneline -10         # See recent commits
git show                      # See last commit details
```

## Workflow Automation Rules

### For Claude: Automatic Commit Triggers

1. **After Creating New File**
   - Automatically stage and commit with appropriate message
   - Format: `docs(topic): add [filename without extension]`

2. **After Updating Existing File**
   - Review changes with git diff
   - Commit with descriptive message about what was updated

3. **After Fixing Errors**
   - Commit immediately with fix type
   - Include what was corrected in message

4. **End of Topic Session**
   - Ensure all changes are committed
   - No work should remain uncommitted

## Summary

**The Golden Rule**: Every documentation change must result in a commit. Claude should never leave the repository with uncommitted changes. This ensures:
- Complete history of documentation evolution
- Easy rollback if needed
- Clear attribution of changes
- Organized repository state