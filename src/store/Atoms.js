import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

const storageUser=localStorage.getItem("user")
const user=storageUser?JSON.parse(storageUser):null
const storageToken=localStorage.getItem("token")
const token=storageToken?JSON.parse(storageToken):null

export const SidebarStateAtom = atom(true);
export const pauseCampaignAtom = atom(false);
export const userAtom = atomWithStorage("user", user);
export const userTokenAtom = atomWithStorage("token", token);
export const homeBranchSelctorAtom = atomWithStorage("homeBranch", null);