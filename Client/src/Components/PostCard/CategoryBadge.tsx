import React from "react";

interface CategoryBadgeProps {
  category: string;
  categoryStyles: { [key: string]: string };
}

const CategoryBadge: React.FC<CategoryBadgeProps> = ({
  category,
  categoryStyles,
}) => {
  return (
    <span className={`px-2 py-1 rounded ${categoryStyles[category]}`}>
      {category}
    </span>
  );
};

export default CategoryBadge;
