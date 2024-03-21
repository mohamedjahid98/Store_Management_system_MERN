import PropTypes from "prop-types";
import { Typography, IconButton, Input,Button } from "@material-tailwind/react";

const year = new Date().getFullYear();

export function Footer({ title, description, socials, menus, copyright }) {
  return (
    <footer className="relative px-4 pt-8 pb-6">
      <div className="container mx-auto">
        <div className="flex flex-wrap pt-6 text-center lg:text-left">
          <div className="w-full px-4 lg:w-6/12">
            <Typography variant="h4" className="mb-4" color="blue-gray">
              {title}
            </Typography>
            <Typography className="font-normal text-blue-gray-500 ">
              {description}
            </Typography>
            <Typography className="font-normal text-blue-black-500 ">
              jahidmailbox98@gmail.com<br />
              +91 9876543210
            </Typography>
            <div className="mx-auto mt-6 mb-8 flex justify-center gap-2 md:mb-0 lg:justify-start">
              {socials.map(({ color, name, path }) => (
                <a
                  key={name}
                  href={path}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <IconButton color="white" className="rounded-full shadow-none bg-transparent">
                    <Typography color={color}>
                      <i className={`fa-brands fa-${name}`} />
                    </Typography>
                  </IconButton>
                </a>
              ))}
            </div>
          </div>
          <div className="mx-auto mt-12 grid w-max grid-cols-2 gap-24 lg:mt-0">
            {menus.map(({ name, items }) => (
              <div key={name}>
                <Typography
                  variant="small"
                  color="blue-gray"
                  className="mb-2 block font-medium uppercase"
                >
                  {name}
                </Typography>
                <ul className="mt-3">
                  {items.map((item) => (
                    <li key={item.name}>
                      <Typography
                        as="a"
                        href={item.path}
                        target="_blank"
                        rel="noreferrer"
                        variant="small"
                        className="mb-2 block font-normal text-blue-gray-500 hover:text-blue-gray-700"
                      >
                        {item.name}
                      </Typography>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
            <Typography
              variant="small"
              className="font-normal text-blue-black-500 "
            >
              <div className="">
                <p className="font-normal text-black-600">Subscribe to news letter</p>
                <Input variant="outlined" size="lg" label="Enter Text" />
              </div>
              <Button variant="gradient" size="sm" className="mt-2" >➢</Button>
            </Typography>
            
          </div>
        </div>
        <hr className="my-6 border-gray-300" />
        <div className="flex flex-wrap items-center justify-center md:justify-between">
          <div className="mx-auto w-full px-4 text-center">
            <Typography
              variant="small"
              className="font-normal text-blue-gray-500"
            >
              {copyright}
            </Typography>
          </div>
        </div>
      </div>
    </footer>
  );
}

Footer.defaultProps = {
  title: "Our Company",
  description:
    "Our mission is to empower fledgling business owners by providing them with professional, high-quality websites at an affordable cost. We strive to level the playing field and give small business owners the tools they need to succeed in today’s digital age and unleash their full potential.",
  socials: [
    {
      color: "gray",
      name: "twitter",
      path: "https://www.twitter.com/",
    },
    {
      color: "gray",
      name: "youtube",
      path: "https://www.youtube.com/",
    },
    {
      color: "gray",
      name: "instagram",
      path: "https://www.instagram.com/",
    },
    {
      color: "black",
      name: "github",
      path: "https://github.com/",
    },
  ],
  menus: [
    {
      name: "useful links",
      items: [
        { name: "Terms & Conditions", path: "" },
        { name: "Privacy Policy", path: "" },
        {
          name: "Disclaimer",
          path: "",
        },
        {
          name: "Refund Policy",
          path: "",
        },
      ],
    },

  ],
  copyright: (
    <>
      Copyright © {year} by{" "}
      <a
        href="https://mohamed-jahid.netlify.app/"
        target="_blank"
        className="text-blue-gray-500 transition-colors hover:text-blue-500"
      >
        Jahid
      </a>
      .
    </>
  ),
};

Footer.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  socials: PropTypes.arrayOf(PropTypes.object),
  menus: PropTypes.arrayOf(PropTypes.object),
  copyright: PropTypes.node,
};

Footer.displayName = "/src/widgets/layout/footer.jsx";

export default Footer;
