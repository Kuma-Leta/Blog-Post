/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

import testimony1 from "../../assets/images/testimonials/john_doe.png";
import testimony2 from "../../assets/images/testimonials/jane_smith.png";
import testimony3 from "../../assets/images/testimonials/mickael_brown.png";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  imageUrl: string; // Make sure this is a string
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "John Doe",
    title: "CEO, Tech Solutions Inc.",
    quote:
      "Debbal Technologies has been instrumental in helping us stay ahead with their insightful articles and expert analysis.",
    imageUrl: testimony1, // Set the imported image directly
  },
  {
    id: 2,
    name: "Jane Smith",
    title: "Data Scientist",
    quote:
      "The articles on Debbal Technologies have been invaluable in my career growth. They cover the latest trends in an accessible manner.",
    imageUrl: testimony2, // Set the imported image directly
  },
  {
    id: 3,
    name: "Michael Brown",
    title: "Cybersecurity Analyst",
    quote:
      "I rely on Debbal Technologies for up-to-date information on cybersecurity threats and best practices. Highly recommended!",
    imageUrl: testimony3, // Set the imported image directly
  },
];

interface Props {
  id: string;
}

const TestimonialsSection: React.FC<Props> = ({ id }) => {
  return (
    <section id={id} className="py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">Testimonials</h2>
        <Carousel
          autoPlay={true}
          interval={3000} // Rotate every 3 seconds
          transitionTime={1000} // Transition time in milliseconds (adjust as needed)
          infiniteLoop={true}
          showArrows={true}
          showStatus={false}
          showThumbs={false}
          stopOnHover={true}
          className="shadow-lg"
        >
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="p-0">
              <img
                src={testimonial.imageUrl} // This is now correctly a string
                alt={testimonial.name}
                className="rounded-full w-24 h-24 mx-auto mb-4 object-cover"
                style={{
                  borderRadius: "100%",
                  width: "150px",
                  height: "150px",
                }}
              />
              <h3 className="text-xl font-bold mb-2">{testimonial.name}</h3>
              <p className="text-gray-700 italic">{testimonial.title}</p>
              <p className="text-lg py-8">{testimonial.quote}</p>
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
};

export default TestimonialsSection;
