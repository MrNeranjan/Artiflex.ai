"use client";

import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";

const Testimonials = [
  {
    name: "Neranjan",
    avatar: "A",
    title: "Software Engineer",
    description:
      "I have been using ArtiflexAI for a while now and it has helped me in generating code snippets for my projects. It is a great tool.",
  },
  {
    name: "Oshadi",
    avatar: "A",
    title: "Bank Manager",
    description:
      "ArtiflexAI has helped me in generating reports for my clients. It has saved me a lot of time and effort. I would recommend it to anyone who is looking for a tool to generate reports quickly.",
  },
  {
    name: "Supun",
    avatar: "A",
    title: "Accountant",
    description:
      "ArtiflexAI has helped me in generating reports for my clients. It has saved me a lot of time and effort. I would recommend it to anyone who is looking for a tool to generate reports quickly.",
  },
  {
    name: "Lahiru",
    avatar: "A",
    title: "Electrical Engineer",
    description:
      "I have been using ArtiflexAI for a while now and it has helped me in generating code snippets for my projects. It is a great tool.",
  }

];

const LandingContent = () => {
  return (
    <div className="px-10 pb-20 pt-10">
      <h2 className="text-center text-4xl text-white font-extrabold mb-10">
        Testimonials
      </h2>
      <div className="grid gird-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {Testimonials.map((testimonial) => (
          <Card
            key={testimonial.description}
            className="bg-[#192339] border-none text-white"
          >
            <CardHeader>
              <CardTitle className="flex items-center gap-x-2">
                <div>
                  <p className="text-lg">{testimonial.name}</p>
                  <p className="text-sm text-zinc-400">{testimonial.title}</p>
                </div>
              </CardTitle>
              <CardContent className="ml-0 pl-0">
                <p className="pt-4 px-0">{testimonial.description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default LandingContent;
