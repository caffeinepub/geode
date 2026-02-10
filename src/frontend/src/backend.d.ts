import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface UserProfile {
    name: string;
}
export interface Mod {
    id: string;
    externalLinks?: Array<string>;
    name: string;
    tags: Array<string>;
    author: string;
    version: string;
    shortDescription: string;
    longDescription: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    addToLibrary(modId: string): Promise<void>;
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    getAllMods(): Promise<Array<Mod>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getMod(modId: string): Promise<Mod | null>;
    getMyLibrary(): Promise<Array<Mod>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    isCallerAdmin(): Promise<boolean>;
    removeFromLibrary(modId: string): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
}
