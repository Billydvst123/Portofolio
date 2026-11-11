/**
 * Portfolio Data Source - Billy
 * Computer Science Student @ BINUS University Malang
 * Aspiring Web Developer Intern
 */

const portfolioData = {
  personal: {
    name: "Billy",
    fullName: "Billy Nathaniel Halim",
    role: "Web Developer Intern",
    tagline: "Computer Science Undergraduate @ BINUS University Malang",
    bioIntro: "Hello buds 👋",
    bioHeadline: "I am Billy",
    bioPitch: "A proactive Computer Science student dedicated to crafting clean, accessible, and high-performance web applications. I bridge user-centric design with resilient frontend engineering to deliver seamless digital experiences.",
    aboutParagraphs: [
      "Currently pursuing my Bachelor's degree in Computer Science at BINUS University Malang (expected graduation 2028). I focus on Full-Stack Development (Front-End & Back-End) and Software Engineering.",
      "My passion lies in developing end-to-end applications by applying strong programming concepts, relational database design, and modern software architectures—ranging from Laravel and React web platforms to AI-powered systems and Unity AR apps.",
      "Seeking a Web / Full-Stack Developer Internship where I can contribute to real-world production codebases, collaborate with experienced engineering teams, and create impactful digital solutions."
    ],
    email: "billynathaniel6406@gmail.com",
    phone: "+62 813-4659-4460",
    whatsapp: "https://wa.me/6281346594460",
    linkedin: "https://www.linkedin.com/in/billy-nathaniel-halim-a78086326/",
    github: "https://github.com/Billydvst123",
    location: "Malang, Indonesia (Available for On-site & Remote)",
    cvUrl: "assets/cv-billy-en.pdf",
    cvUrlEn: "assets/cv-billy-en.pdf",
    cvUrlId: "assets/cv-billy-id.pdf",
    avatarUrl: "assets/images/billy-photo.jpg" // Ganti file/path foto profil di sini
  },

  skills: [
    {
      category: "Languages",
      icon: "code",
      items: ["JavaScript (ES6+)", "TypeScript", "PHP", "Java", "C#", "Python", "HTML5", "CSS3", "SQL"]
    },
    {
      category: "Frontend Development",
      icon: "layout",
      items: ["React", "TypeScript", "Vanilla JS & DOM APIs", "Laravel Blade", "Responsive Web Design", "CSS Grid & Flexbox"]
    },
    {
      category: "Backend, AI & APIs",
      icon: "server",
      items: ["Laravel", "FastAPI (Python)", "mT5 Neural Machine Translation", "Tesseract OCR", "RESTful API Integration", "JSON Architecture"]
    },
    {
      category: "Database & Cloud",
      icon: "database",
      items: ["MySQL", "Firebase", "Eloquent ORM", "Relational Schema Design"]
    },
    {
      category: "Interactive, AR & Tools",
      icon: "tool",
      items: ["Unity Engine", "AR Foundation (ARCore/ARKit)", "Git & GitHub", "VS Code", "Postman", "Chrome DevTools"]
    },
    {
      category: "UI/UX & Methodology",
      icon: "figma",
      items: ["Figma Prototyping", "Wireframing", "User Journey Mapping", "Agile & Scrum", "Team Collaboration"]
    }
  ],

  projects: [
    {
      id: "debouquets",
      title: "Debouquets",
      subtitle: "Flower Bouquet E-Commerce & Online Ordering Platform",
      description: "A web-based flower bouquet ordering platform built with Laravel, enabling customers to browse floral catalogs, customize bouquet orders, and manage transactions online.",
      role: "Web Developer Contributor",
      category: "web",
      categoryLabel: "Laravel Web App",
      stack: ["Laravel", "PHP", "MySQL", "Blade", "HTML5/CSS3", "JavaScript"],
      highlights: [
        "Collaborated on developing core web features for online flower bouquet catalog and ordering.",
        "Implemented responsive Blade templates and MVC routing architecture in Laravel.",
        "Integrated relational database management for bouquet products and customer orders."
      ],
      demoUrl: "https://youtu.be/j-rX8YLNG2Y?si=ndWL2xJ5z05KkDjR",
      githubUrl: "https://github.com/Arthursakaa/Web_Debouquets",
      image: "assets/images/project-debouquets.jpg",
      featured: true
    },
    {
      id: "fitnessvals",
      title: "FitnessVals",
      subtitle: "AI-Powered Gym Management & Workout Analytics",
      description: "An intelligent fitness tracking web system and research project optimizing gym equipment usage and member routines.",
      role: "Frontend Engineer & Research Contributor",
      category: "web",
      categoryLabel: "Web & AI Research",
      stack: ["JavaScript", "TypeScript", "REST API(GO)", "CSS Grid", "Chart.js"],
      highlights: [
        "Implemented interactive workout tracking dashboard with responsive analytics.",
        "Engineered API client communicating with backend services.",
        "Co-authored research methodology on automated workout telemetry."
      ],
      demoUrl: "https://www.youtube.com/watch?v=Zc35n8_z4G8",
      githubUrl: "https://github.com/Billydvst123/FitnessVals",
      image: "assets/images/project-fitnessvals.jpg",
      featured: true
    },
    {
      id: "lingkungin",
      title: "Lingkungin",
      subtitle: "AR Education App About Organic and Inorganic Waste",
      description: "A mobile application that allows users to learn about organic and inorganic waste through augmented reality. Users can scan waste items and learn about their properties, decomposition time, and proper disposal methods.",
      role: "Fullstack Junior Developer",
      category: "mobile-ar",
      categoryLabel: "AR Mobile Application",
      stack: ["AR Foundation", "Unity", "C#", "Firebase", "ARCore", "ARKit"],
      highlights: [
        "Developed interactive Augmented Reality waste scanning and 3D visualization in Unity using C#.",
        "Integrated Firebase backend for real-time educational content and user data synchronization.",
        "Designed intuitive mobile UI educating users on organic and inorganic waste decomposition."
      ],
      demoUrl: "https://drive.google.com/file/d/1L3b-8r5eeXYk4WTv-cbpuybJu7cTRVWy/view?usp=sharing",
      githubUrl: "https://drive.google.com/drive/folders/1EX3kxtqbTPF7oqluSZcW0rgMNaK4SdPE?usp=sharing",
      image: "assets/images/project-lingkungin.svg",
      featured: true
    },
    {
      id: "translators-ai",
      title: "TranslatorsAI (Indonesia – Banjar)",
      subtitle: "Bidirectional Neural Machine Translation & OCR Web App",
      description: "An AI-powered bidirectional translator between Bahasa Indonesia and Bahasa Banjar built by fine-tuning a pre-trained mT5 Transformer model on 2,500 custom parallel sentence pairs, complete with Text-to-Speech and Image OCR scanning.",
      role: "Dataset Collector & Fullstack Web Developer",
      category: "web",
      categoryLabel: "AI & Web Application",
      stack: ["React", "TypeScript", "Python", "FastAPI", "mT5 (Deep Learning)", "Tesseract OCR"],
      highlights: [
        "Fine-tuned pre-trained mT5 Transformer model on 2,500 parallel Indonesian–Banjar sentences, achieving a 40.8 BLEU score.",
        "Built a distributed architecture pairing a Python FastAPI inference engine with a responsive React & TypeScript UI.",
        "Integrated Tesseract OCR with heuristic language detection to extract and translate text directly from uploaded images."
      ],
      demoUrl: "https://aitranslators.netlify.app/",
      githubUrl: "https://github.com/NobertMax6/TranslatorsAI",
      image: "assets/images/project-translatorsai.jpg",
      featured: true
    }
  ],

  experience: [
    {
      period: "Jul 2026",
      role: "Professional Office (V2) — English CEFR C1.2 Certified",
      organization: "BINUS University • Beelingua Digital Language System",
      type: "Certification",
      description: "Successfully completed advanced C1.2-Level English proficiency courses for professional and corporate communication. Credential ID: 2026-C-CGfCD9txGn5eu.",
      badges: ["CEFR C1.2", "Professional English", "Business Communication"],
      certificateUrl: "assets/cert-beelingua-c1.pdf"
    },
    {
      period: "Aug 2025",
      role: "Java Programming — Learning & Training (LnT) Completion",
      organization: "BNCC (Bina Nusantara Computer Club) BINUS University Malang",
      type: "Certification",
      description: "Successfully completed the BNCC Learning & Training (LnT) Java Programming curriculum (Class of 2024/2025) covering Object-Oriented Programming and core Java development.",
      badges: ["Java", "OOP", "BNCC LnT"],
      certificateUrl: "assets/images/cert-bncc-java.jpg"
    },
    {
      period: "Nov 2024 - Sep 2025",
      role: "Activist (HR Division)",
      organization: "BNCC (Bina Nusantara Computer Club) BINUS Malang",
      type: "Organization",
      description: "Responsible for recruiting, training, and retaining members. Developing and implementing HR policies and procedures.",
      badges: ["Leadership", "Recruiting", "Team Building"]
    },
    {
      period: "2020 - 2024",
      role: "Treasurer",
      organization: "JKI Blessing Family Banjarmasin (Youth Community)",
      type: "Management & Community",
      description: "Managed organizational finances, recorded cash inflows and outflows, and prepared periodic financial reports.",
      badges: ["Leadership", "Financial Management", "Budgeting"]
    }
  ]
};
