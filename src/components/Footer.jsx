import React from "react";
import { FaGithub, FaLinkedinIn } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <footer className="bg-green-800 text-white w-full py-[0.85rem]">
        <div>
          <div className="w-[90%] md:max-w-6xl mx-auto flex flex-col md:flex-row gap-4 md:gap-0 items-center justify-between">
            <div>
              <p className="text-[0.65rem] md:text-sm text-center md:text-left font-medium">
                Copyright &copy;2024 All Rights Reserved | This Template is Made
                with ❤ by Muhammad Areeb.
              </p>
            </div>
            <div className="flex gap-5">
              <a
                href="https://www.linkedin.com/in/muhammad-areeb-09aa1126a/"
                target="_blank"
              >
                <FaLinkedinIn className="transition-all hover:scale-125" />
              </a>
              <a href="https://github.com/MuhammadAreeb30" target="_blank">
                <FaGithub className="transition-all hover:scale-125" />
              </a>
              <a
                href="https://www.instagram.com/m_______areeb/"
                target="_blank"
              >
                <FaInstagram className="transition-all hover:scale-125" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
