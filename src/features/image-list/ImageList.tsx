import { useTranslation } from "react-i18next";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import { useNavigate } from 'react-router-dom';
import ImageListAll from './ImageListAll';
import ImageListRank from './ImageListRank';
import ImageListMy from './ImageListMy';
import { Gallery } from "../../common/dto/gallery";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { RootState } from "../../app/store";
import InformationPanel from "../../common/components/information-panel/InformationPanel";
import { updateAlertMsg } from "./fileSlice";

function ImageList(props: IProps) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const images = useAppSelector((state: RootState) => state.files.files);
  const switchGallery = (eventKey: any, event: any) => {
    dispatch(updateAlertMsg(""));
    navigate(`/image/list/${eventKey.toLowerCase()}`);
  };

  const navs = [
    {
      id: Gallery.ALL,
      title: t("imageList.tab.all"),
    },
    {
      id: Gallery.MY,
      title: t("imageList.tab.my"),
    },
    {
      id: Gallery.RANK,
      title: t("imageList.tab.rank"),
    },
  ];

  const imageEl = {
    ALL: <ImageListAll />,
    MY: <ImageListMy />,
    RANK: <ImageListRank />
  };

  const imageMap = new Map(images.map(i => [i.id, i]));
  return (
    <>
      <InformationPanel imageMap={imageMap}/>
      {imageEl[props.gallery]}
      <BottomNavbar navs={navs} onSelectNav={switchGallery}/>
    </>
  );
}

interface IProps {
  gallery: Gallery;
}

export default ImageList;