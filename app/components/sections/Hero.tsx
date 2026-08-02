import { ArrowRight } from 'lucide-react';
import { Button } from '../ui/Button';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 overflow-hidden md:pt-40">
      <div className="container px-4 mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="mb-6 text-4xl font-bold leading-tight md:text-6xl">
            Creative Design & <span className="text-gradient">Technology Solutions</span>
          </h1>
          <p className="max-w-2xl mx-auto mb-10 text-xl text-text-secondary dark:text-gray-300">
            We help businesses grow with modern web development, UI/UX design, and branding.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button 
              href="#contact" 
              size="lg" 
              className="flex items-center group"
            >
              Get Started
              <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              href="#portfolio" 
              size="lg" 
              variant="outline"
              className="flex items-center"
            >
              View Our Work
            </Button>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 right-0 w-1/3 h-full -z-10">
        <div className="absolute inset-0 bg-gradient-to-l from-accent/10 to-transparent" />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white dark:from-gray-900 to-transparent -z-10" />
    </section>
  );
};
