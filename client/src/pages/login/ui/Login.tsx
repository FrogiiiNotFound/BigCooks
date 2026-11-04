import registration1 from '../assets/images/registration1.jpg';
import googleIcon from '@/shared/assets/images/icons/google-icon.svg';
import yandexIcon from '@/shared/assets/images/icons/yandex-icon.svg';

const Login = () => {
  return (
    <div className="flex">
      <div className="hidden h-screen w-1/2 md:block">
        <img className="h-full w-full object-cover" src={registration1} alt="" />
      </div>
      <div className="flex w-full items-center justify-center p-6 md:w-1/2">
        <form className="flex w-full max-w-sm flex-col gap-4 bg-white py-7 px-7 rounded-xl shadow-2xl">
          <h2 className="mb-2.5 text-center text-[16px] font-bold">Войдите, чтобы продолжить</h2>
          <div className="flex flex-col gap-3">
            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Электронная почта</p>
              <input
                className="w-full rounded-md border border-gray-400 px-2 py-1 text-[15px]"
                type="text"
                placeholder="bigcooks@gmail.com"
              />
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-[14px]">Пароль</p>
              <input
                className="w-full rounded-md border border-gray-400 px-2 py-1 text-[15px]"
                type="password"
                placeholder="Введите пароль"
              />
            </div>
          </div>
          <button className="bg-emerald-500 py-2 text-white hover:bg-emerald-600 active:bg-emerald-700 text-[16px] mb-2">
            Продолжить
          </button>
          <div className="mb-2">
            <p className="text-[14px] text-center mb-3 text-gray-500">Или войдите с помощью:</p>
            <div className="flex gap-3 border-2 border-gray-300 py-2 justify-center cursor-pointer mb-4 hover:bg-gray-100 active:bg-gray-200">
              <div className="max-w-[24px]">
                <img src={googleIcon} alt="google-icon" />
              </div>
              <p className="font-bold text-[14px]">Google</p>
            </div>
            <div className="flex gap-3 border-2 border-gray-300 py-2 justify-center cursor-pointer hover:bg-gray-100 active:bg-gray-200">
              <div className="max-w-[24px]">
                <img src={yandexIcon} alt="yandex-icon" />
              </div>
              <p className="font-bold text-[14px]">Yandex</p>
            </div>
          </div>
          <div className="flex gap-2 justify-center text-[14px]">
            <p className='text-blue-600 cursor-pointer hover:underline'>Забыли пароль?</p>
            <p>•</p>
            <a href="/register" className="text-blue-600 cursor-pointer hover:underline">Создать аккаунт</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;