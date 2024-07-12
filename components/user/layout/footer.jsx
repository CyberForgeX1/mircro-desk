import Link from "next/link";
import { BsTwitterX } from "react-icons/bs";
import { FaFacebook, FaGlobe, FaLinkedin } from "react-icons/fa";
import NewsLetterFooter from "../NewsLetterFooter";

// const socialMedia = [
//   {
//     name: "Email",
//     href: "https://www.facebook.com/BawdicSoftPvtLtd",
//     icon: <FaEnvelope />,
//   },
//   {
//     name: "Facebook",
//     href: "https://www.facebook.com/BawdicSoftPvtLtd",
//     icon: <FaFacebook />,
//   },
//   {
//     name: "Linkedin",
//     href: "https://www.linkedin.com/company/77098544/admin/feed/posts/",
//     icon: <FaLinkedin />,
//   },
//   {
//     name: "Twitter",
//     href: "https://twitter.com/BawdicSoft",
//     icon: <BsTwitterX />,
//   },
//   {
//     name: "Website",
//     href: "https://bawdicsoft.com/",
//     icon: <FaGlobe />,
//   },
// ];

const Footer = () => {
  return (
    <footer className=" bg-[#222222]  ">
      <div className=" md:grid md:grid-cols-2 md:gap-10 mx-auto max-w-6xl">
        <div className="bg-[#222222]">
          <div className="flex pt-12 gap-6 px-2 ml-1 text-white text-3xl">
            {/* {socialMedia.map((data, index) => {
              const { href, icon } = data;
              return (
                <Link key={index} href={href}>
                  {icon}
                </Link>
              );
            })} */}
            <Link href={"/"}>Bawdicsoft</Link>
          </div>
          <div className="text-lg text-gray-300   px-3">
            <p className="py-6">
              Established in 2018, BawdicSoft brings you Mircrodesk - Unleashing
              the Power of Artificial Intelligence, Blockchain,Cryptography,
              E-commerce, and Web development. Dive into our content,
              meticulously transcribed for your understanding and enjoyment.
            </p>
            <ul className="flex gap-5 flex-wrap">
              <li className=" cursor-pointer hover:underline">About</li>
              <li className=" cursor-pointer hover:underline">Advertise</li>
              <li className=" cursor-pointer hover:underline">
                Privacy & Policy
              </li>
              <li className=" cursor-pointer hover:underline">Terms of Use</li>
              <li className=" cursor-pointer hover:underline">Contact</li>
            </ul>
            <p className=" py-8 text-sm md:text-lg">
              © BawdicSoft Pvt Ltd, All Right Reserved.
            </p>
          </div>
        </div>
        {/* //// */}
        <NewsLetterFooter />
        {/* //// */}
      </div>
    </footer>
  );
};

export default Footer;
