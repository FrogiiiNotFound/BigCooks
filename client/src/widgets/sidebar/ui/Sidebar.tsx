import { RecipeSmall } from './RecipeSmall';

export const Sidebar = () => {
  return (
    <div className="p-5 border border-gray-300 rounded-xl h-fit">
      <h2 className="text-xl border-b border-gray-400 mb-5 pb-2">Лучшие рецепты</h2>
      <RecipeSmall />
      <RecipeSmall />
      <RecipeSmall />
    </div>
  );
};
