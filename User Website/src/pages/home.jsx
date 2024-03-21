import React from "react";

import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Button,
  IconButton,
  Input,
  Textarea,
  Checkbox,
} from "@material-tailwind/react";
import { FingerPrintIcon, UsersIcon } from "@heroicons/react/24/solid";
import { PageTitle, Footer } from "@/widgets/layout";
import { FeatureCard, TeamCard } from "@/widgets/cards";
import { featuresData, teamData, contactData } from "@/data";

export function Home() {
  

  return (
    <>
      <div className="relative flex h-screen content-center items-center justify-center pt-16 pb-32">
        <div className="absolute top-0 h-full w-full bg-[url('/img/background-1.jpg')] bg-cover bg-center" />
        <div className="absolute top-0 h-full w-full bg-black/60 bg-cover bg-center" />
        <div className="max-w-8xl container relative mx-auto">
          <div className="flex flex-wrap items-center">
            <div className="ml-auto mr-auto w-full px-4 text-center lg:w-8/12">
              <Typography
                variant="h1"
                color="white"
                className="mb-6 font-black"
              >
                Budget,Features and Support ↺
              </Typography>
             

              <Typography variant="lead" color="white" className="opacity-80">
              Electronic commerce refers to companies and individuals that buy and sell goods and services over the internet. E-commerce operates in different types of market segments and can be conducted over computers, tablets, smartphones, and other smart devices.
              </Typography><br/>
              <Button variant="outlined text" size="sm"  onClick={scrollToAboutSection}>
  About as
</Button> &nbsp;<Button variant="outlined text" size="sm"  onClick={scrollTocontactSection}>
Contact as
</Button>
            </div>
          </div>
        </div>
      </div>
      <section className="-mt-32 bg-white px-4 pb-20 pt-4">
        <div className="container mx-auto" > 
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-2">
            {featuresData.map(({ color, title, icon, description }) => (
              <FeatureCard
                key={title}
                color={color}
                title={title}
                icon={React.createElement(icon, {
                  className: "w-5 h-5 text-white",
                })}
                description={description}
              />
            ))}
          </div>
          <div className="mt-32 flex flex-wrap items-center" id="about" >
            <div className="mx-auto -mt-8 w-full px-4 md:w-5/12">
              <div className="mb-6 inline-flex h-16 w-16 items-center justify-center rounded-full bg-blue-gray-900 p-2 text-center shadow-lg">
                <FingerPrintIcon className="h-8 w-8 text-white " />
              </div>
              
              <Typography
                variant="h3"
                className="mb-3 font-bold"
                color="blue-gray"
              >
                About as 🤘
              </Typography>
              <Typography className="mb-8 font-normal text-blue-gray-500">
              Welcome to Jahidtech, a cutting-edge digital marketing and design solution crafted by 
              Jahid Pvt. Ltd. We are dedicated to the art of digital transformation, and Jahidtech is the embodiment of our commitment to redefining your online presence. At ThinkWebHub, we understand that the digital landscape is constantly evolving, and we are here to help your business stay at the forefront of this dynamic environment. With Jahidtech, we offer a comprehensive suite of services, from web design to digital marketing strategies, tailored to your unique needs. 
                <br />
                <br />
                Our team of experts brings a wealth of experience and creativity to the table, ensuring that your brand stands out and thrives in the digital realm.
              </Typography>
              <Button variant="filled" >read more</Button>
            </div>
            <div className="mx-auto mt-24 flex w-full justify-center px-4 md:w-4/12 lg:mt-0">
              <Card className="shadow-lg border shadow-gray-500/10 rounded-lg">
                <CardHeader floated={false} className="relative h-56">
                  <img
                    alt="Card Image"
                    src="/img/teamwork.png"
                    className="h-full w-full"
                  />
                </CardHeader>
                <CardBody>
                  <Typography variant="small" color="blue-gray" className="font-normal">Enterprise</Typography>
                  <Typography
                    variant="h5"
                    color="blue-gray"
                    className="mb-3 mt-2 font-bold"
                  >
                    Top Notch Services 🥇
                  </Typography>
                  <Typography className="font-normal text-blue-gray-500">
                  Improve your business website’s online presence with the unique integration of digital marketing features. Show up your online strength to achieve your virtual goal.
                  </Typography>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </section>
      <section className="px-4 pt-20 pb-48" >
        <div className="container mx-auto">
          <PageTitle section="Our Team" heading="Here are our heroes">
          </PageTitle>
          <div className="mt-24 grid grid-cols-1 gap-12 gap-x-24 md:grid-cols-2 xl:grid-cols-4">
            {teamData.map(({ img, name, position, socials }) => (
              <TeamCard
                key={name}
                img={img}
                name={name}
                position={position}
                socials={
                  <div className="flex items-center gap-2">
                    {socials.map(({ color, name }) => (
                      <IconButton key={name} color={color} variant="text">
                        <i className={`fa-brands text-xl fa-${name}`} />
                      </IconButton>
                    ))}
                  </div>
                }
              />
            ))}
          </div>
        </div>
      </section>
      <section className="relative bg-white py-2 px-1">
        <div className="container mx-auto">
          <PageTitle section="Contact Us" heading="How can help you?" >
          </PageTitle>
          <form className="mx-auto w-full mt-5 lg:w-5/12"  id="contact">
            <div className="mb-8 flex gap-8">
              <Input variant="outlined" size="lg" label="Full Name" />
              <Input variant="outlined" size="lg" label="Email Address" />
            </div>
            <Textarea variant="outlined" size="lg" label="Message" rows={8} />
            <Checkbox
              label={
                <Typography
                  variant="small"
                  color="gray"
                  className="flex items-center font-normal"
                >
                  I agree the
                  <a
                    href="#"
                    className="font-medium transition-colors hover:text-gray-900"
                  >
                    &nbsp;Terms and Conditions
                  </a>
                </Typography>
              }
              containerProps={{ className: "-ml-2.5" }}
            />
            <Button variant="gradient" size="lg" className="mt-8" fullWidth>
              Send Message
            </Button>
          </form>
        </div>
        
      </section>
      <button id="scrollUpButton" onClick={scrollToTop}>↑</button>
      <div className="bg-white">
        <Footer />
      </div>
    </>
  );
}

export default Home;
