# Dictionary Configuration System

## Overview

The configuration system in Mawrid Reader allows easy addition and management of dictionaries through JavaScript configuration files. Each dictionary collection (Arabic Almanac, Mawrid, Mabhath) has its own configuration that defines available dictionaries, their properties, and display preferences.

## Configuration Structure

### 1. Project Configuration

Each collection defines its project metadata:

```javascript
var project = {
    "info": "Search through Arabic Almanac dictionaries online",
    "intro": "Arabic Almanac",
    "title": "Welcome to Arabic Almanac",
    "version": "4.0 beta",
    "prefix": "aa_",
    "icon": "aa.ico"
}
```

### 2. Presets Configuration

Presets allow users to quickly select dictionaries by language preference:

```javascript
var presets = {
    "default": { "name": "Default", "order": "ll,ha,la,ls,hwa,sg,br" },
    "english": { "name": "English", "order": "ll,ha,hwa" },
    "urdu": { "name": "Urdu", "order": "sg,mg,qa,qm" },
    "french": { "name": "French", "order": "kz" },
    "bangla": { "name": "Bangla", "order": "bn" },
    "indo-malay": { "name": "Indonesian/Malay", "order": "kr" }
}
```

### 3. Dictionary Definitions

Each dictionary is defined with comprehensive metadata:

```javascript
var books = {
    "ll": { 
        "name": "Lane's Lexicon", 
        "color": "Crimson",
        "index": ll, 
        "direction": "ltr", 
        "columns": "1",
        "offset": 0, 
        "startpage": 1, 
        "image-prefix": "ll"
    },
    "ha": { 
        "name": "Hava", 
        "color": "Purple",
        "index": ha, 
        "direction": "ltr", 
        "columns": "2",
        "offset": 7, 
        "startpage": 7, 
        "image-prefix": "ha"
    },
    // ... more dictionaries
}
```

## Configuration Properties

### Required Properties

| Property | Type | Description |
|----------|------|-------------|
| name | string | Display name of the dictionary |
| color | string | CSS color for visual identification |
| index | array/object | Reference to the index data |
| direction | string | Text direction: "ltr" or "rtl" |
| columns | string | Number of columns: "1", "2", or "3" |
| image-prefix | string | Prefix for image files |

### Optional Properties

| Property | Type | Description |
|----------|------|-------------|
| offset | number | Page numbering offset |
| startpage | number | First page to display |
| text-prefix | string | For text-based dictionaries |
| searchable | boolean | Enable/disable search |
| custom-search | function | Override default search |

## Configuration Examples

### 1. Simple Image Dictionary

```javascript
"simple_dict": {
    "name": "Simple Arabic Dictionary",
    "color": "Blue",
    "index": simple_index,
    "direction": "rtl",
    "columns": "2",
    "offset": 0,
    "startpage": 1,
    "image-prefix": "simple"
}
```

### 2. Text-Based Dictionary

```javascript
"text_dict": {
    "name": "Modern Arabic Texts",
    "color": "Green", 
    "index": text_index,
    "direction": "rtl",
    "columns": "1",
    "type": "text",
    "text-prefix": "modern"
}
```

### 3. Custom Search Dictionary

```javascript
"special_dict": {
    "name": "Specialized Terms",
    "color": "Orange",
    "index": special_index,
    "direction": "ltr",
    "columns": "1",
    "image-prefix": "spec",
    "custom-search": function(term) {
        // Custom search logic
        return specializedSearch(term, this.index);
    }
}
```

## Color Coding

Dictionaries use colors for visual distinction:

```javascript
// Available colors (CSS color names)
"Crimson"     // Deep red
"Purple"      // Traditional purple
"Darkgreen"   // Forest green
"Darkblue"    // Navy blue
"Chocolate"   // Brown
"Teal"        // Blue-green
"Salmon"      // Light red-orange
"Lawngreen"   // Bright green
```

## Compilation Process

### 1. Individual Configuration Files

