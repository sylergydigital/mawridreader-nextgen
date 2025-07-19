# Page Display and Navigation System

## Overview

Mawrid Reader displays dictionary content primarily as scanned page images. The system handles image loading, navigation between pages, and responsive display across different devices and screen sizes.

## Image URL Structure

### Directory Organization

Images are stored in a hierarchical structure:

```
../aa-data/img/
├── {dictionary_id}/
│   ├── 100/          # Pages 0-199
│   │   ├── 1.png
│   │   ├── 2.png
│   │   └── ...
│   ├── 200/          # Pages 200-299
│   │   └── ...
│   └── 300/          # Pages 300-399
│       └── ...
```

### URL Generation

```javascript
function get_img_url(book) {
    var page = books[book]["wanted"];
    
    // Ensure page is within bounds
    if (page < 1) page = 1;
    if (page > books[book]["index"].length) {
        page = books[book]["index"].length - 1;
    }
    
    // Calculate directory (batch of 100)
    var batch = Math.floor(page / 100) * 100;
    if (batch == 0) batch = 100;
    
    // Build URL
    var url = "../aa-data/img/" + 
              books[book]["image-prefix"] + "/" +
              batch + "/" +
              page + ".png";
              
    return url;
}
```

### Example URLs

- Page 1: `../aa-data/img/ll/100/1.png`
- Page 150: `../aa-data/img/ll/100/150.png`
- Page 201: `../aa-data/img/ll/200/201.png`

## Display Modes

### 1. Multi-Column View (Desktop)

Shows multiple dictionaries side-by-side:

```html
<div class="dictionary-container">
    <div class="dict-column" id="dict1">
        <img id="dict1_col1" src="...">
    </div>
    <div class="dict-column" id="dict2">
        <img id="dict2_col1" src="...">
    </div>
</div>
```

### 2. Single Column View (Mobile)

Stacked dictionaries for narrow screens:

```javascript
if (window.innerWidth < 768) {
    switchToSingleColumn();
}
```

### 3. Wide View Mode

Full-page display for detailed reading:

```javascript
function toggleWideView(dict_id) {
    $("#" + dict_id + "_wideview").toggle();
    $("#" + dict_id + "_narrowview").toggle();
}
```

## Navigation System

### 1. Keyboard Navigation

| Key | Action |
|-----|--------|
| → / L | Next page |
| ← / H | Previous page |
| ↑ / K | Page up (+10) |
| ↓ / J | Page down (-10) |
| G | Go to page |
| F | Focus search |

Implementation:

```javascript
shortcut.add("Right", function() {
    navigatePage(1);
});

shortcut.add("Left", function() {
    navigatePage(-1);
});

function navigatePage(delta) {
    for (var book in books) {
        if (!books[book]["should_hide"]) {
            books[book]["wanted"] += delta;
        }
    }
    display_images();
}
```

### 2. Touch Navigation (Mobile)

Swipe gestures for page turning:

```javascript
$("#touch-area").swipe({
    swipeLeft: function() {
        navigatePage(1);  // Next page
    },
    swipeRight: function() {
        navigatePage(-1); // Previous page
    },
    threshold: 50
});
```

### 3. Click Navigation

UI buttons for navigation:

```html
<button onclick="navigatePage(-1)">Previous</button>
<button onclick="navigatePage(1)">Next</button>
<input type="number" id="page-input" onchange="goToPage(this.value)">
```

## Page State Management

### 1. Current vs Wanted Pages

```javascript
books[book] = {
    "current": 1,    // Currently displayed page
    "wanted": 1,     // Page to load next
    // ... other properties
};
```

### 2. Update Cycle

```javascript
function display_images() {
    for (var book in books) {
        if (books[book]["wanted"] != books[book]["current"]) {
            // Page has changed - update image
            var img_url = get_img_url(book);
            
            // Update all image elements
            $("#" + book + "_col1").attr('src', img_url);
            $("#" + book + "_wideviewimg").attr('src', img_url);
            
            // Update current page
            books[book]["current"] = books[book]["wanted"];
            
            // Update status display
            updateStatusLine(book);
        }
    }
}
```

### 3. Status Display

Shows current position and searched term:

