import Image from "next/image";
import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "@radix-ui/react-avatar";
import { useRouter } from "next/navigation";

interface Author {
  email: string;
  profileImg: string;
  username: string;
  _id: string;
}

interface BlogProps {
  image: string;
  content: string;
  title: string;
  newid: string;
  createdBy: Author;
  user?: string;
  createdAt?: string;
  tag?: string[];
}

const Blogs = ({
  title,
  image,
  content,
  newid,
  createdBy,
  user,
  createdAt,
  tag,
}: BlogProps) => {
  const router = useRouter();

  const handleFullBlog = (newid: string) => {
    router.push(`/blog/${newid}`);
  };

  // Function to strip HTML tags from content
  const stripHtml = (html: string) => {
    const tmp = document.createElement("DIV");
    tmp.innerHTML = html;
    return tmp.textContent || tmp.innerText || "";
  };

  // Format date
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Get user initials for avatar fallback
  const getUserInitials = (username: string) => {
    return username
      .split(' ')
      .map(name => name.charAt(0))
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  const displayName = user || createdBy.username;
  const cleanContent = stripHtml(content);

  return (
    <article
      onClick={() => handleFullBlog(newid)}
      className="flex cursor-pointer justify-between p-6 rounded-lg w-full max-w-4xl shadow-md hover:shadow-lg transition-shadow duration-300 bg-white border border-gray-100"
    >
      <div className="flex-1 pr-6">
        {/* Author and date info */}
        <div className="flex items-center gap-3 mb-4">
          <Avatar className="w-8 h-8">
            <AvatarImage
              className="rounded-full w-8 h-8 object-cover"
              src={createdBy.profileImg || "https://github.com/shadcn.png"}
              alt={`${displayName}'s profile`}
            />
            <AvatarFallback className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center text-sm font-medium">
              {getUserInitials(displayName)}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-gray-900">{displayName}</p>
            {createdAt && (
              <p className="text-sm text-gray-500">{formatDate(createdAt)}</p>
            )}
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold font-sans mb-3 line-clamp-2 text-gray-900 hover:text-blue-600 transition-colors">
          {title}
        </h1>

        {/* Content preview */}
        <p className="text-gray-600 line-clamp-3 mb-4 leading-relaxed">
          {cleanContent}
        </p>

        {/* Tags */}
        {tag && tag.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-4">
            {tag.slice(0, 3).map((tagItem, index) => (
              <span
                key={index}
                className="px-3 py-1 bg-blue-100 text-blue-800 text-sm rounded-full"
              >
                {tagItem.trim()}
              </span>
            ))}
            {tag.length > 3 && (
              <span className="px-3 py-1 bg-gray-100 text-gray-600 text-sm rounded-full">
                +{tag.length - 3} more
              </span>
            )}
          </div>
        )}

        {/* Read more link */}
        <div className="text-blue-600 hover:text-blue-800 font-medium transition-colors">
          Read More →
        </div>
      </div>

      {/* Image */}
      <div className="flex-shrink-0">
        <div className="relative w-48 h-32 rounded-lg overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </div>
    </article>
  );
};

export default Blogs;