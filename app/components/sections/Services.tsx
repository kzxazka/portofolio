import { Code, Palette, LayoutDashboard, Smartphone } from 'lucide-react';

const services = [
  {
    icon: <Code className="w-8 h-8 mb-4 text-accent" />,
    title: 'Web Development',
    description: 'Custom websites and web applications built with modern technologies like Next.js, React, and Tailwind CSS.',
  },
  {
    icon: <Palette className="w-8 h-8 mb-4 text-accent" />,
    title: 'UI/UX Design',
    description: 'Beautiful and intuitive user interfaces designed with Figma and Adobe XD for optimal user experience.',
  },
  {
    icon: <LayoutDashboard className="w-8 h-8 mb-4 text-accent" />,
    title: 'Full Stack Development',
    description: 'End-to-end web development with modern frameworks and databases like MongoDB and PostgreSQL.',
  },
  {
    icon: <Smartphone className="w-8 h-8 mb-4 text-accent" />,
    title: 'Mobile Development',
    description: 'Cross-platform mobile applications using React Native for both iOS and Android platforms.',
  },
];

export const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-50 dark:bg-gray-800">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto mb-16 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Our Services</h2>
          <p className="text-text-secondary dark:text-gray-300">
            We offer a comprehensive range of services to help your business succeed in the digital world.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service, index) => (
            <div 
              key={index}
              className="p-8 transition-all duration-300 bg-white rounded-lg shadow-lg dark:bg-gray-700 hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex flex-col items-center text-center">
                {service.icon}
                <h3 className="mb-3 text-xl font-semibold">{service.title}</h3>
                <p className="text-text-secondary dark:text-gray-300">{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
