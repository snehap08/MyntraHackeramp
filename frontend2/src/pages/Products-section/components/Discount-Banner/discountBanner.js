import { useState, useEffect } from "react";

export default function DiscountBanner() {
  const [time, setTime] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const endDate = new Date();
    endDate.setDate(endDate.getDate() + 6);

    const updateRemainingTime = () => {
      const remainingTime = endDate - new Date();

      if (remainingTime > 0) {
        setTime({
          days: Math.floor(remainingTime / (1000 * 60 * 60 * 24)),
          hours: Math.floor(
            (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
          ),
          minutes: Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((remainingTime % (1000 * 60)) / 1000),
        });
      }
    };

    updateRemainingTime();
    const interval = setInterval(updateRemainingTime, 1000);
    return () => clearInterval(interval);
  }, []);
  return (
    <p className="flex h-16 items-center justify-center bg-black px-4 text-lg font-medium text-white sm:px-6 lg:px-8">
   
     </p>
  );
}
