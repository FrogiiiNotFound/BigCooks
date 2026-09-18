import { Checkbox } from '@/shared/components/ui/checkbox';
import {
  Combobox,
  ComboboxContent,
  ComboboxEmpty,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from '@/shared/components/ui/combobox';

export const Filters = () => {
  const dishTypes = [
    'Любое',
    'Первое',
    'Второе',
    'Напитки',
    'Десерты',
    'Закуски',
    'Соусы',
    'Заготовки',
  ];
  const mealTypes = ['Любой', 'Завтрак', 'Обед', 'Ужин'];
  const difficulty = ['Любая', 'Легкая', 'Средняя', 'Сложная'];

  return (
    <div className="mb-5">
      <h2 className="text-[18px] mb-4">Фильтры</h2>
      <div className="flex gap-2.5 mb-3">
        <div className="max-w-fit">
          <Combobox items={dishTypes}>
            <ComboboxInput className="border-gray-400" placeholder="Тип блюда" />
            <ComboboxContent>
              <ComboboxEmpty>Предметов не найдено.</ComboboxEmpty>
              <ComboboxList className="bg-[#F9FAFB]">
                {(item) => (
                  <ComboboxItem
                    className="hover:bg-gray-200 text-[#4B5563]"
                    key={item}
                    value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="max-w-fit">
          <Combobox items={mealTypes}>
            <ComboboxInput className="border-gray-400" placeholder="Прием пищи" />
            <ComboboxContent>
              <ComboboxEmpty>Предметов не найдено.</ComboboxEmpty>
              <ComboboxList className="bg-[#F9FAFB]">
                {(item) => (
                  <ComboboxItem
                    className="hover:bg-gray-200 text-[#4B5563]"
                    key={item}
                    value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="max-w-fit">
          <Combobox items={difficulty}>
            <ComboboxInput className="border-gray-400" placeholder="Сложность приготовления" />
            <ComboboxContent>
              <ComboboxEmpty>Предметов не найдено.</ComboboxEmpty>
              <ComboboxList className="bg-[#F9FAFB]">
                {(item) => (
                  <ComboboxItem
                    className="hover:bg-gray-200 text-[#4B5563]"
                    key={item}
                    value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
        <div className="max-w-fit">
          <Combobox items={difficulty}>
            <ComboboxInput className="border-gray-400" placeholder="Национальная кухня" />
            <ComboboxContent>
              <ComboboxEmpty>Предметов не найдено.</ComboboxEmpty>
              <ComboboxList className="bg-[#F9FAFB]">
                {(item) => (
                  <ComboboxItem
                    className="hover:bg-gray-200 text-[#4B5563]"
                    key={item}
                    value={item}>
                    {item}
                  </ComboboxItem>
                )}
              </ComboboxList>
            </ComboboxContent>
          </Combobox>
        </div>
      </div>
      <div className="">
        <Checkbox />
      </div>
    </div>
  );
};
