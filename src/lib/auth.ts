import { supabase } from './storage';

export class AuthService {
  public static async authenticate(email: string, inputPassword: string): Promise<{ success: boolean; error?: string }> {
    if (!supabase) {
      return { success: false, error: 'Supabase configuration is required for admin access. Check .env' };
    }

    if (!email || !inputPassword) {
      return { success: false, error: 'Email and password required' };
    }

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email.trim(),
        password: inputPassword,
      });

      if (error) {
        return { success: false, error: error.message };
      }

      if (data.session) {
        // Optional: Check if the user is an admin by querying admin_users table
        const { data: adminData, error: adminError } = await supabase
          .from('admin_users')
          .select('role')
          .eq('user_id', data.user.id)
          .single();

        if (adminError || adminData?.role !== 'admin') {
          await supabase.auth.signOut();
          return { success: false, error: 'User is not authorized as an admin' };
        }

        return { success: true };
      }

      return { success: false, error: 'Authentication failed' };
    } catch (e) {
      console.error('Auth verification error:', e);
      return { success: false, error: 'Verification failed' };
    }
  }

  public static async isAuthenticated(): Promise<boolean> {
    if (!supabase) return false;

    try {
      const { data, error } = await supabase.auth.getSession();
      if (error || !data.session) return false;

      // Verify admin role
      const { data: adminData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('user_id', data.session.user.id)
        .single();

      return adminData?.role === 'admin';
    } catch {
      return false;
    }
  }

  public static async logout(): Promise<void> {
    if (supabase) {
      await supabase.auth.signOut();
    }
  }

  public static async updatePassword(newPassword: string): Promise<{ success: boolean; message?: string }> {
    if (!supabase) {
      return { success: false, message: 'Supabase configuration is required.' };
    }

    if (!newPassword || newPassword.length < 6) {
      return { success: false, message: 'Password must be at least 6 characters.' };
    }

    const { error } = await supabase.auth.updateUser({
      password: newPassword
    });

    if (error) {
      return { success: false, message: error.message };
    }

    return { success: true, message: 'Password successfully updated.' };
  }
}
