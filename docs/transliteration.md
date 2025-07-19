# Transliteration and Arabic Text Handling

## Overview

Mawrid Reader supports multiple transliteration systems to allow users to search for Arabic words using Latin characters. This is crucial for users who can read Arabic but may not have Arabic keyboard layouts available.

## Transliteration Systems

### 1. Buckwalter Transliteration

The Buckwalter system is a widely-used ASCII-only transliteration scheme for Arabic. Mawrid Reader implements a subset focused on root letters.

#### Buckwalter Mapping Table

| Latin | Arabic | Name | Latin | Arabic | Name |
|-------|--------|------|-------|--------|------|
| v | ث | thaa | \$ | ش | sheen |
| g/G | غ | ghayn | \* | ذ | dhaal |
| x | خ | khaa | d | د | daal |
| D | ض | Daad | z | ز | zaay |
| Z | ظ | DHaa | s | س | seen |
| S | ص | Saad | t | ت | taa |
| T | ط | Taa | h | ه | haa |
| H | ح | Haa | E | ع | 'ayn |
| c | ع | 'ayn | r | ر | raa |
| f | ف | faa | q | ق | qaaf |
| k | ك | kaaf | l | ل | laam |
| m | م | meem | n | ن | noon |
| w | و | waaw | y | ي | yaa |
| b | ب | baa | j | ج | jeem |
| A | ا | alif | Y | ى | alif maqsuura |
| \' | ء | hamza | | | |

#### Implementation

```javascript
function buckwalter(action, str) {
    if (action == 'encode') {
        // Two-letter combinations first
        str = str.replace(/v/g,"ث");
        str = str.replace(/[gG]/g,"غ");
        str = str.replace(/x/g,"خ");
        str = str.replace(/\$/g,"ش");
        str = str.replace(/\*/g,"ذ");
        
        // Single letters with case sensitivity
        str = str.replace(/d/g,"د");
        str = str.replace(/D/g,"ض");
        str = str.replace(/z/g,"ز");
        str = str.replace(/Z/g,"ظ");
        // ... continues for all mappings
    }
    return str;
}
```

### 2. General Search Transliteration

The general search function includes more intuitive mappings that users might expect:

#### Multi-Character Mappings

| Input | Output | Arabic Letter |
|-------|--------|---------------|
| th | ث | thaa |
| gh | غ | ghayn |
| kh | خ | khaa |
| sh | ش | sheen |
| dh | ذ | dhaal |

#### Arabic Chat Alphabet (Arabizi)

Common number-to-letter mappings used in Arabic chat:

| Number | Arabic | Letter Name |
|--------|--------|-------------|
| 2 | ء | hamza |
| 3 | ع | 'ayn |
| 5 | خ | khaa |
| 6 | ط | Taa |
| 7 | ح | Haa |
| 8 | ق | qaaf |
| 9 | ص | Saad |

#### Implementation

```javascript
function do_search(str) {
    // Multi-character replacements
    str = str.replace(/th/g,"ث");
    str = str.replace(/gh/g,"غ");
    str = str.replace(/kh/g,"خ");
    str = str.replace(/sh/g,"ش");
    str = str.replace(/dh/g,"ذ");
    
    // Buckwalter conversion
    str = buckwalter('encode', str);
    
    // Arabic chat numbers
    str = str.replace(/3/g,"ع");
    str = str.replace(/7/g,"ح");
    str = str.replace(/5/g,"خ");
    // ... more replacements
    
    return str;
}
```

## Arabic Text Normalization

### 1. Alif Normalization

Different forms of alif are normalized to plain alif:

```javascript
// Normalize all alif variants
str = str.replace(/[أإآٱ]/g,"ا");
```

This handles:
- أ (alif with hamza above)
- إ (alif with hamza below)
- آ (alif with madda)
- ٱ (alif wasla)

### 2. Yaa Normalization

```javascript
// Normalize yaa variants
str = str.replace(/[ىئ]/g,"ي");
```

### 3. Taa Marbuuta Handling

The tied taa (ة) is often searched as regular haa (ه):

```javascript
// Allow searching with either form
if (str.includes('ه')) {
    alternates.push(str.replace(/ه/g, 'ة'));
}
```

## Usage Examples

### Example 1: Simple Word

User types: "kitab"
1. No multi-character matches
2. Buckwalter: k→ك, i→(ignored), t→ت, a→ا, b→ب
3. Result: "كتاب"

### Example 2: Complex Word

User types: "madhhab"
1. Multi-character: dh→ذ
2. Buckwalter: m→م, a→ا, h→ه, b→ب
3. Result: "مذهب"

### Example 3: Mixed Input

User types: "al-3arabiya"
1. Remove hyphen: "al3arabiya"
2. Number replacement: 3→ع
3. Buckwalter: a→ا, l→ل, r→ر, b→ب, y→ي, a→ا
4. Result: "العربية"

### Example 4: Buckwalter Proper

User types: "$ams"
1. Buckwalter: $→ش, a→ا, m→م, s→س
2. Result: "شمس"

## Best Practices

### 1. Order of Operations

Always apply transliterations in this order:
1. Multi-character replacements (th, gh, etc.)
2. Buckwalter conversion
3. Number replacements
4. Arabic normalization

### 2. Case Sensitivity

- Buckwalter uses case to distinguish letters (s/S, d/D, etc.)
- General search is case-insensitive
- Preserve case until Buckwalter conversion

### 3. Handling Ambiguity

Some inputs can be ambiguous:
- "dh" could be ذ or د+ه
- "gh" could be غ or ج+ه

The system prioritizes the multi-character interpretation.

## Advanced Features

### 1. Partial Matching

The system can handle partial transliterations:
```javascript
// "ktb" matches "كتب" and related words
// Missing vowels are ignored
```

### 2. Fuzzy Matching

Using the Yamli-like system, variations are generated:
```javascript
// Input: "kitab"
// Generates: "كتاب", "كطاب", "قتاب", etc.
```

### 3. Bidirectional Support

While primarily Latin→Arabic, the system also handles:
- Mixed Arabic/Latin input
- Already-Arabic input (passes through)

## Limitations

1. **Diacritics**: Currently ignores Arabic diacritics
2. **Vowels**: Short vowels not fully supported
3. **Compound Letters**: Some Arabic ligatures not handled
4. **Regional Variations**: Focuses on Modern Standard Arabic

## Future Enhancements

Potential improvements could include:
- Full diacritic support
- Persian/Urdu letter variants
- More chat alphabet mappings
- Custom user-defined mappings