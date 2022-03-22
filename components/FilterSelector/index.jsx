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
					<span className={styles.bold}>{left}</span> Résultats
				</p>
			</div>
			<div>
				<p className={styles.selectorText}>
					Filtrer :&nbsp;
					<select name="filter" onChange={handleSelection}>
						<option value="like">Likes</option>
						<option value="comment">Commentaires</option>
					</select>
				</p>
			</div>
		</div>
	);
};

export default FilterSelector;
