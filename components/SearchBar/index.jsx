import React from "react";
import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Box, Anchor } from "@mantine/core";
import { useClickOutside } from "@mantine/hooks";

const SearchBar = ({ placeholder, handleSubmit }) => {
  const [dataSearch, setDataSearch] = useState(null);
  const [recipeSearch, setRecipeSearch] = useState("");

  const [opened, setOpened] = useState(false);
  const ref = useClickOutside(() => setOpened(false), ["mouseup", "touchend"]);

  const handleChange = (e) => {
    e.preventDefault();
    setRecipeSearch(e.target.value);
    console.log(opened);
  };

  async function getSearchedRecipe(recipeSearch, e) {
    const data = {
      where: {
        OR: [
          {
            description: {
              contains: recipeSearch,
              mode: "insensitive",
            },
          },
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
        <Image src={search} width={20} height={20} />
      </div>
      <div className={styles.searchbox}>
        {recipeSearch && (
          <div>
            {opened && (
              <Box
                ref={ref}
                sx={(theme) => ({
                  backgroundColor:
                    theme.colorScheme === "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                  paddingTop: "15px",
                  paddingBottom: "15px",
                  zIndex: "504344343",
                  paddingLeft: "10px",
                  paddingRight: "10px",
                  borderRadius: theme.radius.s,
                  cursor: "pointer",
                  width: "100%",
                  "&:hover": {
                    backgroundColor:
                      theme.colorScheme === "dark"
                        ? theme.colors.dark[5]
                        : theme.colors.gray[1],
                  },
                })}
              >
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
                        <div className={styles.a}>{element.name}</div>
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

export default SearchBar;
