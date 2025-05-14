import Slider from "../components/MainPage/Slider/Slider";

function MainPage() {
  return (
    <>
      <header></header>
      <main className="main-page-main">
        <div className="main-panel glass-effect">
          <div>
            <Slider
              slides={[
                {
                  url: "https://a-ir.by/upload/iblock/f96/zr9b2eaarb3sjlmrpaoev4jg4n11f5x4.jpg",
                  caption: "ОАО 'Гродно Азот'",
                },
                {
                  url: "https://grodnonews.by/upload/iblock/21f/21fc266a7d9c742963ccdc08cdd37f73.JPG",
                  caption: "ОАО 'Молочный мир'",
                },
              ]}
            />
          </div>
        </div>
      </main>
      <footer></footer>
    </>
  );
}

export default MainPage;
