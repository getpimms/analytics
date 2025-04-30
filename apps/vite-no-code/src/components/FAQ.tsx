import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import Container from './ui/Container';
import { faqs } from '../constants/siteData';

interface FAQItemProps {
  question: string;
  answer: string;
  isOpen: boolean;
  onClick: () => void;
}

const FAQItem: React.FC<FAQItemProps> = ({
  question,
  answer,
  isOpen,
  onClick,
}) => {
  return (
    <div className="border-b border-gray-200 py-5">
      <button
        className="flex w-full justify-between items-center text-left focus:outline-none"
        onClick={onClick}
      >
        <h3 className="text-lg font-medium text-gray-900">{question}</h3>
        <span className="ml-6 flex-shrink-0 text-gray-500">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 pr-12">
          <p className="text-base text-gray-600">{answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-xl text-gray-600">
            Have questions? We've got answers. If you can't find what you're
            looking for, feel free to contact us.
          </p>
        </div>

        <div className="max-w-3xl mx-auto divide-y divide-gray-200 rounded-xl bg-gray-50 p-8">
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              question={faq.question}
              answer={faq.answer}
              isOpen={index === openIndex}
              onClick={() => setOpenIndex(index === openIndex ? -1 : index)}
            />
          ))}
        </div>
      </Container>
    </section>
  );
};

export default FAQ;
