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
    <article className="group font-mono relative overflow-hidden w-full   ">
      {/* Main card container with enhanced hover effects */}
      <div
        onClick={() => handleFullBlog(newid)}
        className="flex cursor-pointer justify-between  p-8 rounded-2xl box-content w-[70rem] h-[250px]
                   bg-white border border-gray-100 
                   hover:border-gray-200 hover:shadow-xl hover:-translate-y-1
                   transition-all duration-300 ease-out
                   backdrop-blur-sm relative z-10"
      >
        {/* Content Section */}
        <div className="flex-1 pr-8 space-y-4">
          {/* Author and metadata */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="w-12 h-12 ring-2 ring-gray-100 group-hover:ring-blue-200 transition-all duration-300">
                  <AvatarImage
                    className="rounded-full w-12 h-12 object-cover"
                    src={createdBy.profileImg || "https://github.com/shadcn.png"}
                    alt={`${displayName}'s profile`}
                  />
                  <AvatarFallback className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full flex items-center justify-center text-sm font-semibold text-gray-700">
                    {getUserInitials(displayName)}
                  </AvatarFallback>
                </Avatar>
                {/* Online indicator */}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-white"></div>
              </div>

              <div className="space-y-1">
                <p className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                  {displayName}
                </p>
                {createdAt && (
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                    <time dateTime={createdAt}>{formatDate(createdAt)}</time>
                  </div>
                )}
              </div>
            </div>

            {/* Reading time estimate */}
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500 bg-gray-50 px-3 py-1 rounded-full">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span>{Math.max(1, Math.ceil(cleanContent.length / 200))} min read</span>
            </div>
          </div>

          {/* Title with enhanced typography */}
          <div className="space-y-2">
            <h1 className="text-2xl lg:text-3xl font-bold font-mono line-clamp-2 text-gray-900 
                           group-hover:text-transparent group-hover:bg-clip-text 
                           group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600
                           transition-all duration-300 leading-tight">
              {title}
            </h1>

            {/* Animated underline */}
            <div className="w-0 group-hover:w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full transition-all duration-500 ease-out"></div>
          </div>

          {/* Content preview with better spacing */}
          <p className="text-gray-600 line-clamp-3 leading-relaxed text-lg font-light">
            {cleanContent}
          </p>

          {/* Enhanced tags section */}
          {tag && tag.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tag.slice(0, 3).map((tagItem, index) => (
                <span
                  key={index}
                  className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-blue-50 to-indigo-50 
                           text-blue-700 text-sm font-medium rounded-full border border-blue-100
                           hover:from-blue-100 hover:to-indigo-100 hover:border-blue-200
                           transition-all duration-200 cursor-pointer"
                >
                  <span className="w-2 h-2 bg-blue-400 rounded-full mr-2"></span>
                  {tagItem.trim()}
                </span>
              ))}
              {tag.length > 3 && (
                <span className="inline-flex items-center px-4 py-2 bg-gray-50 text-gray-600 text-sm font-medium rounded-full border border-gray-200">
                  <span className="w-2 h-2 bg-gray-400 rounded-full mr-2"></span>
                  +{tag.length - 3} more
                </span>
              )}
            </div>
          )}

          {/* Enhanced call-to-action */}
          <div className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold transition-all duration-200 group-hover:gap-3">
            <span>Continue Reading</span>
            <svg className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </div>
        </div>

        {/* Enhanced image section */}
        <div className="flex-shrink-0 relative">
          <div className="relative w-56 h-40 lg:w-64 lg:h-44 rounded-2xl overflow-hidden bg-gray-100 shadow-lg group-hover:shadow-xl transition-all duration-300">
            {/* Image overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />

            {/* Bookmark icon */}
            <div className="absolute top-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300">
              <button className="w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-white hover:scale-110 transition-all duration-200">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Floating tag indicator */}
          {tag && tag.length > 0 && (
            <div className="absolute -bottom-3 left-4 bg-white shadow-lg rounded-full px-3 py-1 border border-gray-200">
              <span className="text-xs font-medium text-gray-600">{tag[0]}</span>
            </div>
          )}
        </div>
      </div>

      {/* Subtle background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-transparent to-purple-50/30 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
    </article>
  );
};

export default Blogs;