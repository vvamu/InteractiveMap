import MinimalInfoAboutCompony from "./MinimalInfoAboutCompony";
import VideoCompony from "./VideoCompony";
import AchievementsCompany from "./AchievementsCompany";
import classes from "./Article.module.css";

const components = {
  MINIMAL_INFO_ABOUT: MinimalInfoAboutCompony,
  VIDEO: VideoCompony,
  ACHIEVEMENTS: AchievementsCompany
};

function Article({ data }) {
  console.log(data);

  if (!data) {
    return null;
  }
  return (
    <section className={classes.article}>
      {data.map((d, index) => {
        const Component = components[d.type];
        return <Component key={index} props={d} />;
      })}
    </section>
  );
}

export default Article;
