import classes from "./CompanyInfo.module.css";

function VideoCompony({ props }) {
  return (
    <div className={`${classes.chapter}`}>
      <h2 className={classes.title}>Видео:</h2>
      <video className={classes.video} width="426" height="320" controls>
        <source src={props.content.videoUrl} type="video/mp4" />
      </video>
    </div>
  );
}

export default VideoCompony;