Each collection has separate files:
- `mr-aa-conf.js` - Arabic Almanac configuration
- `mr-mr-conf.js` - Mawrid configuration
- `mr-mh-conf.js` - Mabhath configuration

### 2. Compilation Script

The `compile-configs.sh` script combines all configurations:

```bash
#!/bin/bash
# Compile all configuration files into one

echo "// Compiled configuration file" > mawrid-configs.js
echo "var all_configs = {" >> mawrid-configs.js

# Add each configuration
echo "'aa': {" >> mawrid-configs.js
cat mr-aa-conf.js >> mawrid-configs.js
echo "}," >> mawrid-configs.js

# ... repeat for other configs

echo "};" >> mawrid-configs.js
```

### 3. Runtime Selection

Configuration selected via URL parameter:

```javascript
// Get configuration from URL
var conf = getHashParameter('conf') || 'aa';

// Load appropriate configuration
var active_config = all_configs[conf];
var books = active_config.books;
var presets = active_config.presets;
```

## Adding a New Dictionary

### Step 1: Prepare Index File

Create `mr-{collection}-{dict}-index.js`:

```javascript
var newdict = [
    "",
    "first_entry",
    "second_entry",
    // ... one per page
];
```

### Step 2: Add to Configuration

Edit `mr-{collection}-conf.js`:

```javascript
var books = {
    // ... existing dictionaries
    "newdict": {
        "name": "New Dictionary Name",
        "color": "Mediumblue",
        "index": newdict,
        "direction": "rtl",
        "columns": "2",
        "offset": 10,
        "startpage": 10,
        "image-prefix": "nd"
    }
};
```

### Step 3: Update Presets

Add to appropriate language presets:

```javascript
var presets = {
    "english": { 
        "name": "English", 
        "order": "ll,ha,hwa,newdict"  // Added newdict
    }
};
```

### Step 4: Compile Configuration

```bash
./Attic/compile-configs.sh
```

### Step 5: Add Images

Place images in correct structure:
```
../aa-data/img/nd/
├── 100/
│   ├── 10.png
│   ├── 11.png
│   └── ...
├── 200/
│   └── ...
```

## Configuration Best Practices

### 1. Naming Conventions

- Dictionary ID: lowercase, short (2-4 chars)
- Image prefix: match dictionary ID
- Names: clear, include edition info

### 2. Color Selection

- Use distinct colors for each dictionary
- Consider color blindness (avoid red-green only)
- Group related dictionaries with similar hues

### 3. Page Numbering

- Account for front matter with offset
- Verify startpage matches first content
- Test navigation at boundaries

### 4. Performance

- Keep configuration files lean
- Lazy load large indexes
- Minimize preset combinations

## Troubleshooting

### Common Issues

1. **Dictionary not appearing**
   - Check compilation ran successfully
   - Verify index file is loaded
   - Confirm dictionary ID is unique

2. **Wrong pages displayed**
   - Verify offset calculation
   - Check index alignment
   - Test first and last pages

3. **Search not working**
   - Ensure index is properly formatted
   - Check array starts with empty string
   - Verify alphabetical ordering

### Debug Mode

Enable debugging in configuration:

```javascript
"debug_dict": {
    "name": "Debug Dictionary",
    "debug": true,  // Enables console logging
    // ... other properties
}
```

## Advanced Configuration

### 1. Dynamic Loading

```javascript
"large_dict": {
    "name": "Large Dictionary",
    "lazy_load": true,
    "index_url": "indexes/large-dict-index.js",
    // ... other properties
}
```

### 2. Multi-Volume Support

```javascript
"multivolume": {
    "name": "Multi-Volume Work",
    "volumes": {
        "vol1": { "index": vol1_index, "prefix": "v1" },
        "vol2": { "index": vol2_index, "prefix": "v2" }
    }
}
```

### 3. Conditional Display

```javascript
"premium_dict": {
    "name": "Premium Dictionary",
    "requires": "premium_access",
    "check_function": checkUserAccess,
    // ... other properties
}
```