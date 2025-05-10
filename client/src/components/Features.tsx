
import React from 'react';

const features = [
  {
    id: 1,
    title: 'Rich Text Editor',
    description: 'Create beautiful articles with our intuitive, feature-rich editor designed for writers.',
    icon: '✍️',
  },
  {
    id: 2,
    title: 'Global Community',
    description: 'Connect with readers and writers from around the world who share your interests.',
    icon: '🌎',
  },
  {
    id: 3,
    title: 'Personalized Feed',
    description: 'Discover content tailored to your preferences and reading history.',
    icon: '📚',
  },
  {
    id: 4,
    title: 'Social Engagement',
    description: 'Interact through comments, likes, and follow your favorite authors.',
    icon: '💬',
  },
];

const Features: React.FC = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container-blogsy">
        <div className="text-center mb-12">
          <h2 className="text-blogsy-charcoal mb-4">Why Choose Blogsy</h2>
          <p className="text-blogsy-charcoal-light max-w-2xl mx-auto">
            Everything you need to create, publish, and engage with content that matters to you and your audience.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature) => (
            <div key={feature.id} className="card-blogsy text-center p-6">
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-blogsy-charcoal">{feature.title}</h3>
              <p className="text-blogsy-charcoal-light">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
