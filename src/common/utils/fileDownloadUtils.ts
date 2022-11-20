import JSZip from "jszip";
import { CheckImage } from "../dto/checkImage";
import { File } from "../dto/file";

interface BlobNamePair {
  name: string;
  content: Blob;
}

async function getNameContentPairsFrom (checkImages: CheckImage[] | File[]): Promise<BlobNamePair[]> {
  const promises: Promise<BlobNamePair>[] = checkImages.map(async img => {
      const response = await fetch(img.contentUrl);
      const content: Blob = await response.blob();
      let name: string;
      switch (img.mimeType) {
        case 'image/jpeg':
          name = img.name + '.jpg';
          break;
        case 'video/mp4':
          name = img.name + '.mp4';
          break;
        default:
          name = img.name;
      }
      return { name, content };
  });

  // // ここではサーバーの負荷を考えて、直列実行
  // // 並列実行したい場合は const blobs = await Promise.all(promises);
  // const pairs = [];

  // // await を使いたいため、forEach を使わない (他に直列実行の実装法あり)
  // for (const promise of promises) {
  //     pairs.push(await promise);
  // }

  // return pairs;
  return await Promise.all(promises);

};

export async function generateZipDownloadUrl(checkImages: CheckImage[] | File[], folderName: string): Promise<string> {
  const blobNamePairs: BlobNamePair[] = await getNameContentPairsFrom(checkImages);
  const zip = new JSZip();

  const folder: JSZip | null = zip.folder(folderName);
  if (!folder) {
    throw Error('folder for zip is null');
  }
  (blobNamePairs).forEach((pair: {name: string, content: Blob}) => {
    folder.file(pair.name, pair.content);
  });
  const blob = await zip.generateAsync({ type: 'blob' }); // デフォルトで無圧縮
  const url = URL.createObjectURL(blob);
  if (!url) {
    throw Error('url is not set');
  }
  return url
};

export function downloadFile(url: string, fileName: string) {
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.download = fileName;
  a.href = url;
  a.rel = 'noopener'
  a.click();
  a.remove();
}