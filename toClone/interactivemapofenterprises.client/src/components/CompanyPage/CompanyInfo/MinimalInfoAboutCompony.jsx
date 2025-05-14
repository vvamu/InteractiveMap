import classes from "./CompanyInfo.module.css";

import qualityMarkIcon from "/qualityMark.png";

function MinimalInfoAboutCompony({ props }) {
    return (
        <div className={`${classes.chapter} ${classes.minimalInfoAboutCompony}`}>
            <img
                className={classes.logo}
                src={props.content.logoUrl}
                alt={props.content.name}
                width={256}
                height={256}
            />
            <div>
                <h2 className={classes.title}>{props.content.name}</h2>
                <span className={classes.abbName}>{props.content.abbName}</span>
                <span className={classes.foundationDate}>
                    Дата основания: <span>{props.content.foundationDate}</span>
                </span>
            </div>
            {props.content.qualityMark ? (
                <img className={classes.qualityMark} src={qualityMarkIcon} width={100} height={100} />
            ) : null}
        </div>
    );
}

export default MinimalInfoAboutCompony;