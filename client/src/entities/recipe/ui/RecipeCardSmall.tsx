import templateImg from '@/shared/assets/images/template.jpg';
import clock from '@/shared/assets/images/icons/clock.png';
import heart from '@/shared/assets/images/icons/heart.png';
import favourite from '@/shared/assets/images/icons/favourite.svg';

const RecipeCardSmall = () => {
  return (
    <div className="rounded-md bg-white pb-5 flex-1/4 rounded-2xl">
      <div className="mb-3 rounded-t-2xl">
        <img className="rounded-t-2xl" src={templateImg} alt="" />
      </div>
      <div className="px-4">
        <div className="">
          <div className="mb-2"></div>
          <div className="flex">
            <div className="flex gap-1 items-center mb-1">
              <h2 className="text-[22px]">Плов с мясом</h2>
            </div>
          </div>
          <div className="flex gap-3 items-center mb-2">
            <div className="flex gap-1.5 items-center">
              <div className="max-w-[13px]">
                <img src={heart} alt="likes-icon" />
              </div>
              <p className="text-[13px]">69</p>
            </div>
            <div className="flex gap-1.5 items-center">
              <div className="max-w-[13px]">
                <img src={clock} alt="views-icon" />
              </div>
              <p className="text-[13px]">38</p>
            </div>
          </div>
          <div className="flex gap-3 mb-4">
            <div className="flex gap-2 items-center">
              <div className="max-w-3.5">
                <img src={clock} alt="difficulty-icon" />
              </div>
              <p className="text-[14px]">Средняя</p>
            </div>
            <div className="flex gap-2 items-center">
              <div className="max-w-3.5">
                <img src={clock} alt="time-icon" />
              </div>
              <div className="flex gap-0.5 items-center text-[14px]">
                <p className="">40</p>
                <p className="">минут</p>
              </div>
            </div>
            <div className="flex gap-2 items-center">
              <div className="max-w-3.5">
                <img src={clock} alt="time-icon" />
              </div>
              <div className="flex gap-0.5 items-center text-[14px]">
                <p className="">300</p>
                <p className="">ккал</p>
              </div>
            </div>
          </div>
          <p className="text-[12px] mb-5">
            Giulia Scarpaleggia is a Tuscan-born food writer, cookbook author, and cooking class
            instructor. She first learned to cook by watching her grandmother in the kitchen and
            went on to start a blog inspired by her passion for Italian regional cuisine in 2009.
            Since then, she’s worked with her husband to develop juleskitchen.com into an
            award-winning platform alongside creating content for their podcast, Cooking with an
            Italian Accent.
          </p>
          <div className="flex justify-between">
            <div className="flex gap-3 items-center">
              <div className="flex gap-1 items-center">
                <div className="max-w-[15px]">
                  <img src={clock} alt="" />
                </div>
                <p className="text-[12px]">Средняя</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="max-w-[15px]">
                  <img src={clock} alt="" />
                </div>
                <p className="text-[12px]">40 минут</p>
              </div>
              <div className="flex gap-1 items-center">
                <div className="max-w-[15px]">
                  <img src={clock} alt="" />
                </div>
                <p className="text-[12px]">300 ккал</p>
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <div className="max-w-[20px]">
                <img src={heart} alt="" />
              </div>
              <div className="max-w-[20px]">
                <img src={favourite} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCardSmall;
