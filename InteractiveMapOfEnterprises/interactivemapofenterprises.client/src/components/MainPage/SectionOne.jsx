import ContentWithPaddings from "../common/ContentWithPaddings";

const SectionOne = () => (
    <ContentWithPaddings >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gridGap: "20px" }}>

            <div style={{ flexShrink: "1", width: "50%", alignItems: "flex-start" }}>
                <h2 style={{ marginBottom: "10px" }}>Приглашаем вас окунуться в мир белорусских предприятий</h2>
                <div>
                    Загляните в удивительный мир белорусских предприятий, где современные технологии переплетаются с богатой историей производства. В наших предприятиях творится что-то удивительное - здесь рождаются инновационные товары и предлагаются высококачественные услуги, которые ценятся по всему миру.
                </div>
            </div>

            <div style={{ flexShrink: "1", width: "50%", height: "400px", zoom: "70%", borderRadius: "10px", marginTop: "20px" }}>

                {/*<iframe style={{height:"100%", width:"100%" ,borderRadius:"10px" }} title="MTZ80 tractor low poly" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/3da3f57fe1b24c0ca1f5307f7a7ad9cb/embed"></iframe>*/}
                {/*<iframe style={{ height: "100%", width: "100%",borderRadius:"10px" }}  title="Traktor BELARUS UMZ - 6AL (RAW 3d scan)" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/042d4e5e20a14ca2b300d6819f1b553e/embed"> </iframe>*/}

                <iframe style={{ height: "100%", width: "100%", borderRadius: "10px" }} title="TrackTrr" frameborder="0" allowfullscreen mozallowfullscreen="true" webkitallowfullscreen="true" allow="autoplay; fullscreen; xr-spatial-tracking" xr-spatial-tracking execution-while-out-of-viewport execution-while-not-rendered web-share src="https://sketchfab.com/models/60fa82cf22c542089421f7cb54e01f93/embed"> </iframe>
            </div>
        </div>
    </ContentWithPaddings>
);
export default SectionOne;