import ContentWithPaddings from "../common/ContentWithPaddings";
import FitImage from "../common/FitImage";
import YoutubeMovie from "../common/YoutubeMovie";

const SectionCategoriesDescriptions = () => {
    return (
        <>
            <div style={{
                width: "100%", margin: "5% 0%",
                display: "flex", flexDirection: "column", alignItems: "center", gridGap:"30px"
                
            }}>
                <img src="/mainPage/zavitushka.jpg" height="30px" width="160px"
                    style={{  opacity:"0.4" }}></img>
                <FitImage src={"/mainPage/azs.jpg"} style={{
                    height: "700px", width: "100%", filter:"contrast(0.7)",
                backgroundImage: "url(/mainPage/azs.jpg)", backgroundSize: "cover", 
            }}/>
               
                <img src="/mainPage/zavitushka.jpg" height="30px" width="160px"
                    style={{ transform: "rotate(180deg)", opacity: "0.4" }}></img>
            </div>  

        <ContentWithPaddings style={{ display: "flex", flexDirection: "column", alignItems: "center", gridGap:"2%" } }>
                <h2 style={{ margin: "0% 10% 3%" }}>Промышленное производство</h2>
                <div style={{ display: "flex", flexDirection: "column", gridGap: "10px" }}>
            <div>
            Республика Беларусь осуществляет многовекторную внешнеэкономическую политику и поддерживает торговые отношения с 196 странами мира. Экспорт является одним из приоритетов развития белорусской экономики. На зарубежные рынки поставляется около 55% производимой продукции, что характерно для стран с высокой степенью развития и открытости экономики. 
            </div>
            <div>
            Промышленное производство формирует четверть валового внутреннего продукта Беларуси (в 2024 году – 25,0%).
                    </div>

                    <div style={{}}>

                        Наиболее развитые отрасли промышленности страны: машиностроительный комплекс, производство продуктов питания, напитков и табачных изделий, производство нефтепродуктов, химическая и фармацевтическая отрасли, производство электроэнергии, деревообработка, легкая промышленность.
                    </div>

                    <div>
                        Одними из самых знаменитых белорусских предприятий являются БелАЗ, МТЗ, МАЗ, Гомсельмаш, Белкоммунмаш, а также молочные бренды, такие как Савушкин продукт и Бабушкина крынка.
                    </div>
                </div>
                <div style={{ margin: "50px 0px", width:"100%" }}>
                    <YoutubeMovie width="100%" height="600px" videoId="vzMjtJAEeos"/>
                    {/*<iframe width="560" height="315"*/}
                    {/*    enablejsapi={ true}*/}
                    {/*    src="https://www.youtube.com/embed/vzMjtJAEeos?enablejsapi=1"*/}
                    {/*    title="YouTube video player"*/}
                    {/*    frameborder="0"*/}
                    {/*    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"*/}
                    {/*    referrerpolicy="strict-origin-when-cross-origin"*/}
                    {/*    allowfullscreen></iframe>*/}

                </div>
                <div>
                    Беларусь занимает ведущие позиции на мировом рынке по экспорту молочной продукции, входя в топ-5 стран-экспортеров. В частности, Беларусь занимает третье место в мире по экспорту сливочного масла и сухой молочной сыворотки, четвертое - по экспорту сыра и пятое - по экспорту сухого обезжиренного молока. В 2024 году Беларусь экспортировала 6 млн тонн молока и молочных продуктов в 69 стран мира, а объем экспорта составил 3,4 миллиарда долларов США. 
                </div>
            </ContentWithPaddings>

            
        </>
    )
}

export default SectionCategoriesDescriptions;