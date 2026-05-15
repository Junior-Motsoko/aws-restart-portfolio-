# ☁️ AWS re/Start Portfolio

> A comprehensive portfolio showcasing hands-on AWS cloud computing skills, labs, projects, and certifications from the AWS re/Start program.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=for-the-badge&logo=github)](https://junior-motsoko.github.io/aws-restart-portfolio-/)
[![GitHub Pages](https://img.shields.io/badge/deployed-github_pages-blue?style=for-the-badge&logo=github)](https://github.com/Junior-Motsoko/aws-restart-portfolio-)
[![License](https://img.shields.io/badge/license-MIT-green?style=for-the-badge)](LICENSE)

## 🌟 Overview

This portfolio is a dynamic, markdown-based documentation site that demonstrates practical AWS cloud computing expertise gained through the **AWS re/Start program**. It features a modern dark theme interface with AWS orange accents, showcasing hands-on labs, real-world projects, and professional certifications.

**🔗 Live Site:** [https://junior-motsoko.github.io/aws-restart-portfolio-/](https://junior-motsoko.github.io/aws-restart-portfolio-/)

## ✨ Features

- **📱 Responsive Design** - Mobile-first approach with hamburger menu for small screens
- **🎨 AWS-Branded Theme** - Dark mode (#0d1117) with AWS orange (#ff9900) accents
- **📝 Markdown Rendering** - Dynamic content loading with front matter support
- **💡 Syntax Highlighting** - Code blocks with highlight.js (GitHub Dark theme)
- **🗂️ Collapsible Navigation** - Hierarchical sidebar with expandable sections
- **⚡ Fast Loading** - Static site with CDN-delivered dependencies
- **🔍 Hash-Based Routing** - Direct linking to specific pages
- **📊 Meta Cards** - Beautiful display of page metadata, tags, and descriptions
- **🖼️ Modal Previews** - Popup views for instructions and PDF certificates

## 🛠️ Technology Stack

### Frontend
- **HTML5** - Semantic markup structure
- **CSS3** - Custom properties, flexbox, animations
- **JavaScript (ES6+)** - Modern async/await patterns

### Libraries & Tools
- **[marked.js](https://marked.js.org/)** - Markdown parser and compiler
- **[highlight.js](https://highlightjs.org/)** - Syntax highlighting for code blocks
- **GitHub Pages** - Static site hosting and deployment
- **GitHub Actions** - Automated CI/CD pipeline

### Design
- Dark theme inspired by GitHub's interface
- AWS orange branding (#ff9900)
- Custom scrollbars and smooth transitions
- Mobile-responsive breakpoints

## 📁 Project Structure

```
aws-restart-portfolio-/
├── 📄 index.html              # Main portfolio viewer
├── 📄 nav.json                # Navigation structure configuration
├── 📄 .nojekyll               # Disable Jekyll processing
├── 🎨 assets/
│   ├── portfolio.css          # Dark theme styles
│   ├── portfolio.js           # Navigation & rendering logic
│   └── icons/                 # AWS service icons
├── 🧪 Labs/
│   ├── Compute/               # EC2, Auto Scaling, Load Balancing
│   ├── Databases/             # RDS, DynamoDB
│   ├── Linux/                 # System Administration
│   ├── Networking/            # VPC, Route 53, CloudFront
│   ├── Security/              # IAM, Security Groups, KMS
│   └── Storage/               # S3, EBS, EFS
├── 🚀 Projects/
│   ├── design_3d_e_commerce_architecture/
│   └── static_website/
├── 🎓 Certs-Badges/
│   └── Simu-Learn/
│       ├── core_security_concepts/
│       ├── databases_in_practice/
│       ├── file_systems_in_the_cloud/
│       └── networking_concepts/
└── ⚙️ .github/
    └── workflows/
        └── static.yml         # GitHub Pages deployment
```

## 🎯 Portfolio Content

### 🧪 **Labs**
Hands-on AWS labs demonstrating practical skills:
- **Compute**: EC2 instances, monitoring, security groups, resizing
- **Databases**: RDS configuration, DynamoDB tables
- **Linux**: System administration, shell scripting
- **Networking**: VPC design, routing, DNS configuration
- **Security**: IAM policies, encryption, compliance
- **Storage**: S3 buckets, EBS volumes, lifecycle policies

### 🚀 **Projects**
Real-world cloud architecture implementations:
- **3D E-Commerce Architecture**: Scalable multi-tier application design
- **Static Website**: Serverless hosting with S3 and CloudFront

### 🎓 **Certifications & Badges**
AWS re/Start program completions:
- Core Security Concepts
- Databases in Practice
- File Systems in the Cloud
- Networking Concepts

## 🚀 Quick Start

### View Online
Simply visit: [https://junior-motsoko.github.io/aws-restart-portfolio-/](https://junior-motsoko.github.io/aws-restart-portfolio-/)

### Run Locally

1. **Clone the repository**
   ```bash
   git clone https://github.com/Junior-Motsoko/aws-restart-portfolio-.git
   cd aws-restart-portfolio-
   ```

2. **Start a local server**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Or using Node.js
   npx http-server -p 8000

   # Or using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   ```
   http://localhost:8000
   ```

## 📝 Adding Content

### Create a New Lab

1. **Create directory structure**
   ```bash
   mkdir -p Labs/Category/Lab-Name
   ```

2. **Add README.md with front matter**
   ```markdown
   ---
   title: Lab Title
   description: Brief description of what the lab covers
   tags: [AWS, Service, Category]
   ---

   # Lab Title

   Your content here...
   ```

3. **Update nav.json**
   ```json
   {
     "label": "Lab Name",
     "path": "Labs/Category/Lab-Name"
   }
   ```

4. **Commit and push**
   ```bash
   git add .
   git commit -m "Add [Lab Name] documentation"
   git push origin main
   ```

The site will automatically deploy via GitHub Actions!

## 🔧 Customization

### Change Theme Colors

Edit `assets/portfolio.css`:
```css
:root {
  --bg: #0d1117;              /* Background */
  --orange: #ff9900;           /* AWS orange accent */
  --text: #c9d1d9;            /* Text color */
  /* Modify other color variables */
}
```

### Modify Navigation

Edit `nav.json` to change the sidebar structure:
```json
{
  "home": "README.md",
  "sections": [
    {
      "id": "sec-custom",
      "label": "Custom Section",
      "icon": "🎯",
      "entries": [...]
    }
  ]
}
```

## 📦 Deployment

### GitHub Pages (Automatic)

The site automatically deploys to GitHub Pages on every push to `main`:

1. **Push changes**
   ```bash
   git push origin main
   ```

2. **GitHub Actions** runs the deployment workflow (`.github/workflows/static.yml`)

3. **Site updates** at `https://junior-motsoko.github.io/aws-restart-portfolio-/`

### Manual Deployment

You can also deploy to any static hosting service:
- Netlify
- Vercel
- AWS S3 + CloudFront
- Azure Static Web Apps
- Firebase Hosting

Simply upload the entire repository contents.

## 🎨 Design Philosophy

- **Dark First**: Easy on the eyes, professional aesthetic
- **AWS Branding**: Orange accents reflect AWS identity
- **Content Focus**: Minimal UI, maximum content visibility
- **Mobile Responsive**: Seamless experience on all devices
- **Fast & Lightweight**: No build process, pure static files
- **Accessible**: Semantic HTML, ARIA labels, keyboard navigation

## 🤝 Contributing

While this is a personal portfolio, suggestions and improvements are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Commit your changes (`git commit -m 'Add improvement'`)
4. Push to the branch (`git push origin feature/improvement`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👤 Author

**Junior Motsoko**

- GitHub: [@Junior-Motsoko](https://github.com/Junior-Motsoko)
- Portfolio: [https://junior-motsoko.github.io/aws-restart-portfolio-/](https://junior-motsoko.github.io/aws-restart-portfolio-/)

## 🙏 Acknowledgments

- **AWS re/Start Program** - For providing comprehensive cloud training
- **marked.js** - Excellent markdown parsing
- **highlight.js** - Beautiful syntax highlighting
- **GitHub Pages** - Free and reliable hosting

## 📈 Future Enhancements

- [ ] Add search functionality
- [ ] Implement tags filtering
- [ ] Add print-friendly styles
- [ ] Include architecture diagrams viewer
- [ ] Add progress tracking dashboard
- [ ] Integrate AWS service icons
- [ ] Add dark/light theme toggle
- [ ] Include lab completion timeline

---

<div align="center">

**Built with ☁️ by Junior Motsoko**

*AWS re/Start Program Graduate*

[![Portfolio](https://img.shields.io/badge/View-Portfolio-orange?style=for-the-badge&logo=amazonaws)](https://junior-motsoko.github.io/aws-restart-portfolio-/)
[![GitHub](https://img.shields.io/badge/Follow-GitHub-black?style=for-the-badge&logo=github)](https://github.com/Junior-Motsoko)

</div>
