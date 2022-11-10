export interface File {
	id: string;
	name: string;
	fileType: string;
	duration: number;
	contentUrl: string;
	thumbnailUrl: string;
	width: number;
	height: number;
	mimeType: string;
	fileStatus: FileStatus;
	faceIds: string[];
	faceCount: number
	faceHappinessLevel: number
	facePhotoBeauty: number
	faceScore : number;
	forBrideAndGroom: boolean;
	createdAt: Date;
	creater: string;
	updatedAt: Date;
	createrName?: string;
}

export enum FileStatus {
	NEW      = "new",
	UPLOADED = "uploaded",
	OPEN    = "open",
	DELETED  = "deleted"
}