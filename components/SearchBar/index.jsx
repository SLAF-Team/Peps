import React from "react";
import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";
import Image from "next/image";
import { useState, useEffect } from "react";
import axios from "axios";

const SearchBar = ({ placeholder, handleSubmit}) => {

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
					name: {
						contains: recipeSearch,
						mode: "insensitive",
					},
				},
			],
		},
	}
		const result = await axios.post("/api/recipe/searchRecipes", {
		  ...data,
		});
		setDataSearch(result.data);
	};

	useEffect(() => {
	  getSearchedRecipe(recipeSearch);
	}, [recipeSearch]);

	// useEffect(() => {
	// 	dataSearch?.map(element =>  {
	// 		console.log(element.name)
	// 	})
	// }, [handleChange])

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

				{recipeSearch != '' ? dataSearch?.map(element => {
					return <div> <a href={`recipes/${element.id}`}>{element.name}</a>  <br /> </div>
				}) : ''}
			</div>
		</div>
	);
};


export default SearchBar;
