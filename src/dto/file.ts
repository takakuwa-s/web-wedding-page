export interface File {
	id: string;
	name: string;
	contentUrl: string;
	thumbnailUrl: string;
	width: number;
	height: number;
	mimeType: string;
	isUploaded: boolean;
	createdAt: Date;
	creater: string;
	updatedAt: Date;
	updater: string;
}

enum FileType {
	image,video
}