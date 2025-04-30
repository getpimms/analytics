import React, { useEffect } from 'react';
import Container from './ui/Container';

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    Cal?: any;
    pimms_id?: string;
  }
}

const CalEmbed: React.FC = () => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      window?.Cal?.ns['30min']('inline', {
        elementOrSelector: '#my-cal-inline',
        config: { layout: 'month_view' },
        calLink: `alexandre-sarfati-pidjvv/30min?pimms_id=${window.pimms_id}`,
      });
    }
  }, []);

  return (
    <section className="py-20 bg-white">
      <Container>
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Schedule a Demo
          </h2>
          <p className="text-xl text-gray-600">
            Book a 30-minute call to see how Pimms can help your business grow
          </p>
        </div>

        <div className="max-w-4xl mx-auto rounded-xl shadow-lg overflow-hidden">
          <div
            style={{ width: '100%', height: '600px' }}
            id="my-cal-inline"
            className="bg-white"
          ></div>
        </div>
      </Container>
    </section>
  );
};

export default CalEmbed;
