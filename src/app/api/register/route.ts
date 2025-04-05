import { NextResponse } from "next/server";
//import bcrypt from "bcryptjs";
import prisma from "@/lib/prisma"; // Import Prisma Client

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    // Kiểm tra email đã tồn tại chưa
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return NextResponse.json({ message: "Email đã tồn tại!" }, { status: 400 });
    }

    // Mã hóa mật khẩu
 //   const hashedPassword = await bcrypt.hash(password, 10);
    const hashedPassword =password;
    // Tạo user mới trong database
    const newUser = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        role: "USER", // Mặc định role là USER
      },
    });

    return NextResponse.json({ message: "Đăng ký thành công!", user: newUser }, { status: 201 });
  } catch (error) {
    console.error("Lỗi server:", error);
    return NextResponse.json({ message: "Lỗi server!", error: String(error) }, { status: 500 });
  }
}
