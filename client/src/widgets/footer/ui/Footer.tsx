const Footer = () => {
  return (
    <div className="__container">
      <div className="flex gap-[100px]">
        <div className="mb-[20px]">
          <h3 className="border-b border-green-400">Полезные ссылки</h3>
          <div className="">
            <p className="">Рецепты</p>
            <p className="">Рецепты из игр</p>
            <p className="">Статьи</p>
          </div>
        </div>
        <div className="">
          <h3 className="border-b border-green-400">Информация</h3>
          <div className="">
            <p className="">Соглашение</p>
            <p className="">Конфиденциальность</p>
            <p className="">Статьи</p>
          </div>
        </div>
        <div className="">
          <h3 className="border-b border-green-400">Создатель</h3>
          <div className="">
            <p className="">Telegram</p>
            <p className="">Github</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
