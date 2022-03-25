import React from "react";
import styles from "./Button.module.css";

const ButtonForm = ({ label, theme }) => {
	let btnStyle;
	switch (theme) {
		case "primary":
			btnStyle = styles.primary;
			break;
		case "warning":
			btnStyle = styles.warning;
			break;
		case "danger":
			btnStyle = styles.danger;
			break;
		case "success":
			btnStyle = styles.success;
			break;
		default:
			btnStyle = styles.primary;
			break;
	}

	return (
		<button className={`${styles.btn} ${btnStyle}`}>
			{label.toUpperCase()}
		</button>
	);
};

export default ButtonForm;
