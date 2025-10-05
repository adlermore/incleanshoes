"use client";

import React, { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import mainBanner from "@/public/images/ServiceCalculate.png";
import IconService1 from "../Icons/IconService1";
import IconService2 from "../Icons/IconService2";
import IconService3 from "../Icons/IconService3";
import IconService4 from "../Icons/IconService4";

interface ServiceOption {
  id: number;
  label: string;
  price?: number;
  icon?: React.ReactNode;
}

const step1Options: ServiceOption[] = [
  { id: 1, label: "Обувь", icon: <IconService1 /> },
  { id: 2, label: "Сумки", icon: <IconService2 /> },
  { id: 3, label: "Одежда", icon: <IconService3 /> },
  { id: 4, label: "Рюкзаки, клатчи, портмоне и другое", icon: <IconService4 /> },
];

const step2Services: ServiceOption[] = [
  { id: 1, label: "Чистка кожи", price: 20 },
  { id: 2, label: "Полировка", price: 15 },
  { id: 3, label: "Замена подошвы", price: 50 },
  { id: 4, label: "Покраска", price: 30 },
];

function ServiceCalculate() {
  const [step, setStep] = useState(1);
  const [selectedStep1, setSelectedStep1] = useState<number | null>(null);
  const [selectedServices, setSelectedServices] = useState<number[]>([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const handleStep1Submit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedStep1) {
      setStep(2);
    }
  };

  const handleServiceToggle = (id: number, price?: number) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter((s) => s !== id));
      if (price) setTotalPrice(totalPrice - price);
    } else {
      setSelectedServices([...selectedServices, id]);
      if (price) setTotalPrice(totalPrice + price);
    }
  };

  return (
    <div className="xl:py-30 md:py-20 py-10 w-full relative">
      <Image
        src={mainBanner}
        alt="Premium shoe cleaning service - leather shoe with cleaning brush"
        fill
        className="object-cover"
        priority
      />
      <div className="absolute top-0 right-0 sm:max-w-1/2 w-full h-full bg-[#ffffffa8] z-0"></div>
      <div className="custom_container h-full flex items-center z-10 relative">
        <div className="ml-auto md:max-w-1/2 sm:pl-20 md:pr-20 w-full">
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.form
                key="step1"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                onSubmit={handleStep1Submit}
                className="sm:grid  grid-cols-2 gap-4"
              >
                <h2 className="text-xl xl:text-3xl mb-5 leading-tight col-span-2">
                  Узнайте точную стоимостьхимчистки, ремонта илиреставрации
                </h2>
                {step1Options.map((option) => (
                  <label
                    key={option.id}
                    className={`p-4 flex mb-5 sm:mb-0 items-center gap-5 cursor-pointer rounded-xl transition-colors duration-200
                      ${selectedStep1 === option.id ? "bg-[#214851] text-white" : "bg-white text-black"}
                    `}
                  >
                    <input
                      type="radio"
                      name="step1"
                      value={option.id}
                      className="hidden"
                      checked={selectedStep1 === option.id}
                      onChange={() => setSelectedStep1(option.id)}
                    />
                    <span
                      className={`min-w-10 h-10 flex items-center justify-center rounded-xl transition-colors duration-200
                      ${selectedStep1 === option.id ? "bg-white text-[#214851]" : "bg-[#E9E8EA] text-black"}
                    `}
                    >
                      {option.icon}
                    </span>
                    {option.label}
                  </label>
                ))}

                <button
                  type="submit"
                  className="w-full uppercase col-span-2 mt-7 cursor-pointer duration-300 hover:opacity-70 text-white h-[49px] bg-[#52425C]"
                >
                  Выбрать услуги
                </button>
              </motion.form>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-2 gap-4"
              >
                <h2 className="text-xl xl:text-3xl mb-5 leading-tight col-span-2">
                  Узнайте точную стоимость химчистки, ремонта или реставрации
                </h2>

                {step2Services.map((service) => {
                  const isSelected = selectedServices.includes(service.id);
                  return (
                    <label
                      key={service.id}
                      className={`flex items-center gap-3 p-4 rounded-xl cursor-pointer transition-all duration-200 border
                      ${isSelected ? "bg-[#214851] border-[#214851] text-white" : "bg-white border-gray-300 text-black"}
                      hover:${isSelected ? "opacity-90" : "bg-gray-100"}
                    `}
                    >
                      <input
                        type="checkbox"
                        className="hidden"
                        checked={isSelected}
                        onChange={() => handleServiceToggle(service.id, service.price)}
                      />
                      <span
                        className={`w-6 h-6 flex items-center justify-center border rounded transition-all duration-200
                        ${isSelected ? "bg-white text-[#214851] border-white" : "bg-white border-gray-400"}
                      `}
                      >
                        ✓
                      </span>
                      <span>
                        {service.label} {service.price && `- $${service.price}`}
                      </span>
                    </label>
                  );
                })}

                <div className="col-span-2 mt-4 text-lg font-semibold">
                  Итоговая цена: ${totalPrice}
                </div>
              </motion.div>
            )}
            <p className="mt-6">
              {step === 1
                ? "Выберите тип вещи, чтобы перейти к выбору услуг."
                : "Выберите необходимые услуги для расчета итоговой стоимости."}
            </p>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default ServiceCalculate;
