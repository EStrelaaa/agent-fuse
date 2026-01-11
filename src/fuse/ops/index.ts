import { readdir } from "./readdir.js";
import { getattr } from "./getattr.js";
import { open } from "./open.js";
import { read } from "./read.js";
import { rename } from "./rename.js";
import { mkdir } from "./mkdir.js";
import { readlink } from "./readlink.js";
import { symlink } from "./symlink.js";
import { unlink } from "./unlink.js";

export const ops = {
  readdir,
  getattr,
  open,
  read,
  rename,
  mkdir,
  readlink,
  symlink,
  unlink,
};
