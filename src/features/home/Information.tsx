import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import './Home.scss';
 
 function Information() {
   const { t } = useTranslation();
  const navigate = useNavigate();
  const config = useAppSelector((state: RootState) => state.config.config);
   return (
    <section className="home-access">
      <div className="home-access__inner">
        <div className="home-access__head">
          <h2>Access</h2>
        </div>
        <div className="home-access__map">
        <img src="https://firebasestorage.googleapis.com/v0/b/wedding-dev-9342b.appspot.com/o/app-img%2Fhome_map01.jpg?alt=media&token=a5a60372-cddf-4d3f-a609-1bf15051a41f" alt="" />
        </div>
        <p className="home-access__link">
          <a href="https://maps.app.goo.gl/ub4fmNBZE9L86vij6" target="_blank" rel="noopner">Google Map</a>
        </p>
    {config.attendanceFeatureAvailable ? (
      <button
        className="home-button"
        onClick={() => navigate("/attendance")}
      >{t("information.register.button")}
      </button>
    ) : (
      <button
      className="home-button"
        aria-disabled
        disabled
      >{t("information.register.buttonDisabled")}
      </button>
    )}
      </div>
    </section>
    
   );
 }
 

 export default Information;