import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import { model } from "./model"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const getTitleDescriptionEmbeddings = async(
  {title, description}: 
  {title:string, description:string}): Promise<{
  titleEmbedding: number[] | undefined, 
  descriptionEmbedding: number[] | undefined
}> => {
  try {
    
    const resultTitle = await model.embedContent(title);
    const resultDescription = await model.embedContent(description);
    const titleEmbedding = resultTitle.embedding.values;
    const descriptionEmbedding = resultDescription.embedding.values;

    return { titleEmbedding, descriptionEmbedding}
  } catch (error) {
    console.log(error)
    return { titleEmbedding: undefined, descriptionEmbedding: undefined}
  }
}