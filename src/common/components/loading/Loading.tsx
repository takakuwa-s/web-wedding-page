

function Loading() {
  return (
    <div className="home-loading">
      <picture>
        <source srcSet="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_loading01_pc.jpg?alt=media&token=d755790e-03d3-4b60-9afc-76da7f8d9f71" media="(min-width: 768px)" type="image/jpeg"/>
        <img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_loading01_sp.jpg?alt=media&token=9b95d100-e94e-4166-a42b-3c9d1fdd59ea" alt=""/>
      </picture>
      <div className="home-loading__item"></div>
      <div className="home-loading__text">loading......</div>
    </div>
  );
}

export default Loading;