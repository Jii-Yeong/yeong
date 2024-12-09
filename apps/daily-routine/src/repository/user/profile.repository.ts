import { DB_TABLE_NAME } from '@/constants/db-table.constants';
import {
  UserProfileDto,
  UserProfileReqDto,
} from '@/model/user/user-profile.dto';
import supabaseAdmin from '@/supabase/init';

export const getUserProfile = async (userId: UserProfileDto['id']) => {
  const { data } = await supabaseAdmin
    .from(DB_TABLE_NAME.profiles)
    .select()
    .eq('id', userId)
    .single<UserProfileDto>();
  return data;
};

export const insertUserProfile = async (
  id: UserProfileDto['id'],
  name: UserProfileDto['user_name'],
  thumbnail?: UserProfileDto['user_image']
) => {
  await supabaseAdmin.from(DB_TABLE_NAME.profiles).insert({
    id,
    user_name: name,
    user_image: thumbnail,
  });
};

export const updateUserProfile = async (
  id: UserProfileDto['id'],
  profile: UserProfileReqDto
) => {
  await supabaseAdmin.from(DB_TABLE_NAME.profiles).update(profile).eq('id', id);
};
