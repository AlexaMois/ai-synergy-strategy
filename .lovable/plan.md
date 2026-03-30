

## Plan: Remove all НФИИ mentions across the project

Found НФИИ in **8 files**. Here are all changes:

### 1. `src/components/Partners.tsx`
- Remove `import nfii` (line 6)
- Remove partner entry `{ id: 6, name: "НФИИ", ... }` (line 27)

### 2. `src/components/Trust.tsx`
- Remove `"Член НФИИ"` from facts array (line 13)

### 3. `src/components/TrustMarquee.tsx`
- Remove `"Член НФИИ"` from facts array (line 10)

### 4. `src/components/TrustAndPosition.tsx`
- Remove the `Член НФИИ<br />` line (line 79)

### 5. `src/components/Footer.tsx`
- Remove `/ Член НФИИ` from the certificates text (line 85)

### 6. `src/components/PublicationsMarquee.tsx`
- Remove `import logoNfii` (line 5)
- Remove 3 НФИИ publication entries: id 1 (line 35), id 12 (line 55), id 22 (line 58)

### 7. `src/pages/Index.tsx`
- Remove НФИИ from `memberOf` JSON-LD schema (line 93)

### 8. `public/llms-full.txt`
- Remove "НФИИ (Национальная Федерация Искусственного Интеллекта), " from membership line (line 12)

### What stays untouched
- All other partners, publications, and content remain intact
- No sections become empty after removal — no need to hide anything

