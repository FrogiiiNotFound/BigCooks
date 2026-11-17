import React from 'react';
import template from '@/shared/assets/images/icons/avatar.svg';
import templateImg from '@/shared/assets/images/template.jpg';
import viewsIcons from '@/shared/assets/images/icons/views.svg';
import star from '@/shared/assets/images/icons/star.svg';
import commentArrow from '@/shared/assets/images/icons/commentArrow.svg';

export const RecipePage = () => {
  return (
    <div className="__container py-[50px]">
      <div className="">
        <div className="flex justify-between items-center mb-[30px]">
          <div className="border-b border-gray-300">
            <h2 className="text-[40px]">Плов с мясом</h2>
            <div className="mb-5">
              <div className="flex gap-3 items-center">
                <div className="flex gap-1">
                  <div className="max-w-[20px]">
                    <img src={star} alt="" />
                  </div>
                  <div className="max-w-[20px]">
                    <img src={star} alt="" />
                  </div>
                  <div className="max-w-[20px]">
                    <img src={star} alt="" />
                  </div>
                  <div className="max-w-[20px]">
                    <img src={star} alt="" />
                  </div>
                  <div className="max-w-[20px]">
                    <img src={star} alt="" />
                  </div>
                </div>
                <div className="flex gap-1 items-center">
                  <div className="max-w-[20px]">
                    <img src={viewsIcons} alt="" />
                  </div>
                  <p>2K+</p>
                </div>
              </div>
            </div>
            <div className="flex gap-3 mb-2 items-center">
              <div className="max-w-[30px]">
                <img src={template} alt="" />
              </div>
              <div className="text-[16px]">Андрей Игонин</div>
            </div>
            <p className="text-[14px]">Опубликовано 30 марта 2027</p>
          </div>
          <div className="max-w-[600px]">
            <img className="rounded-xl" src={templateImg} alt="" />
          </div>
        </div>
        <div className="">
          <div className="flex justify-between">
            <div className="">
              <div className="flex gap-2 mb-2">
                <p className="">Время приготовления</p>
                <div className="flex gap-1">
                  <p>30</p>
                  <p className="">минут</p>
                </div>
              </div>
              <div className="">
                <div className="flex gap-3 mb-2">
                  <div className="flex gap-2 items-center">
                    <p className="">Калорий на порцию</p>
                    <div className="flex gap-1">
                      <p>300</p>
                      <p>ккал</p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mb-2">
                <p className="">Порций</p>
                <p>6</p>
              </div>
              <div className="flex gap-2 items-center mb-3">
                <p>Сложность</p>
                <p>🟨</p>
              </div>
              <div className="flex gap-2">
                <p className="">Комментарии</p>
                <div className="flex gap-2 text-gray-800 items-center cursor-pointer">
                  <div className="flex gap-1 underline">
                    <p>Читать</p>
                    <p>100</p>
                    <p>комментариев</p>
                  </div>
                  <div className="max-w-[15px]">
                    <img src={commentArrow} alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="">
              <p className="max-w-[600px]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita natus id iusto
                nobis blanditiis explicabo, quis at nemo vitae aliquam saepe aut omnis, incidunt
                tempora mollitia obcaecati, cum distinctio provident?
              </p>
            </div>
          </div>
        </div>
        <div className="">
        </div>
      </div>
    </div>
  );
};
