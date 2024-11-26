import { create } from "zustand";

interface UserInfo {
    username: string;
    email: string;
}

interface UserInfoAction {
    updateUsername: (username: string) => void;
    updateEmail: (email: string) => void;
}

const userInfoData = create<UserInfo & UserInfoAction>((set) => ({
    username: "",
    email: "",
    updateUsername: (username) => set({ username }),
    updateEmail: (email) => set({ email }),
}))

export default userInfoData