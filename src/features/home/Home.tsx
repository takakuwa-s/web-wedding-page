import Information from './Information';
import Top from './Top';
//import SwipeWrapper from "../../common/components/swiper-wrapper/SwipeWrapper";
import Greeting from './Greeting';
import Profile from './Profile';
import Event from './Event';
import { useEffect } from 'react';

function Home() {
  useEffect(() => {
    const option : any = {
      top: 0,
      left: 0,
      behavior: "instant"
    };
    window.scrollTo(option);
  }, []);

  const images = [
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-1.jpg?alt=media&token=6a0fb3dd-01e4-40e9-a6ae-b8e41ad9c6e4",
      alt: "swiper photo 1"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-2.jpg?alt=media&token=2131cd51-aa66-489b-9e9a-42c6845a3c79",
      alt: "swiper photo 2"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-3.jpg?alt=media&token=99a2ec87-382e-41ff-aeef-5c8605eddcfa",
      alt: "swiper photo 3"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-4.jpg?alt=media&token=90943fde-ba7a-415a-9ded-185e05bee5fe",
      alt: "swiper photo 4"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-5.jpg?alt=media&token=4cc8f68f-e90b-46b1-a6b6-1e9f4cb28574",
      alt: "swiper photo 5"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-6.jpg?alt=media&token=0e529837-471e-4454-92f4-476de2d27936",
      alt: "swiper photo 6"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-7.jpg?alt=media&token=0f76a6bb-c27c-4292-b943-b5453d76fd5a",
      alt: "swiper photo 7"
    },
    {
      src: "https://firebasestorage.googleapis.com/v0/b/wedding-dev-1df62.appspot.com/o/resource%2Fswiper-photo-8.jpg?alt=media&token=bfe718f2-9df7-45eb-b412-4584e5f0ba23",
      alt: "swiper photo 8"
    },
  ];

  return (
    <div className="home-back-ground">
      <Top />
      <Greeting />
      <Profile />
      <Event />
      <Information />
    </div>
  );
  /*return (
    <div className="home-back-ground">
      <Top />
      <Greeting />
      <Profile />
      <SwipeWrapper images={images}/>
      <Information />
    </div>
  );*/
}

export default Home;
