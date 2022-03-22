import React from "react";
import styles from "./Selector.module.css";
import Image from "next/image";

const Selector = ({
	right,
	left,
	handleClickLeft,
	handleClickRight,
	style,
}) => {
	return (
		<div className={styles.selector}>
			<div
				className={!style ? "selectorBlock selectorSelect" : "selectorBlock"}
				onClick={handleClickLeft}
			>
				<p className={styles.selectorText}>{left}</p>
			</div>
			<div
				className={style ? "selectorBlock selectorSelect" : "selectorBlock"}
				onClick={handleClickRight}
			>
				<p className={styles.selectorText}>{right}</p>
			</div>
		</div>
	);
};

export default Selector;