```javascript
function updateStatusLine(book) {
    var status = "<b>" + books[book]["index"][books[book]["current"]] + "</b> | " +
                 books[book]["name"] + ", page " + 
                 (books[book]["current"] - books[book]["offset"] + 1) +
                 " <small>(of " + 
                 (books[book]["index"].length - 1 - books[book]["offset"]) + 
                 ")</small>";
                 
    $("#" + book + "_status_line").html(status);
}
```

## Image Loading Optimization

### 1. Preloading

Load adjacent pages for smooth navigation:

```javascript
function preloadImages(book, currentPage) {
    // Preload next and previous pages
    var preloadPages = [currentPage - 1, currentPage + 1];
    
    preloadPages.forEach(page => {
        if (page > 0 && page < books[book]["index"].length) {
            var img = new Image();
            img.src = generateImageUrl(book, page);
        }
    });
}
```

### 2. Progressive Loading

Show low-quality placeholder while loading:

```javascript
// Clear image to show loading state
$("#" + book + "_col1").attr('src', '');

// Load new image
var img = new Image();
img.onload = function() {
    $("#" + book + "_col1").attr('src', this.src);
};
img.src = new_url;
```

### 3. Error Handling

Handle missing images gracefully:

```javascript
$("img").on('error', function() {
    $(this).attr('src', 'images/page-not-found.png');
    console.error('Failed to load:', this.src);
});
```

## Responsive Design

### 1. Viewport Detection

```javascript
function detectViewport() {
    var width = window.innerWidth;
    
    if (width < 768) {
        return 'mobile';
    } else if (width < 1024) {
        return 'tablet';
    } else {
        return 'desktop';
    }
}
```

### 2. Adaptive Layouts

```css
/* Mobile: Single column */
@media (max-width: 767px) {
    .dict-column {
        width: 100%;
        float: none;
    }
}

/* Tablet: Two columns */
@media (min-width: 768px) and (max-width: 1023px) {
    .dict-column {
        width: 50%;
        float: left;
    }
}

/* Desktop: Multiple columns */
@media (min-width: 1024px) {
    .dict-column {
        width: 33.33%;
        float: left;
    }
}
```

### 3. Touch-Friendly Controls

Larger touch targets for mobile:

```css
.mobile .nav-button {
    min-height: 44px;
    min-width: 44px;
    font-size: 18px;
}
```

## Text Display (for Text Dictionaries)

### 1. Loading Text Content

```javascript
function load_text_file(book, entry) {
    var url = "text/" + book + "/" + 
              entry.charAt(0) + "/" + 
              entry + ".txt";
              
    $.get(url, function(data) {
        $("#" + book + "_text").html(data);
    });
}
```

### 2. Text Formatting

```css
.text-content {
    direction: rtl;
    font-family: 'Droid Arabic Naskh', serif;
    font-size: 18px;
    line-height: 1.8;
    padding: 20px;
}
```

## Performance Considerations

### 1. Image Optimization

- Use PNG for text clarity
- Compress without losing readability
- Standard resolution: 150-200 DPI

### 2. Caching Strategy

Browser caching handled via headers:

```
Cache-Control: public, max-age=31536000
```

### 3. Bandwidth Management

- Load only visible dictionaries
- Cancel pending requests on navigation
- Option for low-bandwidth mode

## Accessibility Features

### 1. Keyboard-Only Navigation

All functions accessible via keyboard:

```javascript
// Tab navigation support
$('.nav-control').attr('tabindex', '0');

// Enter key activation
$('.nav-control').on('keypress', function(e) {
    if (e.which === 13) {
        $(this).click();
    }
});
```

### 2. Screen Reader Support

```html
<img alt="Dictionary page 45 of Lane's Lexicon" 
     aria-label="Page showing entries from كتب to كتف">
```

### 3. High Contrast Mode

```css
.high-contrast img {
    filter: contrast(1.5) brightness(1.1);
}
```

## Future Enhancements

1. **Zoom Functionality**: Pinch-to-zoom on mobile
2. **Page Thumbnails**: Visual page navigation
3. **Bookmarks**: Save frequently accessed pages
4. **Annotations**: User notes on pages
5. **OCR Integration**: Select and copy text from images