import type { ObjectId } from "mongodb";

export interface ResponseFile {
  originalname?: string;
  mimetype?: string;
  filename?: string;
  path?: string;
  size?: number;
}

export interface ImageValue extends ResponseFile {
  _id?: ObjectId;
}

export type TableMap = Map<string, ImageValue>;
