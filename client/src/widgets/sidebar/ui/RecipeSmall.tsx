import clock from '@/shared/assets/images/icons/clock.png';
import template from '@/shared/assets/images/template.jpg';

export const RecipeSmall = () => {
  return (
    <div className="mb-4">
      <h2 className="mb-1.5">Плов с мясом</h2>
      <div className="flex gap-3 mb-3">
        <div className="flex gap-2">
          <div className="max-w-4">
            <img src={clock} alt="views-icon" />
          </div>
          <p className="text-[13px]">38</p>
        </div>
        <div className="flex gap-2">
          <div className="max-w-4">
            <img src={clock} alt="likes-icon" />
          </div>
          <p className="text-[13px]">69</p>
        </div>
      </div>
      <p className='text-[12px] max-w-[250px] mb-5'>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime iusto quod velit odit saepe
        deserunt modi quae fugit dolore laudantium.
      </p>
      <div className="flex gap-3 mb-3">
        <div className="flex gap-2 items-center">
          <div className="max-w-4">
            <img src={clock} alt="difficulty-icon" />
          </div>
          <p className="text-[13px]">Средняя</p>
        </div>
        <div className="flex gap-2 items-center">
          <div className="max-w-4">
            <img src={clock} alt="time-icon" />
          </div>
          <p className="text-[13px]">40 минут</p>
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
    </div>
  );
};
