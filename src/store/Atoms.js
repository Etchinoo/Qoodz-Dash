import { atom } from "jotai";
import { atomWithStorage } from "jotai/utils";

export const SidebarStateAtom = atom(true);
export const pauseCampaignAtom = atom(false);
export const userAtom = atomWithStorage("user", null);
export const userTokenAtom = atomWithStorage("token", null);
export const homeBranchSelctorAtom = atomWithStorage("homeBranch", null);