import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Mail, Phone, Github, Linkedin, ExternalLink, Code, Database, Globe, Award, User, Briefcase, MessageCircle, Sun, Moon, ArrowUp } from 'lucide-react';
import './App.css';

// Types for Intersection Observer Hook
type IntersectionObserverHook = [React.RefObject<HTMLElement | null>, boolean];


// Custom hook for intersection observer
const useIntersectionObserver = (options: IntersectionObserverInit = {}): IntersectionObserverHook => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting);
    }, options);

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.disconnect();
  }, [options]);

  return [ref, isIntersecting];
};

// Props Types
interface HeaderProps {
  darkMode: boolean;
  setActiveSection: (sectionId: string) => void;
  activeSection: string;
}

interface HeroProps {
  darkMode: boolean;
}

interface AboutProps {
  darkMode: boolean;
}

interface SkillsProps {
  darkMode: boolean;
}

interface AchievementsProps {
  darkMode: boolean;
}

interface ProjectsProps {
  darkMode: boolean;
}

interface ContactProps {
  darkMode: boolean;
}

interface ContactFormProps {
  darkMode: boolean;
}

interface ThemeToggleProps {
  darkMode: boolean;
  toggleTheme: () => void;
}

interface BackToTopProps {
  show: boolean;
  darkMode: boolean;
}

