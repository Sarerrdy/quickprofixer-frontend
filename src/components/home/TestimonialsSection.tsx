import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

const testimonials = [
  { quote: 'Great service!', client: 'John Doe', rating: '⭐⭐⭐⭐⭐' },
  { quote: 'Very professional.', client: 'Jane Smith', rating: '⭐⭐⭐⭐' },
  { quote: 'Highly recommend.', client: 'Bob Johnson', rating: '⭐⭐⭐⭐⭐' },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="text-center">
              <CardContent>
                <Typography variant="body1" className="italic">"{testimonial.quote}"</Typography>
                <Typography variant="h6" className="font-bold mt-4">{testimonial.client}</Typography>
                <Typography variant="body2" className="mt-2">{testimonial.rating}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;