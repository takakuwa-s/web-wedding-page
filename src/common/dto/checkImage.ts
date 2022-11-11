import { FileStatus } from "./file";

export interface CheckImage {
	id: string;
  fileType: string;
	thumbnailUrl: string;
  contentUrl: string;
  fileStatus: FileStatus;
  checked?: boolean;
}