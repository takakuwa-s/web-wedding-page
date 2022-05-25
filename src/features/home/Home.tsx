import GreetingMessage from '../greeting-message/GreetingMessage';
import Information from '../information/Information';
import Top from '../top/Top';

function Home() {
  return (
    <>
      <Top />
      <GreetingMessage />
      <Information />
    </>
  );
}

export default Home;
