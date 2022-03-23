import React from "react";
import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import { Blockquote, Box } from "@mantine/core";

const SearchBar = ({ placeholder, handleSubmit }) => {
  const [dataSearch, setDataSearch] = useState(null);
  const [recipeSearch, setRecipeSearch] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setRecipeSearch(e.target.value);
  };

  async function getSearchedRecipe(recipeSearch) {
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
            }
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
      ></input>
      <div className={styles.img}>
        <Image src={search} width={20} height={20} />
      </div>
      <div>
        {recipeSearch
          ? dataSearch?.map((element) => {
              return (
                <div>
                    <Box
                    sx={(theme) => ({
                      backgroundColor: theme.colorScheme === 'dark' ? theme.colors.dark[6] : theme.colors.gray[0],
                      textAlign: 'center',
                      paddingTop: "15px",
                      fontSize: "14px",
                      paddingBottom: "15px",
                      zIndex: "504344343",
                      paddingLeft: '0px',
                      paddingRight: '0px',
                      borderRadius: theme.radius.s,
                      cursor: 'pointer',
                      display: "flex",
                      justifyContent: 'flex-start',
                      flexWrap: "wrap",
                      paddingInlineStart: '5px',
                      paddingInlineEnd: '5px',
                      alignItems: 'center',
                      position: 'relative',

                      '&:hover': {
                        backgroundColor:
                          theme.colorScheme === 'dark' ? theme.colors.dark[5] : theme.colors.gray[1],
                      },
                    })}
                    >
                    <Image src={element.imageUrl} width={40} height={40} className={styles.iconImg} />
                    <Link href={`recipes/${element.id}`}>
                      <a>{element.name}</a>
                    </Link>
                  </Box>
                </div>
              );
            })
          : ""}
      </div>
    </div>
  );
};

export default SearchBar;
