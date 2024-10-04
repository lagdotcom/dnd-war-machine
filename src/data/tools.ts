import { CartesianCoord } from "../flavours";
import { XY } from "../types";

export const xy = (x: CartesianCoord, y: CartesianCoord): XY => ({ x, y });
