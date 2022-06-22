export interface File {
	id: string;
	name: string;
	contentUrl: string;
	thumbnailUrl: string;
	width: number;
	height: number;
	mimeType: string;
	uploaded: boolean;
	faceIds: string[];
	faceCount: number
	faceHappinessLevel: number
	facePhotoBeauty: number
	faceScore : number;
	createdAt: Date;
	creater: string;
	updatedAt: Date;
	createrName?: string;
}