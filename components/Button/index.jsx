import React from "react";
import styles from "./Button.module.css";
import Link from "next/link";

const Button = ({ label, handleClick, type, href }) => {
	let btnStyle;
	switch (type) {
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
		<Link href={href} exact>
			<a className={`${styles.btn} ${btnStyle}`} onClick={handleClick}>
				{label.toUpperCase()}
			</a>
		</Link>
	);
};

export default Button;
