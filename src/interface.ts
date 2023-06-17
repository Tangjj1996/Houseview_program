import type { Request } from "express";
import type { ObjectId } from "mongodb";

export interface ResponseFile {
  originalname?: string;
  mimetype?: string;
  filename?: string;
  path?: string;
  size?: number;
}

export interface ResposeForm {
  address?: string;
  title?: string;
}

export interface ImageValue extends ResponseFile, ResposeForm {
  _id?: ObjectId;
}

export type TableMap = Map<string, ImageValue>;

export interface UploadRequest extends Request {
  body: ResposeForm;
}

export interface FilenameRequest extends Request {
  nanoid: string;
}
