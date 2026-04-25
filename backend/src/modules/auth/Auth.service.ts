import prisma from '../../config/prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class AuthService {
  async login(email: string, passwordStr: string) {
    const user = await prisma.user.findFirst({
      where: { login_email: email }
    });

    if (!user) {
      throw new Error('User not found');
    }

    // Since it's a migration from CodeIgniter, we assume bcrypt or MD5 was used.
    // For now we assume the new system will use bcrypt.
    const isPasswordValid = await bcrypt.compare(passwordStr, user.login_password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid password');
    }

    const token = jwt.sign(
      { userId: user.id, email: user.login_email },
      process.env.JWT_SECRET || 'secret',
      { expiresIn: '1d' }
    );

    return {
      token,
      user: {
        id: user.id,
        email: user.login_email,
      }
    };
  }

  async register(email: string, passwordStr: string, name: string) {
    const existingUser = await prisma.user.findFirst({
      where: { login_email: email }
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const hashedPassword = await bcrypt.hash(passwordStr, 10);

    const user = await prisma.user.create({
      data: {
        login_email: email,
        login_password: hashedPassword,
        // Fill other default values based on schema
      }
    });

    return { message: 'User registered successfully', userId: user.id };
  }
}
