# AgriVerse Style Guide

## Table of Contents
1. [Brand Identity](#brand-identity)
2. [Color System](#color-system)
3. [Typography](#typography)
4. [Component Patterns](#component-patterns)
5. [Layout & Spacing](#layout--spacing)
6. [Interactive Elements](#interactive-elements)
7. [Icons & Imagery](#icons--imagery)
8. [Design Principles](#design-principles)

---

## Brand Identity

### Logo & Name
- **Brand Name**: AgriVerse
- **Icon**: 🌾 (Wheat/Rice symbol)
- **Logo Style**: Gradient box with wheat emoji + text
- **Colors**: Green to emerald gradient (`from-green-500 to-emerald-600`)

### Brand Personality
- **Professional** yet approachable
- **Nature-inspired** with agricultural themes
- **Data-driven** and analytical
- **Clean and modern** interface design

---

## Color System

### Primary Colors (HSL Values)
```css
/* Light Mode */
--primary: 222.2 47.4% 11.2%           /* Dark navy for text/buttons */
--primary-foreground: 210 40% 98%      /* Light text on dark backgrounds */

/* Agricultural Green Palette */
--green-50: 110 40% 98%                /* Light green background */
--green-100: 110 32% 95%               /* Border green */
--green-500: 142 76% 36%               /* Primary green */
--green-600: 142 72% 29%               /* Hover green */
--emerald-50: 151 81% 96%              /* Light emerald background */
--emerald-600: 158 64% 52%             /* Primary emerald */
```

### Semantic Colors
```css
--background: 0 0% 100%                /* White background */
--foreground: 222.2 84% 4.9%           /* Dark text */
--muted: 210 40% 96.1%                 /* Subtle backgrounds */
--muted-foreground: 215.4 16.3% 46.9% /* Secondary text */
--border: 214.3 31.8% 91.4%            /* Border color */
--destructive: 0 84.2% 60.2%           /* Error/danger red */
```

### Usage Guidelines
- **Primary Actions**: Use green gradients (`bg-gradient-to-r from-green-600 to-emerald-600`)
- **Secondary Actions**: Use outline variants with green accents
- **Backgrounds**: Light green tints for sections (`from-green-50 to-emerald-50`)
- **Text**: Use semantic foreground colors, never direct colors

---

## Typography

### Font Family
- **Primary**: System fonts (default Tailwind stack)
- **Fallback**: Sans-serif system fonts

### Font Scales
```css
/* Headings */
.text-3xl     /* 30px - Main page titles */
.text-2xl     /* 24px - Card titles, section headers */
.text-xl      /* 20px - Component titles */
.text-lg      /* 18px - Large buttons, emphasis */

/* Body Text */
.text-base    /* 16px - Primary body text */
.text-sm      /* 14px - Secondary text, labels */
.text-xs      /* 12px - Captions, metadata */
```

### Font Weights
- **Bold** (`font-bold`): Main headings, important data
- **Medium** (`font-medium`): Labels, secondary headings
- **Normal** (`font-normal`): Body text, descriptions

### Typography Usage
```jsx
// Page Title
<h1 className="text-3xl font-bold text-gray-900">

// Card Title
<h2 className="text-2xl text-green-800">

// Label
<label className="text-sm font-medium text-gray-700">

// Secondary Text
<p className="text-sm text-gray-600">
```

---

## Component Patterns

### Cards
```jsx
// Standard Card
<Card className="border-green-200 shadow-lg">
  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50 rounded-t-xl">
    <CardTitle className="text-2xl text-green-800">Title</CardTitle>
    <CardDescription className="text-green-600">Description</CardDescription>
  </CardHeader>
  <CardContent className="p-6">
    {/* Content */}
  </CardContent>
</Card>

// Hover Effect Card
<Card className="hover:shadow-md transition-shadow">
```

### Buttons
```jsx
// Primary Button
<Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">

// Secondary Button  
<Button variant="secondary" className="bg-white text-green-600 hover:bg-green-50">

// Outline Button
<Button variant="outline" className="border-green-200 hover:bg-green-50">

// Ghost Button
<Button variant="ghost" className="hover:bg-green-50">
```

### Form Elements
```jsx
// Input with green accent
<Input className="border-green-200 focus:border-green-400" />

// Select with green accent
<SelectTrigger className="border-green-200 focus:border-green-400">

// Label styling
<Label className="text-gray-700 font-medium">
```

### Navigation
```jsx
// Active navigation state
<div className="bg-green-100 text-green-800 border-r-2 border-green-600">

// Hover navigation state  
<div className="hover:bg-green-50 hover:text-green-700">
```

---

## Layout & Spacing

### Container Widths
- **Full Width**: `w-full` for headers, main containers
- **Max Width**: `max-w-7xl mx-auto` for content areas
- **Card Grids**: `grid-cols-1 md:grid-cols-2 lg:grid-cols-4`

### Spacing Scale
```css
/* Consistent spacing */
.space-y-6    /* 24px - Section spacing */
.space-y-4    /* 16px - Component spacing */
.space-y-2    /* 8px - Form element spacing */
.gap-6        /* 24px - Grid gaps */
.gap-4        /* 16px - Smaller grid gaps */
.p-6          /* 24px - Card padding */
.p-4          /* 16px - Smaller padding */
```

### Responsive Design
```jsx
// Mobile-first grid
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

// Responsive text
<h1 className="text-lg sm:text-xl font-bold">

// Responsive spacing
<div className="px-4 sm:px-6 py-4">
```

---

## Interactive Elements

### Hover Effects
```jsx
// Card hover
<Card className="hover:shadow-md transition-shadow">

// Button hover  
<Button className="hover:bg-green-50 transition-colors">

// Icon hover
<Bell className="text-gray-400 hover:text-gray-500" />
```

### Loading States
```jsx
// Button loading
{isLoading ? (
  <>
    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
    Loading...
  </>
) : (
  'Submit'
)}
```

### Focus States
- All interactive elements use `focus:outline-none focus:ring-2 focus:ring-green-400`
- Form inputs use `focus:border-green-400`

---

## Icons & Imagery

### Icon Library
- **Primary**: Lucide React icons
- **Size Standard**: `h-5 w-5` (20px) for most icons
- **Large Icons**: `h-6 w-6` (24px) for emphasis

### Common Icons
```jsx
// Navigation
<Menu className="h-5 w-5" />
<Bell className="h-6 w-6" />
<LogOut className="h-5 w-5" />

// Agricultural
<Leaf className="h-6 w-6 text-emerald-600" />
<Sun className="h-5 w-5 text-orange-500" />
<CloudRain className="h-5 w-5 text-blue-500" />

// Data & Charts
<BarChart3 className="h-6 w-6" />
<TrendingUp className="h-3 w-3 text-green-500" />
<TrendingDown className="h-3 w-3 text-red-500" />
```

### Image Guidelines
- Use agricultural and nature themes
- Maintain consistent sizing for avatars (`h-8 w-8`)
- Use emoji for brand elements (🌾)

---

## Design Principles

### 1. Agricultural Aesthetic
- Green color palette reflecting nature and growth
- Use of agricultural icons and symbols
- Natural, organic feeling gradients

### 2. Data Clarity
- Clear hierarchy with bold headings
- Consistent spacing for readability
- Meaningful color coding for data states

### 3. Professional Accessibility
- High contrast ratios
- Consistent interactive patterns
- Clear visual feedback for actions

### 4. Responsive Design
- Mobile-first approach
- Graceful degradation on smaller screens
- Touch-friendly interface elements

### 5. Performance
- Minimal custom CSS (Tailwind utility classes)
- Consistent design tokens
- Efficient component reuse

---

## Implementation Guidelines

### DO's ✅
- Use semantic color tokens from design system
- Apply consistent spacing with Tailwind classes
- Use hover and focus states on interactive elements
- Maintain agricultural theme with green color palette
- Use proper semantic HTML structure

### DON'Ts ❌
- Don't use direct color values (e.g., `text-white`, `bg-black`)
- Don't create custom CSS when Tailwind utilities exist
- Don't break the established spacing scale
- Don't mix color schemes outside the agricultural palette
- Don't forget responsive design considerations

### Code Examples

#### Correct Usage
```jsx
// ✅ Good - Uses design system tokens
<Button className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700">
  Submit
</Button>

// ✅ Good - Semantic spacing
<div className="space-y-6">
  <Card className="border-green-200 shadow-lg">
```

#### Incorrect Usage
```jsx
// ❌ Bad - Direct colors
<Button className="bg-green-500 text-white hover:bg-green-600">

// ❌ Bad - Inconsistent spacing  
<div style={{ marginTop: '23px' }}>
```

---

*This style guide ensures consistency across the AgriVerse application while maintaining the agricultural theme and professional data-driven interface.*
