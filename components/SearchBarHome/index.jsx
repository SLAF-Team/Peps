import React from "react";
import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Box, Anchor } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";

const SearchBarHome = ({ placeholder, handleSubmit }) => {
  const [dataSearch, setDataSearch] = useState(null);
  const [recipeSearch, setRecipeSearch] = useState("");

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ["mouseup", "touchend"]);

  const handleChange = (e) => {
    e.preventDefault();
    setRecipeSearch(e.target.value);
  };

  async function getSearchedRecipe(recipeSearch, e) {
    const data = {
      where: {
        OR: [
          {
            imageUrl: {
              contains: recipeSearch,
              mode: "insensitive",
            },
          },
          {
            name: {
              contains: recipeSearch,
              mode: "insensitive",
            },
          },
        ],
      },
    };
    const result = await axios.post("/api/recipe/searchRecipes", {
      ...data,
    });
    setDataSearch(result.data);
  }

  useEffect(() => {
    getSearchedRecipe(recipeSearch);
  }, [recipeSearch]);

  return (
    <div className={styles.size}>
      <input
        type="search"
        placeholder={placeholder}
        className={styles.search}
        onChange={handleChange}
        onSubmit={handleSubmit}
        onClick={() => setOpened(true)}
      ></input>
      <div className={styles.img}>
        <Image src={search} width={30} height={30} />
      </div>
      <div className={styles.searchbox}>
        {recipeSearch && (
          <div>
            {opened && dataSearch.length > 0 && (
              <Box ref={ref} className={styles.box}>
                {dataSearch?.map((element) => {
                  return (
                    <div className={styles.linkbox}>
                      <Link
                        className={styles.link}
                        href={`/recipes/${element.id}`}
                      >
                        <img
                          src={element.imageUrl}
                          width={40}
                          height={40}
                          className={styles.iconImg}
                        />
                      </Link>
                      <Link
                        className={styles.link}
                        href={`/recipes/${element.id}`}
                      >
                        <a className={styles.a}>{element.name}</a>
                      </Link>
                    </div>
                  );
                })}
              </Box>
            )}
          </div>
        )}
      </div>
      <></>
    </div>
  );
};

export default SearchBarHome;