// Header Component
const Header: React.FC<HeaderProps> = ({ darkMode, setActiveSection, activeSection }) => {
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { id: 'home', label: 'Home', icon: User },
    { id: 'about', label: 'About', icon: User },
    { id: 'skills', label: 'Skills', icon: Code },
    { id: 'achievements', label: 'Achievements', icon: Award },
    { id: 'projects', label: 'Projects', icon: Briefcase },
    { id: 'contact', label: 'Contact', icon: MessageCircle }
  ];

  // Filter out Achievements for mobile navigation
  const mobileNavItems = navItems.filter(item => item.id !== 'achievements');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setActiveSection(sectionId);
    }
  };

  return (
    <header className={`header ${scrolled ? 'scrolled' : ''} ${darkMode ? 'dark' : ''}`}>
      <nav className="nav-container">
        <div className="nav-brand">
          <div className="brand-icon">ST</div>
          <span className="brand-text">Saraswati Thorat</span>
        </div>
        
        <div className="nav-menu">
          {navItems.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`nav-item ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={18} />
              <span>{label}</span>
            </button>
          ))}
        </div>

        <div className="mobile-nav">
          {mobileNavItems.map(({ id, icon: Icon }) => (
            <button
              key={id}
              onClick={() => scrollToSection(id)}
              className={`mobile-nav-item ${activeSection === id ? 'active' : ''}`}
            >
              <Icon size={24} />
            </button>
          ))}
        </div>
      </nav>
    </header>
  );
};

// Hero Section
const Hero: React.FC<HeroProps> = ({ darkMode }) => {
  const [heroRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [typewriterText, setTypewriterText] = useState('');
  const fullText = 'Full Stack Developer & Problem Solver';

  useEffect(() => {
    if (isVisible) {
      let index = 0;
      const timer = setInterval(() => {
        setTypewriterText(fullText.slice(0, index));
        index++;
        if (index > fullText.length) {
          clearInterval(timer);
        }
      }, 100);
      return () => clearInterval(timer);
    }
  }, [isVisible]);

  const scrollToProjects = () => {
    const element = document.getElementById('projects');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section ref={heroRef} id="home" className={`hero ${darkMode ? 'dark' : ''}`}>
      <div className="hero-content">
        <div className={`hero-text ${isVisible ? 'animate' : ''}`}>
          <h1 className="hero-title">
            Hello, I'm <span className="gradient-text">Saraswati</span>
          </h1>
          <p className="hero-subtitle">
            {typewriterText}<span className="cursor">|</span>
          </p>
          <p className="hero-description">
            Building innovative, responsive, and scalable web applications with modern technologies to solve real-world challenges.
          </p>
          <div className="hero-buttons">
            <button onClick={scrollToProjects} className="btn-primary">
              View My Work
              <ExternalLink size={16} />
            </button>
            <button 
              onClick={() => {
                const element = document.getElementById('contact');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="btn-secondary"
            >
              Get In Touch
            </button>
          </div>
        </div>
        <div className={`hero-visual ${isVisible ? 'animate' : ''}`}>
          <div className="floating-elements">
            <div className="floating-card">
              <Code size={32} />
              <span>ReactJS</span>
            </div>
            <div className="floating-card">
              <Database size={32} />
              <span>MySQL</span>
            </div>
            <div className="floating-card">
              <Globe size={32} />
              <span>Spring Boot</span>
            </div>
          </div>
        </div>
      </div>
      <div className="scroll-indicator" onClick={scrollToProjects}>
        <ChevronDown size={24} />
      </div>
    </section>
  );
};

// About Section
const About: React.FC<AboutProps> = ({ darkMode }) => {
  const [aboutRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  
  return (
    <section ref={aboutRef} id="about" className={`about ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">About Me</h2>
          <div className="section-divider"></div>
        </div>
        <div className={`about-content ${isVisible ? 'animate' : ''}`}>
          <div className="about-text">
            <p>
              I'm a passionate Full Stack Developer pursuing a degree in Computer Engineering. 
              With expertise in Java, Spring Boot, ReactJS, and MySQL, I specialize in crafting 
              high-performance, secure, and user-friendly web applications.
            </p>
            <p>
              My projects demonstrate a commitment to innovation, scalability, and solving complex 
              problems through technology. I believe in writing clean, maintainable code and 
              creating exceptional user experiences.
            </p>
            <div className="stats-grid">
              <div className="stat-item">
                <h3>3+</h3>
                <p>Projects Completed</p>
              </div>
              <div className="stat-item">
                <h3>90%+</h3>
                <p>Accuracy Rate</p>
              </div>
              <div className="stat-item">
                <h3>100+</h3>
                <p>User Records Managed</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Skills Section
const Skills: React.FC<SkillsProps> = ({ darkMode }) => {
  const [skillsRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  const skills = [
    { name: 'ReactJS', icon: 'react-logo.png' },
    { name: 'Java', icon: 'java-logo.png' },
    { name: 'Spring Boot', icon: 'spring-boot-logo.png' },
    { name: 'MySQL', icon: 'mysql-logo.png' },
    { name: 'HTML/CSS', icon: 'html-css-logo.png' },
    { name: 'JavaScript', icon: 'js-logo.png' },
    { name: 'Thymeleaf', icon: 'thymeleaf-logo.png' }
  ];

  return (
    <section ref={skillsRef} id="skills" className={`skills ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">Skills &amp; Tools</h2>
          <div className="section-divider"></div>
        </div>

        <div className="skills-grid">
          {skills.map(({ name, icon }) => (
            <div key={name} className="skill-card">
              <div className="skill-icon">
                <img src={`${process.env.PUBLIC_URL}/assets/skills/${icon}`} alt={name} />
              </div>
              <h3 className="skill-name">{name}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Achievements Section
const Achievements: React.FC<AchievementsProps> = ({ darkMode }) => {
  const [achievementsRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });

  const achievements = [
    {
      title: 'Driver Drowsiness Detection',
      description: 'Led a team of 3+ members to develop a project achieving over 90% accuracy in detecting driver drowsiness and potential accidents.',
      icon: '🚗',
      highlight: '90% Accuracy'
    },
    {
      title: 'Smart India Hackathon',
      description: 'Competed in a national-level innovation challenge, solving real-world problems and enhancing teamwork skills.',
      icon: '🏆',
      highlight: 'National Level'
    },
    {
      title: 'Project Competition',
      description: 'Reached advanced rounds among 50+ teams in a college-level project idea competition.',
      icon: '💡',
      highlight: 'Top Performer'
    },
    {
      title: 'Wipro Certification',
      description: 'Completed Java Full Stack Certification, mastering Spring Boot, REST APIs, and MySQL.',
      icon: '📜',
      highlight: 'Certified'
    }
  ];

  return (
    <section ref={achievementsRef} id="achievements" className={`achievements ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">Achievements</h2>
          <div className="section-divider"></div>
        </div>
        <div className="achievements-grid">
          {achievements.map((achievement, index) => (
            <div 
              key={index}
              className={`achievement-card ${isVisible ? 'animate' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="achievement-icon">{achievement.icon}</div>
              <div className="achievement-content">
                <div className="achievement-highlight">{achievement.highlight}</div>
                <h3 className="achievement-title">{achievement.title}</h3>
                <p className="achievement-description">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Projects Section
const Projects: React.FC<ProjectsProps> = ({ darkMode }) => {
  const [projectsRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [filter, setFilter] = useState('All');

  const projects = [
    {
      title: 'Todo List Website',
      description: 'A responsive and interactive Todo app that allows users to add, edit, delete, search, and share tasks with others in real-time, enhancing productivity and collaboration.',
      tech: ['ReactJS', 'JavaScript', 'HTML/CSS'],
      category: ['Frontend', 'Backend'],
      image: '✅',
      features: ['Responsive Design', 'Share task list', 'Task add/edit/delete', 'Interactive UI'],
      link: '#!' // TODO: Replace with actual project link (e.g., GitHub or live demo)
    },
    {
      title: 'Banking Web Application',
      description: 'A full-stack app using Thymeleaf, Spring Boot, and MySQL, managing 100+ user records with secure REST APIs and 99% uptime.',
      tech: ['Spring Boot', 'Thymeleaf', 'MySQL'],
      category: 'Full Stack',
      image: '🏦',
      features: ['Secure APIs', '99% Uptime', 'User Management'],
      link: '#!' // TODO: Replace with actual project link
    },
    {
      title: 'UserHub Platform',
      description: 'A scalable web app built with ReactJS and Spring Boot, handling 1,000+ user records with optimized REST APIs and real-time updates.',
      tech: ['ReactJS', 'Spring Boot', 'MySQL'],
      category: 'Full Stack',
      image: '👥',
      features: ['Real-time Updates', 'Scalable Architecture', 'Optimized APIs'],
      link: '#!' // TODO: Replace with actual project link
    }
  ];

  const filters = ['All', 'Frontend', 'Full Stack', 'Backend'];
  const filteredProjects = filter === 'All' ? projects : projects.filter(project => project.category === filter);

  return (
    <section ref={projectsRef} id="projects" className={`projects ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">Featured Projects</h2>
          <div className="section-divider"></div>
        </div>
        
        <div className={`filter-tabs ${isVisible ? 'animate' : ''}`}>
          {filters.map((filterOption) => (
            <button
              key={filterOption}
              onClick={() => setFilter(filterOption)}
              className={`filter-tab ${filter === filterOption ? 'active' : ''}`}
            >
              {filterOption}
            </button>
          ))}
        </div>

        <div className="projects-grid">
          {filteredProjects.map((project, index) => (
            <div 
              key={index}
              className={`project-card ${isVisible ? 'animate-slideUp' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="project-image">
                <span className="project-emoji">{project.image}</span>
                <div className="project-overlay">
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="project-btn">
                    <ExternalLink size={16} />
                    View Project
                  </a>
                </div>
              </div>
              <div className="project-content">
                <h3 className="project-title">{project.title}</h3>
                <p className="project-description">{project.description}</p>
                <div className="project-features">
                  {project.features.map((feature, idx) => (
                    <span key={idx} className="feature-tag">{feature}</span>
                  ))}
                </div>
                <div className="project-tech">
                  {project.tech.map((tech, idx) => (
                    <span key={idx} className="tech-tag">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

// Contact Form Section
const ContactForm: React.FC<ContactFormProps> = ({ darkMode }) => {
  const [formRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [errors, setErrors] = useState({ name: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = { name: '', email: '', message: '' };
    let isValid = true;

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
      isValid = false;
    }
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validate()) {
      setSubmitted(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitted(false), 3000);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  return (
    <section ref={formRef} id="contact-form" className={`contact-form ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">Send a Message</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Drop me a message, and I'll get back to you soon!
          </p>
        </div>
        <div className={`form-container ${isVisible ? 'animate' : ''}`}>
          {submitted && (
            <div className="success-message">
              Message sent successfully! I'll respond soon.
            </div>
          )}
          <form onSubmit={handleSubmit} className="contact-form-grid">
            <div className="form-group">
              <label htmlFor="name">Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className={errors.name ? 'error' : ''}
                placeholder="Your Name"
              />
              {errors.name && <span className="error-message">{errors.name}</span>}
            </div>
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className={errors.email ? 'error' : ''}
                placeholder="Your Email"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            <div className="form-group full-width">
              <label htmlFor="message">Message</label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                className={errors.message ? 'error' : ''}
                placeholder="Your Message"
              ></textarea>
              {errors.message && <span className="error-message">{errors.message}</span>}
            </div>
            <button type="submit" className="btn-primary">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

// Contact Section
const Contact: React.FC<ContactProps> = ({ darkMode }) => {
  const [contactRef, isVisible] = useIntersectionObserver({ threshold: 0.3 });
  const [copiedText, setCopied] = useState('');

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopied(type);
    setTimeout(() => setCopied(''), 2000);
  };

  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'saraswatithorat2151@gmail.com',
      displayValue: 'saraswatithorat2151@gmail.com',
      action: () => copyToClipboard('saraswatithorat2151@gmail.com', 'email')
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+918421810422',
      displayValue: '+91 842-181-0422',
      action: () => copyToClipboard('+918421810422', 'phone')
    },
    {
      icon: Github,
      label: 'GitHub',
      value: 'https://github.com/Saraswati0612', // TODO: Update with your GitHub profile
      displayValue: 'View Profile',
      action: () => window.open('https://github.com/Saraswati0612', '_blank')
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'https://www.linkedin.com/in/saraswati-thorat-0b0b922b5/', // TODO: Update with your LinkedIn profile
      displayValue: 'View Profile',
      action: () => window.open('https://www.linkedin.com/in/saraswati-thorat-0b0b922b5/', '_blank')
    }
  ];

  return (
    <section ref={contactRef} id="contact" className={`contact ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <div className={`section-header ${isVisible ? 'animate' : ''}`}>
          <h2 className="section-title">Get In Touch</h2>
          <div className="section-divider"></div>
          <p className="section-subtitle">
            Let's collaborate on innovative projects! I'm always excited to work on challenging problems.
          </p>
        </div>
        
        <div className="contact-grid">
          {contactInfo.map((contact, index) => {
            const IconComponent = contact.icon;
            return (
              <div 
                key={index}
                className={`contact-card ${isVisible ? 'animate' : ''}`}
                style={{ animationDelay: `${index * 0.1}s` }}
                onClick={contact.action}
              >
                <div className="contact-icon">
                  <IconComponent size={24} />
                </div>
                <div className="contact-content">
                  <h3 className="contact-label">{contact.label}</h3>
                  <p className="contact-value">{contact.displayValue}</p>
                  {(contact.label === 'Email' || contact.label === 'Phone') && (
                    <span className="copy-indicator">
                      {copiedText === contact.label.toLowerCase() ? 'Copied!' : 'Click to copy'}
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

// ThemeToggle Component
const ThemeToggle: React.FC<ThemeToggleProps> = ({ darkMode, toggleTheme }) => {
  return (
    <button 
      className={`theme-toggle ${darkMode ? 'dark' : ''}`}
      onClick={toggleTheme}
      aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {darkMode ? <Sun size={20} /> : <Moon size={20} />}
    </button>
  );
};

// BackToTop Component
const BackToTop: React.FC<BackToTopProps> = ({ show, darkMode }) => {
  return (
    <button 
      className={`back-to-top ${show ? 'show' : ''} ${darkMode ? 'dark' : ''}`}
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
    >
      <ArrowUp size={20} />
    </button>
  );
};

// Main App Component
const App: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [showBackToTop, setShowBackToTop] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setDarkMode(savedTheme === 'dark');
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
      
      const sections = ['home', 'about', 'skills', 'achievements', 'projects', 'contact-form', 'contact'];
      const currentSection = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      
      if (currentSection) {
        setActiveSection(currentSection);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <Header 
        darkMode={darkMode} 
        setActiveSection={setActiveSection} 
        activeSection={activeSection}
      />
      <main>
        <Hero darkMode={darkMode} />
        <About darkMode={darkMode} />
        <Skills darkMode={darkMode} />
        <Achievements darkMode={darkMode} />
        <Projects darkMode={darkMode} />
        <ContactForm darkMode={darkMode} />
        <Contact darkMode={darkMode} />
      </main>
      <ThemeToggle darkMode={darkMode} toggleTheme={toggleTheme} />
      <BackToTop show={showBackToTop} darkMode={darkMode} />
    </div>
  );
};

export default App;
