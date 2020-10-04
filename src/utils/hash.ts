import bcrypt from 'bcrypt';

export const hash = (password: String) => {
  return bcrypt.hash(password, parseInt(process.env.SALT));
}

export const compareHash = (password: String, hashPassword: any) => {
  return bcrypt.compare(password, hashPassword)
}