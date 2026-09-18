const Header = () => {
  return (
    <div className="__container">
      <div className="flex justify-between m-5 items-center">
        <div className="flex gap-3">
          <h2 className="cursor-pointer text-[18px]">BigCooks</h2>
          <p className="text-[16px]">|</p>
          <ul className="flex gap-4 text-[16px]">
            <li className="cursor-pointer border-b-2 border-transparent transition-all duration-300 hover:border-green-400">
              Рецепты
            </li>
            <li className="cursor-pointer border-b-2 border-transparent transition-all duration-300 hover:border-green-400">
              Рецепты из игр
            </li>
            <li className="cursor-pointer border-b-2 border-transparent transition-all duration-300 hover:border-green-400">
              Статьи
            </li>
          </ul>
        </div>
        <div className="flex gap-2.5 items-center">
          <p className="cursor-pointer text-[14px] border-b-2 border-transparent transition-all duration-300 hover:border-green-400">Войти</p>
          <p className="text-[16px]">|</p>
          <div className="flex text-[16px] gap-2.5 bg-emerald-500 px-4 py-1 rounded-sm transition-all duration-300">
            <p className="cursor-pointer text-[#FFF9F8]">Регистрация</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
