import { RecipeCard } from '@/entities/recipe/ui/RecipeCard';
import { Filters } from './Filters';

const HomePage = () => {
  return (
    <div className="__container">
      <div className="text-[18px] text-[#4B5563] mb-5">
        <p className="">/ Главная</p>
      </div>
      <Filters />
      <div className="flex gap-x-5 gap-y-4 flex-wrap">
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
        <RecipeCard />
      </div>
    </div>
  );
};

export default HomePage;
