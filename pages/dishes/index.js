import React from "react";
import DishCard from "../../components/DishCard/DishCard";
import prisma from "../../lib/prisma.ts";

const Dishes = ({ dishes }) => {
  return (
    <>
      {dishes?.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </>
  );
};

export default Dishes;

export async function getServerSideProps() {
  const allDishes = await prisma.dish.findMany({
    include: {
      region: { select: { name: true } },
    },
  });
  return {
    props: {
      dishes: allDishes,
    },
  };
}
