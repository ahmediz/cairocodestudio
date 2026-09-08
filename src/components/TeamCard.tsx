import { Linkedin } from 'lucide-react';
import Image from 'next/image';

interface TeamMember {
  name: string;
  title: string;
  image: string;
  socials: { name: string; link: string }[];
}

export function TeamCard({ member }: { member: TeamMember }) {

  return (
    <div className="flex flex-col items-center gap-3 text-center group">
      <div className="relative w-48 h-48 rounded-2xl overflow-hidden bg-gray-100 shadow-sm">
        <Image
          src={member.image}
          alt={member.name}
          fill
          className="object-cover grayscale group-hover:grayscale-0 transition-all duration-300"
        />
      </div>
      <div className="space-y-1 mt-1">
        <h3 className="text-xl font-bold font-antonio text-gray-900">
          {member.name}
        </h3>
        <p className="text-sm text-gray-500 font-medium">{member.title}</p>
        <div className="flex items-center justify-center gap-2 pt-1">
          {member.socials.map((social) => (
            <a
              key={social.name}
              href={social.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-primary transition-colors p-1"
              aria-label={`${member.name} LinkedIn`}
            >
              <Linkedin className="h-4 w-4" />
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
