import React from "react";
import styles from "./SearchBar.module.css";
import search from "../../assets/images/search.svg";
import Image from "next/image";

const SearchBar = ({ placeholder, handleSubmit }) => {
	return (
		<div className={styles.size}>
			<input
				type="search"
				placeholder={placeholder}
				className={styles.search}
				onSubmit={handleSubmit}
			></input>
			<div className={styles.img}>
				<Image src={search} width={20} height={20} />
			</div>
		</div>
	);
};

export default SearchBar;
