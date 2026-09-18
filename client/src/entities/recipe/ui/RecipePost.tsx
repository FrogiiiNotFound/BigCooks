import clock from '@/shared/assets/images/icons/clock.png';
import heart from '@/shared/assets/images/icons/heart.png';
import favourite from '@/shared/assets/images/icons/favourite.svg';
import template from '@/shared/assets/images/template.jpg';

export const RecipePost = () => {
  return (
    <div className="border border-gray-300 max-w-fit p-5 rounded-xl flex-1/4">
      <div className="mb-2">
        <div className="bg-amber-500 text-white px-3 py-0.5 rounded-md max-w-fit">
          <p className="text-[11px]">Популярное</p>
        </div>
      </div>
      <div className="flex">
        <div className="flex gap-1 items-center mb-1">
          <h2 className="text-xl">Плов с мясом</h2>
        </div>
      </div>
      <div className="flex gap-3 items-center mb-2">
        <div className="flex gap-1.5 items-center">
          <div className="max-w-3.5">
            <img src={heart} alt="likes-icon" />
          </div>
          <p className="">69</p>
        </div>
        <div className="flex gap-1.5 items-center">
          <div className="max-w-3.5">
            <img src={clock} alt="views-icon" />
          </div>
          <p className="">38</p>
        </div>
      </div>
      <div className="mb-3 max-w-120">
        <img src={template} alt="recipe-photo" />
      </div>
      <div className="flex gap-3 mb-4">
        <div className="flex gap-2 items-center">
          <div className="max-w-4">
            <img src={clock} alt="difficulty-icon" />
          </div>
          <p className="text-[14px]">Средняя</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="max-w-4">
            <img src={clock} alt="time-icon" />
          </div>
          <div className="flex gap-0.5 items-center text-[14px]">
            <p className="">40</p>
            <p className="">минут</p>
          </div>
        </div>
        <div className="flex gap-2 items-center">
          <div className="max-w-4">
            <img src={clock} alt="time-icon" />
          </div>
          <div className="flex gap-0.5 items-center text-[14px]">
            <p className="">300</p>
            <p className="">ккал</p>
          </div>
        </div>
      </div>
      <p className="mb-2 text-[12px]">
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Sint sunt non voluptatibus cumque
        culpa praesentium qui mollitia. Dignissimos alias, debitis impedit ad eius ducimus expedita
        non labore reiciendis quis inventore?
      </p>
      <div className="flex gap-3 mb-4">
        <div className="">
          <p className="text-[14px] text-[#4B5563] ">#мясное</p>
        </div>
        <div className="">
          <p className="text-[14px] text-[#4B5563]">#острое</p>
        </div>
        <div className="">
          <p className="text-[14px] text-[#4B5563]">#говно</p>
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <div className="bg-emerald-500 px-5 py-1.5 text-[#FFF9F8] w-fit text-[14px]">
          <p>Читать далее</p>
        </div>
        <div className="flex gap-3 items-center">
          <div className="flex gap-1.5 items-center">
            <div className="max-w-5">
              <img src={heart} alt="likes-icon" />
            </div>
          </div>
          <div className="flex gap-1.5 items-center">
            <div className="max-w-5">
              <img src={favourite} alt="favourite-icon" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
