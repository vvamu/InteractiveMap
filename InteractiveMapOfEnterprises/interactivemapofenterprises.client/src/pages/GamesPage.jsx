import { useState } from "react";
import ContentWithPaddings from "../components/common/ContentWithPaddings";
import ApplicationUrl from "../models/ApplicationUrl";
import { Link } from "react-router-dom";
import FitImage from "../components/common/FitImage";
import useLocationChangeLogger from "../hooks/useLocationChangeLogger";
import EmergingDiv from "../components/common/EmergingDiv";

import games from "../components/GamePage/games";
import ContentWithBluredBackground from "../components/common/ContentWithBluredBackground";
export default function GamesPage() {


    return (

        <ContentWithBluredBackground backgroundImage={"url(/companiesBackgrounds/combine.jpg)"} duration={5000} >
        <div className="flexContent" onClick={() => { document.location = game.url }}>
              {games.map((game, index) => (

                  <Link className="cart" to={game.url} style={{
                      minHeight: "550px", width: "40%", borderRadius: "10px",
                      padding: "0px", backgroundColor: "rgb(255 255 255 / 70%)"
                  }} key={index} data={game} >

                      <FitImage src={game.src} height="250px" style={{ borderRadius: "10px 10px 0px 00px" }} />

                      <ContentWithPaddings >
                          <h3 style={{ marginBottom: "10px" }} className="coloredText">{game.name}</h3>
                          <div style={{ marginBottom: "20px" }} >{game.desription}</div>
                          <div><button>Играть</button></div>
                      </ContentWithPaddings>
                  </Link>
              ))}
        </div>
            </ContentWithBluredBackground>
  );
}