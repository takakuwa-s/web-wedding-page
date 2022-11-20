import { FileStatus } from "./file";

export interface CheckImage {
	id: string;
  name: string;
  mimeType: string;
  fileType: string;
	thumbnailUrl: string;
  contentUrl: string;
  fileStatus: FileStatus;
  checked?: boolean;
}