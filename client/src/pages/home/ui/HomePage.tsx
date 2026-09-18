import { RecipePost } from '@/entities/recipe/ui/RecipePost';
import { Filters } from './Filters';

const HomePage = () => {
  return (
    <div className="__container">
      <div className="text-[18px] text-[#4B5563] mb-5">
        <p className="">/ Главная</p>
      </div>
      <Filters />
      <div className="flex gap-x-5 gap-y-4 flex-wrap">
        <RecipePost />
        <RecipePost />
        <RecipePost />
        <RecipePost />
        <RecipePost />
        <RecipePost />
      </div>
    </div>
  );
};

export default HomePage;
