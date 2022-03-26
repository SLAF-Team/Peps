import React from "react";
import styles from "./FilterSelector.module.css";
import Image from "next/image";

const FilterSelector = ({ left, handleSelect }) => {
	const handleSelection = (e) => {
		handleSelect(e.target.value);
	};

	return (
		<div className={styles.selector}>
			<div>
				<p className={styles.selectorText}>
					<span className={styles.bold}>{left}</span> Recettes
				</p>
			</div>
			<div>
				<p className={styles.selectorText}>
					Filtrer par :&nbsp;
					<select
						name="filter"
						onChange={handleSelection}
						className="customSelect"
					>
						<option value="like">Likes</option>
						<option value="comment">Commentaires</option>
					</select>
				</p>
			</div>
		</div>
	);
};

export default FilterSelector;
