# ResumeForge — ATS-Optimized Resume Builder

A modern, high-performance web application designed to build, format, and audit **Applicant Tracking System (ATS) compliant** resumes.

Live Dev URL: `http://localhost:5173/`

---

## 🌟 Key Features

### 1. ATS Compliance Engine & Live Audit
- **Real-Time ATS Score Gauge (0–100%)**: Dynamically computes compliance across 5 critical dimensions:
  - **Contact Information (20 pts)**: Ensures email, phone, location, and professional links are correctly formatted.
  - **Section Structure (20 pts)**: Enforces industry-standard section headings (Work Experience, Education, Skills, Projects).
  - **Metrics & Quantifiable Results (25 pts)**: Automatically detects numbers, percentages (`%`), dollar amounts (`$`), and multipliers (`10x`) in your bullet points.
  - **Power Action Verbs (20 pts)**: Checks if bullet points begin with active power verbs rather than passive phrases like *"Responsible for"*.
  - **Readability & Formatting (15 pts)**: Keeps professional summaries concise and prevents overly verbose bullet points.
- **Target Job Description Keyword Scanner**:
  - Paste any job listing from LinkedIn, Indeed, or company career portals.
  - Instantly reveals **Matched Keywords** vs. **Missing Critical Keywords** with a match percentage score.

### 2. 5 Curated ATS-Friendly Templates
1. **ATS Classic**:
   - Single-column standard layout, universally parsed with 99%+ accuracy across legacy and modern ATS (Workday, Taleo, Greenhouse, Lever, iCIMS).
2. **Modern Clean**:
   - Sleek design with subtle color accents, skill tags, and high-readability typography.
3. **Executive Leadership**:
   - Refined serif styling with double-line divider rules and structured impact summaries, ideal for Directors and Product Leads.
4. **Technical / Developer**:
   - Monospace accents, structured tech skills matrix, and highlighted open-source project repositories.
5. **Elegant Compact**:
   - Two-column semantic structure optimized for dense 1-page resumes with strict linear reading order.

### 3. Typography & Document Styling
- **Typography**: Inter, Roboto, Merriweather, EB Garamond, and JetBrains Mono.
- **Custom Sizing & Spacing**: Adjust font size (Small, Medium, Large), margins (Tight, Normal, Wide), and paper format (A4 vs. US Letter).
- **Accent Color Palette**: Slate Dark, Ocean Sky, Royal Navy, Emerald Green, Deep Violet, Burgundy, and Custom Hex picker.

### 4. Export & Download Formats
- **True Vector PDF**: Prints directly as a selectable text document with crisp fonts and zero rasterization loss.
- **Plain Text (.txt) ATS Format**: One-click download or clipboard copy for copy-pasting directly into legacy ATS text boxes.
- **JSON Backup & Restore**: Save resume data to file and restore it anytime.

### 5. Pre-Loaded Example Profiles
- **Senior Full Stack Software Engineer**
- **Lead Product Manager**
- **Staff Machine Learning Engineer**
- **Entry Level / Recent Computer Science Graduate**

---

## 🚀 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Start local development server
npm run dev

# 3. Build for production
npm run build
```
