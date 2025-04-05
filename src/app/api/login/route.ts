import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
//import bcrypt from "bcrypt";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Tìm user theo email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng!" }, { status: 401 });
    }

    // Kiểm tra mật khẩu
   // const passwordMatch = await bcrypt.compare(password, user.password);
   // const passwordMatch=await compare(password, user.password)

    if (password !== user.password) {
      return NextResponse.json({ message: "Email hoặc mật khẩu không đúng!" }, { status: 401 });
    }

    return NextResponse.json({ message: "Đăng nhập thành công!" }, { status: 200 });
  } catch (error) {
    console.error("Lỗi đăng nhập:", error);
    return NextResponse.json({ message: "Lỗi server!" }, { status: 500 });
  }
}
