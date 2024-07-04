import React from "react";

interface Article {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  link: string;
}

interface Props {
  id: string;
  articles: Article[];
}

const FeaturedArticlesSection: React.FC<Props> = ({ id, articles }) => {
  return (
    <section id={id} className="py-16 bg-gray-100 text-black">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          Featured Articles
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {articles.map((article) => (
            <div
              key={article.id}
              className="bg-white p-6 rounded-lg shadow-lg transition duration-300 ease-in-out transform hover:shadow-xl hover:-translate-y-1"
            >
              <img
                src={article.imageUrl}
                alt={article.title}
                className="w-full h-40 object-cover rounded-t-lg mb-4"
              />
              <h3 className="text-xl font-bold mb-2">{article.title}</h3>
              <p className="text-gray-700">{article.description}</p>
              <a
                href={article.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 hover:underline mt-4 block hover:text-blue-600"
              >
                Read more
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedArticlesSection;
