import CommonHeader from '@/components/CommonHeader';
import SettingConfig from '@/components/settings/SettingConfig';
import SettingLanguage from '@/components/settings/SettingLanguage';
import PostsLayout from '@/layouts/PostsLayout';
import { CiSettings } from 'react-icons/ci';

export default async function Setting({}) {
  return (
    <PostsLayout>
      <CommonHeader shouldDisplay />
      <div className="mx-auto my-[50px] relative flex flex-col gap-12">
        <div className="w-full bg-[#1b1b1b] p-5 relative flex justify-between text-lg text-white items-center">
          <span>SETTINGS</span>
          <span>
            <CiSettings className="text-[#fff]" size={28} />
          </span>
        </div>
        <SettingConfig />
      </div>
      <SettingLanguage />
    </PostsLayout>
  );
}
