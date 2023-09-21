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
    config.attendanceFeatureAvailable ? (
      <button
        className="home-button"
        onClick={() => navigate("/attendance")}
      >{t("information.register.button")}
      </button>
    ) : (
      <button
      className="home-button--disabled"
        aria-disabled
      >{t("information.register.buttonDisabled")}
      </button>
    )
    
   );
 }
 

 export default Information;