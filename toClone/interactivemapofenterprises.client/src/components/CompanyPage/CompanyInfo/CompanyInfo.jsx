import VideoCompony from "./VideoCompony";
import AchievementsCompany from "./AchievementsCompany";
import classes from "./CompanyInfo.module.css";
import React from "react";


const components = {
  MINIMAL_INFO_ABOUT: MinimalInfoAboutCompony,
  VIDEO: VideoCompony,
  ACHIEVEMENTS: AchievementsCompany
};

function CompanyInfo({ data }) {
  console.log(data);

  if (!data) {
    return null;
  }
  return (
      <section className={classes.article}>
          <MinimalInfoAboutCompony props={ data} />
      
    </section>
  );
}

const qualityMarkIcon = "/qualityMark.png";


const ImageComponent = (props) => {
    // Convert the byte array to Base64 string
    const byteArrayToBase64 = (byteArray) => {
        if (byteArray == undefined) return "/qualityMark.png"
        let binary = "";
        for (let i = 0; i < byteArray.length; i++) {
            binary += String.fromCharCode(byteArray[i]);
        }
        return `data:image/jpeg;base64,${btoa(binary)}`;
    };

    return (
        <img
            className={classes.logo}
            src={byteArrayToBase64(props.imageBytes)}
            alt={props.name}
            width={256}
            height={256}
        />
    );
};

function MinimalInfoAboutCompony({ props }) {
    return (
        <div className={`${classes.chapter} ${classes.minimalInfoAboutCompony}`}>
            <ImageComponent props={props} />
            <div>
                <h2 className={classes.title}>{props.name}</h2>
                <span className={classes.abbName}>{props.abbName}</span>
                <div className={classes.foundationDate}>
                    Date of placement: <span>{props.dateFoundation.substring(0, 10)}</span>
                </div>
                <div className={classes.foundationDate}>
                    City: <span>{props.regionId}</span>
                </div>
                <hr/>
                <div className={classes.foundationDate}>
                    Creator: <span>{props.creatorName}</span> (<span>{props.dateCreatedArticle.substring(0, 10)}</span>)
                </div>
                
            </div>
           
        </div>
    );
}

export default CompanyInfo;


{/*{data.map((d, index) => {*/ }
{/*  const Component = components[d.type];*/ }
{/*  return <Component key={index} props={d} />;*/ }
{/*})}*/ }