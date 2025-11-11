"use client";

import { serviceList } from "../const/service-list";
import { Heart } from "lucide-react";
import Image from "next/image";

export const CoreServices = () => {
  return (
    <div className="w-full h-full flex flex-col justify-between p-12 text-white">
      {/* Logo & Tagline */}
      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
            <Image
              src="/logo.svg"
              alt="KyupiKyupi"
              width={136}
              height={136}
              className="w-7 h-7 text-white fill-white"
            />
          </div>
          <div>
            <h1 className="text-3xl font-bold">KyupiKyupi</h1>
            <p className="text-white/90 text-sm">
              Quân sư tốt nhất cho việc hẹn hò của bạn
            </p>
          </div>
        </div>
      </div>

      {/* Services List */}
      <div className="space-y-6 flex-1 flex flex-col justify-center">
        {serviceList.map((service, index) => {
          const Icon = service.icon;
          return (
            <div
              key={index}
              className="flex items-start gap-4 animate-fade-in-up"
              style={{ animationDelay: `${0.1 + index * 0.1}s` }}
            >
              <div className="p-2.5  shrink-0">
                <p className="text-2xl">{service.icon}</p>
              </div>
              <div>
                <h3 className="font-semibold text-white text-base mb-1">
                  {service.title}
                </h3>
                <p className="text-white/80 text-sm leading-relaxed">
                  {service.description}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
