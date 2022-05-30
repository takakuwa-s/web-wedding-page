import { useTranslation } from "react-i18next";
import BottomNavbar from "../../common/components/bottom-navbar/BottomNavbar";
import { RootState } from '../../app/store';
import { useAppSelector } from '../../app/hooks';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ImageListAll from './ImageListAll';
import ImageListRank from './ImageListRank';
import ImageListMy from './ImageListMy';
import { Gallery } from "../../common/dto/gallery";

function ImageList(props: IProps) {
  const { t } = useTranslation();
  const allFiles = useAppSelector((state: RootState) => state.files.val);
  const [searchParams] = useSearchParams();
  const noLoad = searchParams.get("noLoad");
  const navigate = useNavigate();

  const defalutImages = noLoad ? allFiles : [];
  const switchGallery = (eventKey: any, event: any) => {
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
    ALL: <ImageListAll defalutImages={defalutImages} />,
    MY: <ImageListMy />,
    RANK: <ImageListRank />
  };

  return (
    <>
      {imageEl[props.gallery]}
      <BottomNavbar navs={navs} onSelectNav={switchGallery}/>
    </>
  );
}

interface IProps {
  gallery: Gallery;
}

export default ImageList;