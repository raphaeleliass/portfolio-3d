import Link from "next/link"
import React from "react"
import { SiGithub, SiInstagram } from "@icons-pack/react-simple-icons"
import { Linkedin } from "lucide-react"

const socialMedia = [
  {
    icon: <Linkedin />,
    href: "https://linkedin.com/in/raphaeleliass",
  },
  {
    icon: <SiGithub />,
    href: "https://github.com/raphaeleliass",
  },
  {
    icon: <SiInstagram />,
    href: "https://instagram.com/raphaeleliass",
  },
]

export default function Footer() {
  return (
    <footer className="flex w-full flex-col items-center justify-center gap-6 py-12">
      <h3>Acompanhe minhas redes</h3>
      <div className="flex flex-row gap-5">
        {socialMedia.map((social, index) => (
          <Link
            href={social.href}
            target="_blank"
            rel="noreferrer noopener"
            key={index}
          >
            {social.icon}
          </Link>
        ))}
      </div>
    </footer>
  )
}
