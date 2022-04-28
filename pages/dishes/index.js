import DishCard from "../../components/DishCard/DishCard.jsx";
import prisma from "../../lib/prisma.ts";
import classes from "./Dishes.module.css";
import { useState, useEffect } from "react";
import { MultiSelect } from "@mantine/core";
import { apiDishes } from '../../components/utilities/operation'

const Dishes = ({ dishes, regions }) => {
  const idRegions = [];
  regions?.map((element) => idRegions.push(element.id));
  const [filterRegion, setFilterRegion] = useState([]);
  const [filteredDishes, setFilterDishes] = useState(dishes);
  const [filter, setFilter] = useState(true);
  const [page, setPage] = useState(1);
  const recipesPerPage = 12;

  const dataRegions = [];
  regions?.map((region) =>
    dataRegions.push({ value: region.id, label: region.name })
  );

  const getDishes = async (data) => {
    apiDishes.post(data).then((res) => {
      try {
        setFilterDishes(res.results.data);
      } catch (err) {
        console.log(err);
      }
    });
  }

  useEffect(() => {
    const filterCall = {};
    if (filterRegion.length > 0) {
      filterCall.where = {
        regionId: {
          in: filterRegion.length > 0 ? filterRegion : idRegions,
        },
      };
    }
    filterCall.take = page * recipesPerPage;
    const data = filter ? filterCall : null;
    getDishes(data);
  }, [page, filterRegion, filter]);

  const loadMore = (e) => {
    e.preventDefault();
    setPage(page + 1);
  };

  return (
    <div>
      <div className={classes.margin}>
        <div className="column">
          <div className={classes.titlecontainerindex}>
            <h1 className={classes.h1}>Tous les plats </h1>
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
            {filteredDishes &&
              filteredDishes.map((dish) => (
                <DishCard
                  key={dish.id}
                  dish={dish}
                  col="col-3"
                />
              ))}
          </div>
        </div>
        {filteredDishes.length >= recipesPerPage && (
          <div className={classes.loadMore}>
            <a onClick={loadMore} className={classes.btn}>
              Voir plus
            </a>
          </div>
        )}
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
