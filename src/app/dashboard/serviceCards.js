import React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import serviceData from "./serviceData";
import Link from "next/link";

const ServiceCards = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {serviceData.map((service, index) => (
        <Card key={index} className="hover:shadow-lg bg-white/10 transition-shadow z-[999]">
          <CardHeader className="flex items-center text-white gap-4">
            <service.icon className="h-10 w-10 text-secondary" />
            <div>
              <CardTitle className="text-white">{service.title}</CardTitle>
              <CardDescription>{service.description}</CardDescription>
            </div>
          </CardHeader>
          <CardContent>
            <Link href={service.path}>
              <Button variant="outline" className="w-full">
                Tutustu
              </Button>
            </Link>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default ServiceCards;