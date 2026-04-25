import prisma from '../../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  async login(emailOrUsername: string, passwordStr: string) {
    const user = await prisma.users.findFirst({
      where: {
        OR: [
          { login_email: emailOrUsername },
          { slug: emailOrUsername }
        ]
      },
      include: { roles: true }
    });

    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const isPasswordValid = await bcrypt.compare(passwordStr, user.password);

    if (!isPasswordValid) {
      throw new Error('Contraseña inválida');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.login_email, role: user.roles?.name },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.login_email,
        name: user.slug,
        role: user.roles?.name
      }
    };
  }

  async register(email: string, passwordStr: string, name: string) {
    const existingUser = await prisma.users.findFirst({
      where: { login_email: email }
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(passwordStr, 10);

    const user = await prisma.users.create({
      data: {
        login_email: email,
        password: hashedPassword,
        login_mobile: '',
        slug: name || email.split('@')[0],
        role_id: 2, 
        status: 'active'
      }
    });

    return { message: 'User registered successfully', userId: user.id };
  }

  async getProfile(userId: number) {
    const user = await prisma.users.findUnique({
      where: { id: userId },
      include: { roles: true }
    });
    if (!user) throw new Error('Usuario no encontrado');
    return user;
  }

  async updateProfile(userId: number, data: any) {
    const updateData: any = {
      login_email: data.email,
      login_mobile: data.mobile,
      slug: data.name
    };

    if (data.password) {
      updateData.password = await bcrypt.hash(data.password, 10);
    }

    const user = await prisma.users.update({
      where: { id: userId },
      data: updateData
    });

    return {
      id: user.id,
      email: user.login_email,
      name: user.slug
    };
  }

  async updateProfileImage(userId: number, imageUrl: string) {
    const user = await prisma.users.update({
      where: { id: userId },
      data: { profile_image: imageUrl }
    });
    return { imageUrl: user.profile_image };
  }

  async updateProfileBanner(userId: number, imageUrl: string) {
    const user = await prisma.users.update({
      where: { id: userId },
      data: { profile_banner: imageUrl }
    });
    return { imageUrl: user.profile_banner };
  }

}



