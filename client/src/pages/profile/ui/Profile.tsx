import { RecipeCard } from '@/entities/recipe/ui/RecipeCard';
import userIcon from '@/shared/assets/images/icons/user-icon.svg';

export const Profile = () => {
  return (
    <div className="__container pb-[50px]">
      <div className="flex gap-10 py-5 rounded-md">
        <div className="max-w-[200px] max-h-[200px] border border-gray-500 p-10 rounded-4xl">
          <img src={userIcon} alt="" />
        </div>
        <div className="">
          <div className="flex justify-between w-full mb-5">
            <div>
              <h2 className="text-[22px] mb-1 font-bold">FrogiiiNotFound</h2>
              <div className="">
                <div className="flex gap-3">
                  <div className="flex gap-1 items-center">
                    <div className="max-w-[10px]">
                      <img src={userIcon} alt="" />
                    </div>
                    <p className="text-[15px]">1073</p>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="">5.0</div>
                    <div className="">(32)</div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="max-w-[10px]">
                      <img src={userIcon} alt="" />
                    </div>
                    <div className="flex gap-0.5">
                      <p className="text-[15px]">32</p>
                      <p className="text-[15px]">статей</p>
                    </div>
                  </div>
                  <div className="flex gap-1 items-center">
                    <div className="max-w-[10px]">
                      <img src={userIcon} alt="" />
                    </div>
                    <div className="flex gap-0.5">
                      <p className="text-[15px]">2</p>
                      <p className="text-[15px]">курса</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex gap-5 items-center">
              <div className="bg-black rounded-xl py-2 px-6 text-[15px] text-white cursor-pointer hover:bg-gray-800 active:bg-gray-700">
                <p>Follow</p>
              </div>
              <div className="flex gap-1.5 items-center cursor-pointer hover:text-gray-600 active:text-gray-500">
                <div className="max-w-[10px]">
                  <img src={userIcon} alt="" />
                </div>
                <p className="text-[16px]">Share</p>
              </div>
            </div>
          </div>
          <div className="mb-6">
            <h3 className="text-[14px] mb-1.5">Описание</h3>
            <p className="text-[16px]">
              Giulia Scarpaleggia is a Tuscan-born food writer, cookbook author, and cooking class
              instructor. She first learned to cook by watching her grandmother in the kitchen and
              went on to start a blog inspired by her passion for Italian regional cuisine in 2009.
              Since then, she’s worked with her husband to develop juleskitchen.com into an
              award-winning platform alongside creating content for their podcast, Cooking with an
              Italian Accent.
            </p>
          </div>
        </div>
      </div>
      <div className="">
        <div className="">
          <div className="flex items-center gap-5 mb-3">
            <p className="mb-3 text-[18px] pb-1 border-b-2 border-emerald-500 text-emerald-500 w-fit cursor-pointer">
              Рецепты
            </p>
            <p className="mb-3 text-[18px] pb-1 w-fit cursor-pointer">Коллекции</p>
            <p className="mb-3 text-[18px] pb-1 w-fit cursor-pointer">Курсы</p>
          </div>
          <div className="flex gap-x-5 gap-y-4 flex-wrap">
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
            <RecipeCard />
          </div>
        </div>
      </div>
    </div>
  );
};
