import { cookies } from "next/headers";
import { NextResponse } from "next/server";


export const POST = async (request:Request, response:Response) => {
    try {
        const cookieStore = cookies();
        const token = cookieStore.get("token");
        console.log(token);
        if (!token) {
            return NextResponse.json({ error: "You already logged out" }, { status: 401 });
        }

       
            cookieStore.delete("token");
            return NextResponse.json({ message: "Logout successful" }, { status: 200 });

    } catch (error) {
        return NextResponse.json({ error: "Logout failed" }, { status: 500 });
    }
};