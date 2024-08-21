import { createUploadthing, type FileRouter } from "uploadthing/next";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { db } from "@/db";

export const maxDuration = 300;

const f = createUploadthing();

const onUploadComplete = () => {
    
}
export const ourFileRouter: FileRouter = {
  freePlanUploader: f({ 
    image: {maxFileSize: "4MB", maxFileCount: 50}, 
  }).onUploadComplete(onUploadComplete)
};

export type OurFileRouter = typeof ourFileRouter;
