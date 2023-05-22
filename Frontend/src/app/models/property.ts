import { IPropertyBase } from "../interfaces/ipropertybase";

export class Property implements IPropertyBase {
    id!: number;
    sellRent!: number;
    name!: string;
    pType!: string;
    bhk!: number;
    fType!: string;
    price!: number;
    builtArea!: number;
    carpetArea?: number;
    address!: string;
    address2?: string;
    city!: string;
    floorNo?: string;
    totalFloor?: string;
    rtm!: number;
    aop?: string;
    mainEntrance?: string;
    security?: number;
    gated?: number;
    maintenance?: number;
    possession?: string;
    image?: string;
    description?: string;
    postedOn?: string;
    postedBy?: number;
}