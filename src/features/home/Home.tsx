import Information from './Information';
import Top from './Top';
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

  return (
    <div className="home-back-ground">
      <div className='home-main'>
      <Top />
      <Greeting />
      </div>
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
