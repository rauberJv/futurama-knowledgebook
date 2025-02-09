import Image from "next/image";
import { useRouter } from "next/navigation";

const LinkIcon = () => (
  <div className="flex flex-row items-center justify-center">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-gray-500"
    >
      <line x1="7" y1="17" x2="17" y2="7" />
      <polyline points="7 7 17 7 17 17" />
    </svg>
  </div>
);

interface CardProps {
  title: string;
  description?: string;
  image?: string;
  link?: string;
  htmlTitle?: string;
}

const Card: React.FC<CardProps> = ({ title, description, image, link, htmlTitle }) => {
  const router = useRouter();

  const handleClick = () => {
    if (link) {
      router.push(link);
    }
  };

  return (
    <div
      className={`flex flex-col items-start ${
        image ? "justify-start" : "justify-center"
      } gap-y-4 text-white bg-blue-800/50 rounded-lg p-4 hover:bg-blue-800/70 transition-all duration-300 hover:cursor-pointer`}
      onClick={link ? () => handleClick() : undefined}
      title={htmlTitle || title}
    >
      {image && (
        <div className="relative w-full h-48">
          <Image
            src={image}
            alt={title}
            className="rounded-lg"
            fill
            style={{ objectFit: "contain" }}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-row items-center justify-between w-full">
        <h1 className="text-2xl font-bold">{title}</h1>
        {link && <LinkIcon />}
      </div>
      {description && <p className="text-sm text-gray-500">{description}</p>}
    </div>
  );
};

export default Card;