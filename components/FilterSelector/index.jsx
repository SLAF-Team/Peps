import React from "react";
import styles from "./FilterSelector.module.css";
import Image from "next/image";

const FilterSelector = ({ left, handleClickRight }) => {
	return (
		<div className={styles.selector}>
			<div>
				<p className={styles.selectorText}>
					<span className={styles.bold}>{left}</span> Résultats
				</p>
			</div>
			<div>
				<p className={styles.selectorText} onClick={handleClickRight}>
					Filtrer :&nbsp;
					<select name="filter">
						<option>Likes</option>
						<option>Commentaires</option>
					</select>
				</p>
			</div>
		</div>
	);
};

export default FilterSelector;
