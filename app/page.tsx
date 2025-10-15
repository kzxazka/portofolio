import Link from "next/link";
import { ArrowRight, Code, LayoutDashboard, Palette, Printer, Mail, Phone } from "lucide-react";
import { Button } from "./components/ui/Button";
import { Navigation } from "./components/nav";
import { Footer } from "./components/footer";
import { PageTransition } from "./components/PageTransition";

export default function Home() {
  const services = [
    {
      icon: <Code className="w-8 h-8 mb-4 text-accent" />,
      title: "Web Development",
      description: "Custom websites and web applications built with modern technologies like Next.js, React, and Tailwind CSS.",
    },
    {
      icon: <Palette className="w-8 h-8 mb-4 text-accent" />,
      title: "UI/UX Design",
      description: "Beautiful and intuitive user interfaces designed with Figma and Adobe XD for optimal user experience.",
    },
    {
      icon: <LayoutDashboard className="w-8 h-8 mb-4 text-accent" />,
      title: "Full Stack Development",
      description: "End-to-end web development with modern frameworks and databases like MySql and PHP.",
    },
  ];

  const skills = [
    { name: 'Frontend', items: ['HTML/CSS', 'JavaScript', 'TypeScript', 'React', 'Next.js', 'Tailwind CSS', 'Laravel','Python','C++'] },
    { name: 'Backend', items: ['Node.js','MySql', 'MongoDB','Laravel'] },
    { name: 'Tools', items: ['Git', 'GitHub', 'Figma', 'VS Code','Linux','Adobe Photoshop'] },
  ];

  const projects = [
    {
      title: 'Digital Printing Online Order',
      description: 'A full-featured e-commerce platform with payment integration and admin dashboard.',
      tech: ['PHP', 'Bootstrap', 'MySql', 'HTML','JavaScript','CSS'],
      github: 'https://github.com/kzxazka/BannerPrinting_kel5.git'
    },
    {
      title: 'Staple Food Price Information System',
      description: 'This system allows officers to conduct spot checks in the market, identify potential pricing problems, and impose approppriate administrative sanctions to maintain price stability for raw materials',
      tech: ['PHP', 'Bootstrap', 'MySql', 'HTML','JavaScript','CSS'],
      github: 'https://github.com/kzxazka/Siaga_bapok'
    },
    {
      title: 'Portfolio Website',
      description: 'A modern portfolio website built with Next.js and Tailwind CSS.',
      tech: ['Next.js', 'Tailwind CSS', 'Framer Motion'],
      github: 'https://github.com/kzxazka/portfolio'
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <PageTransition>
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden md:pt-40">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
              Creative Design & <span className="text-gradient">Technology Solutions</span>
            </h1>
            <p className="max-w-2xl mx-auto mb-10 text-xl text-text-secondary">
              We help businesses grow with modern web development, UI/UX design, and branding.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button 
                href="#services" 
                size="lg" 
                className="flex items-center"
              >
                Explore Our Services
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
              <Button 
                href="#contact" 
                size="lg" 
                variant="outline"
                className="flex items-center"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Services</h2>
            <p className="text-text-secondary">
              I offer professional web development and design services to bring your ideas to life.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {services.map((service, index) => (
              <div key={index} className="p-8 transition-all duration-300 bg-white rounded-lg shadow-lg card hover:shadow-xl">
                <div className="flex flex-col items-center text-center">
                  {service.icon}
                  <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
                  <p className="text-text-secondary">{service.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Skills</h2>
            <p className="text-text-secondary">
              Technologies and tools I work with to create amazing web experiences.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            {skills.map((skill, index) => (
              <div key={index} className="p-6 bg-white rounded-lg shadow-md">
                <h3 className="mb-4 text-xl font-semibold text-center">{skill.name}</h3>
                <div className="flex flex-wrap justify-center gap-2">
                  {skill.items.map((item, i) => (
                    <span key={i} className="px-3 py-1 text-sm rounded-full bg-accent/10 text-accent">
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto mb-16 text-center">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">My Projects</h2>
            <p className="text-text-secondary">
              Here are some of the projects I've worked on. Check out my GitHub for more!
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((project, index) => (
              <div key={index} className="overflow-hidden transition-all duration-300 bg-white rounded-lg shadow-lg hover:shadow-xl">
                <div className="p-6">
                  <h3 className="mb-2 text-xl font-semibold">{project.title}</h3>
                  <p className="mb-4 text-text-secondary">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech, i) => (
                      <span key={i} className="px-2 py-1 text-xs rounded bg-gray-100">
                        {tech}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={project.github} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-sm font-medium text-accent hover:underline"
                  >
                    View on GitHub
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20">
        <div className="container px-4 mx-auto">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="mb-4 text-3xl font-bold md:text-4xl">About Frankazastain Studio</h2>
            <p className="text-text-secondary">
              We are a creative studio dedicated to delivering exceptional design and technology solutions that help businesses thrive in the digital age.
            </p>
          </div>
          <div className="grid gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-2xl font-semibold">Our Mission</h3>
              <p className="mb-6 text-text-secondary">
                To empower businesses with innovative design and technology solutions that drive growth, enhance user experiences, and create lasting impressions.
              </p>
              <h3 className="mb-4 text-2xl font-semibold">Our Approach</h3>
              <p className="text-text-secondary">
                We combine creativity with technical expertise to deliver tailored solutions that meet your unique business needs and exceed your expectations.
              </p>
            </div>
            <div className="bg-gray-100 rounded-lg p-8">
              <h3 className="mb-4 text-2xl font-semibold">Why Choose Us</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 mt-1 mr-3 text-accent">✓</span>
                  <span>Experienced team of designers and developers</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 mt-1 mr-3 text-accent">✓</span>
                  <span>Custom solutions tailored to your needs</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 mt-1 mr-3 text-accent">✓</span>
                  <span>Focus on quality and user experience</span>
                </li>
                <li className="flex items-start">
                  <span className="flex-shrink-0 w-6 h-6 mt-1 mr-3 text-accent">✓</span>
                  <span>Timely delivery and ongoing support</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-20 bg-primary text-white">
        <div className="container px-4 mx-auto text-center">
          <h2 className="mb-6 text-3xl font-bold md:text-4xl">Ready to start your project?</h2>
          <p className="max-w-2xl mx-auto mb-8 text-lg text-gray-200">
            Let's work together to bring your ideas to life. Contact us today for a free consultation.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              href="mailto:info@frankazastain.com" 
              size="lg" 
              variant="outline"
              textColor="#ffffff"
              borderColor="#ffffff"
              hoverBgColor="rgba(255, 255, 255, 0.1)"
              className="flex items-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Email Us
            </Button>
            <Button 
              href="tel:+6285718406768" 
              size="lg" 
              variant="outline"
              textColor="#ffffff"
              borderColor="#ffffff"
              hoverBgColor="rgba(255, 255, 255, 0.1)"
              className="flex items-center"
            >
              <Phone className="w-5 h-5 mr-2" />
              Call Us
            </Button>
          </div>
        </div>
      </section>

      </PageTransition>
      {/* Footer */}
      <Footer />
    </div>
  );
}
