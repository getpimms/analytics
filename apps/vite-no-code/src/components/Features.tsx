import React from 'react';
import * as LucideIcons from 'lucide-react';
import Container from './ui/Container';
import { features } from '../constants/siteData';

const Features: React.FC = () => {
  return (
    <section id="features" className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything you need to{' '}
            <span className="text-teal-600">supercharge your links</span>
          </h2>
          <p className="text-xl text-gray-600">
            Powerful features designed to help you understand your audience and
            optimize your marketing.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const IconComponent = (LucideIcons as any)[
              feature.icon.charAt(0).toUpperCase() + feature.icon.slice(1)
            ];

            return (
              <div
                key={index}
                className="bg-white border border-gray-200 rounded-xl p-6 transition-all duration-300 hover:shadow-lg hover:border-teal-200"
                data-aos="fade-up"
                data-aos-delay={100 + index * 50}
              >
                <div className="h-12 w-12 bg-teal-100 text-teal-600 rounded-lg flex items-center justify-center mb-4">
                  {IconComponent && <IconComponent className="h-6 w-6" />}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export default Features;
