export interface UserPayload {
  sub: number;
  email: string;
  userRole?: string;
  name: string;
  iat?: number;
  exp?: number;
}
