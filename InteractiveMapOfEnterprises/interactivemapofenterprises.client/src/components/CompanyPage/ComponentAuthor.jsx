import ContentWithPaddings from "../common/ContentWithPaddings";

const ComponentAuthor = ({ props }) => {
    return (<ContentWithPaddings>
        <div>
            Создатель: <span>{props.creatorName}</span>
        </div>
        <div>
            Дата добавления:{" "}
            <span>{props?.dateCreatedArticle?.substring(0, 10)}</span>
        </div>
    </ContentWithPaddings>)
}

export default ComponentAuthor;
