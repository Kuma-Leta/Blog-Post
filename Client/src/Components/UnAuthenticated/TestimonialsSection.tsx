import React from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

interface Testimonial {
  id: number;
  name: string;
  title: string;
  quote: string;
  imageUrl: string;
}

interface Props {
  id: string;
  testimonials: Testimonial[];
}

const TestimonialsSection: React.FC<Props> = ({ id, testimonials }) => {
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
                src={testimonial.imageUrl}
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
