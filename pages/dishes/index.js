import React from "react";
import DishCard from "../../components/DishCard/DishCard.jsx"
import prisma from "../../lib/prisma.ts";
import classes from "./Dishes.module.css";
import { useState, useEffect } from "react";
import { MultiSelect, Switch } from "@mantine/core";
import axios from "axios";
import { useRouter } from "next/router";
import { useUserContext } from "../../context/UserContext.js";

const Dishes = ({ dishes, regions  }) => {
  // set up state for multiselect
  const idRegions = [];
  regions?.map((element) => idRegions.push(element.id));
  const [filterRegion, setFilterRegion] = useState(idRegions);
  const [filteredDishes, setFilterDishes] = useState(dishes);
  const [filter, setFilter] = useState(true);
  const router = useRouter();
  const { user } = useUserContext();

  // set up data for multiselect
  if(user){
    console.log('')
  } else {
    router.push('/login')
  }


  const dataRegions = [];
  regions?.map((region) =>
    dataRegions.push({ value: region.id, label: region.name })
  );

  // async search fonction
  const getDishes = async (data) => {
    try {
      const result = await axios.post(`/api/dish/searchDishes`, {
        ...data,
      });
      setFilterDishes(result.data);
    } catch (err) {
      console.log("error");
    }
  };

  console.log(filteredDishes)

  //useEffect for filter with exception if filter not used (ternary <3)
  useEffect(() => {
    const data = filter
      ? {
          where: {
            regionId: {
              in: filterRegion.length > 0 ? filterRegion : idRegions,
            },
          },
        }
      : null;
    getDishes(data);
  }, [filterRegion, filter]);

  return (
    <div className={classes.margin}>
      <div className="column">
        <div className={classes.titlecontainerindex}>
          <h1 className={classes.h1}>Toutes les plats </h1>
          <div className={classes.filters}>
                <MultiSelect
                  data={dataRegions}
                  value={filterRegion}
                  onChange={setFilterRegion}
                  placeholder="Trier par région"
                  searchable
                  clearable
                  className={classes.multiselect}
                  size="xs"
                  styles={{ label: { fontSize: 14 } }}
                />
              </div>

        </div>
        <div className="row">

          {filteredDishes && filteredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} col="col-3" />
          ))}
        </div>
      </div>
    </div>
  );
};

export async function getServerSideProps() {
  const allDishes = await prisma.dish.findMany({
    include: {
      region: { select: { name: true, id: true } },
    },
  });

  const allRegions = await prisma.region.findMany({});
  return {
    props: {
      dishes: allDishes,
      regions: allRegions,
    },
  };
}

export default Dishes;
